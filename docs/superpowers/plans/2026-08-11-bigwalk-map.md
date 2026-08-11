# Big Walk Map Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add source-bounded English and Spanish `/map` guides for the `big walk map` search term.

**Architecture:** Add `map` to `PageSlug`, then use the existing localized dynamic route, content loader, metadata/schema generation, and `GuidePage` to render two MDX documents. No shared component or navigation changes are needed.

**Tech Stack:** Next.js 16 App Router, TypeScript, next-intl, MDX/gray-matter, Vitest.

## Global Constraints

- Routes: `/en/map` and `/es/map`; add no navigation item or shared-component changes.
- Mention MapGenie as the supplied external tool but include no external URL: its exact destination could not be independently validated.
- Cover only the supplied Map Room, top-down interactive-map features, six named regions, static-map limitation, and landmark navigation facts.
- Do not add marker inventory, coordinates, puzzle steps, route details, or map locations not supplied; mark missing facts as pending confirmation.
- Use internal links only: `walkthrough`, `puzzles`, and `game`.
- Body target: 1,050–1,350 words in each locale; 6 H2 sections, 2 status cards, 5 steps, and 8 FAQs.

---

### Task 1: Bilingual map route and guide

**Files:**

- Create: `tests/map.test.tsx`
- Modify: `lib/types.ts`
- Create: `content/en/map.mdx`
- Create: `content/es/map.mdx`

**Interfaces:**

- Consumes: `getPage(locale, slug)`, `GuidePage`, `PageSlug`, and real `generateMetadata`.
- Produces: valid localized `map` MDX rendered by the existing `[locale]/[slug]` route.

- [ ] **Step 1: Write the failing real-content test**

Create `tests/map.test.tsx` following `tests/price.test.tsx`. It must load both locales with `getPage`, call real `generateMetadata`, render `GuidePage` inside `NextIntlClientProvider`, and include `afterEach(cleanup)`.

Use these English assertions:

```ts
const englishTitle = 'Big Walk Map Guide: Map Room & Region Overview';
const englishDescription = 'Big Walk map guide explains how to unlock the Red Tower Map Room, use MapGenie’s top-down tools, and navigate six supplied regions without invented markers.';
expect(page.content).toMatch(/^## In-game map\n\nThe in-game map is obtained in the Red Tower Map Room; MapGenie is the recommended external interactive map\./);
expect(page.frontmatter.toc).toHaveLength(6);
expect(page.frontmatter.faqs).toHaveLength(8);
expect(page.frontmatter.heroCard.statusCards).toHaveLength(2);
expect(page.content).toContain('Map Room');
expect(page.content).toContain('Starting Hub');
expect(page.content).toContain('**Pending confirmation:**');
expect(page.content).not.toMatch(/https?:\/\//);
expect(page.frontmatter.relatedLinks.map((link) => link.slug)).toEqual(['walkthrough', 'puzzles', 'game']);
```

Mirror this in Spanish with exact metadata and direct answer assertions:

```ts
const spanishTitle = 'Guía de Big Walk map: sala de mapas y regiones';
const spanishDescription = 'Big Walk map explica cómo obtener la sala de mapas de Red Tower, usar las herramientas cenitales de MapGenie y orientar seis regiones suministradas.';
expect(page.content).toMatch(/^## Mapa dentro del juego\n\nEl mapa dentro del juego se obtiene en la sala de mapas de Red Tower; MapGenie es el mapa interactivo externo recomendado\./);
```

For each locale assert title lengths 40–60, description lengths 140–160, body count 1,050–1,350, two rendered status cards, expected localized internal links, and a serialized Spanish Unicode scan rejecting Han characters and U+FFFD.

- [ ] **Step 2: Observe RED**

Run:

```powershell
$env:PATH='C:\Users\34420\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;'+$env:PATH
.\node_modules\.bin\vitest.CMD run tests/map.test.tsx
```

Expected: both tests fail with `Unsupported locale or page slug`, because `map` is absent from `pageSlugs` and no MDX files exist.

- [ ] **Step 3: Implement the minimum valid route and content**

Add `'map'` after `'price'` in `lib/types.ts`.

Create MDX documents with the tested metadata and direct-answer opening. Both documents must include frontmatter with six table-of-contents entries, status cards for `Map Room`/`MapGenie`, five source-bounded steps, eight FAQs, and related links to the walkthrough, puzzles, and game pages.

Use these H2 topics:

```md
## In-game map
## External map tool
## Regions on the map
## Navigation tips
## What remains unconfirmed
## Map FAQ
```

State that completing the supplied Red Tower puzzle leads to the Map Room, whose island map is static and does not auto-update exploration. Name only Starting Hub/Tutorial Zone, Red Tower/Drawbridge, Green Tower/Chairlift, Blue Tower/Train tracks, Yellow Tunnel Entrance, and Black Tower/Endgame Area. Describe MapGenie only as a supplied top-down map with zoom, location-name search, and supplied categories for puzzle locations, collectibles, and landmarks. Keep unknown update timing, coordinates, individual markers, and route specifics pending; include no URL.

- [ ] **Step 4: Observe GREEN**

Run the focused command from Step 2. Expected: `tests/map.test.tsx` has two passing tests.

- [ ] **Step 5: Validate and commit**

Run full Vitest, `tsc --noEmit`, `next build`, and `git diff --check`; confirm `rg -n 'https?://' content/en/map.mdx content/es/map.mdx` returns no matches. Commit only task files:

```powershell
git add lib/types.ts content/en/map.mdx content/es/map.mdx tests/map.test.tsx
git commit -m "feat: add map guide"
```
