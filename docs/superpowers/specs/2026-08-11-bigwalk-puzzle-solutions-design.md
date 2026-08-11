# Big Walk Puzzle Solutions page update — design

## Goal

Turn the existing generic Puzzle page into a source-bounded, multilingual guide for the English keyword **big walk puzzle solutions**. The page must answer the player immediately, use only the supplied Steam-derived facts, and make every unverified detail visibly pending rather than invented.

## Scope

- Update `content/en/puzzles.mdx` and `content/es/puzzles.mdx` with matching facts in English and Spanish.
- Keep the existing MDX guide-page layout, header, sidebar, FAQ, and responsive behavior.
- Update metadata behavior/tests only as needed for the English puzzle route.
- Do not change the home page, links module, footer, unrelated guide content, or hero assets.

## Source policy

Only these claims are treated as confirmed:

- Big Walk is a multiplayer cooperative adventure game where up to 11 friends explore a large open world together.
- Players solve puzzles as a group using proximity voice chat; friends sound quieter as they move farther away.
- Coordinate puzzles are a core mechanic.
- Players cooperate on puzzles to progress.
- Puzzle categories include coordinate input, item interaction, and environmental puzzles.
- The supplied research scope names the coordinate values `4166` and `1899`, peg-board puzzles, and hidden answers.

The page must not claim a coordinate-entry location, entry order, puzzle outcome, peg-board solution, hidden-answer location, character, reward, code, or numerical game system unless listed above. Each missing instruction is labelled **Pending confirmation** / **Pendiente de confirmación**.

## English SEO

- Title: `Big Walk Puzzle Solutions: Coordinates, Pegs & More` (51 characters).
- Description: `Big Walk puzzle solutions for coordinate inputs, including 4166 and 1899, peg boards, and hidden answers. See confirmed co-op clues and pending details.` (152 characters).
- The English title and description include the keyword `Big Walk puzzle solutions` (case-insensitive).
- The Spanish route uses localized metadata and does not pretend to target the English keyword.

## Content design

The English article targets roughly 1,200 words; the Spanish translation carries the same factual meaning rather than a machine-overwritten copy. Both begin with the direct answer: **All Big Walk puzzle solutions are collected here.** / **Todas las soluciones de puzles de Big Walk se recopilan aquí.**

Each H2 contains three or four scannable sentences, followed by a relevant internal “Read more” link where the guide template supports it:

1. **What this guide confirms** — direct answer and the limits of the verified information.
2. **Coordinate puzzles: 4166 and 1899** — record both supplied values; mark their input location, sequence, and result pending.
3. **Co-op puzzle solving and proximity voice chat** — explain the official multiplayer/cooperation facts without inventing tactics.
4. **Item interaction and environmental puzzles** — list the confirmed categories and distinguish facts from unknown solutions.
5. **Peg-board puzzles** — state that detailed inputs, placements, and results are pending confirmation.
6. **Hidden answers** — state that locations and answer strings are pending confirmation.
7. **How to use this page safely** — explain that readers should use confirmed facts and avoid treating pending entries as solutions.
8. **Official-source review** — cite the official Steam listing in plain language and link only to the approved Steam page.

The frontmatter will provide matching table-of-contents anchors, a concise verified-status card, several short non-invented steps, at least eight FAQ entries, and related internal links. FAQ answers repeat the uncertainty boundaries instead of fabricating solutions.

## Rendering and localization

The existing MDX guide renderer and `GuidePage` stay responsible for headings, the sidebar, tables, steps, FAQ disclosures, and links. Localized MDX content supplies language-specific copy and labels; the language switch continues to map `/en/puzzles` to `/es/puzzles`.

## Test strategy

- Add or update a focused puzzle-page test that loads actual English and Spanish MDX through the existing loader/route renderer.
- Assert English metadata title/description keyword constraints and the direct-answer opening.
- Assert the supplied coordinate values, pending-confirmation labels, official Steam link, and absence of invented code/reward claims.
- Assert the Spanish route renders its translated direct answer and retains the same two coordinates/pending boundary.
- Run the focused test, full Vitest suite, TypeScript check, and Next production build.

## Acceptance criteria

- The English puzzle route meets the requested title (40–60 characters) and description (140–160 characters) limits.
- Both language routes have consistent verified facts and explicit uncertainty labels.
- The page directly answers the search intent before game background.
- No source-unbounded puzzle instructions, character names, redemption codes, or numerical claims appear.
- Existing locale switching, responsive guide layout, and canonical metadata behavior remain intact.
