# Changelog

本文件记录 ScholarHUB 每个版本值得关注的变更，遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/)
，版本号遵循语义化版本 `主版本.次版本.修订号`（三段都要写全，修订号不得省略）。

版本号的唯一真源是仓库根目录 `VERSION`，必须与
`apps/backend/pyproject.toml`、`apps/frontend/package.json`、`apps/backend/app/__init__.py`
四处完全一致，由 `scripts/check-version.sh` 守门。

## [0.2.1] — 2026-10-18

### Changed

- **许可证由 Apache-2.0 改为 MIT**（`LICENSE` 全文替换，删除 Apache 专用的 `NOTICE`，
  同步更新 `README.md` / `README.zh-CN.md` 徽章、`SUPPORT.md`、`apps/backend/pyproject.toml`
  与官网 `site/` 页脚）。MIT 对商业托管与二次分发更友好。

### Fixed

- 恢复 `.github/workflows/ci.yml` 与 `.github/workflows/deploy-site.yml`：此前两个工作流被误删，
  导致 GitHub 主仓库（badhope，核心仓库）完全失去 CI 门禁。

### Removed

- 删除与 `VERSION` 矛盾的 `v1.0.0` 轻量标签（它实际指向一个 Dependabot 配置提交，
  而当时版本是 0.2.0）。标签一律使用附注标签（`git tag -a`），并与 `VERSION` 三段完全一致。

### Housekeeping

- 明确仓库主从关系：**GitHub/badhope 为核心仓库**，GitCode、Gitee、X33834、Morningstar202604
  均为只读镜像，禁止在镜像上直接提交（此前在镜像上手工提交导致五平台 HEAD 全部分叉）。
- 五平台对齐统一走 `scholarhub-sync-all`（平台间 3 秒间隔，分叉时用 `--force`）。

### Known issues

- 演示视频与官网截图仍为旧版（含历史遗留的大文件），待本轮问题修复完成后统一重新生成并替换。
- 代码审计发现的 P0 级安全问题尚未修复，详见 `scholarhub-代码审计报告.md`。

## [0.2.0] — 2026-09-14

- 部署指南、治理模板、版本守门脚本落地。
- 迁移收敛为单个初始迁移（`3392b958c074_001_initial_schema`）。
- 三平台 CI、依赖锁定、官网中英文切换。

## [0.1.0] — 2026-09-02

- 首个可运行版本：投稿、评审、目录、阅读器主链路。
