# Launch SEO Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish complete crawl, sitemap, language-alternate, and social-sharing metadata for the Big Walk site.

**Architecture:** Use native Next.js metadata routes and a shared metadata helper. Derive public URLs from the existing `locales` and `pageSlugs` exports so route coverage cannot drift.

**Tech Stack:** Next.js App Router, TypeScript, Vitest.

## Global Constraints

- Do not change page copy, navigation, or visual design.
- Use `https://www.bigwalk.blog` as the production origin.
- Include every English and Spanish page represented by `pageSlugs`.
- Run focused tests, full tests, TypeScript, and production build before pushing.

---

### Task 1: SEO route and metadata regression tests

**Files:**
- Modify: `tests/seo.test.tsx`
- Create: `tests/metadata-routes.test.ts`

- [ ] Add assertions for the robots policy and sitemap URL.
- [ ] Add assertions that the sitemap contains every `locales × pageSlugs` URL exactly once.
- [ ] Add assertions that home and article metadata contain canonical, `en`, `es`, `x-default`, Open Graph, and Twitter fields.
- [ ] Run the focused tests and verify they fail only because the requested behavior is absent.

### Task 2: Native metadata route implementation

**Files:**
- Create: `app/robots.ts`
- Modify: `app/sitemap.ts`
- Modify: `lib/schema.ts`
- Modify: `app/[locale]/page.tsx`
- Modify: `app/[locale]/[slug]/page.tsx`
- Modify: `app/[locale]/layout.tsx`

- [ ] Add the native robots metadata route.
- [ ] Generate sitemap entries from `locales` and `pageSlugs`.
- [ ] Add a shared route-metadata helper for canonical, alternates, Open Graph, and Twitter cards.
- [ ] Apply the helper to home and article metadata while preserving existing title and description behavior.
- [ ] Run focused tests until they pass.

### Task 3: Verification and deployment

**Files:**
- No additional production files.

- [ ] Run the complete Vitest suite.
- [ ] Run `tsc --noEmit`.
- [ ] Run the Next.js production build.
- [ ] Review the diff for scope and formatting.
- [ ] Commit and push `main` to `origin/main`.
- [ ] Verify production `robots.txt`, the complete sitemap, language alternates, and social metadata.
