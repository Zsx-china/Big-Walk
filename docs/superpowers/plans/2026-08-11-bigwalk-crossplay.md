# Big Walk Crossplay Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish source-bounded English and Spanish `/crossplay` guides for the `big walk crossplay` search term.

**Architecture:** Extend the existing `PageSlug` union with `crossplay`, allowing the established `[locale]/[slug]` route to load its MDX through `getPage`, generate metadata, JSON-LD, breadcrumbs, and `GuidePage`. Create one MDX document per locale with the same page schema and link only to existing internal guides.

**Tech Stack:** Next.js 16 App Router, TypeScript, `next-intl`, MDX/gray-matter, Tailwind CSS, Vitest and Testing Library.

## Global Constraints

- Route paths are `/en/crossplay` and `/es/crossplay`; do not change primary navigation or page layout.
- English title is `Big Walk Crossplay Guide: PC, PS5 & Switch 2` (44 characters) and description is 148 characters.
- Spanish title is `Guía de Big Walk crossplay: PC, PS5 y Switch 2` (46 characters) and description is 154 characters.
- Direct English answer: `Big Walk supports cross-platform multiplayer between PC, PS5, and Nintendo Switch 2.` Spanish mirrors this meaning.
- Use only supplied facts: PC/Steam, PlayStation 5, Nintendo Switch 2; Join Codes across platforms; no platform-specific multiplayer restrictions; proximity voice chat across platforms; 12 players total; platform-specific saves and achievements/trophies.
- Do not mention Xbox, future platforms, invented menus, account setup, regional/version rules, matchmaking behavior, or save/achievement transfer. Mark absent operational detail as `Pending confirmation` / `Pendiente de confirmación`.
- Body target is 1,050–1,350 words per locale, split into eight H2 sections with 3–4 sentences per prose paragraph.
- No external URLs; use only existing internal `/codes`, `/save`, and `/game` related links.
- Preserve pre-existing untracked `AGENTS.md`, `CLAUDE.md`, and other plan files.

---

### Task 1: Route-aware bilingual Crossplay guide

**Files:**

- Create: `tests/crossplay.test.tsx`
- Modify: `lib/types.ts:3-17`
- Create: `content/en/crossplay.mdx`
- Create: `content/es/crossplay.mdx`

**Interfaces:**

- Consumes: `getPage(locale, slug)`, `GuidePage`, the real dynamic `generateMetadata` export, and `PageSlug` from the existing route.
- Produces: the valid `crossplay` `PageSlug`; both locale MDX documents; rendered `/en/crossplay` and `/es/crossplay` page contracts.

- [ ] **Step 1: Write a failing route-and-render test**

Create `tests/crossplay.test.tsx` using `getPage`, the real `generateMetadata`, `GuidePage`, `NextIntlClientProvider`, and the existing English/Spanish message JSON. Use literal expectations, not a helper derived from production code:

```tsx
it('renders the English crossplay guide with search metadata and supported-platform boundaries', async () => {
  const page = await getPage('en', 'crossplay');
  const { generateMetadata } = await import('../app/[locale]/[slug]/page');
  const metadata = await generateMetadata({ params: Promise.resolve({ locale: 'en', slug: 'crossplay' }) });

  expect(metadata).toMatchObject({
    title: 'Big Walk Crossplay Guide: PC, PS5 & Switch 2',
    description: 'Big Walk crossplay lets PC, PS5, and Nintendo Switch 2 players join the same session with Join Codes; saves and achievements stay platform-specific.',
  });
  expect(page.content).toMatch(/^## Crossplay status\n\nBig Walk supports cross-platform multiplayer between PC, PS5, and Nintendo Switch 2\./);
  expect(page.content).toContain('12 players total');
  expect(page.content).toContain('platform-specific');
  expect(page.content).not.toMatch(/Xbox/i);
  render(<NextIntlClientProvider locale="en" messages={en}><GuidePage page={page} /></NextIntlClientProvider>);
  expect(screen.getByRole('region', { name: 'Wiki status' })).toBeInTheDocument();
  expect(screen.getAllByTestId('status-card')).toHaveLength(2);
});
```

Add a Spanish case with literal Spanish title/description/opening, `Pendiente de confirmación`, actual accented Unicode, and an assertion that serialized page data contains neither `\uFFFD` nor the Han range. In both cases assert two visible status cards, eight TOC entries, at least eight FAQs, `codes`/`save`/`game` localized related links, and word count between 1,050 and 1,350.

- [ ] **Step 2: Run the focused test to verify RED**

Run:

```powershell
$env:PATH='C:\Users\34420\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;'+$env:PATH
.\node_modules\.bin\vitest.CMD run tests/crossplay.test.tsx
```

Expected: FAIL because `crossplay` is not a supported `PageSlug` and neither MDX file exists. Fix a test syntax error before proceeding; do not treat a parse error as the required RED result.

- [ ] **Step 3: Add the slug and write the two source-bounded MDX documents**

Add `'crossplay'` after `'codes'` in `pageSlugs` in `lib/types.ts`. Create both MDX files with standard validated frontmatter, exact planned titles/descriptions, two status cards (`Fully supported` crossplay and `Platform-specific` saves), 4–5 high-level non-menu steps, at least eight FAQs, and localized `codes`, `save`, and `game` links.

Use these eight sections: crossplay status; supported platforms; Join Codes; starting a cross-platform session; twelve-player sessions; cross-platform voice chat; saves and achievements; limits and FAQ. Start English content with the exact direct answer. Write matching natural UTF-8 Spanish with the exact planned SEO strings. Keep claims equivalent between locales, cite only supplied source names in prose, and place every unknown operational detail after an explicit pending-confirmation label.

- [ ] **Step 4: Run the focused test to verify GREEN**

Run:

```powershell
$env:PATH='C:\Users\34420\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;'+$env:PATH
.\node_modules\.bin\vitest.CMD run tests/crossplay.test.tsx
```

Expected: PASS with both locale cases proving user-visible route metadata, direct answer, source boundaries, visible cards, and localized links.

- [ ] **Step 5: Run one combined validation pass**

Run:

```powershell
$env:PATH='C:\Users\34420\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;'+$env:PATH
.\node_modules\.bin\vitest.CMD run
.\node_modules\.bin\tsc.CMD --noEmit
.\node_modules\.bin\next.CMD build
git diff --check
```

Expected: all Vitest tests pass, TypeScript emits no diagnostics, Next completes its production build, and `git diff --check` emits no whitespace errors.

- [ ] **Step 6: Commit the completed page and regression test**

```powershell
git add lib/types.ts content/en/crossplay.mdx content/es/crossplay.mdx tests/crossplay.test.tsx
git commit -m "feat: add crossplay guide"
```

Expected: one focused commit containing only new route support, bilingual content, and its regression test.
