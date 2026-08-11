# Big Walk System Requirements Page Design

## Goal

Add localized `/en/requirements` and `/es/requirements` guides for the `big walk system requirements` search term, separating supplied facts from source estimates and unannounced hardware details.

## Route and rendering

- Add `requirements` to the existing `PageSlug` union.
- Reuse the localized dynamic route, MDX loader, metadata/schema generation, and `GuidePage` layout.
- Create `content/en/requirements.mdx` and `content/es/requirements.mdx`; do not alter shared components or navigation.

## Editorial boundaries

- The English article opens exactly: “PC minimum: 8 GB RAM and Windows 10; PS5 and Switch 2 play natively.” The Spanish article gives the equivalent direct answer.
- State the supplied PC facts: Windows 10 64-bit minimum, 8 GB RAM, DirectX 11, Windows 10/11 64-bit recommended, and 16 GB RAM recommended.
- CPU model, GPU model, official storage amount, detailed performance, exact resolution support, and specific SSD benefit are not official supplied specifications. Mark them pending confirmation; do not invent a CPU/GPU model, FPS target, storage figure, or performance claim.
- Treat “integrated graphics can run it,” “5–10 GB,” “any mid-range GPU,” and “SSD loads faster” only as source-reported estimates, never as official requirements.
- State the supplied console facts: PS5 and Switch 2 run natively; Switch 2 supports handheld and docked modes. Cover supplied internet, microphone/proximity-chat, and recommended 1080p context without inventing bandwidth or audio hardware requirements.
- Tell readers the Steam system-requirements block may be incomplete and the official Steam page should be the final authority.

## Page structure

- SEO title contains `big walk system requirements` and stays within 40–60 characters; description contains the keyword and stays within 140–160 characters.
- Target 1,050–1,350 words per locale, with six H2 sections for PC minimum, PC recommended, console versions, other requirements, confirmation limits, and FAQ.
- Reuse established frontmatter: six table-of-contents entries, two status cards, five short steps, eight FAQs, and internal links to the crossplay, game, and beginner tips guides.
- Keep the existing visual design, bilingual labels, breadcrumb, sidebar, footer, and no external URL.

## Verification

- Add real-content tests for metadata, direct answer, 8/16 GB memory, the mandatory pending-confirmation boundary, no invented hardware models or storage figure, expected counts, no external URL, internal links, rendered status cards, and valid Spanish Unicode.
- Run focused Vitest, full Vitest, TypeScript check, production build, and `git diff --check`.
