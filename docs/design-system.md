# Big Walk Wiki 2.0 — Design System

> Frozen at **v1.1** (2026-08-13). This document is the single source of truth
> for design decisions. Component development must follow these rules; any new
> visual pattern must be added here before it is used in code.
>
> Change process: propose a change, bump the version (v1.0 → v1.1), update this
> document and the token layer together. Never introduce ad-hoc rules in
> components.

---

## 1. Color Tokens

Two layers: **raw palette** (frozen values) → **semantic tokens** (the only API
components may use).

### Raw palette (frozen values)

| 色组 | 值 |
| --- | --- |
| Night | `#0A110D`（deep）· `#0C1310` · `#101915` · `#16221C` · `#1D2B23`（4） |
| Paper | `#F5F2E9` / `#EEEADF` / `#E7E2D5` |
| Ink / Moss / Line | `#1A211C` / `#5C6E63` / `#DCD6C8` |
| Sage / Mist | `#829A8F` / `#ADBFB6` |
| Ember | `#F0641F` / `#C94E14` / `#B0430F`（text-on-light）|
| Fern / Gold / Sky / Violet / Slate | `#3E8A63` / `#D9A441` / `#4F8DB7` / `#7C6FB0` / `#6E86A0` |
| White | `#FFFFFF` |

### Semantic tokens (component API)

| 语义 | 令牌 | 映射 | 用途规则 |
| --- | --- | --- | --- |
| Background | `--bg-dark` / `--bg-dark-2` | Night / Night-2 | Hero、页脚、深色区块 |
| Background | `--bg-light` / `--bg-light-2` / `--bg-light-3` | Paper / Paper-2 / Paper-3 | 正文区、交替区块 |
| Surface | `--surface-light` | White | 浅底卡片 |
| Surface | `--surface-dark` / `--surface-dark-2` | Night-2 / Night-3 | 深底卡片、信息卡 |
| Primary | `--primary` / `--primary-strong` / `--primary-text` | Ember / Ember-deep / Ember-text | 仅 CTA、路线线、激活态、小面积强调；浅色面上的小字文本用 `--primary-text` |
| Accent | `--accent-fern/gold/sky/violet/slate` | 分类色板 | 仅作标记（blaze、chip、分类色） |
| Text | `--text-dark` / `--text-dark-muted` / `--text-dark-muted-2` | White / Sage / Mist | 深底文字 |
| Text | `--text-light` / `--text-light-muted` | Ink / Moss | 浅底文字 |
| Border | `--border-dark` | Night-line | 深底描边 |
| Border | `--border-light` | Line | 浅底描边 |

### Visual asset tokens（非颜色令牌）

| 令牌 | 类型 | 用途 |
| --- | --- | --- |
| `--glow-ember` | 光晕色（rgba） | 深色面上的 ember 径向辉光（Hero、CTA） |
| `--texture-grain` | **visual asset token**（data-URI SVG 噪点） | 胶片颗粒覆盖层——不是颜色令牌，组件只引用该变量 |

### Rules

- 正文对比度 ≥ 4.5:1（WCAG AA）。
- `--primary` 不得用于大段文字；只用于 CTA、路线、激活态与小型强调。
- 分类强调色只出现在标记元素（blaze / chip / 分类标签），不作文本色。
- 板块颜色是数据（`lib/site.ts`），通过 `var(--accent-*)` 引用，单一来源。
- 装饰性 SVG 图形（如路线图）允许保留数据色值，不视为组件规则。

## 2. Typography System

### Font roles

| 角色 | 字体 | 来源 | 用途 |
| --- | --- | --- | --- |
| Display | Clash Display | 自托管 WOFF2（ITF Free Font License） | H1–H3、Hero、卡片标题、统计数字 |
| Body | Schibsted Grotesk | Google Fonts（OFL，`next/font` 构建时自托管） | 正文、UI、按钮 |
| Mono | Space Mono | Google Fonts（OFL，同上） | eyebrow、waypoint、元数据、数据、chip |
| CJK 后备 | PingFang SC / Microsoft YaHei / Noto Sans SC | 系统字体 | 未来中文内容（本期不启用） |

### Scale (frozen)

