# ScholarHUB

> **学术资源聚合与检索** — 我自己的论文 / 教材 / 课程笔记目录。
> 当前还在搭骨架,**功能还没接上**;先把这 README 留着,
> 给自己一个待办锚点。

不是"下一个 Z-Library",也不是"AI 论文总结器"。我只是想有个地方
能把散落在硬盘各处的 PDF + 笔记 + 引用整在一起,搜索起来别那么
难受。

---

## 计划做但还没做的

- [ ] 文献元信息入库 (DOI / 标题 / 作者 / 会议或期刊 / 年份 / 标签)
- [ ] 全文搜索 (PDF 提取 + SQLite FTS5)
- [ ] 引用导出 (BibTeX / RIS / APA)
- [ ] 笔记侧栏 (markdown, 跟 PDF 页码挂钩)
- [ ] 多设备同步 (WebDAV 之类,先自托管)

## 不打算做的

- AI 总结 — 我读论文不是为了被总结
- 全文下载 — 出版商有权利,我尊重
- 评论 / 评分 — 一个人维护的目录,评分没意义
- 公开检索 — 不打算做 Z-Library 的替代品

## 技术栈 (暂定)

- 前端:Next.js 15 (App Router) + TypeScript
- 后端:同构 API route,SQLite (本地) → Postgres (生产)
- PDF 渲染:PDF.js
- 全文搜索:SQLite FTS5 (本地) / Meilisearch (可选)

## 本地开发

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 生产构建
```

## 许可

[MIT](LICENSE)
