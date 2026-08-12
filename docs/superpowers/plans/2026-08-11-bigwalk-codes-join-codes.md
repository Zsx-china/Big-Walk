# Big Walk Codes / Join Codes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace generic Codes pages with bilingual, source-bounded Join Code guides that make clear no official redemption codes have been announced.

**Architecture:** Use the existing App Router article route and MDX `GuidePage`. Localized `codes.mdx` files contain SEO, status, sections, FAQs, steps, and visible related links; a real loader/route/renderer test protects the information boundary.

**Tech Stack:** Next.js App Router, TypeScript, MDX, next-intl, Vitest, Testing Library.

## Global Constraints

- Current official redemption-code status is exactly `None announced`.
- Join Codes are host-generated, temporary/session-specific multiplayer access codes; guests enter them to join and they do not carry progress or save data.
- The PC/PS5/Switch 2 statement is supplied research, not an official claim.
- Display last checked `August 6, 2026` / `6 de agosto de 2026`.
- Never publish a redemption code, reward, character, code length, entry menu, expiry, error, platform exception, or extra save-transfer rule; label unknown detail **Pending confirmation** / **Pendiente de confirmación**.
- English title: `Big Walk Codes: Join Codes, Not Redeem Codes` (44 characters).
- English description: `Big Walk codes are temporary Join Codes for multiplayer sessions, not redeem codes. Learn how hosts create them, guests use them, and what remains unconfirmed.` (159 characters).
- English begins `There are currently no official Big Walk redeem codes. Big Walk uses temporary Join Codes instead.` Spanish begins with its approved equivalent.
- Both pages target about 1,200 words, eight FAQs, four reader-guidance steps, eight H2 sections with 3–4 scannable sentences, and visible localized related links.
- Do not add external fan/research links or change unrelated components/content/untracked files.

---

### Task 1: English Codes / Join Codes guide

**Files:**
- Create: `tests/codes.test.tsx`
- Modify: `content/en/codes.mdx`
- Verify: `app/[locale]/[slug]/page.tsx`, `components/GuidePage.tsx`

**Interfaces:**
- Use `getPage('en', 'codes')` from `lib/content.ts`.
- Use the article route `generateMetadata` with English codes params.
- Render `<GuidePage page={page} />` in an English `NextIntlClientProvider`.

- [ ] **Step 1: Write failing English loader, metadata, and renderer assertions**

Add `tests/codes.test.tsx` containing these core assertions:

```tsx
expect(page.frontmatter.title).toBe('Big Walk Codes: Join Codes, Not Redeem Codes');
expect(page.frontmatter.description.length).toBeGreaterThanOrEqual(140);
expect(page.frontmatter.description.length).toBeLessThanOrEqual(160);
expect(page.content).toMatch(/^## Current status\n\nThere are currently no official Big Walk redeem codes\./);
expect(page.content).toContain('None announced');
expect(page.content).toContain('August 6, 2026');
expect(page.content).toContain('PC, PS5, and Switch 2');
expect(page.content).toContain('Pending confirmation');
expect(metadata).toMatchObject({ title, description });
expect(screen.getByRole('link', { name: /Big Walk Game Guide/ })).toHaveAttribute('href', '/en/game');
expect(screen.getByText('Pending confirmation:').tagName).toBe('STRONG');
```

- [ ] **Step 2: Run focused tests and verify red**

Run `.\node_modules\.bin\vitest.CMD run tests/codes.test.tsx` with the bundled Node PATH. Expected: old generic Codes MDX fails status/date/Join Code/platform/metadata/rendered-link checks.

- [ ] **Step 3: Replace English Codes MDX with the Join Code guide**

Set the exact title/description and `updatedAt: "August 6, 2026"`. Add a `None announced` status card with the last-check date. Use H2 ids `current-status`, `no-redeem-codes`, `what-is-join-code`, `host-gets-code`, `guest-uses-code`, `session-crossplay`, `no-progress-data`, and `safety-pending`. Start exactly with the required direct answer. Write about 1,200 English words using only Global Constraints. Attribute PC/PS5/Switch 2 to supplied research, label unknown format/timing/menu/errors/exceptions **Pending confirmation**, add eight FAQs/four reader steps, and visible `Read more:` links to `/en/game`, `/en/save`, `/en/beginner-tips`.