| 令牌 | 值 | 行高 | 用途 |
| --- | --- | --- | --- |
| `--text-xs` | 0.75rem | 1.4 | 仅 mono 标签 |
| `--text-sm` | 0.875rem | 1.5 | 次要 UI |
| `--text-base` | 1.0625rem | 1.7 | 正文 |
| `--text-lg` | 1.25rem | 1.6 | 导语 |
| `--text-xl` | 1.5rem | 1.3 | 卡片标题 |
| `--text-2xl` | clamp(1.6rem, 3vw, 2rem) | 1.2 | H2 |
| `--text-3xl` | clamp(1.9rem, 4vw, 2.5rem) | 1.1 | 页面标题 |
| `--text-hero` | clamp(2.6rem, 6.6vw, 4.9rem) | 0.98 | Hero |

### Weight rules

- Display：600 默认、700 强调；不使用 400/500。
- Body：400 默认、500 导航、600 按钮/强调（正文 strong 用 600）。
- Mono：400 默认、700 标签与数字。
- 字距：Display `-0.015em`；Mono 大写标签 `+0.1–0.14em`；正文 0。

## 3. Spacing System

- 基准单位 **4px**；`--sp-1..9` = 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96。
- 区块纵向节奏 `--section-y: clamp(4.5rem, 9vw, 7rem)`（所有 section 统一）。
- 容器：`--shell: 1180px`；`--shell-narrow: 780px`（文章）；内边距 `clamp(1.25rem, 4vw, 2.5rem)`。
- 组件默认间距（登记）：卡片内边距 24px；按钮 13px / 24px；chip 5px / 10px；区块标题与内容间距 48px。
- 规则：组件内禁止任意数值间距，一律使用令牌。

## 4. Radius System

| 令牌 | 值 | 用途 |
| --- | --- | --- |
| `--radius-sm` | 8px | 内嵌元素（callout、related） |
| `--radius` | 14px | 卡片、FAQ、面板 |
| `--radius-lg` | 20px | 大型面板 |
| `--radius-pill` | 999px | 按钮、chip、导航项、waypoint 标签 |
| Blaze 菱形 | 固定 2px | 标记元素专用 |

规则：圆角随表面尺寸取档，控制类用 pill，卡片类用 14px，内嵌类用 8px。

## 5. Shadow System

| 令牌 | 值 | 用途 |
| --- | --- | --- |
| `--shadow-card` | `0 1px 2px rgba(26,33,28,.05), 0 10px 30px -18px rgba(26,33,28,.28)` | 浅底卡片静止 |
| `--shadow-card-hover` | `0 24px 48px -22px rgba(26,33,28,.35)` | 卡片悬浮 |
| `--shadow-dark` | `0 18px 50px -24px rgba(0,0,0,.65)` | 深色面板/信息卡 |
| `--shadow-cta` | `0 10px 26px -12px rgba(240,100,31,.65)` | 主按钮（hover 加深） |

规则：阴影只用于浅色表面；深色表面用描边；卡片仅两档（静止/悬浮）；禁止任意阴影值。

## 6. Motion Rules

### Duration

| 令牌 | 值 | 用途 |
| --- | --- | --- |
| `--dur-fast` | 160ms | hover / active |
| `--dur` | 360ms | 标准过渡（保留 token，供状态类过渡使用） |
| `--dur-slow` | 700ms | 滚动显现 |
| `--dur-hero` | 900ms | Hero 开场序列总预算 |

缓动统一 `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`，全站唯一。

### Motion inventory (frozen)

- Hero 载入上升：0.9s，错峰 0.1 / 0.22 / 0.34 / 0.46s。
- Hero 标题下划线描绘：1.4s。
- 路线虚线流动：26s 环境循环（静态装饰，不传达状态）。
- 滚动显现：IntersectionObserver + `.is-visible`，`--dur-slow`，位移 12px。
- 卡片悬浮、按钮反馈、手风琴、进度条：`--dur-fast`。

### Hero entrance choreography (v1.1)

- **内容优先**：H1 与 eyebrow 无入场动画（首绘即见）；副标题/按钮/统计条 300ms 快显（0–0.18s 错峰）。
- 场景层在文字之后：天幕 450ms → 山脊 900ms（`--dur-hero`）→ 辉光 500ms → 颗粒 300ms。
- 场景层纯装饰：`pointer-events: none`、`contain: layout style`、不参与布局。
- 全部动画为纯 CSS keyframes（仅 opacity/transform）；`prefers-reduced-motion` 全局降级。

### Tiered scene system (v1.1)

