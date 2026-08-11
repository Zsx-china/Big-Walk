# Big Walk crossplay page design

## Goal

Create a dedicated, search-focused crossplay guide at `/crossplay`, with English and Spanish versions. It answers whether PC, PlayStation 5, and Nintendo Switch 2 players can play together without moving unrelated content into the existing game or codes guides.

## Page and routing

- Add `crossplay` to the existing supported page-slug list so `/en/crossplay` and `/es/crossplay` use the current localized route and `GuidePage` layout.
- Add `content/en/crossplay.mdx` and `content/es/crossplay.mdx`; do not change the global navigation for this focused article.
- Link internally to the existing Join Codes, save, and game guides. Add no external URLs because the supplied research contains source names and facts, not canonical source URLs.

## Content and SEO

- English title: `Big Walk Crossplay Guide: PC, PS5 & Switch 2` (47 characters).
- English description: `Big Walk crossplay lets PC, PS5, and Nintendo Switch 2 players join the same session with Join Codes; saves and achievements stay platform-specific.` (144 characters).
- Spanish title: `Guía de Big Walk crossplay: PC, PS5 y Switch 2` (49 characters).
- Spanish description: `Big Walk crossplay permite que jugadores de PC, PS5 y Nintendo Switch 2 se unan con Join Codes; los guardados y logros son específicos de cada plataforma.` (151 characters).
- The English opening directly says: `Big Walk supports cross-platform multiplayer between PC, PS5, and Nintendo Switch 2.` The Spanish article mirrors that meaning.
- Each article targets about 1,200 words. It uses scannable H2 sections for crossplay status, supported platforms, using a Join Code, the 12-player session limit, cross-platform proximity voice chat, saves and achievements, limitations, and FAQ. Each prose paragraph has three or four sentences.

## Source boundaries

- Treat the provided Official FAQ facts as confirmed: full crossplay across the three launch platforms, Join Codes regardless of host/guest platform, no platform-specific multiplayer restriction, and cross-platform proximity voice chat.
- Use the provided IGN facts only for a 12-player maximum and for platform-specific saves and achievements/trophies.
- State that a PC save does not transfer to console; do not claim that any platform, progress, achievement, or trophy transfers.
- Do not mention Xbox or future platforms. Do not invent menus, account steps, matchmaking behavior, version rules, regional restrictions, or input instructions. Mark those operational details `Pending confirmation` / `Pendiente de confirmación` where helpful.

## Presentation and testing

- Reuse the existing `GuidePage`, status cards, table of contents, numbered steps, FAQ, breadcrumbs, metadata, and structured-data paths; no new visual components are needed.
- Status cards will summarize full crossplay support and the platform-specific save boundary.
- Add focused regression coverage for both locale routes, exact metadata requirements, the direct answer, three-platform support, Join Codes, 12-player limit, platform-specific saves/achievements, absence of Xbox, and visible status cards.
- Run the focused test plus one full Vitest run, TypeScript check, and production build once after the combined change.
