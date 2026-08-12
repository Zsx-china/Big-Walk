# Big Walk Puzzle Solutions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic Puzzle guide with source-bounded English and Spanish Big Walk puzzle-solutions pages that meet the English SEO requirements and expose uncertainty rather than inventing answers.

**Architecture:** Keep the existing App Router article route and MDX `GuidePage` renderer. Put localized editorial content, TOC items, FAQs, how-to guidance, and metadata in the two `puzzles.mdx` documents; add a focused route/content test that exercises the real loader and metadata export.

**Tech Stack:** Next.js App Router, TypeScript, MDX, next-intl, Vitest, Testing Library.

## Global Constraints

- Only state: up to 11 friends, cooperative multiplayer/open-world exploration, group puzzle solving, quieter proximity voice chat over distance, coordinate input, item interaction, and environmental puzzles.
- Include `4166` and `1899`; label their input location, order, and result **Pending confirmation** / **Pendiente de confirmación**.
- Cover peg-board puzzles and hidden answers only as pending-detail topics; do not invent steps, locations, rewards, characters, codes, or numerical game systems.
- English title: `Big Walk Puzzle Solutions: Coordinates, Pegs & More` (51 characters).
- English description: `Big Walk puzzle solutions for coordinate inputs, including 4166 and 1899, peg boards, and hidden answers. See confirmed co-op clues and pending details.` (152 characters).
- Both pages begin with `All Big Walk puzzle solutions are collected here.` / `Todas las soluciones de puzles de Big Walk se recopilan aquí.` before background information.
- English body targets about 1,200 words in H2 sections with three or four scannable sentences; Spanish carries identical factual meaning naturally.
- The sole external URL is `https://store.steampowered.com/app/1478500/Big_Walk/`.
- Preserve GuidePage layout, schema behavior, locale switching, unrelated MDX, and untracked `AGENTS.md` / `CLAUDE.md`.

---

### Task 1: Publish and test the English keyword page

**Files:**
- Create: `tests/puzzles.test.tsx`
- Modify: `content/en/puzzles.mdx`
- Verify: `app/[locale]/[slug]/page.tsx`
- Verify: `components/GuidePage.tsx`

**Interfaces:**
- Consumes `getPage(locale, slug): Promise<PageDocument>` from `lib/content.ts`.
- Consumes the `generateMetadata` export from `app/[locale]/[slug]/page.tsx`.
- Produces the English `getPage('en', 'puzzles')` document and `/en/puzzles` metadata.

- [ ] **Step 1: Write a failing English content and metadata test**

Create `tests/puzzles.test.tsx`:

```tsx
import { describe, expect, it } from 'vitest';
import { generateMetadata } from '../app/[locale]/[slug]/page';
import { getPage } from '../lib/content';

describe('Big Walk puzzle solutions content', () => {
  it('publishes the source-bounded English keyword page', async () => {
    const page = await getPage('en', 'puzzles');
    expect(page.frontmatter.title).toBe('Big Walk Puzzle Solutions: Coordinates, Pegs & More');
    expect(page.frontmatter.title.length).toBeGreaterThanOrEqual(40);
    expect(page.frontmatter.title.length).toBeLessThanOrEqual(60);
    expect(page.frontmatter.description.length).toBeGreaterThanOrEqual(140);
    expect(page.frontmatter.description.length).toBeLessThanOrEqual(160);
    expect(page.content).toContain('All Big Walk puzzle solutions are collected here.');
    expect(page.content).toContain('4166');
    expect(page.content).toContain('1899');
    expect(page.content).toContain('Pending confirmation');
    expect(page.content).toContain('https://store.steampowered.com/app/1478500/Big_Walk/');
  });

  it('exposes English puzzle metadata from the article route', async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ locale: 'en', slug: 'puzzles' }) });
    expect(metadata).toMatchObject({
      title: 'Big Walk Puzzle Solutions: Coordinates, Pegs & More',
      description: 'Big Walk puzzle solutions for coordinate inputs, including 4166 and 1899, peg boards, and hidden answers. See confirmed co-op clues and pending details.',
    });
  });
});
```

- [ ] **Step 2: Run the focused test and verify it is red**

Run:

```powershell
$env:PATH='C:\Users\34420\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;'+$env:PATH
.\node_modules\.bin\vitest.CMD run tests/puzzles.test.tsx
```

Expected: assertions fail because the existing English MDX is generic.

- [ ] **Step 3: Replace English frontmatter and body with the source-bounded structure**

Set the exact English title and description from Global Constraints. Set these eight TOC ids/headings:

```yaml
toc:
  - {id: confirmed-facts, label: What this guide confirms}
  - {id: coordinate-puzzles, label: "Coordinate puzzles: 4166 and 1899"}
  - {id: co-op-voice-chat, label: Co-op puzzle solving and proximity voice chat}
  - {id: puzzle-types, label: Item interaction and environmental puzzles}
  - {id: peg-board-puzzles, label: Peg-board puzzles}
  - {id: hidden-answers, label: Hidden answers}
  - {id: safe-use, label: How to use this page safely}
  - {id: official-source-review, label: Official-source review}
```

Use these exact uncertainty paragraphs in the matching sections:

