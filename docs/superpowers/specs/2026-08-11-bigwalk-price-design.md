# Big Walk price page design

## Goal

Create a source-bounded price guide at `/price` in English and Spanish. It gives the $19.99 standard price immediately, explains the confirmed platform and discount boundaries, and gives only a conditional buying suggestion grounded in the supplied price and review information.

## Route and presentation

- Add `price` to the existing page-slug list so `/en/price` and `/es/price` use the established localized route, `GuidePage`, metadata, schemas, status cards, table of contents, FAQ, and footer.
- Do not change primary navigation or build a new visual component.
- Show two status cards: `Standard price` = `$19.99 USD` and `Current discount` = `No active discount` / `Full Price`.
- Use only internal links to existing review, crossplay, and game guides. The supplied material has source names but no canonical URLs, so the new page adds no external URLs.

## SEO and article structure

- English title: `Big Walk Price Guide: $19.99 on PC, PS5 & Switch 2`.
- English description: `Big Walk price is $19.99 on PC, PS5, and Nintendo Switch 2, with no active discount, DLC, demo, or subscription service confirmed as of August 10, 2026.`
- Spanish title: `Guía de Big Walk price: $19.99 en PC, PS5 y Switch 2`.
- Spanish description: `Big Walk price es $19.99 en PC, PS5 y Nintendo Switch 2, sin descuento activo ni DLC, demo o servicio de suscripción confirmado al 10 de agosto de 2026.`
- English opening: `Big Walk's standard price is $19.99, with the same base price across platforms.` The Spanish article mirrors this meaning.
- Each body targets 1,050–1,350 words, with three or four sentences in every prose paragraph. H2 sections cover standard price, platform comparison, regional pricing, discount status, DLC/demos/subscriptions, whether to buy, and limits/FAQ.

## Source boundaries

- State the supplied facts: $19.99 USD standard price across PC/Steam, PS5, and Nintendo Switch 2; Panic Inc. publisher; August 4, 2026 release; multiple regional currencies; full price with no active discount; historical low $19.99 as the launch price; no announced DLC, season pass, free demo, or subscription service as of August 10, 2026.
- Explain that local currency, tax, and small regional differences may apply, but do not invent a regional conversion or tax-inclusive amount.
- Mark the first discount, Steam seasonal-sale participation, future DLC/pass/demo/subscription availability, and exact local checkout total as `Pending confirmation` / `Pendiente de confirmación`.
- The value section may state only a conditional suggestion: a $19.99 standard price may be worth considering for players who value cooperative play and the supplied 93/100 Metacritic reception. It must not claim a content length, content quantity, discount value, or universal recommendation.

## Testing

- Add focused real-content/route/render coverage for both price paths.
- Assert literal metadata and lengths, direct answer, two cards, seven TOC sections, at least eight FAQs, $19.99, no active discount, absent DLC/demo/subscription, conditional review-grounded buying text, pending labels, no external URL, and valid Spanish Unicode.
- Run focused Vitest then one combined full Vitest, TypeScript, production-build, whitespace, and source-boundary check after implementation.
