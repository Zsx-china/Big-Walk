# Big Walk Codes / Join Codes page update — design

## Goal

Replace the generic Codes guide with a bilingual, source-bounded explanation of Big Walk Join Codes. The page must immediately distinguish temporary multiplayer Join Codes from nonexistent official redemption codes, without publishing fake or invented codes.

## Scope

- Update `content/en/codes.mdx` and `content/es/codes.mdx`.
- Use existing MDX guide rendering, TOC, status card, reader steps, FAQ, and localized article routes.
- Add focused content/metadata/rendering tests following the existing puzzle-guide test pattern.
- Do not add a redemption-code list, generator, network feature, new component, external fan-site link, or unrelated guide changes.

## Source policy

The supplied three-source research supports these page claims:

- No official Big Walk redemption-code system has been announced; current status is `None announced`.
- Temporary Join Codes let a guest enter a host's multiplayer session.
- A host generates a Join Code when starting a multiplayer session.
- A guest enters the code to join an existing game.
- Codes are session-specific and not permanent.
- Join Codes do not carry progress or save data.
- Provided cross-platform research says Join Codes work across supported PC, PS5, and Switch 2 platforms.
- The material was last checked on August 6, 2026.
- Unsourced strings advertised as free-item, reward, or promo codes should be treated cautiously; the research found no working redemption codes.

Do not represent a fan-site claim as an official statement. Attribute the PC/PS5/Switch 2 compatibility statement to the supplied research, and mark any code length, entry menu, expiry timing, error message, save-transfer behavior, platform exception, or reward as **Pending confirmation** / **Pendiente de confirmación**.

## English SEO

- Title: `Big Walk Codes: Join Codes, Not Redeem Codes` (44 characters).
- Description: `Big Walk codes are temporary Join Codes for multiplayer sessions, not redeem codes. Learn how hosts create them, guests use them, and what remains unconfirmed.` (159 characters).
- Both contain the keyword `Big Walk codes` case-insensitively.

## Content design

The English article targets about 1,200 words, and Spanish provides an equivalent natural translation. The article begins directly with: `There are currently no official Big Walk redeem codes. Big Walk uses temporary Join Codes instead.` The Spanish page begins with the equivalent direct answer.

Use eight H2 sections with three or four scannable sentences each:

1. Current status: `None announced` and August 6, 2026 review date.
2. What a Join Code is.
3. How a host gets a Join Code.
4. How a guest uses a Join Code.
5. Session scope and cross-platform research.
6. What a Join Code does not carry.
7. Why free-item/promo-code lists are unsafe.
8. Pending confirmation and official-source boundaries.

Frontmatter supplies a status card with `None announced`, eight FAQs, four reader-guidance steps, and valid related links. The FAQ confirms no official redemption codes and distinguishes session access from progress/save data. No individual code string appears anywhere in either page.

## Localization and links

The article body includes visible locale-correct related-guide links using existing routes only. No article external link is required: sources are integrated as supplied research, while the site footer continues to own official outbound links.

## Test strategy

- Load actual English and Spanish Codes MDX with `getPage` and exercise English article metadata through the real route export.
- Verify exact English SEO lengths, direct answer, `None announced`, review date, Join Code facts, PC/PS5/Switch 2 research attribution, pending labels, FAQ/step counts, and no fake-code/reward strings.
- Render both articles through `GuidePage` to verify visible localized related links and semantic strong pending labels.
- Run focused tests, the full suite, TypeScript check, and Next production build.

## Acceptance criteria

- No redemption-code value, reward, promotion, character, invented rule, or unverified technical detail appears.
- Both locale routes convey the same confirmed and pending facts.
- The English SEO title/description meet required character ranges and keyword inclusion.
- Readers can distinguish host-generated Join Codes from nonexistent official redeem codes before reading background detail.
