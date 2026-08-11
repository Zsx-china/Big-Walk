# Big Walk Wiki Overview Page Design

## Goal

Add localized `/en/wiki` and `/es/wiki` game-overview pages for the `big walk wiki` search term while preserving the existing independent-site `/about` page.

## Route and rendering

- Add `wiki` to the existing `PageSlug` union.
- Reuse the localized dynamic route, MDX loader, metadata/schema generation, and `GuidePage` layout.
- Create `content/en/wiki.mdx` and `content/es/wiki.mdx`; leave `about` and shared components unchanged.

## Editorial boundaries

- The English opening states exactly: “Big Walk is a 2–12 player cooperative adventure game developed by House House, released on August 4, 2026.” The Spanish page gives the equivalent direct answer.
- State the supplied game facts: House House in Melbourne, Australia; Panic Inc. publisher; Windows/Steam, PS5, and Switch 2 platforms; cooperative adventure/puzzle/open-world genres; 2–12 online players; proximity voice chat; non-linear exploration; outback-inspired visuals; and hanging-out focus.
- Describe House House's association with Untitled Goose Game only as supplied background. Mark engine, studio size, Twitter/X, sales figure, and every unprovided development fact pending confirmation; do not give an engine name, studio headcount, or sales number.
- Include only supplied official links: `https://bigwalk.game/`, `https://bigwalk.game/faq/`, `https://bigwalk.game/eula/`, `https://bigwalk.game/presskit/`, and `https://www.youtube.com/@HouseHouseGames`. Do not link Wikipedia, third-party fan sites, or Twitter/X.

## Page structure

- SEO title contains `big walk wiki` and stays within 40–60 characters; description contains the keyword and stays within 140–160 characters.
- Target 1,050–1,350 words per locale, with six H2 sections for game overview, developer/publisher, game features, official resources, background knowledge, and FAQ.
- Reuse established frontmatter: six table-of-contents entries, two status cards, five short steps, eight FAQs, and internal links to the game, crossplay, and beginner tips guides.
- Keep the existing visual design, bilingual labels, breadcrumb, sidebar, footer, and the specified official external URLs.

## Verification

- Add real-content tests for metadata, direct answer, supplied facts, required uncertainty labels, all and only five approved official URLs, expected counts, internal links, rendered status cards, and valid Spanish Unicode.
- Run focused Vitest, full Vitest, TypeScript check, production build, and `git diff --check`.
