# Big Walk Walkthrough Content Design

## Goal

Replace the generic English and Spanish `/walkthrough` articles with source-bounded, stage-based guides for the `big walk walkthrough` keyword.

## Scope

- Update only `content/en/walkthrough.mdx`, `content/es/walkthrough.mdx`, and focused tests required to prove the user-visible content, metadata, and localized links.
- Keep the existing App Router route, MDX loader, `GuidePage` layout, navigation, page routes, and CTA destinations unchanged.
- Do not add a map widget, a new component, an external link, or a route.

## Information boundary

The provided walkthrough research records this stage order:

1. Tutorial Area
2. Drawbridge
3. Red Tower
4. Green Tower
5. Blue Tower
6. Yellow Tunnel
7. Black Tower
8. Ending

The supplied milestones are:

- Complete four red-area puzzles at the Drawbridge to obtain a key; crossing it unlocks Red Tower.
- Completing Red Tower gives access to the Map Room.
- Completing Green Tower makes the chairlift available.
- Completing Blue Tower makes the train available.
- Completing Yellow Tunnel unlocks the underground maze.
- Completing Black Tower triggers the first ending.

The supplied progress facts are: the host owns the save, changing host means restarting the session, and a Join Code is not a save credential.

The page must describe all of these as supplied walkthrough research rather than an official confirmation. It must never invent directional instructions, puzzle solutions, action counts beyond the supplied four red-area puzzles, menu paths, timing, platform rules, character names, rewards, or any extra save-transfer behavior. A detail outside the supplied facts uses the exact locale label **Pending confirmation:** / **Pendiente de confirmación:**.

## English article

- Title: `Big Walk Walkthrough: Towers, Tunnels & Ending` (46 characters).
- Description: `Big Walk walkthrough maps the Tutorial Area, Drawbridge, towers, Yellow Tunnel, and ending, with host-save facts and clearly marked unknowns.` (141 characters).
- Start with: `A complete walkthrough from the Tutorial Area to the Black Tower ending.`
- Use eight H2 sections matching the research stages. Each has three or four scan-friendly sentences.
- Target approximately 1,200 English words.
- Use the existing frontmatter steps as an eight-stage timeline and list the provided milestones without adding navigation steps.
- Include eight FAQs, a status card that distinguishes supplied route research from official confirmation, and visible `Read more:` links to `/en/puzzles`, `/en/save`, and `/en/game`.

## Spanish article

- Publish a natural Spanish equivalent using the same eight stages, milestones, progress facts, FAQ coverage, timeline, and uncertainty boundaries.
- Start with: `Una guía completa desde el área de tutorial hasta el primer final de la Torre Negra.`
- Use `Pendiente de confirmación:` for every unsupported detail.
- Set a natural Spanish title and description; the description includes `Big Walk` and `recorrido`, is 140–160 characters, and accurately mirrors the English intent.
- Use visible `Leer más:` links to `/es/puzzles`, `/es/save`, and `/es/game`.

## Testing and verification

- Add a focused `tests/walkthrough.test.tsx` that loads real MDX through `getPage`, checks English route metadata, and renders the real `GuidePage` in both locales.
- Test exact direct openings, all eight timeline stages, required milestones/progress facts, source-bounded pending labels, metadata length/title, and all three localized body links.
- Use TDD: observe the test fail with the generic existing content before replacing MDX.
- Verify focused tests, the full Vitest suite, `tsc --noEmit`, `next build`, `git diff --check`, and an audit confirming no external URLs in either walkthrough article.
