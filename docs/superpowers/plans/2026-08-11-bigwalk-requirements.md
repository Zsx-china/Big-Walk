# Big Walk System Requirements Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add source-bounded English and Spanish `/requirements` guides for the `big walk system requirements` search term.

**Architecture:** Add `requirements` to `PageSlug`, then reuse the localized dynamic route, content loader, metadata/schema generation, and `GuidePage` to render two MDX documents. No shared component or navigation changes are needed.

**Tech Stack:** Next.js 16 App Router, TypeScript, next-intl, MDX/gray-matter, Vitest.

## Global Constraints

- Routes: `/en/requirements` and `/es/requirements`; add no navigation item or shared-component changes.
- State only supplied Windows, RAM, DirectX, console, network, microphone/proximity-chat, and 1080p recommendation facts as facts.
- CPU model, GPU model, official storage, exact performance, detailed resolution support, exact SSD benefit, and bandwidth must remain pending confirmation.
- Present the supplied 5–10 GB, integrated-graphics, mid-range-GPU, and SSD-loading statements only as non-official source estimates, never as an official requirement.
- Tell readers to treat the official Steam page as authoritative because its requirements block may be incomplete.
- Use internal links only: `crossplay`, `game`, and `beginner-tips`; body target 1,050–1,350 words per locale; 6 H2 sections, 2 status cards, 5 steps, and 8 FAQs.

---

### Task 1: Bilingual requirements route and guide

**Files:**

- Create: `tests/requirements.test.tsx`
- Modify: `lib/types.ts`
- Create: `content/en/requirements.mdx`
- Create: `content/es/requirements.mdx`

**Interfaces:**

- Consumes: `getPage(locale, slug)`, `GuidePage`, `PageSlug`, and real `generateMetadata`.
- Produces: valid localized `requirements` MDX rendered by the existing `[locale]/[slug]` route.

- [ ] **Step 1: Write the failing real-content test**

Create `tests/requirements.test.tsx` using the real loader, real metadata route, `GuidePage`, locale providers, and `afterEach(cleanup)`. Include the same `wordCount` helper as other content tests.

Assert these English values:

```ts
const englishTitle = 'Big Walk System Requirements: PC & Console Guide';
const englishDescription = 'Big Walk system requirements: confirmed Windows, RAM, DirectX, PS5, Switch 2, internet, and microphone details, with unannounced hardware marked pending.';
expect(page.content).toMatch(/^## PC minimum requirements\n\nPC minimum: 8 GB RAM and Windows 10; PS5 and Switch 2 play natively\./);
expect(page.content).toContain('8 GB RAM');
expect(page.content).toContain('16 GB RAM');
expect(page.content).toContain('DirectX 11');
expect(page.content).toContain('**Pending confirmation:**');
expect(page.content).toContain('official Steam page');
expect(page.content).not.toMatch(/(?:i[357]-\d|GTX|RTX|Radeon|5[–-]10 GB)/i);
expect(page.frontmatter.relatedLinks.map((link) => link.slug)).toEqual(['crossplay', 'game', 'beginner-tips']);
```

Mirror the behavior in Spanish with exact metadata and direct answer:

```ts
const spanishTitle = 'Guía de Big Walk system requirements para PC y consolas';
const spanishDescription = 'Big Walk system requirements resume Windows, RAM, DirectX, PS5, Switch 2, internet y micrófono, y marca CPU, GPU y almacenamiento sin anunciar como pendientes.';
expect(page.content).toMatch(/^## Requisitos mínimos de PC\n\nPC mínimo: 8 GB de RAM y Windows 10; PS5 y Switch 2 se juegan de forma nativa\./);
```

For both locales assert 40–60-character title and 140–160-character description, six TOC entries, eight FAQs, 1,050–1,350 body words, two rendered status cards, no external URL, expected localized links, and a serialized Spanish Unicode scan rejecting Han characters and U+FFFD.

- [ ] **Step 2: Observe RED**

Run:

```powershell
$env:PATH='C:\Users\34420\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;'+$env:PATH
.\node_modules\.bin\vitest.CMD run tests/requirements.test.tsx
```

Expected: both tests fail with `Unsupported locale or page slug`, because `requirements` is absent from `pageSlugs` and no MDX files exist.

- [ ] **Step 3: Implement the minimum valid route and content**

Add `'requirements'` after `'characters'` in `lib/types.ts`.

Create MDX documents with the tested metadata and direct-answer opening. Both documents must include six table-of-contents entries, status cards for `8 GB RAM`/`Native consoles` and localized equivalents, five source-bounded steps, eight FAQs, and related links to `crossplay`, `game`, and `beginner-tips`.

Use these H2 topics:

```md
## PC minimum requirements
## PC recommended requirements
## Console versions
## Other requirements
## What remains unconfirmed
## Requirements FAQ
```

State confirmed Windows, RAM, DirectX, console, internet, microphone/proximity-chat, and 1080p recommendation facts. Describe unannounced CPU/GPU/storage and all source estimates as pending, with no model number, storage figure, FPS, bandwidth, or performance promise. Repeat that the official Steam page is the final authority and may currently be incomplete. Include no external URL.

- [ ] **Step 4: Observe GREEN**

Run the focused command from Step 2. Expected: `tests/requirements.test.tsx` has two passing tests.

- [ ] **Step 5: Validate and commit**

Run full Vitest, `tsc --noEmit`, `next build`, and `git diff --check`; confirm `rg -n 'https?://' content/en/requirements.mdx content/es/requirements.mdx` returns no matches. Commit only task files:

```powershell
git add lib/types.ts content/en/requirements.mdx content/es/requirements.mdx tests/requirements.test.tsx
git commit -m "feat: add requirements guide"
```
