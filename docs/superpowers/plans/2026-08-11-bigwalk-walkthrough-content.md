# Big Walk Walkthrough Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace generic `/walkthrough` articles with bilingual, source-bounded eight-stage Big Walk walkthrough guides.

**Architecture:** Keep the existing MDX loader, localized App Router article route, and `GuidePage` unchanged. The two localized MDX files supply SEO, eight-stage timeline data, FAQs, related links, and source-bounded body content; one real loader/route/renderer test validates both locales.

**Tech Stack:** Next.js App Router, TypeScript, MDX, next-intl, Vitest, Testing Library.

## Global Constraints

- Stages are exactly Tutorial Area, Drawbridge, Red Tower, Green Tower, Blue Tower, Yellow Tunnel, Black Tower, and Ending.
- Supported milestones are four red-area puzzles for a Drawbridge key; Drawbridge unlocks Red Tower; Red Tower gives Map Room; Green Tower makes chairlift available; Blue Tower makes train available; Yellow Tunnel unlocks underground maze; Black Tower triggers first ending.
- Supported progress facts are host owns the save, changing host restarts the session, and a Join Code is not a save credential.
- Present all supplied route/milestone/progress claims as supplied walkthrough research, not official confirmation.
- Never invent directions, puzzle solutions, action counts beyond the supplied four red-area puzzles, menus, timing, platform rules, character names, rewards, or extra save-transfer behavior.
- Use **Pending confirmation:** / **Pendiente de confirmación:** for every detail beyond the supplied facts; do not add external URLs.
- Every locale has eight H2 stages with three or four prose sentences per stage, about 1,200 words, eight FAQs, eight frontmatter timeline steps, and visible localized puzzle/save/game links.
- English title is `Big Walk Walkthrough: Towers, Tunnels & Ending` (46); English description is `Big Walk walkthrough maps the Tutorial Area, Drawbridge, towers, Yellow Tunnel, and ending, with host-save facts and clearly marked unknowns.` (141); its exact opening is `A complete walkthrough from the Tutorial Area to the Black Tower ending.`
- Spanish title is `Recorrido de Big Walk: torres, túneles y final` (46); Spanish description is `El recorrido de Big Walk resume el área de tutorial, el puente levadizo, las torres, el túnel amarillo y el final, con dudas claramente marcadas.` (145); its exact opening is `Una guía completa desde el área de tutorial hasta el primer final de la Torre Negra.`
- Do not change routes, page components, layout, CTA destinations, other content, or existing untracked files.

---

### Task 1: English eight-stage walkthrough

**Files:**
- Create: `tests/walkthrough.test.tsx`
- Modify: `content/en/walkthrough.mdx`
- Verify: `lib/content.ts`, `app/[locale]/[slug]/page.tsx`, `components/GuidePage.tsx`

**Interfaces:**
- Read `const page = await getPage('en', 'walkthrough')`.
- Read article metadata with `generateMetadata({ params: Promise.resolve({ locale: 'en', slug: 'walkthrough' }) })`.
- Render `<GuidePage page={page} />` inside `<NextIntlClientProvider locale="en" messages={en}>`.

- [ ] **Step 1: Write failing English real-behavior assertions**

Create `tests/walkthrough.test.tsx` using `afterEach(cleanup)`, real `getPage`, route metadata, and `GuidePage`. Name the production break each assertion catches. Include:

```tsx
expect(page.frontmatter.title).toBe('Big Walk Walkthrough: Towers, Tunnels & Ending');
expect(page.frontmatter.description).toHaveLength(141);
expect(page.content).toMatch(/^## Tutorial Area\n\nA complete walkthrough from the Tutorial Area to the Black Tower ending\./);
expect(page.frontmatter.toc).toHaveLength(8);
expect(page.frontmatter.steps).toHaveLength(8);
expect(page.frontmatter.faqs).toHaveLength(8);
expect(page.content).toContain('Map Room');
expect(page.content).toContain('chairlift');
expect(page.content).toContain('underground maze');
expect(page.content).toContain('host owns the save');
expect(page.content).toContain('Pending confirmation');
expect((page.content.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? []).length).toBeGreaterThanOrEqual(1_050);
expect((page.content.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? []).length).toBeLessThanOrEqual(1_350);
expect(metadata).toMatchObject({ title, description });
expect(screen.getByRole('link', { name: 'Big Walk Puzzle Solutions' })).toHaveAttribute('href', '/en/puzzles');
expect(screen.getByRole('link', { name: 'Big Walk Save Ownership Guide' })).toHaveAttribute('href', '/en/save');
expect(screen.getByRole('link', { name: 'Big Walk Game Guide' })).toHaveAttribute('href', '/en/game');
```

- [ ] **Step 2: Run focused English tests to prove RED**

With `C:\Users\34420\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin` first on `PATH`, run `./node_modules/.bin/vitest.CMD run tests/walkthrough.test.tsx`. Expected: generic title/opening/frontmatter/milestone/metadata/renderer-link assertions fail because current content has only five generic sections, one FAQ, and one step.

- [ ] **Step 3: Replace the English walkthrough MDX**

Use the exact English metadata/opening from Global Constraints. Create all eight exact TOC ids and H2 stages, with three or four evidence-bounded sentences each. Add a status card that calls the route supplied walkthrough research. Populate eight timeline steps with stages/milestones only, eight FAQs, and visible `Read more:` links to `/en/puzzles`, `/en/save`, `/en/game`.

