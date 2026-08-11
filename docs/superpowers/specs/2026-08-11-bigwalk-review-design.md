# Big Walk review page design

## Goal

Create a source-bounded review overview at `/review` in English and Spanish. It gives search visitors the supplied Metacritic and IGN scores immediately, then separates critical praise, mild criticism, and early Steam player feedback without presenting the wiki as the reviewer.

## Route and presentation

- Add `review` to the existing page-slug list so `/en/review` and `/es/review` use the established localized article route, structured data, `GuidePage`, status cards, table of contents, steps, FAQ, breadcrumbs, and footer.
- Do not change the primary navigation or make a new visual component.
- Use two status cards: `Metascore` = `93/100` and `IGN score` = `9/10`; each card identifies its supplied source.
- Use internal links only to the existing game, puzzles, and walkthrough guides. The supplied research gives source names but no canonical URLs, so this article adds no external URLs.

## SEO and article structure

- English title: `Big Walk Review: 93 Metascore & IGN 9/10` (40 characters).
- English description: `Big Walk review covers Metacritic's 93/100, IGN's 9/10, critic praise and mild criticism, plus early Steam player feedback at launch from supplied reviews.` (156 characters).
- Spanish title: `Big Walk review: 93 Metascore e IGN 9/10` (40 characters).
- Spanish description: `Big Walk review cubre el 93/100 de Metacritic y el 9/10 de IGN, con elogios de críticos, crítica leve y comentarios tempranos de Steam al lanzamiento.` (149 characters).
- The English opening directly says: `Big Walk has a 93/100 Metascore, IGN gave it 9/10, and the supplied reviews are broadly positive.` The Spanish article mirrors this meaning.
- Each MDX body targets 1,050–1,350 words with three or four sentences in every prose paragraph. H2 sections cover scores and consensus, IGN's review, shared praise, mild criticism, early Steam feedback, and limits/FAQ.

## Source boundaries

- State only supplied score facts: Metacritic 93/100, universal critical acclaim from 30+ outlet scores, IGN 9/10 and `Amazing`, and Steam's early `Overwhelmingly Positive` response after the August 4, 2026 release.
- Quote only the supplied IGN sentence, attributed to IGN: `A delightful, chaotic co-op adventure that captures the joy of simply hanging out with friends.`
- Attribute critical praise to the supplied IGN and Metacritic material: proximity voice chat, open-world exploration, satisfying puzzle design, casual and dedicated-group suitability, charming art style, cooperative depth, nonlinear progression, and friend-friendly difficulty.
- Attribute the mild criticism exactly: some puzzles can feel unclear without external guidance; some early Steam reviewers want more content or endgame. Do not add a major flaw, a numeric Steam review count, sales data, player count, reviewer names, or a ranking beyond the supplied summaries.
- Mark sales figures, future reviews, detailed endgame information, and anything not supplied as `Pending confirmation` / `Pendiente de confirmación`.

## Testing

- Add a focused real-content/route/render test for `/en/review` and `/es/review`.
- Assert literal title and description values and lengths, direct opening, two visible status cards, six TOC sections, at least eight FAQs, quoted IGN sentence, both score facts, mild criticism, no invented sales numbers or external URLs, word count range, and valid Spanish Unicode.
- Run focused Vitest then one combined full Vitest, TypeScript, production-build, whitespace, and source-boundary check after implementation.
