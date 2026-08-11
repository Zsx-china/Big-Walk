# Big Walk Beginner Tips Content Design

## Goal

Replace the current placeholder Beginner Tips articles with friendly, fact-bounded first-hour guides at `/en/beginner-tips` and `/es/beginner-tips`. The guides will help a new player understand the twelve supplied mechanics and habits without inventing tactics, collectibles, controls, or hidden content.

## Scope and Architecture

- Modify only `content/en/beginner-tips.mdx` and `content/es/beginner-tips.mdx`; retain the existing localized dynamic route, `GuidePage`, components, styles, and `/about` page.
- Use the existing frontmatter contract for the hero status cards, table of contents, five steps, eight FAQ items, and three internal related links.
- Use five MDX H2 sections: Core mechanics, Practical tools, World mechanics, Playing together, and First-hour advice. The existing template renders FAQ as its own foldable section after the article body; it remains the sixth navigation item.
- No external links are needed because the request supplies facts but no official destination to cite. Keep all reader navigation internal.

## SEO and Opening Answer

English frontmatter:

- Title: `Big Walk Beginner Tips: 12 First-Hour Essentials` (48 characters)
- Description: `Big Walk beginner tips explain 12 first-hour mechanics, tools, multiplayer habits, and starting-area goals using only supplied beginner-guide facts.` (148 characters)
- Immediate answer: `The first hour has 12 Big Walk mechanics and tips worth knowing before you roam.`

Spanish frontmatter:

- Title: `Guía Big Walk beginner tips: 12 claves iniciales` (48 characters)
- Description: `Big Walk beginner tips presenta 12 claves para la primera hora: mecánicas, herramientas, cooperación y objetivos iniciales confirmados para gente nueva.` (152 characters)
- Immediate answer: `La primera hora tiene 12 mecanismos y consejos de Big Walk que conviene conocer antes de explorar.`

Both titles and descriptions include the exact keyword `Big Walk beginner tips` case-insensitively and meet the supplied 40–60 / 140–160 character limits.

## Confirmed Content Boundary

The two articles mirror these supplied facts with natural localized wording:

1. **Item holding lock:** holding an item overhead for about ten seconds fills an icon; releasing then keeps it held until another press cancels it. Use it for lengthy item transport.
2. **Slope sliding:** sit on a slope to slide downhill automatically; remaining still keeps the seated state; press again to stand. Use it to travel downhill quickly.
3. **Throw versus kick:** holding an item overhead before charging a kick throws it; charging a kick directly produces a short-distance kick.
4. **Cancel kick:** press Interact while a kick is charging to cancel it. No platform-specific button mapping is supplied.
5. **Lost & Found Pedestal:** in the starting area, an item held at the last disconnect appears at the pedestal. Carry important items when ending a session.
6. **Signal flares:** an orange terminal and red button launch a flare high into the air with a bright flash and loud sound for regrouping.
7. **Item scanner:** the hand-held device identifies interactive items in range and shows an X-shaped mark when close; use it to search grass for hidden items.
8. **Human tower:** hold a teammate, including one holding another teammate, to stack players; the top player sees farther and becomes a tall landmark.
9. **Day-night cycle:** day is supplied as about eight minutes and dusk as about six minutes; sunset is presented as a reason to pause and watch.
10. **No fall damage:** a fall does not remove health but drops held items; small items can be lost in grass, so remember where they fell.
11. **Player-count balancing:** player count changes puzzle difficulty; a supplied three-person puzzle can need only two people in a two-player session; changing player count requires restarting the session.
12. **Leaving the starting area:** a key at the top of the red stairs is required; the key is locked by a mechanism solved with four red objects obtained from four area puzzles.

The final section uses only the supplied first-hour sequence: finish the tutorial, test the immediate surroundings, locate Lost & Found, then begin the first red-area puzzle. It also keeps the supplied advice to explore slowly, communicate with friends, use a flare or human tower when lost, and recognize that there is no single wrong way to play.

## Explicit Non-Goals and Uncertainty

- Do not add exact movement routes, hidden-item locations, Easter eggs, character information, unrevealed puzzle solutions, key codes, or controller mappings.
- Do not turn the supplied approximate day/dusk timing into a universal performance or session guarantee.
- Where an omitted operational detail would require a source not supplied here, state `Pending confirmation` / `Pendiente de confirmación` instead of guessing.
- Do not add external URLs or cite the source publishers in the article body.

## Guide Data and Presentation

- The hero uses two status cards: `12 first-hour essentials` / `12 claves iniciales` and `Start with the tutorial` / `Empieza con el tutorial`.
- Five steps turn the supplied first-hour sequence into short, friendly actions without inventing locations or input instructions.
- Eight FAQs answer the most useful beginner questions: held-item lock, sliding, throw or kick, flare use, Lost & Found, scanner, player-count balancing, and the red-stairs key.
- The related links point only to existing internal slugs: `puzzles`, `walkthrough`, and `crossplay`.
- Article content targets 1,050–1,350 words per locale, with scan-friendly paragraphs of three to four sentences and one internal read-more link at the end of each substantive section.

## Test Contract

Add `tests/beginner-tips.test.tsx` before content changes. It will load and render both real locale pages through `GuidePage` and assert:

- exact SEO strings and their character lengths, including route metadata;
- the immediate localized answer, all twelve supplied mechanism labels/facts, five H2/TOC content sections, eight FAQs, and five steps;
- required first-hour advice, internal related destinations, no external URLs, and pending-confirmation wording where a control mapping would otherwise be guessed;
- absence of fabricated control-button names, secret/easter-egg claims, numeric routes, and raw Chinese or replacement characters in Spanish rendering.

Focused tests run first in RED state because the placeholder content lacks the required facts. The smallest content-only replacement then makes those tests green, followed by full Vitest, TypeScript, production build, whitespace, word-count, and exact external-link verification.
