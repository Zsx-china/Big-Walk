# Big Walk Review Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add source-bounded English and Spanish `/review` pages for the `big walk review` search term.

**Architecture:** Add `review` to the existing `PageSlug` list, letting the dynamic locale route load two new MDX documents, generate metadata and schemas, and render them through `GuidePage`. The article reports supplied reviews rather than presenting a new verdict by this wiki.

**Tech Stack:** Next.js 16 App Router, TypeScript, `next-intl`, MDX/gray-matter, Tailwind CSS, Vitest and Testing Library.

## Global Constraints

- Paths are `/en/review` and `/es/review`; do not modify global navigation or page components.
- English title: `Big Walk Review: 93 Metascore & IGN 9/10` (40); English description: `Big Walk review covers Metacritic's 93/100, IGN's 9/10, critic praise and mild criticism, plus early Steam player feedback at launch from supplied reviews.` (155).
- Spanish title: `Big Walk review: 93 Metascore e IGN 9/10` (40); Spanish description: `Big Walk review cubre el 93/100 de Metacritic y el 9/10 de IGN, con elogios de críticos, crítica leve y comentarios tempranos de Steam al lanzamiento.` (150).
- Direct English opening: `Big Walk has a 93/100 Metascore, IGN gave it 9/10, and the supplied reviews are broadly positive.` Spanish mirrors it.
- Use only supplied information: Metacritic 93/100 and universal acclaim from 30+ outlets; IGN 9/10/Amazing, stated praise and mild puzzle criticism; Steam early `Overwhelmingly Positive` feedback after August 4, 2026 with supplied praise and endgame/content request.
- Quote only: `A delightful, chaotic co-op adventure that captures the joy of simply hanging out with friends.` Attribute it to IGN.
- Do not invent sales, player counts, exact Steam review count, reviewer names, other outlets, current rankings, new criticisms, or external URLs. Mark non-supplied details `Pending confirmation` / `Pendiente de confirmación`.
- Target 1,050–1,350 words per locale, with three or four sentences in each prose paragraph; use H2 sections for scores, IGN, praise, mild criticism, early Steam feedback, and limits/FAQ.
- Status cards show Metascore 93/100 and IGN 9/10; related links use existing `game`, `puzzles`, and `walkthrough` pages.

---

### Task 1: Route-aware bilingual review guide

**Files:**

- Create: `tests/review.test.tsx`
- Modify: `lib/types.ts:3-18`
- Create: `content/en/review.mdx`
- Create: `content/es/review.mdx`

**Interfaces:**

- Consumes: `getPage(locale, slug)`, `GuidePage`, the real `generateMetadata`, and the `PageSlug` route boundary.
- Produces: valid `review` content for both locales and the user-visible `/en/review` and `/es/review` route contract.

- [ ] **Step 1: Create a failing real-content route/render test**

Create `tests/review.test.tsx` with `getPage`, the actual route `generateMetadata`, `GuidePage`, `NextIntlClientProvider`, and message JSON. Assert literal metadata and real rendering behavior:

```tsx
it('renders the English review scores, supplied quote, and balanced criticism', async () => {
  const page = await getPage('en', 'review' as PageSlug);
  const { generateMetadata } = await import('../app/[locale]/[slug]/page');
  const metadata = await generateMetadata({ params: Promise.resolve({ locale: 'en', slug: 'review' }) });

  expect(metadata).toMatchObject({
    title: 'Big Walk Review: 93 Metascore & IGN 9/10',
    description: "Big Walk review covers Metacritic's 93/100, IGN's 9/10, critic praise and mild criticism, plus early Steam player feedback at launch from supplied reviews.",
  });
  expect(page.content).toMatch(/^## Scores and consensus\n\nBig Walk has a 93\/100 Metascore, IGN gave it 9\/10, and the supplied reviews are broadly positive\./);
  expect(page.content).toContain('A delightful, chaotic co-op adventure that captures the joy of simply hanging out with friends.');
  expect(page.content).toContain('some puzzles can feel unclear without external guidance');
  expect(page.content).toContain('**Pending confirmation:** sales figures');
  expect(page.content).not.toMatch(/https?:\/\//);
  render(<NextIntlClientProvider locale="en" messages={en}><GuidePage page={page} /></NextIntlClientProvider>);
  expect(screen.getByText('93/100')).toBeInTheDocument();
  expect(screen.getByText('9/10')).toBeInTheDocument();
});
```

Add an equivalent Spanish case with literal title, description, direct opening, actual Unicode accents, no Han/replacement glyphs, six TOC entries, at least eight FAQs, two visible status cards, 1,050–1,350 body words, no external URL, and localized rendered links to `game`, `puzzles`, and `walkthrough`.

- [ ] **Step 2: Run focused Vitest and observe RED**

Run:

```powershell
$env:PATH='C:\Users\34420\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;'+$env:PATH
.\node_modules\.bin\vitest.CMD run tests/review.test.tsx
```

Expected: FAIL because `review` is not yet a supported page slug and neither locale's MDX file exists. Correct test syntax errors before moving to production changes.

- [ ] **Step 3: Add the slug and two bounded MDX documents**

Add `'review'` after `'crossplay'` in `lib/types.ts`. Build both MDX documents with standard validated frontmatter, exact SEO text, a direct opening, six ordered TOC sections, two visible score cards, at least eight FAQs, 4–5 evidence-limited reader steps, and `game`, `puzzles`, and `walkthrough` related links.

English body headings are `Scores and consensus`, `IGN's review`, `What critics praised`, `Mild criticism`, `Early Steam player feedback`, and `Limits and FAQ`; translate these naturally in Spanish. Keep every factual statement attributed to supplied IGN, Metacritic, or early Steam feedback. Include the one supplied IGN sentence only once, quoted and attributed, and present the supplied mild puzzle and more-content/endgame criticism without adding a larger issue. Put every non-supplied fact after an explicit pending-confirmation label and include no external URLs.

- [ ] **Step 4: Run focused Vitest and observe GREEN**

Run:

```powershell
$env:PATH='C:\Users\34420\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;'+$env:PATH
.\node_modules\.bin\vitest.CMD run tests/review.test.tsx
```

Expected: PASS for both locales, proving the route, search metadata, direct answer, score cards, supplied quote, balanced criticism, and source boundaries.

- [ ] **Step 5: Run one combined validation pass**

Run:

```powershell
$env:PATH='C:\Users\34420\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;'+$env:PATH
.\node_modules\.bin\vitest.CMD run
.\node_modules\.bin\tsc.CMD --noEmit
.\node_modules\.bin\next.CMD build
git diff --check
```

Expected: all Vitest files pass, TypeScript has no diagnostics, Next produces its production build, and whitespace validation has no output.

- [ ] **Step 6: Commit the guide and its regression test**

```powershell
git add lib/types.ts content/en/review.mdx content/es/review.mdx tests/review.test.tsx
git commit -m "feat: add review guide"
```

Expected: one focused commit containing the new route support, two locale documents, and the review test.