```mdx
---
title: "Big Walk Walkthrough: Towers, Tunnels & Ending"
description: "Big Walk walkthrough maps the Tutorial Area, Drawbridge, towers, Yellow Tunnel, and ending, with host-save facts and clearly marked unknowns."
---

## Tutorial Area

A complete walkthrough from the Tutorial Area to the Black Tower ending.
```

- [ ] **Step 4: Verify English and commit**

Run `./node_modules/.bin/vitest.CMD run tests/walkthrough.test.tsx`. Expected: English assertions pass. Commit only `content/en/walkthrough.mdx` and `tests/walkthrough.test.tsx` using `feat: publish English walkthrough stages`.

### Task 2: Spanish eight-stage walkthrough

**Files:**
- Modify: `content/es/walkthrough.mdx`
- Modify: `tests/walkthrough.test.tsx`

**Interfaces:**
- Read `const page = await getPage('es', 'walkthrough')`.
- Read Spanish article metadata with `generateMetadata({ params: Promise.resolve({ locale: 'es', slug: 'walkthrough' }) })`.
- Render `<GuidePage page={page} />` inside `<NextIntlClientProvider locale="es" messages={es}>`.
- Produce `/es/puzzles`, `/es/save`, and `/es/game` body links.

- [ ] **Step 1: Add failing Spanish real-behavior assertions**

Extend `tests/walkthrough.test.tsx` with independently literal Spanish expectations:

```tsx
expect(page.frontmatter.title).toBe('Recorrido de Big Walk: torres, túneles y final');
expect(page.frontmatter.description).toHaveLength(145);
expect(page.content).toMatch(/^## Área de tutorial\n\nUna guía completa desde el área de tutorial hasta el primer final de la Torre Negra\./);
expect(page.frontmatter.toc).toHaveLength(8);
expect(page.frontmatter.steps).toHaveLength(8);
expect(page.frontmatter.faqs).toHaveLength(8);
expect(page.content).toContain('Pendiente de confirmación');
expect((page.content.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? []).length).toBeGreaterThanOrEqual(1_050);
expect((page.content.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? []).length).toBeLessThanOrEqual(1_350);
expect(metadata).toMatchObject({
  title: 'Recorrido de Big Walk: torres, túneles y final',
  description: 'El recorrido de Big Walk resume el área de tutorial, el puente levadizo, las torres, el túnel amarillo y el final, con dudas claramente marcadas.',
});
expect(screen.getByRole('link', { name: 'Soluciones de puzles de Big Walk' })).toHaveAttribute('href', '/es/puzzles');
expect(screen.getByRole('link', { name: 'Guía de guardado de Big Walk' })).toHaveAttribute('href', '/es/save');
expect(screen.getByRole('link', { name: 'Guía del juego Big Walk' })).toHaveAttribute('href', '/es/game');
```

- [ ] **Step 2: Run focused tests to prove the Spanish RED state**

Run `./node_modules/.bin/vitest.CMD run tests/walkthrough.test.tsx`. Expected: Spanish opening, metadata, stage counts, pending label, and localized link assertions fail while English remains green.

- [ ] **Step 3: Replace the Spanish walkthrough MDX**

Use the exact Spanish metadata/opening from Global Constraints. Produce the same eight stages, supported milestones, host-save facts, eight timeline steps, eight FAQs, and visible `Leer más:` links. Keep each of the eight H2 stages to three or four sentences and mark unknowns `**Pendiente de confirmación:**`.

```mdx
---
title: "Recorrido de Big Walk: torres, túneles y final"
description: "El recorrido de Big Walk resume el área de tutorial, el puente levadizo, las torres, el túnel amarillo y el final, con dudas claramente marcadas."
---

## Área de tutorial

Una guía completa desde el área de tutorial hasta el primer final de la Torre Negra.
```

- [ ] **Step 4: Verify Spanish and commit**

Run `./node_modules/.bin/vitest.CMD run tests/walkthrough.test.tsx`. Expected: both localized suites pass. Commit only `content/es/walkthrough.mdx` and `tests/walkthrough.test.tsx` using `feat: localize walkthrough stages`.

### Task 3: Walkthrough source-bound and production verification

**Files:**
- Verify: `content/en/walkthrough.mdx`, `content/es/walkthrough.mdx`, `tests/walkthrough.test.tsx`

**Interfaces:**
- Verify both localized files continue to load through `getPage` and render through the existing `GuidePage` route.

- [ ] **Step 1: Audit source boundaries**

Run `rg -n "https?://" content/en/walkthrough.mdx content/es/walkthrough.mdx` and `rg -n "Pending confirmation|Pendiente de confirmación|Map Room|chairlift|train|underground maze|host owns the save|anfitrión es dueño" content/en/walkthrough.mdx content/es/walkthrough.mdx`. Expected: no external URL; both locale articles contain their required pending labels and only the supplied milestones/progress facts.

- [ ] **Step 2: Run full verification**

Run `./node_modules/.bin/vitest.CMD run`, `./node_modules/.bin/tsc.CMD --noEmit`, `./node_modules/.bin/next.CMD build`, and `git diff --check` with the bundled Node runtime. Expected: all commands succeed.

- [ ] **Step 3: Correct only demonstrated verification defects**

If an audit, test, type check, build, or whitespace check demonstrates a real walkthrough source/test defect, correct only the affected walkthrough MDX/test file using `apply_patch`, rerun every Step 2 command, and commit it as `fix: verify walkthrough stages`. If all checks pass, make no empty commit.
