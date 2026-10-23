# 个人作品集网站

一个使用 **React + TypeScript + Vite + Tailwind CSS** 构建的个人展示网站，包含个人介绍、技能展示、项目展示、博客四大模块，以及独立的后台管理页面。

## 功能特性

- **星空背景**：Canvas 2D 自实现，支持流星与视差效果，尊重 `prefers-reduced-motion`
- **Markdown 驱动**：博客与项目内容全部来自 Markdown，支持代码高亮、表格与 GFM
- **后台管理**：`/admin` 独立后台，可管理个人信息、技能、项目、博客与站点设置
- **响应式**：移动端单列、平板两列、桌面三列自适应
- **无障碍**：键盘可导航、对比度达 AA

## 技术栈

- React 18、TypeScript、Vite、Tailwind CSS
- React Router、react-markdown、highlight.js、lucide-react

## 本地开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
npm run preview
```

## 后台管理

访问 `/admin`，默认账号 `admin`，密码 `admin123`。

## 目录结构

```
src/
├── admin/        # 后台管理页面
├── components/   # 通用组件
├── layouts/      # 布局
├── lib/          # 数据层、类型、工具
└── pages/        # 前台页面
```
