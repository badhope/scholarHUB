"""FastAPI application entrypoint.

Composes: lifespan (DB + modules) → middleware (tenant, security, CORS) →
core routers → module routers.
"""

from __future__ import annotations

import logging
import os
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from tenacity import (
    before_sleep_log,
    retry,
    retry_if_exception_type,
    stop_after_attempt,
    wait_fixed,
)

from app import __version__
from app.api import (
    admin,
    auth,
    gdpr,
    health,
    metrics,
    modules,
    privacy,
    tenant_hosts,
    two_factor,
    users,
    webauthn,
)
from app.api.oidc import router as oidc_router
from app.core.bootstrap import run_bootstrap
from app.core.config import settings
from app.core.db import check_db_connection, dispose_engine
from app.core.logging import configure_logging, get_logger
from app.core.modules import load_all, registry
from app.core.monitoring import init_monitoring
from app.core.rate_limit_store import close_rate_limiter_store
from app.core.tenant import TenantContextMiddleware
from app.middleware.csrf import CSRFMiddleware
from app.middleware.metrics import HTTPMetricsMiddleware
from app.middleware.rate_limit import RateLimitMiddleware
from app.middleware.security_headers import SecurityHeadersMiddleware

configure_logging()
logger = get_logger("scholarhub.startup")

# Sentry must be initialised before the FastAPI app is constructed so its
# auto-instrumentation can wrap the ASGI app. No-op when DSN is unset.
init_monitoring()


@retry(
    stop=stop_after_attempt(settings.db_startup_retries + 1),
    wait=wait_fixed(settings.db_startup_retry_delay),
    retry=retry_if_exception_type(Exception),
    before_sleep=before_sleep_log(logger, logging.WARNING),
    reraise=True,
)
async def _verify_db_with_retry() -> None:
    """Verify DB connectivity; tenacity retries up to ``db_startup_retries`` times."""
    await check_db_connection()
    logger.info("database_connection_verified")