| 区域 | 场景层 | 边界 |
| --- | --- | --- |
| Hero | 完整 Scene（NightSky + Contours + TerrainRidge + GrainTexture + 辉光） | 仅首页 |
| PageHero | 板块辉光（`--page-glow`，由 `color` prop 注入）+ Contours | 不复制天空/山脊/颗粒 |
| CTA Band | 单个 ember 辉光（低幅 4s 呼吸）+ Contours（低透明度） | 无营销闪烁感 |
| Footer | Contours 饰带（低透明度）+ ember 细线 | 低存在感收尾 |

规则：PageHero 的 `color` prop 只用于注入 `--page-glow` CSS 变量，不扩展视觉
配置系统；不再新增 token；场景层均 `pointer-events: none`。

动效收敛（v1.2）：CTA 呼吸幅度固定为 opacity 0.7–1；滚动显现位移 12px；无新增
动画类型，全部动画仅使用 opacity/transform（路线虚线为既有 paint 动画）。

### Surface polish rules (v1.1)

- **Card 切角**：右上 12px 斜切（paper-2 色调），静态、无 hover 变化；不做
  卡牌化边框/描金。
- **waypoint 菱形**：StepList 数字点与 TOC 激活标记统一使用菱形（blaze
  语言）；Step 顺序语义由列表承载，不加数字。
- **Callout 图标位**：类型色 blaze 菱形 + mono 标签（INFO/TIP/WATCH/STOP），
  不使用 emoji。
- **InfoCard 纹理**：头部右侧单条极淡 contour 弧线（opacity ≤0.3），信息行
  不加任何装饰。
- **TOC 路线轨**：虚线竖轨 + 每项菱形标记，激活项菱形 ember 填充；沿用现有
  IntersectionObserver 激活状态，不引入新 scroll spy。

### Rules

- 动效只用于传达（加载 / 反馈 / 氛围）。
- 无滚动劫持、无视差、无页面级大动效。
- 错峰仅限 Hero。
- `prefers-reduced-motion`：全局降级为 0.01ms。

## 7. Component Naming Convention

- 文件：PascalCase 单文件单组件，默认导出；仅交互必需时加 `"use client"`。
- 类名：kebab-case + BEM 风格：块 `__元素`、修饰 `--变体`（`.site-header__inner`、`.btn--primary`）。
- 样式引用：只允许设计令牌；动态数据经 CSS 变量传入（如 `--blaze-color`），不直接写 hex。
- 分层：`components/` 只做展示（数据由页面层传入）；`lib/` 只做逻辑。
- 新增视觉模式必须先入设计系统（token 或组件），禁止组件内临时规则。

## 8. CSS Architecture

- 单一全局样式表 `src/app/globals.css`（Phase 1 不使用 Tailwind / CSS Modules / styled-components）。
- 文件结构固定：Tokens → Reset/Base → Layout → Typography → 组件 → 动效 → 响应式。
- 选择器纪律：只用类选择器，扁平层级，不用元素+类组合，不用 `!important`；状态用修饰类（`.is-visible`、`[data-open]`）。
- 响应式媒体查询集中在文件尾部。
- 主题：Phase 1 无暗色开关；混合主题固定（深色 chrome + 浅色内容）。

## 9. Responsive Breakpoints (frozen)

| 断点 | 范围 | 行为 |
| --- | --- | --- |
| Desktop | ≥ 1024px | 完整布局：多列网格、右侧目录栏、桌面导航 |
| Tablet | 721px – 1023px | 两列降级：目录栏收为顶部区块、卡片两列、Hero 单列 |
| Mobile | ≤ 720px | 单列：汉堡导航、全单列网格、统计条纵向堆叠 |

媒体查询统一写在 `globals.css` 尾部，先 `max-width: 1024px` 再 `max-width: 720px`。

## 10. Component Inventory (Phase 1)

布局：`SiteHeader`、`SiteFooter`、`Breadcrumbs`、`PageHero`
Hero：`Hero`、`RouteMap`、`Contours`
Scene（装饰层）：`NightSky`、`TerrainRidge`、`GrainTexture`

品牌符号：全站唯一品牌符号为 ember blaze waypoint（`icon.svg` 与
`apple-icon.tsx` 同源）；不重新设计 Logo，新品牌资产必须复用该符号。
UI：`SectionHeading`、`CategoryCard`、`ArticleCard`、`InfoCard`、`TableOfContents`、`FAQList`、`RelatedLinks`、`Callout`、`StepList`、`Reveal`、`Button(chip 样式按钮用 .btn 类)`
MDX：`mdx-components`（Callout / StepList / Step / table）

交互组件（`"use client"`）：`SiteHeader`（移动菜单）、`TableOfContents`（滚动监听）、`Reveal`（滚动显现）。
