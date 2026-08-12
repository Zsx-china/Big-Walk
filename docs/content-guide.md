# Big Walk Wiki — Content Guide

> How content is authored, marked and linked. Every MDX page must follow
> this guide; audits (Step 6) check it mechanically.

## 1. Where content lives

- Content root: `content/en/` (one directory per section).
- Section keys: `start-here`, `guides`, `database`, `faq`.
- `tools` is code-driven (`src/lib/tools.ts`); `about` is a static page.
- The FAQ lives at `content/en/faq/faq.mdx` and renders at `/faq` only —
  there is no `/faq/faq` route.

## 2. Frontmatter schema

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `title` | string | ✓ | Page H1, metadata, cards |
| `summary` | string | ✓ | One or two sentences; metadata description |
| `section` | string | ✓ | Must match its parent directory |
| `category` | string | database only | Sub-index: Classes / Items / Mechanics / Locations / Systems |
| `updated` | date `YYYY-MM-DD` | ✓ | Bump when content changes |
| `readTime` | number | ✓ | Editorial estimate, minutes |
| `order` | number | ✓ | Sort within section (ascending) |
| `featured` | boolean | opt | Exactly 3 pages site-wide (homepage trio) |
| `draft` | boolean | opt | `true` excludes the page from routes and sitemap |
| `confidence` | enum | ✓ | See section 3 |
| `tags` | string[] | ✓ | SEO keywords |
| `info` | map | opt | Information-card rows (`key: "value"`) |
| `faq` | array | opt | `{ q, a }` — rendered as accordion + FAQ JSON-LD |
| `related` | string[] | ✓ | `section/slug` references; broken refs are dropped |

## 3. Confidence rules

One value per page; it must genuinely reflect the page's dominant nature:

| Value | Meaning | When to use |
| --- | --- | --- |
| `verified` | Official facts or confirmed by multiple reliable sources / in-game | Pages whose core claims are confirmed |
| `community-reported` | Community consensus, not officially confirmed | Advice, emergent findings, unconfirmed quantities |
| `needs-testing` | Single or unverified reports | Pages that are largely unconfirmed |

Rules:

- Never downgrade a `verified` page to make it look better — and never mark
  unverified detail as verified.
- Unverified details inside a verified page must be explicitly labelled
  (e.g. "community estimate", "needs testing" callout) or removed.
- Info-card rows follow the same rule: no invented numbers. Use honest
  placeholders like "Not yet tracked" instead of plausible guesses.
- `faq` answers: only state verified facts; label community nuance inline.

## 4. Internal links

- Use absolute paths: `/section/slug` (articles) or `/section` (indexes).
- `related` frontmatter must reference existing `section/slug` pairs.
- No trailing slashes, no `.mdx`.
- The content audit script checks both `related` refs and in-body markdown
  links (`work/scripts/audit-content.mjs`).

## 5. Content quality rules

- **No fabricated data.** Stats, quantities and sources must be real and
  ideally traceable (see `src/lib/game-data.ts` for display stats).
- Keep MVP scope: Phase 1 has ~13 sample pages. Add pages deliberately, not
  for scale.
- Editorial estimates are fine when clearly marked (`~`, "estimate").
- Bump `updated` whenever the page changes.

## 6. i18n & hreflang

- Phase 1 is English-only: `<html lang="en">`, no `hreflang` alternates are
  emitted, and no fake language URLs are generated.
- Future locales: add `content/<locale>/`, extend `lib/i18n.ts` with a new
  locale key, and only then emit `alternates.languages` (hreflang) pointing
  at real translated pages.
