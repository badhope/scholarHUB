# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-06-11

### Changed (visual & UX audit)

- 首页精选资源改为横向滚动列(原 2 列网格 + 半空行),符合"期刊"风格。
- 首页 Hero 搜索框描边由 2px 改为 1px,与全站 1px 描边体系一致。
- 首页顶部 publication 刊号 / 底部三列介绍字号分别调整为 12px / 16px。
- 详情页操作区按规范调整为 4 个等宽按钮:`Download` / `View DOI` / `Copy Cite` / `Save`,移除冗余的 `Source`,DOI 与外部链接缺一不可时回退到 `View Source`,并提供"Also: hostname" 次要链接。
- 详情页摘要区去除多余的 `border-t hairline` 分割线。
- 设置页选中指示由 4×20px 竖条改为 28×1.5px 短横线,符合"1.5px 墨绿短线"规范。
- 资源卡片收藏按钮加大点击区至 32×32px;收藏夹页移除按钮同步加大。
- 页脚版权字号由 10px 调整为 12px,提升可读性。
- 学科导航卡片的序号字号、留白微调,断点下字号自适应。
- 顶部搜索框的 `Enter` 提示替换为 `/` 键位标识。
- 学科卡片与详情页摘要 / 预览按钮增加 `aria-expanded` / `aria-pressed`,无障碍性更佳。

## [1.0.0] - 2026-06-11

### Added

- 站点首页、资源列表、资源详情、学科分类、搜索、收藏、设置、关于 8 个页面。
- 8 个真实种子资源,覆盖 6 个一级学科与 4 种资源类型。
- 资源卡片上的 2 行摘要预览、标签、下载 / 跳转操作。
- 详情页的可折叠摘要全文、四种引用格式一键复制(APA / MLA / GB/T 7714 / BibTeX)、相关推荐。
- 主题(浅色 / 深色 / 跟随系统)、动效(完整 / 减弱 / 关闭)、字号(标准 / 加大)三组偏好设置,持久化到 LocalStorage。
- 收藏夹页,支持导出 JSON 与清空。
- GitHub Actions:CI(Lint + Build)与 Deploy to GitHub Pages。
