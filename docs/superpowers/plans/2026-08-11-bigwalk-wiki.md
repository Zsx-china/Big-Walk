# Big Walk Wiki Overview Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add localized `/wiki` overview pages that give players a fact-bounded, source-aware introduction to Big Walk and its official resources.

**Architecture:** Extend the existing content-driven guide system with one valid `wiki` page slug and two MDX documents. The existing localized dynamic route and `GuidePage` renderer will supply the layout, metadata, navigation, FAQ, steps, structured data, and internal links; no new route component, shared UI component, or dependency is needed.

**Tech Stack:** Next.js 16 App Router, TypeScript, React, MDX frontmatter/content loader, next-intl locale routing, Vitest, Tailwind CSS.

## Global Constraints

- Retain `/about` as the independent fan-site/legal page; do not repurpose it for the Wiki overview.
- Add only the two new localized paths: `/en/wiki` and `/es/wiki`.
- English title must be `Big Walk Wiki: Game Overview and Official Resources` (51 characters); Spanish title must contain `Big Walk wiki` and remain 40–60 characters.
- English and Spanish meta descriptions must include `Big Walk wiki` and contain 140–160 characters.
- Lead immediately with the localized direct answer: Big Walk is a House House-developed 2–12 player cooperative adventure released August 4, 2026.
- Include only the provided confirmed facts; label the engine, studio size, sales figure, and Twitter/X status as pending confirmation. Do not invent engine, headcount, sales figures, NPCs, future platforms, or release facts.
- Include exactly these five external destination URLs in each article: `https://bigwalk.game/`, `https://bigwalk.game/faq/`, `https://bigwalk.game/eula/`, `https://bigwalk.game/presskit/`, and `https://www.youtube.com/@HouseHouseGames`.
- Use only valid internal slugs (`game`, `crossplay`, `beginner-tips`) for related links; preserve the current design system, existing pages, user-untracked files, and dependencies.
- All Node-based checks must prepend `C:\Users\34420\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin` to `PATH`.

---

### Task 1: Prove the localized Wiki guide contract

**Files:**
- Create: `tests/wiki.test.tsx`
- Read: `tests/requirements.test.tsx`, `tests/map.test.tsx`, `lib/content.ts`, `lib/types.ts`

**Interfaces:**
- Consumes: `loadPage(locale, slug)` and `GuidePage({locale, slug})` from the existing content/rendering system.
- Produces: a regression contract for the `wiki` slug before its content and type support exist.

- [ ] **Step 1: Write the failing test**

```tsx
describe.each(['en', 'es'] as const)('%s wiki guide', (locale) => {
  it('loads the localized metadata, direct answer, and required fact boundaries', () => {
    const page = loadPage(locale, 'wiki');

    expect(page.frontmatter.title).toMatch(/big walk wiki/i);
    expect(page.frontmatter.title.length).toBeGreaterThanOrEqual(40);
    expect(page.frontmatter.title.length).toBeLessThanOrEqual(60);
    expect(page.frontmatter.description).toMatch(/big walk wiki/i);
    expect(page.frontmatter.description.length).toBeGreaterThanOrEqual(140);
    expect(page.frontmatter.description.length).toBeLessThanOrEqual(160);
    expect(page.content).toMatch(locale === 'en' ? /2–12 player cooperative adventure/i : /aventura cooperativa para 2–12 jugadores/i);
    expect(page.content).toMatch(/August 4, 2026|4 de agosto de 2026/i);
    expect(page.content).toMatch(/House House/i);
    expect(page.content).toMatch(/Pending confirmation|Pendiente de confirmación/i);
  });
});
```

- [ ] **Step 2: Add scoped semantic and link assertions**

