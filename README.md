<div align="center">

<img src="docs/assets/logo-horizontal.svg" alt="ScholarHUB" width="320" />

# ScholarHUB

**An open scholarly publishing platform — Submit · Review · Publish · Read, the entire publishing loop in one codebase**

> 11 backend modules · 644 unit tests (84% coverage) · 66 E2E cases · strictly typed end to end

**🌐 [English](README.md) · [简体中文](README.zh-CN.md)**

[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg?style=flat-square)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.12+-3776AB.svg?logo=python&logoColor=white&style=flat-square)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.139-009688.svg?logo=fastapi&logoColor=white&style=flat-square)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg?logo=react&logoColor=white&style=flat-square)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6.svg?logo=typescript&logoColor=white&style=flat-square)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1.svg?logo=postgresql&logoColor=white&style=flat-square)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker_Compose-2496ED.svg?logo=docker&logoColor=white&style=flat-square)](https://docs.docker.com/compose/)
[![Unit tests](https://img.shields.io/badge/unit_tests-644-10B981?style=flat-square&logo=pytest&logoColor=white)](#testing)
[![Coverage](https://img.shields.io/badge/coverage-84%25-2C5AA0?style=flat-square)](#testing)
[![E2E](https://img.shields.io/badge/E2E_specs-66-22C55E?style=flat-square&logo=playwright&logoColor=white)](#testing)

**Mirrors**: [GitHub](https://github.com/x33834/scholarhub) · [GitHub](https://github.com/Morningstar202604/scholarhub) · [GitCode](https://gitcode.com/badhope/scholarhub) · [Gitee](https://gitee.com/badhope/scholarhub)

**[Features](#features) · [Screenshots](#screenshots) · [Architecture](#architecture) · [Quick Start](#quick-start) · [Tech Stack](#tech-stack) · [Testing](#testing) · [Docs](#docs)**

</div>

---

## Features

| Role | Capability |
| --- | --- |
| **Author** | Submit manuscripts (with PDF), multi-version revisions, track review status (pending / major / minor / accept / reject) |
| **Editor** | Assign reviewers, decide (with editorial notes), manuscript management workbench |
| **Reviewer** | Review reports, blind review (single / double), decision recommendation |
| **Reader** | Public catalog search, **in-browser reading (pdf.js)**, cross-device reading progress, follow authors, subscribe |
| **Admin** | Users / volumes / issues / journals management, audit logs, batch import (BibTeX / RIS / CSV / DOI / arXiv) |

**Secure by default**: WebAuthn passkeys + TOTP 2FA, server-side JWT revocation with key rotation, sign-up captcha, per-action audit logs, multi-tenant isolation (PostgreSQL RLS).

**Lightweight deployment**: single-node `docker compose up`; PostgreSQL for production, SQLite + single-port service for dev/demo.

## Screenshots

| Public portal | Resource catalog | Online reading |
| --- | --- | --- |
| ![home](docs/assets/screenshots/01-home.png) | ![catalog](docs/assets/screenshots/02-catalog.png) | ![reader](docs/assets/screenshots/17-reader.png) |

| Workbench overview | My submissions | Editor workbench |
| --- | --- | --- |
| ![dashboard](docs/assets/screenshots/04-dashboard.png) | ![submissions](docs/assets/screenshots/07-my-submissions.png) | ![editor](docs/assets/screenshots/05-editor-workbench.png) |

| Mobile catalog | Mobile detail | Reviewer workbench |
| --- | --- | --- |
| ![mobile catalog](docs/assets/screenshots/mobile-catalog.png) | ![mobile detail](docs/assets/screenshots/mobile-detail.png) | ![reviewer](docs/assets/screenshots/06-reviewer-workbench.png) |

## Architecture

![architecture](docs/assets/architecture.svg)

**Core flow**: Submit → assign reviewers → blind review → editor decision → publish to public catalog → read online.

![workflow](docs/assets/workflow.svg)

## Quick Start

### Option 1: Docker Compose (recommended, one command)

```bash
docker compose up -d
# open http://localhost:8000
```

### Option 2: Single-port dev/demo service (no containers)

```bash
cd apps/backend
cp .env.example .env          # adjust secrets as needed
uv sync --group dev --locked  # install dependencies
uv run alembic upgrade head   # initialize the database
uv run python deploy_server.py
# backend API + frontend static assets + uploads, all on http://localhost:8000
```

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19 · TypeScript 5.9 · TanStack Router/Query · Tailwind CSS v4 · pdf.js |
| Backend | FastAPI · SQLAlchemy 2 (async) · Alembic · PostgreSQL 17 / SQLite |
| Security | WebAuthn · TOTP · JWT denylist · bcrypt · CSP headers |
| Quality | pytest (644) · Playwright E2E (66) · ruff · mypy strict · npm audit |

## Testing

```bash
# Backend (unit + migration consistency)
cd apps/backend && uv run pytest

# Frontend (lint + typecheck + unit + build)
cd apps/frontend && npm ci && npm run lint && npm run typecheck && npm test

# E2E (submit → review → accept full journey)
cd apps/frontend && E2E_SPAWN_SERVER=1 npx playwright test
```

## Docs

- [Architecture deep dive](docs/ARCHITECTURE.md) · [Deployment guide](DEPLOY.md)
- [Contributing](CONTRIBUTING.md) · [Code of Conduct](CODE_OF_CONDUCT.md)

## License

[MIT](LICENSE)
