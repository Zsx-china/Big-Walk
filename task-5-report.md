# Task 5 report — wiki home page

Implemented the localized home page and its responsive presentation components.

- `Hero` uses the supplied `public/images/bigwalk-hero.png` via `next/image` with `fill`, `sizes="100vw"`, `priority`, useful alt text, a dark contrast overlay, home copy, and a warm verified-guide card.
- `StatusCards` renders the four home-data status cards in one, two, and four columns at small, tablet, and desktop breakpoints.
- `GuideCards`, `HomePage`, and `app/[locale]/page.tsx` compose the full localized route with the shared shell, Bottom CTA, and footer.
- Added the required fixture-based home rendering test.

Verification run:

```text
node_modules/.bin/vitest.cmd run tests/home.test.tsx
1 test file passed; 1 test passed.
```
