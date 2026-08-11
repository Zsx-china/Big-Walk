# Tasks 9–10 report

Implemented SEO and project-finishing work:

- Added typed BreadcrumbList, FAQPage, and HowTo schema builders plus an XSS-safe JSON-LD component.
- Added frontmatter-backed metadata and locale-aware canonical paths to locale home and guide routes.
- Rendered breadcrumb structured data on content pages and conditional FAQ/HowTo structured data on guides.
- Replaced `next/font/google` with an offline-safe local/system font stack that preserves 400–700 weights.
- Added schema tests, beginner README, and the `tsconfig.tsbuildinfo` ignore rule.
- Added the original `public/images/bigwalk-hero.png` asset to version control.

Verification (using local binaries and the bundled Node runtime):

- `node_modules/.bin/vitest run` — 8 files, 38 tests passed.
- `node_modules/.bin/tsc --noEmit` — passed.
- `node_modules/.bin/next build` — passed offline.