```tsx
it('keeps the official resources exact and marks unknowns rather than inventing them', () => {
  const page = loadPage('en', 'wiki');
  const externalUrls = Array.from(page.content.matchAll(/\]\((https?:\/\/[^)]+)\)/g), (match) => match[1]);

  expect([...new Set(externalUrls)].sort()).toEqual([
    'https://bigwalk.game/',
    'https://bigwalk.game/eula/',
    'https://bigwalk.game/faq/',
    'https://bigwalk.game/presskit/',
    'https://www.youtube.com/@HouseHouseGames',
  ]);
  expect(page.content).toMatch(/engine.*Pending confirmation/i);
  expect(page.content).not.toMatch(/Unity|10–20|1 million/i);
});

it('renders each locale through the existing guide template', () => {
  render(<GuidePage locale="en" slug="wiki" />);
  expect(screen.getByRole('heading', {name: /big walk wiki/i, level: 1})).toBeInTheDocument();
});
```

- [ ] **Step 3: Run the focused test to verify it fails**

Run:

```powershell
$env:PATH='C:\Users\34420\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;'+$env:PATH
.\node_modules\.bin\vitest.CMD run tests/wiki.test.tsx
```

Expected: FAIL because `wiki` is not yet part of `PageSlug` and no localized MDX files can be loaded.

- [ ] **Step 4: Keep the assertions fact-focused**

Ensure the tests validate direct-answer facts, SEO length limits, exact external destinations, pending-confirmation labeling, and actual template rendering without coupling to incidental paragraph formatting.

- [ ] **Step 5: Commit the red test**

```powershell
git add tests/wiki.test.tsx
git commit -m "test: define wiki overview guide"
```

### Task 2: Add the page slug and localized MDX knowledge base

**Files:**
- Modify: `lib/types.ts`
- Create: `content/en/wiki.mdx`
- Create: `content/es/wiki.mdx`
- Test: `tests/wiki.test.tsx`

**Interfaces:**
- Consumes: `PageSlug` union in `lib/types.ts`; frontmatter fields accepted by `loadPage`; `GuidePage`’s existing standard layout.
- Produces: `loadPage('en', 'wiki')` and `loadPage('es', 'wiki')`, plus the routes `/en/wiki` and `/es/wiki` through the existing dynamic page.

- [ ] **Step 1: Extend the closed slug union**

```ts
export type PageSlug =
  | 'home'
  | 'codes'
  | 'crossplay'
  // existing slugs
  | 'wiki';
```

Add `wiki` once, without changing slug names or behavior for current pages.

- [ ] **Step 2: Write the English MDX frontmatter and immediate answer**

```mdx
---
title: Big Walk Wiki: Game Overview and Official Resources
description: Big Walk wiki covers House House, release platforms, cooperative features, official resources, and confirmed facts for the 2–12 player adventure.
eyebrow: BIG WALK WIKI
updatedAt: August 11, 2026
toc:
  - label: Game overview
    id: game-overview
  - label: Developer and publisher
    id: developer-and-publisher
  - label: Game features
    id: game-features
  - label: Official resources
    id: official-resources
  - label: Background knowledge
    id: background-knowledge
  - label: Wiki FAQ
    id: wiki-faq
---

## Game overview

Big Walk is a 2–12 player cooperative adventure game developed by House House, released on August 4, 2026.
```

Then add scan-friendly, 3–4 sentence paragraphs covering only: Australian developer House House, publisher Panic Inc., Windows/Steam, PlayStation 5, Nintendo Switch 2, multiplayer adventure/puzzle/open-world framing, proximity voice, non-linear exploration, outback-inspired visuals, and the focus on spending time together.

- [ ] **Step 3: Write the Spanish mirror with independent natural phrasing**

```mdx
---
title: Guía Big Walk wiki: juego y recursos oficiales
description: Big Walk wiki reúne plataformas, funciones cooperativas, recursos oficiales y los datos confirmados de esta aventura para 2–12 jugadores en una sola guía.
eyebrow: WIKI DE BIG WALK
updatedAt: 11 de agosto de 2026
---

## Resumen del juego

Big Walk es una aventura cooperativa para 2–12 jugadores desarrollada por House House y lanzada el 4 de agosto de 2026.
```

