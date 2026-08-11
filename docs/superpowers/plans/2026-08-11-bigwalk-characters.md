# Big Walk Characters Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add source-bounded English and Spanish `/characters` guides for the `big walk characters` search term.

**Architecture:** Add `characters` to `PageSlug`, then reuse the localized dynamic route, content loader, metadata/schema generation, and `GuidePage` to render two MDX documents. No shared component or navigation changes are needed.

**Tech Stack:** Next.js 16 App Router, TypeScript, next-intl, MDX/gray-matter, Vitest.

## Global Constraints

- Routes: `/en/characters` and `/es/characters`; add no navigation item or shared-component changes.
- State no named cast, NPC list, dialogue-character list, or selectable character roster; the player's customizable avatar is the character.
- Cover only supplied customization, backpacks, belt radio/walkie-talkie equipment, cosmetics, source-reported red-bridge backpack and Yellow Tower Salon shiny appearance, and shared ability facts.
- Mark detailed unlock conditions and every unsupplied item, route, class, stat, NPC, or name as pending confirmation.
- Use internal links only: `game`, `beginner-tips`, and `walkthrough`.
- Body target: 1,050–1,350 words per locale; 6 H2 sections, 2 status cards, 5 steps, and 8 FAQs.

---

### Task 1: Bilingual characters route and guide

**Files:**

- Create: `tests/characters.test.tsx`
- Modify: `lib/types.ts`
- Create: `content/en/characters.mdx`
- Create: `content/es/characters.mdx`

**Interfaces:**

- Consumes: `getPage(locale, slug)`, `GuidePage`, `PageSlug`, and real `generateMetadata`.
- Produces: valid localized `characters` MDX rendered by the existing `[locale]/[slug]` route.

- [ ] **Step 1: Write the failing real-content test**

Create `tests/characters.test.tsx` using the real content loader, real metadata route, `GuidePage`, locale providers, and `afterEach(cleanup)`. Use a `wordCount` helper matching existing guide-content tests.

Assert these English values:

```ts
const englishTitle = 'Big Walk Characters Guide: Custom Avatars';
const englishDescription = 'Big Walk characters are customizable avatars, not a named cast: learn supplied outfits, backpacks, belt gear, cosmetics, and shared player abilities.';
expect(page.content).toMatch(/^## Character concept\n\nBig Walk has no traditional named characters; players control customizable avatars\./);
expect(page.content).toContain('No NPC roster');
expect(page.content).toContain('**Pending confirmation:**');
expect(page.frontmatter.relatedLinks.map((link) => link.slug)).toEqual(['game', 'beginner-tips', 'walkthrough']);
```

Mirror the behavior in Spanish with these exact values:

```ts
const spanishTitle = 'Guía de Big Walk characters: avatares personalizables';
const spanishDescription = 'Big Walk characters son avatares personalizables, no un reparto con nombres: conoce ropa, mochilas, equipo de cintura, cosméticos y capacidades compartidas.';
expect(page.content).toMatch(/^## Concepto de personaje\n\nBig Walk no tiene personajes tradicionales con nombre; los jugadores controlan avatares personalizables\./);
```

For each locale assert title length 40–60, description length 140–160, six TOC entries, eight FAQs, 1,050–1,350 content words, `Backpacks`, `Yellow Tower`, and supplied ability boundary text, no external URL, two status cards, correct localized internal links, and a serialized Spanish scan rejecting Han characters and U+FFFD.

- [ ] **Step 2: Observe RED**

Run:

```powershell
$env:PATH='C:\Users\34420\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;'+$env:PATH
.\node_modules\.bin\vitest.CMD run tests/characters.test.tsx
```

Expected: both tests fail with `Unsupported locale or page slug`, because `characters` is absent from `pageSlugs` and no MDX files exist.

- [ ] **Step 3: Implement the minimum valid route and content**

Add `'characters'` after `'map'` in `lib/types.ts`.

Create MDX documents with the tested metadata and direct-answer opening. Both documents must include frontmatter with six table-of-contents entries, status cards for `Custom avatar`/`Shared abilities` and localized equivalents, five source-bounded steps, eight FAQs, and related links to `game`, `beginner-tips`, and `walkthrough`.

Use these H2 topics:

```md
## Character concept
## Customization options
## Equippable items
## Shared abilities
## What remains unconfirmed
## Characters FAQ
```

State only the supplied customization and abilities. The source-reported backpack after the red bridge and shiny appearance after Yellow Tower in the Salon must be framed as reported, with the exact route, unlock rule, and inventory pending. Do not add names, NPCs, stats, classes, or unsupplied equipment. Include no external URL.

- [ ] **Step 4: Observe GREEN**

Run the focused command from Step 2. Expected: `tests/characters.test.tsx` has two passing tests.

- [ ] **Step 5: Validate and commit**

Run full Vitest, `tsc --noEmit`, `next build`, and `git diff --check`; confirm `rg -n 'https?://' content/en/characters.mdx content/es/characters.mdx` returns no matches. Commit only task files:

```powershell
git add lib/types.ts content/en/characters.mdx content/es/characters.mdx tests/characters.test.tsx
git commit -m "feat: add characters guide"
```