```mdx
The values 4166 and 1899 are recorded here for the coordinate-puzzle topic. The official material reviewed for this page does not confirm where to enter them, which order to use, or what result they produce. **Pending confirmation:** treat both values as research notes, not a verified walkthrough.

Peg-board puzzles are a topic this guide tracks, but the supplied official information does not confirm a board layout, a placement sequence, or a completion result. **Pending confirmation:** do not treat an unverified diagram or arrangement as a solution.

Hidden answers are also tracked here, but the supplied information does not identify their locations or answer strings. **Pending confirmation:** this page will only add those details after an official source confirms them.
```

The body begins with the exact direct answer, has roughly 1,200 English words over the eight H2 sections, and uses the approved Steam URL once in the official-source review. Add eight FAQ entries and four reader-guidance steps that distinguish confirmed information from pending claims; use only `walkthrough`, `game`, and `beginner-tips` for related links.

- [ ] **Step 4: Run the focused test and commit the English article**

Run `.\node_modules\.bin\vitest.CMD run tests/puzzles.test.tsx` and expect both tests to pass.

```powershell
git add tests/puzzles.test.tsx content/en/puzzles.mdx
git commit -m "feat: publish English puzzle solutions guide"
```

### Task 2: Mirror verified puzzle information in Spanish

**Files:**
- Modify: `content/es/puzzles.mdx`
- Modify: `tests/puzzles.test.tsx`

**Interfaces:**
- Consumes the loader/test setup from Task 1.
- Produces an equivalent `getPage('es', 'puzzles')` document for the existing `/es/puzzles` route.

- [ ] **Step 1: Add a failing Spanish-equivalence test**

Append this test:

```tsx
it('keeps the Spanish puzzle page aligned with the verified facts', async () => {
  const page = await getPage('es', 'puzzles');
  expect(page.content).toContain('Todas las soluciones de puzles de Big Walk se recopilan aquí.');
  expect(page.content).toContain('4166');
  expect(page.content).toContain('1899');
  expect(page.content).toContain('Pendiente de confirmación');
  expect(page.content).toContain('https://store.steampowered.com/app/1478500/Big_Walk/');
  expect(page.frontmatter.toc).toHaveLength(8);
});
```

- [ ] **Step 2: Run the focused test and verify the Spanish assertion is red**

Run `.\node_modules\.bin\vitest.CMD run tests/puzzles.test.tsx`.

Expected: Spanish direct-answer, coordinate, pending-label, source URL, and TOC checks fail before the MDX replacement.

- [ ] **Step 3: Replace Spanish frontmatter/body with the equivalent article**

Use these eight anchors in the Spanish TOC:

```yaml
toc:
  - {id: hechos-confirmados, label: Hechos confirmados}
  - {id: rompecabezas-coordenadas, label: "Rompecabezas de coordenadas: 4166 y 1899"}
  - {id: cooperacion-voz, label: Cooperación y chat de voz por proximidad}
  - {id: tipos-rompecabezas, label: Interacción con objetos y entorno}
  - {id: tablero-clavijas, label: Rompecabezas de tablero de clavijas}
  - {id: respuestas-ocultas, label: Respuestas ocultas}
  - {id: uso-seguro, label: Cómo usar esta página}
  - {id: revision-fuente-oficial, label: Revisión de fuente oficial}
```

Start with `Todas las soluciones de puzles de Big Walk se recopilan aquí.` Translate only the confirmed facts from Global Constraints. Include `Pendiente de confirmación` when discussing the coordinate entry/order/result, peg-board layouts, or hidden-answer locations/strings. Keep the exact Steam product URL, eight FAQs, four safe-reader steps, and only valid related-link slugs.

- [ ] **Step 4: Run focused tests and commit the Spanish article**

Run `.\node_modules\.bin\vitest.CMD run tests/puzzles.test.tsx` and expect all three tests to pass.

```powershell
git add content/es/puzzles.mdx tests/puzzles.test.tsx
git commit -m "feat: localize verified puzzle guide"
```

### Task 3: Verify source bounds and production output

**Files:**
- Verify: `content/en/puzzles.mdx`
- Verify: `content/es/puzzles.mdx`
- Verify: `tests/puzzles.test.tsx`

- [ ] **Step 1: Inspect external URLs and uncertainty wording**

```powershell
rg -n "https?://" content/en/puzzles.mdx content/es/puzzles.mdx
rg -n "Pending confirmation|Pendiente de confirmación" content/en/puzzles.mdx content/es/puzzles.mdx
```

Expected: the only external URL is the approved Steam product URL, and both pages carry explicit uncertainty labels.

- [ ] **Step 2: Run full automated verification**

```powershell
.\node_modules\.bin\vitest.CMD run
.\node_modules\.bin\tsc.CMD --noEmit
.\node_modules\.bin\next.CMD build
```

Expected: zero Vitest failures; TypeScript and Next build both exit 0.

- [ ] **Step 3: Commit a verification-driven correction only if a command fails**

If verification reveals an MDX/test issue, make the minimal correction, rerun every command in this task, then commit:

```powershell
git add content/en/puzzles.mdx content/es/puzzles.mdx tests/puzzles.test.tsx
git commit -m "fix: verify puzzle solutions guide"
```

If all checks pass, do not create an empty commit.
