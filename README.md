# ScholarHUB

> An open shelf of papers, books, and datasets.
>
> 面向学生与科研小白的开放学术资源聚合检索站。

## 概述

ScholarHUB 聚合散落在各论文网站、出版社与公开数据平台的可下载资源,按学科与主题归类整理。无需后端,无需登录,GitHub Pages 静态托管。

## 技术栈

- React 18 + TypeScript + Vite 7
- Tailwind CSS 3(自定义衬线主题)
- React Router 6(HashRouter,适配 GitHub Pages)
- Zustand(本地状态)
- lucide-react(线性图标)

## 本地开发

```bash
npm install
npm run dev
```

打开 <http://localhost:5173/scholarHUB/>。

## 构建

```bash
npm run build
```

产物输出至 `dist/`。

## 部署

推送至 `main` 分支后,GitHub Actions 会自动构建并发布至 GitHub Pages。

## 数据维护

所有资源以 TypeScript 文件形式存放在 `src/data/` 目录,新增资源请编辑 `src/data/resources.ts`。

## 许可

本项目采用 MIT 协议发布,资源内容版权由各原作者与发布方所有。