# Load enabled modules eagerly so their routers are available when the
# app is constructed. Module __init__ only registers manifests (no I/O),
# so this is safe to run at import time.
load_all()
logger.info(
    "modules_loaded",
    count=len(registry),
    names=[m for m in registry.all_metadata()],
)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Application lifespan: verify DB → bootstrap → yield → dispose."""
    if not settings.is_test:
        await _verify_db_with_retry()
        await run_bootstrap()

    yield

    if not settings.is_test:
        # Close the rate-limiter store (releases the Redis client) before
        # tearing down the engine / other resources that may depend on it.
        await close_rate_limiter_store()
        await dispose_engine()
        logger.info("database_engine_disposed")


app = FastAPI(
    title=settings.app_name,
    version=__version__,
    docs_url="/docs" if not settings.is_production else None,
    redoc_url="/redoc" if not settings.is_production else None,
    openapi_url="/openapi.json" if not settings.is_production else None,
    lifespan=lifespan,
)


# --- Exception handlers ---


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    request: Request, exc: RequestValidationError
) -> JSONResponse:
    from app.core.tenant import REQUEST_ID_CTX

    request_id = REQUEST_ID_CTX.get()
    errors = []
    for err in exc.errors():
        loc = ".".join(str(part) for part in err.get("loc", []))
        errors.append(
            {
                "field": loc,
                "message": err.get("msg", "Invalid value"),
                "type": err.get("type", "value_error"),
            }
        )
    return JSONResponse(
        status_code=422,
        content={
            "status": 422,
            "title": "Validation error",
            "type": "https://httpstatuses.org/422",
            "instance": str(request.url.path),
            "detail": "Validation error",
            "errors": errors,
            "trace_id": request_id or "",
        },
        headers={"Content-Type": "application/problem+json"},
    )


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException) -> JSONResponse:
    from app.core.tenant import REQUEST_ID_CTX

    request_id = REQUEST_ID_CTX.get()
    exc_headers = exc.headers or {}
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "status": exc.status_code,
            "title": "HTTP error",
            "type": f"https://httpstatuses.org/http-{exc.status_code}",
            "instance": str(request.url.path),
            "detail": exc.detail,
            "trace_id": request_id or "",
        },
        headers={
            **exc_headers,
            "Content-Type": "application/problem+json",
        },
    )


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    """Catch all unhandled exceptions; never leak stack traces to clients."""
    from app.core.tenant import REQUEST_ID_CTX

    request_id = REQUEST_ID_CTX.get()
    logger.error(
        "unhandled_exception",
        method=request.method,
        path=request.url.path,
        request_id=request_id,
        error=str(exc),
        exc_info=True,
    )
    detail = "Internal server error"
    if settings.debug:
        detail = f"{type(exc).__name__}: {exc}"
    return JSONResponse(status_code=500, content={"detail": detail})


# --- Middleware stack (note: FastAPI is LIFO — last added runs first) ---
#
# Execution order on inbound request (registered here bottom-up):
#   1. TenantContextMiddleware   (resolves tenant, sets request_id)
#   2. RateLimitMiddleware        (per-IP + per-auth-path throttling)
#   3. SecurityHeadersMiddleware (CSP, X-Frame, X-API-Version)
#   4. CORSMiddleware
#   5. TrustedHostMiddleware (production only)
# Tenant MUST run before auth, because auth depends on tenant scope.
app.add_middleware(CSRFMiddleware)
app.add_middleware(RateLimitMiddleware, default_per_minute=settings.rate_limit_per_minute)
app.add_middleware(SecurityHeadersMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=settings.cors_methods,
    allow_headers=settings.cors_headers,
)

if settings.is_production:
    from fastapi.middleware.trustedhost import TrustedHostMiddleware

    app.add_middleware(TrustedHostMiddleware, allowed_hosts=settings.allowed_hosts_list)

# Tenant must be outermost — register LAST so it runs first.
app.add_middleware(TenantContextMiddleware)

# HTTP metrics middleware — registers AFTER tenant so scope["route"] is
# populated by FastAPI's router, but before the app processes the request.
app.add_middleware(HTTPMetricsMiddleware)


# --- Core routers (always present) ---
# Health probes at root (Kubernetes convention) + legacy at /api prefix.
app.include_router(health.router)
app.include_router(health.legacy_router, prefix="/api")
# Metrics at root for Prometheus scrapers.
app.include_router(metrics.router)
# All other core routers under /api.
# Privacy is also mounted at root so it's accessible without /api prefix.
app.include_router(privacy.router)
app.include_router(privacy.router, prefix="/api")
app.include_router(two_factor.router, prefix="/api")
app.include_router(gdpr.router, prefix="/api")
app.include_router(auth.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(admin.router, prefix="/api")
app.include_router(tenant_hosts.router, prefix="/api")
app.include_router(modules.router, prefix="/api")
# WebAuthn / Passkeys as an alternative to TOTP 2FA.
app.include_router(webauthn.router, prefix="/api")
# OIDC routes always mount; each endpoint 503s when OIDC is not configured
# (default). This avoids a shape change when an operator flips the env flag.
app.include_router(oidc_router, prefix="/api")


# --- Module routers (loaded dynamically at startup) ---
for name, module_router in registry.all_routers():
    app.include_router(module_router, prefix="/api")
    logger.info("module_router_mounted", module=name, prefix=f"/api/{name}")


# --- 单端口部署模式（SCHOLARHUB_STATIC_DIR） ---
# 设置该环境变量后，FastAPI 直接托管前端构建产物（vite dist/），
# SPA 深链接（如 /resources/1）回退到 index.html。这让整个应用
# 以单端口 HTTP 服务部署到 Render/Railway/Fly/CF Tunnel 等平台，
# 无需为前端单独开静态托管。未设置时行为与原来完全一致（纯 API）。
# 稿件文件目录：**故意不做静态挂载**。
#
# 这里曾经把 storage_path 以 StaticFiles 挂在 /uploads 上，任何人（含匿名、
# 含其他租户）拿到 /uploads/<uuid>.pdf 就能下载尚未公开的在审稿件，
# 完全绕开 GET /api/submissions/{id}/files 里的作者/编辑/审稿人鉴权。
# 早期唯一的"保护"是 UUID 不可猜测，而链接会通过邮件、浏览器历史、
# Referer、前端 props 持续扩散，等于对核心资产（未发表手稿）开放越权读取。
#
# 现在稿件文件只经鉴权端点流出（本地后端流式返回，S3 后端走短时预签名 302），
# 与 app/core/storage.py 的约定一致：本地文件绝不直连。
# 若确需直连，必须改为带 HMAC 过期签名的短时 URL 中间件，不得再裸挂目录。

# 注意：catch-all 必须注册在 root() 之前（否则 / 被 root 抢走）、
# 在所有 API/docs/health 路由之后（具体路由按注册顺序优先匹配）。
_static_dir_env = os.environ.get("SCHOLARHUB_STATIC_DIR", "").strip()
if _static_dir_env:
    _static_root = Path(_static_dir_env).resolve()
    if _static_root.is_dir():
        _assets_dir = _static_root / "assets"
        if _assets_dir.is_dir():
            app.mount(
                "/assets",
                StaticFiles(directory=str(_assets_dir)),
                name="static-assets",
            )

        @app.get("/{full_path:path}", include_in_schema=False)
        async def spa_static_fallback(full_path: str) -> FileResponse:
            # API 未匹配到的路径保持 404 JSON，避免前端把错误页当数据处理。
            if full_path.startswith("api/") or full_path == "api":
                raise HTTPException(status_code=404, detail="Not Found")
            candidate = (_static_root / full_path).resolve()
            # 防目录穿越：candidate 必须仍在静态根内。
            # 用 is_relative_to 精确判断，避免 ../static-dev 之类同级目录被
            # startswith 误判为命中（前缀绕过）。
            if full_path and candidate.is_file() and candidate.is_relative_to(_static_root):
                return FileResponse(str(candidate))
            index_file = _static_root / "index.html"
            if index_file.is_file():
                return FileResponse(str(index_file))
            raise HTTPException(status_code=404, detail="Frontend build not found")

        logger.info("static_serving_enabled", static_dir=str(_static_root))
    else:
        logger.warning("static_dir_not_found", static_dir=_static_dir_env)


@app.get("/")
async def root() -> dict[str, str]:
    return {
        "name": "ScholarHUB API",
        "version": __version__,
        "docs": "/docs",
    }
