# Big Walk Wiki 2.0

Big Walk 的非官方（fan-made）知识中心——面向 House House 的合作步行对话冒险游戏 *Big Walk*。本站是粉丝项目，与 House House / Panic 无任何从属关系。

## 技术栈

- Next.js 15（App Router）+ TypeScript，全静态生成（SSG）
- MDX 内容（`next-mdx-remote`）+ gray-matter 前置元数据
- 手写 CSS Design Tokens（无 Tailwind），自托管字体
- SEO：逐页 metadata、sitemap、robots、Open Graph、JSON-LD

## 快速开始

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # 生产构建
pnpm start      # 运行生产构建
pnpm typecheck  # 类型检查
```

## 目录结构

```text
content/en/            # 英文内容（MDX），i18n 就绪
src/app/               # 路由：首页、[section]、[section]/[slug]、about
src/components/        # 展示组件（设计系统）
src/lib/               # site 配置、内容加载器、MDX 编译、UI 文案字典
docs/design-system.md  # 设计系统（冻结 v1.1）
public/fonts/          # 自托管字体（含许可文件）
```

## Design System

设计规则已冻结于 **[docs/design-system.md](docs/design-system.md)**（v1.0）：
Color Tokens（双层：原始色板 + 语义令牌）、Typography、Spacing、Radius、
Shadow、Motion、组件命名规范、CSS 架构与响应式断点。

**组件开发规则**：只允许使用语义令牌（`--bg-*` / `--surface-*` / `--text-*` /
`--border-*` / `--primary` / `--accent-*`）；禁止在组件内引入临时设计规则；
任何新视觉模式必须先入设计系统文档。

## 内容新增指南

完整规范见 **[docs/content-guide.md](docs/content-guide.md)**：frontmatter
schema、置信度规则（verified / community-reported / needs-testing）、内链
约定与内容质量铁律（禁止虚构数据）。正文可使用 MDX 组件：`<Callout>`、
`<StepList>`、`<Step>`、Markdown 表格；构建后 sitemap / 导航 / 相关链接自动
收录，无需改代码。

## 字体许可

- Clash Display：ITF Free Font License（免费个人与商用，允许自托管），许可文件见 `public/fonts/`。
- Schibsted Grotesk / Space Mono：SIL Open Font License 1.1（Google Fonts，`next/font` 构建时自托管）。

## 免责声明

Fan-made knowledge hub. 与 House House / Panic 无关联，未获其背书。Big Walk
为版权所有者的商标，本站仅用于玩家互助。
