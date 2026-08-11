# Big Walk Characters Page Design

## Goal

Add localized `/en/characters` and `/es/characters` guides for the `big walk characters` search term, correcting the search intent without inventing a named cast.

## Route and rendering

- Add `characters` to the existing `PageSlug` union.
- Reuse the localized dynamic route, MDX loader, metadata generation, schemas, and `GuidePage` layout.
- Create `content/en/characters.mdx` and `content/es/characters.mdx`; do not alter shared components or navigation.

## Editorial boundaries

- The English opening states exactly: “Big Walk has no traditional named characters; players control customizable avatars.” The Spanish page gives the equivalent answer.
- State that the supplied material identifies no named NPCs, dialogue-character list, or selectable character roster; the player's avatar is the character.
- Cover supplied customization, backpacks, belt equipment, cosmetics, the supplied red-bridge backpack note, and the supplied Yellow Tower/Salon shiny-appearance note.
- Treat the red-bridge, Yellow Tower, Salon, and any specific unlock condition as source-reported details with pending confirmation; do not add a route, item list, or unlock instructions.
- List only the supplied shared abilities: walk/run, crouch/sit and slope sliding, overhead hold with supplied approximate ten-second lock, kick/throw, limited climbing, and proximity voice chat.
- Never invent a character name, NPC, biography, dialogue, class, stat, ability difference, or cosmetic inventory.

## Page structure

- SEO title contains `big walk characters` and stays within 40–60 characters; description contains the keyword and stays within 140–160 characters.
- Target 1,050–1,350 words per locale, with six H2 sections for character concept, customization, equipment, shared abilities, unknowns, and FAQ.
- Reuse established frontmatter: six table-of-contents entries, two status cards, five short steps, eight FAQs, and internal links to the game, beginner tips, and walkthrough guides.
- Keep the existing visual design, bilingual labels, breadcrumb, sidebar, footer, and no external URL.

## Verification

- Add a real-content test for metadata, direct answer, stated no-roster boundary, source-reported equipment boundary, shared abilities, expected counts, no external URL, internal links, render output, and valid Spanish Unicode.
- Run focused Vitest, full Vitest, TypeScript check, production build, and `git diff --check`.
