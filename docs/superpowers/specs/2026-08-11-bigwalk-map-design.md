# Big Walk Map Page Design

## Goal

Add localized `/en/map` and `/es/map` guides for the `big walk map` search term using only the supplied MapGenie and Polygon research.

## Route and rendering

- Add `map` to the existing `PageSlug` union.
- Reuse the localized dynamic route, existing MDX loader, metadata generation, schema generation, and `GuidePage` layout.
- Create `content/en/map.mdx` and `content/es/map.mdx`; do not change shared components or navigation.

## Editorial boundaries

- The English article opens exactly: “The in-game map is obtained in the Red Tower Map Room; MapGenie is the recommended external interactive map.”
- The Spanish article carries the equivalent direct answer.
- Cover the in-game Map Room, the MapGenie-described top-down interactive-map features, the six supplied regions, and source-bounded navigation advice.
- Identify the Red Tower puzzle completion as the supplied route to the Map Room and the static island map. Do not add puzzle steps, coordinates, locations, or map markers not supplied.
- State that the Map Room map does not automatically update explored areas and that landmarks can be used for navigation.
- Use pending-confirmation labels for any unprovided detailed route, coordinate, marker inventory, completion rule, or update schedule.
- The supplied MapGenie domain could not be accessed to validate an exact page URL. Mention MapGenie by name but add no external URL or guessed link.

## Page structure

- SEO title contains `big walk map` and stays within 40–60 characters; description contains the keyword and stays within 140–160 characters.
- Target 1,050–1,350 words per locale, with sections for the in-game map, external map tool, region breakdown, navigation tips, limits, and FAQ.
- Use existing frontmatter: 6–7 table-of-contents items, 2 status cards, 5 short steps, 8 FAQs, and internal links to the walkthrough, puzzles, and game guides.
- Keep the established full-width guide design, bilingual localized labels, and existing breadcrumb/sidebar/footer behavior.

## Verification

- Add a real-content Vitest test for both locales covering metadata, direct answer, source boundaries, FAQ/TOC counts, no external URL, valid localization, and page rendering.
- Run the focused test, complete Vitest suite, TypeScript check, production build, and `git diff --check`.
