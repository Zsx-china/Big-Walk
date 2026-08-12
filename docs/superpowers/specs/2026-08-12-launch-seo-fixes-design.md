# Big Walk Launch SEO Fixes Design

## Goal

Fix the production SEO launch blockers without changing page copy, navigation, or visual design.

## Scope

- Publish `/robots.txt` allowing crawling and declaring `https://www.bigwalk.blog/sitemap.xml`.
- Generate the sitemap from the existing locale and page-slug sources so every English and Spanish public page is included.
- Emit route-specific canonical and alternate-language URLs for English and Spanish counterparts.
- Emit Open Graph and Twitter card metadata using the existing hero image.
- Preserve the existing page titles, descriptions, structured data, content, and UI.

## Architecture

Next.js metadata routes remain the single source of truth. `app/robots.ts` produces the robots response, while `app/sitemap.ts` derives URLs from `i18n/config.ts` and `lib/types.ts` instead of maintaining a duplicate hard-coded list. A small metadata helper in `lib/schema.ts` creates canonical, language-alternate, Open Graph, and Twitter fields consistently for home and guide routes.

## Validation

Tests must prove the robots policy, complete bilingual sitemap, page-specific language alternates, and social metadata. Verification includes the focused SEO tests, the complete Vitest suite, TypeScript checking, and a production Next.js build. After pushing, the production URLs are checked directly.

## Deployment

Commit the scoped changes to `main` and push to `origin/main`. Vercel is expected to deploy from that branch; production verification happens only after the deployment reflects the new commit.