```mdx
---
title: "Big Walk Codes: Join Codes, Not Redeem Codes"
description: "Big Walk codes are temporary Join Codes for multiplayer sessions, not redeem codes. Learn how hosts create them, guests use them, and what remains unconfirmed."
updatedAt: "August 6, 2026"
---

## Current status

There are currently no official Big Walk redeem codes. Big Walk uses temporary Join Codes instead.
```

- [ ] **Step 4: Verify English and commit**

Run the focused test. When it passes, commit only `tests/codes.test.tsx` and `content/en/codes.mdx` with message `feat: publish English Join Codes guide`.

### Task 2: Spanish equivalent Codes / Join Codes guide

**Files:**
- Modify: `content/es/codes.mdx`
- Modify: `tests/codes.test.tsx`

**Interfaces:**
- Use `getPage('es', 'codes')` and render `<GuidePage page={page} />` inside an `es` `NextIntlClientProvider`.
- Produce equivalent `/es/codes` information and visible links to `/es/game`, `/es/save`, and `/es/beginner-tips`.

- [ ] **Step 1: Add failing Spanish content/render assertions**

Test `Actualmente no hay códigos oficiales de canje para Big Walk. Big Walk usa Join Codes temporales en su lugar.`, `None announced`, `6 de agosto de 2026`, `Join Codes`, `PC, PS5 y Switch 2`, `Pendiente de confirmación`, eight TOC entries, semantic strong pending label, and `/es/game` / `/es/save` visible links.

```tsx
expect(page.content).toMatch(/^## Estado actual\n\nActualmente no hay códigos oficiales de canje para Big Walk\./);
expect(page.content).toContain('Pendiente de confirmación');
expect(screen.getByRole('link', { name: /Guía del juego Big Walk/ })).toHaveAttribute('href', '/es/game');
expect(screen.getByText('Pendiente de confirmación:').tagName).toBe('STRONG');
```

- [ ] **Step 2: Run focused tests and verify Spanish is red**

Run `.\node_modules\.bin\vitest.CMD run tests/codes.test.tsx`. Expected: generic Spanish page fails the new direct-answer, status/date, Join Code, platform, pending-label, TOC, and rendered-link assertions.

- [ ] **Step 3: Replace Spanish Codes MDX with an equivalent article**

Set natural Spanish metadata and `updatedAt: "6 de agosto de 2026"`. Mirror the eight English sections/facts using `Pendiente de confirmación` for every unknown technical detail. Display `None announced`, identify platform compatibility as supplied research, add eight FAQs/four reader steps, and visible `Leer más:` links to `/es/game`, `/es/save`, `/es/beginner-tips`. Do not publish a code string or external source link.

```mdx
---
updatedAt: "6 de agosto de 2026"
---

## Estado actual

Actualmente no hay códigos oficiales de canje para Big Walk. Big Walk usa Join Codes temporales en su lugar.
```

- [ ] **Step 4: Verify Spanish and commit**

Run the focused test. When it passes, commit only `content/es/codes.mdx` and `tests/codes.test.tsx` with message `feat: localize Join Codes guide`.

### Task 3: Source-bound and production verification

**Files:**
- Verify: `content/en/codes.mdx`, `content/es/codes.mdx`, `tests/codes.test.tsx`

- [ ] **Step 1: Audit article boundaries**

Run `rg -n "https?://" content/en/codes.mdx content/es/codes.mdx` and `rg -n "None announced|Pending confirmation|Pendiente de confirmación" content/en/codes.mdx content/es/codes.mdx`. Expected: no external article URL; both articles have status and pending labels.

- [ ] **Step 2: Run complete verification**

Run `.\node_modules\.bin\vitest.CMD run`, `.\node_modules\.bin\tsc.CMD --noEmit`, `.\node_modules\.bin\next.CMD build`, and `git diff --check`. Expected: zero failures/errors and a clean diff.

- [ ] **Step 3: Commit a correction only if verification demands it**

If a real Codes content/test defect appears, make the minimal correction, rerun every Task 3 command, and commit only the corrected Codes MDX/test files with message `fix: verify Join Codes guide`. If all checks pass, create no empty commit.
