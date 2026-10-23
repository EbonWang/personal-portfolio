import type { SiteContent } from './types'

export const DEFAULT_CONTENT: SiteContent = {
  posts: [
    {
      slug: 'hello-world',
      title: '你好，世界',
      excerpt: '这是本站的第一篇文章，介绍我为什么开始写博客以及本站的技术选型。',
      date: '2026-10-09T00:00:00.000Z',
      tags: ['随笔'],
      readingTime: 1,
      content:
        '欢迎来到我的博客！\n\n## 为什么写博客\n\n写博客是为了记录学习与思考的过程。把零散的知识整理成文字，既能加深理解，也能帮助到有同样问题的人。\n\n## 本站技术选型\n\n本站使用 **React + TypeScript + Vite + Tailwind CSS** 构建，内容全部由 Markdown 驱动，新增文章只需在后台管理页添加即可自动出现在列表里。\n\n### 代码示例\n\n```ts\nfunction greet(name: string): string {\n  return `你好，${name}`\n}\n\nconsole.log(greet(\'世界\'))\n```\n\n## 后续计划\n\n我会持续分享前端工程化、性能优化与 TypeScript 相关的实践，欢迎关注。',
    },
    {
      slug: 'react-performance',
      title: 'React 性能优化实践',
      excerpt: '从渲染次数、记忆化、代码分割三个角度，梳理 React 应用的常见性能优化手段。',
      date: '2026-09-18T00:00:00.000Z',
      tags: ['react', '性能优化'],
      readingTime: 1,
      content:
        '性能优化是前端工作中绕不开的话题。本文从三个角度梳理 React 应用的常见优化手段。\n\n## 1. 减少不必要的渲染\n\n- 使用 `React.memo` 包裹纯展示组件\n- 稳定 props 的引用（配合 `useCallback` / `useMemo`）\n- 避免在渲染中创建新的对象或数组\n\n```tsx\nconst ExpensiveList = React.memo(function ExpensiveList({ items }: { items: string[] }) {\n  return <ul>{items.map((i) => <li key={i}>{i}</li>)}</ul>\n})\n```\n\n## 2. 记忆化\n\n`useMemo` 适合缓存昂贵的计算结果，`useCallback` 适合稳定回调引用。但要注意**不要过度记忆化**，简单计算反而会带来额外开销。\n\n## 3. 代码分割\n\n页面级代码分割可以显著降低首屏加载体积：\n\n```tsx\nimport { lazy, Suspense } from \'react\'\n\nconst Detail = lazy(() => import(\'./Detail\'))\n\nexport function App() {\n  return (\n    <Suspense fallback={<div>加载中…</div>}>\n      <Detail />\n    </Suspense>\n  )\n}\n```\n\n## 小结\n\n优化的前提是**测量**。先用 React DevTools Profiler 定位瓶颈，再针对性地优化，避免过早优化。',
    },
    {
      slug: 'typescript-tips',
      title: 'TypeScript 实用技巧',
      excerpt: '分享几个能提升日常开发效率的 TypeScript 类型技巧，包括工具类型与类型收窄。',
      date: '2026-08-25T00:00:00.000Z',
      tags: ['typescript'],
      readingTime: 1,
      content:
        'TypeScript 的类型系统非常强大，掌握一些实用技巧能显著提升开发体验。\n\n## 常用工具类型\n\n| 类型 | 作用 |\n|---|---|\n| `Partial<T>` | 所有属性变为可选 |\n| `Pick<T, K>` | 挑选部分属性 |\n| `Omit<T, K>` | 排除部分属性 |\n| `ReturnType<T>` | 获取函数返回类型 |\n\n## 类型收窄\n\n通过 `typeof` 或 `in` 关键字可以安全地收窄联合类型：\n\n```ts\ntype Shape =\n  | { kind: \'circle\'; radius: number }\n  | { kind: \'square\'; side: number }\n\nfunction area(s: Shape): number {\n  switch (s.kind) {\n    case \'circle\':\n      return Math.PI * s.radius ** 2\n    case \'square\':\n      return s.side ** 2\n  }\n}\n```\n\n## 小结\n\n善用类型系统可以让代码在编译期就规避大量潜在错误。保持类型定义集中在 `types/` 目录，也能让项目结构更清晰。',
    },
  ],
  projects: [
    {
      slug: 'portfolio-site',
      title: '个人作品集网站',
      summary: '使用 React + TypeScript + Vite 构建的个人作品集网站，含星空背景与 Markdown 驱动的内容。',
      cover: '/covers/portfolio.svg',
      tags: ['react', 'typescript', 'tailwind'],
      links: { demo: 'https://example.com', github: 'https://github.com/yourname/portfolio' },
      featured: true,
      date: '2026-10-01T00:00:00.000Z',
      content:
        '这是一个个人作品集网站，集成了个人介绍、技能展示、项目展示与博客四大模块。\n\n## 功能亮点\n\n- **星空背景**：Canvas 2D 自实现，支持 `prefers-reduced-motion`\n- **Markdown 驱动**：项目与博客内容全部来自 Markdown，新增内容无需改代码\n- **响应式**：移动端单列、平板两列、桌面三列自适应\n- **无障碍**：键盘可导航、对比度达 AA\n\n## 技术栈\n\nReact 18、TypeScript、Vite、Tailwind CSS、React Router、react-markdown。\n\n## 实现细节\n\n内容加载使用统一的 API 层读取，配合 markdown 解析，按日期倒序排序后由页面组件直接消费。',
    },
    {
      slug: 'ecommerce-dashboard',
      title: '电商后台管理系统',
      summary: '面向中小电商的后台管理系统，包含商品、订单、库存与数据看板等模块。',
      cover: '/covers/dashboard.svg',
      tags: ['react', 'node', 'postgresql'],
      links: { demo: 'https://example.com', github: 'https://github.com/yourname/dashboard' },
      featured: true,
      date: '2026-06-12T00:00:00.000Z',
      content:
        '一个面向中小电商的后台管理系统，提供商品管理、订单处理、库存预警与数据看板等功能。\n\n## 核心功能\n\n- 商品管理：SKU、分类、上下架\n- 订单处理：状态流转、批量操作\n- 数据看板：销售额、订单量趋势图表\n- 权限控制：基于角色的访问控制\n\n## 技术栈\n\n前端 React + TypeScript + Tailwind CSS，后端 Node.js，数据库 PostgreSQL，缓存 Redis。\n\n## 成果\n\n- 支撑日均 1w+ 订单处理\n- 首屏加载耗时降低约 40%',
    },
    {
      slug: 'cli-tool',
      title: '命令行脚手架工具',
      summary: '一个快速初始化前端项目的 CLI 工具，支持模板选择与交互式问答。',
      cover: '/covers/cli.svg',
      tags: ['node', 'cli', 'typescript'],
      links: { github: 'https://github.com/yourname/cli' },
      featured: false,
      date: '2026-03-05T00:00:00.000Z',
      content:
        '一个用于快速初始化前端项目的命令行脚手架工具，通过交互式问答生成项目模板。\n\n## 特性\n\n- 交互式问答选择技术栈与配置\n- 内置多套项目模板\n- 支持自定义模板仓库\n\n## 使用方式\n\n```bash\nnpm install -g my-cli\nmy-cli create my-app\n```\n\n## 技术栈\n\nNode.js、TypeScript、commander、inquirer。',
    },
  ],
  skills: [
    { category: '前端', name: 'React', level: 5, icon: '⚛️', years: 5 },
    { category: '前端', name: 'TypeScript', level: 5, icon: '🟦', years: 5 },
    { category: '前端', name: 'Vue', level: 4, icon: '🟩', years: 4 },
    { category: '前端', name: 'Tailwind CSS', level: 5, icon: '🌊', years: 4 },
    { category: '后端', name: 'Node.js', level: 4, icon: '🟢', years: 4 },
    { category: '后端', name: 'Python', level: 3, icon: '🐍', years: 3 },
    { category: '后端', name: 'Go', level: 2, icon: '🐹', years: 1 },
    { category: '工程化', name: 'Vite', level: 5, icon: '⚡', years: 4 },
    { category: '工程化', name: 'Webpack', level: 4, icon: '📦', years: 4 },
    { category: '工程化', name: 'Docker', level: 3, icon: '🐳', years: 2 },
    { category: '工程化', name: 'Git', level: 5, icon: '🔀', years: 6 },
    { category: '数据库', name: 'PostgreSQL', level: 3, icon: '🐘', years: 3 },
    { category: '数据库', name: 'Redis', level: 3, icon: '🗄️', years: 2 },
  ],
  profile: {
    name: '张三',
    title: '全栈开发工程师',
    tagline: '用代码构建优雅、高性能的 Web 体验。',
    avatar: '/avatar.svg',
    email: 'hello@example.com',
    location: '中国 · 上海',
    resume: '/resume.pdf',
    bio: '热爱开源与前端工程化，专注于 React / TypeScript 技术栈，拥有从 0 到 1 搭建产品的经验。关注性能优化、无障碍与良好的代码设计。',
    timeline: [
      {
        period: '2023 - 至今',
        role: '高级前端工程师',
        org: '某某科技',
        description: '负责核心产品前端架构与性能优化，推动组件库与工程化建设。',
      },
      {
        period: '2021 - 2023',
        role: '前端工程师',
        org: '某互联网公司',
        description: '参与多个中后台系统开发，主导微前端方案落地。',
      },
      {
        period: '2019 - 2021',
        role: '初级开发工程师',
        org: '某创业公司',
        description: '独立负责官网与活动页开发，积累全栈实践经验。',
      },
    ],
    education: [
      {
        period: '2015 - 2019',
        school: '某大学',
        degree: '计算机科学与技术 · 本科',
        description: '主修数据结构、操作系统、计算机网络等课程。',
      },
    ],
  },
  socials: [
    { label: 'GitHub', url: 'https://github.com/yourname', icon: 'github' },
    { label: '掘金', url: 'https://juejin.cn/user/xxx', icon: 'blog' },
    { label: '邮箱', url: 'mailto:hello@example.com', icon: 'mail' },
  ],
  settings: {
    siteName: '个人作品集',
    siteDescription: '个人介绍、技能展示、项目展示与博客',
  },
}
