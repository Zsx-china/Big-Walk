# Big Walk Wiki

A small bilingual, independent fan wiki for Big Walk. It uses the Next.js App Router, TypeScript, Tailwind CSS, and MDX frontmatter.

## Run it locally

From the workspace root, use these commands:

```bash
cd outputs/bigwalk-wiki
npm install
npm run dev
```

Open the local address printed by Next.js, then choose `/en` or `/es`.

## Project map

- `app/` contains routes, the locale layout, global CSS, and route metadata.
- `components/` contains the page sections and reusable JSON-LD renderer.
- `content/en` and `content/es` contain one MDX file per locale/page. Their frontmatter supplies titles, descriptions, steps, FAQs, and related guides.
- `lib/` validates and reads content, defines types and links, and creates Breadcrumb, FAQ, and HowTo schemas.
- `public/images/bigwalk-hero.png` is the original hero image used by the site.
- `tests/` contains Vitest coverage for content, UI, and schemas.

The locale home page is `app/[locale]/page.tsx`; guide pages are `app/[locale]/[slug]/page.tsx`. Styling lives in `app/globals.css` and Tailwind utility classes in components.

## SEO and offline fonts

Route metadata uses each MDX document's title and description and supplies locale-aware canonical paths. Content pages output BreadcrumbList JSON-LD, plus FAQPage and HowTo JSON-LD when their frontmatter provides FAQs or steps.

The design retains 400, 500, 600, and 700 font weights through the local/system sans-serif stack. It deliberately does not use `next/font/google`: that avoids Google Fonts network fetches, so production builds work offline.

## Validation

The final verification run used the local project binaries:

```bash
node_modules/.bin/vitest run
node_modules/.bin/tsc --noEmit
node_modules/.bin/next build
```

All three commands pass in the offline workspace.
