# Big Walk Price Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add source-bounded English and Spanish `/price` guides for the `big walk price` search term.

**Architecture:** Add `price` to `PageSlug`, then rely on the existing localized dynamic route, metadata, schemas, and `GuidePage` to render the two new MDX articles.

**Tech Stack:** Next.js 16 App Router, TypeScript, next-intl, MDX/gray-matter, Vitest.

## Global Constraints

- Paths: `/en/price` and `/es/price`; do not change navigation or components.
- Use exact approved metadata and direct opening from the design document.
- Include only $19.99 USD, PC/Steam, PS5, Switch 2, Panic Inc., August 4, 2026, regional currencies, full price/no discount, $19.99 historic low, and the absent DLC/pass/demo/subscription facts.
- Never invent a currency conversion, tax-inclusive total, sale amount/date, content length, or future offering; mark them pending.
- Limit the value note to a conditional consideration based on $19.99 and the supplied 93/100 Metascore.
- Body target: 1,050–1,350 words per locale; seven H2 sections; no external URLs; internal review/crossplay/game links.

---

### Task 1: Bilingual price route and guide

**Files:**

- Create: `tests/price.test.tsx`
- Modify: `lib/types.ts`
- Create: `content/en/price.mdx`
- Create: `content/es/price.mdx`

**Interfaces:**

- Consumes: `getPage(locale, slug)`, `GuidePage`, real `generateMetadata`, and `PageSlug`.
- Produces: valid, rendered `price` content in English and Spanish.

- [ ] **Step 1: Write a failing real-content test**

Create `tests/price.test.tsx` using `getPage`, real `generateMetadata`, `GuidePage`, locale providers, and literal expected values. Assert the exact English title, description, direct opening, `$19.99`, `No active discount`, a pending-confirmation label, 7 TOC items, 8 FAQs, 2 status cards, no external URL, and localized review/crossplay/game links. Mirror the same behavior in Spanish with exact metadata and a Unicode-corruption scan.

- [ ] **Step 2: Observe RED**

Run the bundled-node command `vitest run tests/price.test.tsx`. It must fail because `price` is not a valid slug and the MDX files do not exist.

- [ ] **Step 3: Implement the smallest valid page**

Add `'price'` after `'review'` in `pageSlugs`. Create two standard frontmatter documents with score cards for `$19.99 USD` and `No active discount`/`Full Price`, 7 sections for price, platforms, regional pricing, discounts, offerings, conditional value, and FAQ, plus internal `review`, `crossplay`, and `game` links. Use the source boundaries above in every step, FAQ, and paragraph.

- [ ] **Step 4: Observe GREEN**

Run `vitest run tests/price.test.tsx`; both locale tests must pass.

- [ ] **Step 5: Validate and commit**

Run full Vitest, `tsc --noEmit`, `next build`, and `git diff --check`; confirm price MDX has no external URL. Commit only `lib/types.ts`, the two price MDX files, and `tests/price.test.tsx` with `feat: add price guide`.
