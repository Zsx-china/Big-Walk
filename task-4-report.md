# Task 4 report: shared wiki shell

## Delivered

- Added `lib/links.ts` with the `OFFICIAL_LINKS` allow-list and locale-aware `localizeHref` helper.
- Added Header, Footer, LanguageSelector, Breadcrumbs, and BottomCta components.
- Header supplies desktop and accessible `<details>` mobile navigation, a visible WIKI badge, locale links, and official Steam CTA.
- Footer includes the independent-fan-site disclaimer, exactly seven official destinations, localized internal legal/about links, and copyright.
- Added component coverage for navigation/Steam CTA, official footer-link count, and the current breadcrumb’s non-link rendering.

## Verification

Executed with `C:\Users\34420\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin` first in `PATH`:

- `node_modules/.bin/vitest.cmd run` — 4 files, 8 tests passed.
- `node node_modules/next/dist/bin/next build` — production build completed successfully.

## Commit

`feat: add shared wiki shell`