Mirror the English facts and uncertainty boundaries in Spanish; do not copy English paragraphs or introduce facts absent from the English source boundary.

- [ ] **Step 4: Add source-aware sections and reusable guide data**

In both MDX files, define six TOC/H2 sections, two status cards, five neutral steps, eight FAQ entries, and related internal links to `game`, `crossplay`, and `beginner-tips`. Include the five resource links exactly once per locale with clear labels: official website, FAQ, EULA, press kit, and House House YouTube.

Write unknowns explicitly as `Pending confirmation` / `Pendiente de confirmación`: engine, studio size, reported sales figure, and Twitter/X status. Mention *Untitled Goose Game* (2019) only as House House’s earlier known title. Do not include any unconfirmed sales number.

- [ ] **Step 5: Run the focused test to verify it passes**

Run:

```powershell
$env:PATH='C:\Users\34420\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;'+$env:PATH
.\node_modules\.bin\vitest.CMD run tests/wiki.test.tsx
```

Expected: PASS, proving both locale files load, satisfy SEO length tests, retain scope boundaries, use only the exact five official resources, and render in the guide template.

- [ ] **Step 6: Commit the vertical slice**

```powershell
git add lib/types.ts content/en/wiki.mdx content/es/wiki.mdx tests/wiki.test.tsx
git commit -m "feat: add wiki overview guide"
```

### Task 3: Verify the complete website remains production-ready

**Files:**
- Verify: `tests/**/*.test.tsx`, `content/en/wiki.mdx`, `content/es/wiki.mdx`, `lib/types.ts`

**Interfaces:**
- Consumes: committed Wiki vertical slice and the project’s existing Next.js build configuration.
- Produces: evidence that all guide pages, types, static generation, and source-link constraints remain valid.

- [ ] **Step 1: Run the entire automated test suite**

```powershell
$env:PATH='C:\Users\34420\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;'+$env:PATH
.\node_modules\.bin\vitest.CMD run
```

Expected: all existing tests plus `tests/wiki.test.tsx` pass.

- [ ] **Step 2: Run static type checking**

```powershell
.\node_modules\.bin\tsc.CMD --noEmit
```

Expected: exit 0, including the extended `PageSlug` union.

- [ ] **Step 3: Build all localized static routes**

```powershell
.\node_modules\.bin\next.CMD build
```

Expected: exit 0 and successful static generation of `/en/wiki` and `/es/wiki` along with all existing routes.

- [ ] **Step 4: Inspect exact external URLs and diff whitespace**

```powershell
$urls = Get-Content content/en/wiki.mdx,content/es/wiki.mdx | Select-String -AllMatches 'https?://[^)\s]+' | ForEach-Object { $_.Matches.Value.TrimEnd('/') } | Sort-Object -Unique
$urls
git diff --check HEAD~1..HEAD
```

Expected: only the five approved official destinations (where the official site root retains its trailing slash in the MDX source), and no whitespace errors.

- [ ] **Step 5: Commit only a report if verification required code correction**

If any check forces a code/content correction, amend the source commit only after rerunning all four checks. Otherwise do not create an empty verification commit.

## Self-Review

1. **Spec coverage:** Task 1 enforces SEO, direct answer, factual boundaries, link policy, and rendering. Task 2 adds the two routes, six scan-friendly sections, guide data, internationalized content, approved resources, and uncertainty labels. Task 3 checks project-wide tests, types, static Next generation, exact URLs, and whitespace.
2. **Placeholder scan:** No TBD/TODO/fill-later placeholders appear; all data, strings, paths, commands, and test targets are supplied.
3. **Type consistency:** `wiki` is added to `PageSlug`, which is the `slug` parameter accepted by `loadPage` and `GuidePage`; all related links use existing valid page slugs.

## Execution Handoff

The Wiki overview design is already approved. Execute this plan on the existing `bigwalk-wiki-build` branch, which the user requested to preserve. Use the established bundled Node runtime for every check, preserve user-untracked files, and leave deployment out of scope.
