# Task 6 Report: Guide page templates

## Status

DONE_WITH_CONCERNS

## Commit

`HEAD` — `feat: add guide page templates`

## Files changed

- `app/[locale]/[slug]/page.tsx`
- `components/SidebarNav.tsx`
- `components/ContentTable.tsx`
- `components/StepGuide.tsx`
- `components/RuleSection.tsx`
- `components/Faq.tsx`
- `components/EvidenceQuote.tsx`
- `components/GuidePage.tsx`
- `tests/guide-page.test.tsx`

## Verification

- `node_modules\\.bin\\vitest.CMD run tests/guide-page.test.tsx` — passed: 1 test.
- `node_modules\\.bin\\vitest.CMD run` — passed: 6 files, 10 tests.
- `node_modules\\.bin\\tsc.CMD --noEmit` — passed.
- `node_modules\\.bin\\next.CMD build` — blocked before application compilation by the existing `next/font/google` Inter request in `app/[locale]/layout.tsx`; the offline environment cannot reach `fonts.googleapis.com`.

## Self-review

The article route validates locale and supported non-home slugs, turns absent MDX documents into 404s, and uses `GuidePage`. The responsive template composes all shell elements, native FAQ disclosures, sticky navigation, anchors, numbered steps, table, rules, and evidence quote primitives.

## Open concerns

The provided content directory currently contains only home MDX files, so real article route rendering returns 404 until later content tasks add article documents. The production build remains environment-blocked by the pre-existing remote Inter font import.
