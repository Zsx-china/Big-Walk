# Big Walk Beginner Tips Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the localized Beginner Tips placeholders with approachable, fact-bounded first-hour guides covering the twelve supplied Big Walk mechanics and habits.

**Architecture:** The existing `GuidePage` already renders MDX frontmatter, body headings, status cards, steps, FAQs, related links, metadata, and locale-specific routes. Add one regression test file and replace only the English and Spanish MDX documents; no component, route, dependency, or page-slug changes are needed.

**Tech Stack:** Next.js 16 App Router, TypeScript, React, MDX frontmatter/content loader, next-intl locale routing, Vitest, Tailwind CSS.

## Global Constraints

- Modify only `content/en/beginner-tips.mdx`, `content/es/beginner-tips.mdx`, and the new `tests/beginner-tips.test.tsx`.
- Do not change layouts, components, styles, page slugs, `/about`, dependencies, or user-untracked files.
- English SEO: title `Big Walk Beginner Tips: 12 First-Hour Essentials` (48 characters) and description `Big Walk beginner tips explain 12 first-hour mechanics, tools, multiplayer habits, and starting-area goals using only supplied beginner-guide facts.` (148 characters).
- Spanish SEO: title `Guía Big Walk beginner tips: 12 claves iniciales` (48 characters) and description `Big Walk beginner tips presenta 12 claves para la primera hora: mecánicas, herramientas, cooperación y objetivos iniciales confirmados para gente nueva.` (152 characters).
- Both articles lead immediately with their approved localized first-hour answer, contain `Big Walk beginner tips` in title and description, and stay within 40–60 title characters and 140–160 description characters.
- Use exactly the twelve supplied mechanisms: item holding lock, slope sliding, throw versus kick, cancel kick, Lost & Found Pedestal, signal flares, item scanner, human tower, day-night cycle, no fall damage, player-count balancing, and leaving the starting area.
- Add no controller mappings, locations beyond supplied areas, routes, secret/easter-egg claims, character information, invented techniques, key codes, external URLs, or factual claims outside supplied material.
- Use `Pending confirmation` / `Pendiente de confirmación` where a control mapping or another omitted operational detail would otherwise be guessed.
- Include five MDX H2 body sections, five steps, eight FAQs, two hero status cards, three valid internal links (`puzzles`, `walkthrough`, `crossplay`), and 1,050–1,350 words per locale.
- Every Node-based command must prepend `C:\Users\34420\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin` to `PATH`.

---

### Task 1: Define the real Beginner Tips regression contract

**Files:**
- Create: `tests/beginner-tips.test.tsx`
- Read: `tests/requirements.test.tsx`, `components/GuidePage.tsx`, `lib/content.ts`, `app/[locale]/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getPage(locale, 'beginner-tips')`, `generateMetadata({params})`, `GuidePage({page})`, and the English/Spanish next-intl messages.
- Produces: executable assertions for the two existing Beginner Tips paths before their placeholder content is replaced.

- [ ] **Step 1: Write the failing English page test**

```tsx
const englishTitle = 'Big Walk Beginner Tips: 12 First-Hour Essentials';
const englishDescription = 'Big Walk beginner tips explain 12 first-hour mechanics, tools, multiplayer habits, and starting-area goals using only supplied beginner-guide facts.';

it('renders all supplied first-hour facts with exact SEO metadata', async () => {
  const page = await getPage('en', 'beginner-tips');
  const { generateMetadata } = await import('../app/[locale]/[slug]/page');
  const metadata = await generateMetadata({params: Promise.resolve({locale: 'en', slug: 'beginner-tips'})});

  expect(page.frontmatter.title).toBe(englishTitle);
  expect(page.frontmatter.title).toHaveLength(48);
  expect(page.frontmatter.description).toBe(englishDescription);
  expect(page.frontmatter.description).toHaveLength(148);
  expect(metadata).toMatchObject({title: englishTitle, description: englishDescription});
  expect(page.content).toMatch(/^## Core mechanics\n\nThe first hour has 12 Big Walk mechanics and tips worth knowing before you roam\./);
  expect(page.content).toContain('about 10 seconds');
  expect(page.content).toContain('orange terminal');
  expect(page.content).toContain('four red objects');
  expect(page.content).toContain('**Pending confirmation:**');
});
```

- [ ] **Step 2: Add complete English scope and rendering assertions**

```tsx
expect(page.frontmatter.toc).toHaveLength(6);
expect(page.frontmatter.steps).toHaveLength(5);
expect(page.frontmatter.faqs).toHaveLength(8);
expect(wordCount(page.content)).toBeGreaterThanOrEqual(1_050);
expect(wordCount(page.content)).toBeLessThanOrEqual(1_350);
for (const phrase of ['Item holding lock', 'Slope sliding', 'Throw versus kick', 'Cancel kick', 'Lost & Found Pedestal', 'Signal flares', 'Item scanner', 'Human tower', 'Day-night cycle', 'No fall damage', 'Player-count balancing', 'red stairs']) expect(page.content).toContain(phrase);
expect(page.content).toContain('8 minutes');
expect(page.content).toContain('6 minutes');
expect(page.content).not.toMatch(/https?:\/\//);
expect(page.content).not.toMatch(/(?:Xbox|Easter egg|secret code|press [ABXY])/i);
expect(page.frontmatter.relatedLinks.map((link) => link.slug)).toEqual(['puzzles', 'walkthrough', 'crossplay']);

render(<NextIntlClientProvider locale="en" messages={en}><GuidePage page={page} /></NextIntlClientProvider>);
expect(screen.getAllByTestId('status-card')).toHaveLength(2);
expect(screen.getByText('12 first-hour essentials')).toBeInTheDocument();
for (const link of screen.getAllByRole('link', {name: 'Big Walk Puzzle Solutions'})) expect(link).toHaveAttribute('href', '/en/puzzles');
```

- [ ] **Step 3: Write the Spanish mirror test**

```tsx
const spanishTitle = 'Guía Big Walk beginner tips: 12 claves iniciales';
const spanishDescription = 'Big Walk beginner tips presenta 12 claves para la primera hora: mecánicas, herramientas, cooperación y objetivos iniciales confirmados para gente nueva.';

it('renders the supplied first-hour guide in natural Spanish without invented controls', async () => {
  const page = await getPage('es', 'beginner-tips');
  const { generateMetadata } = await import('../app/[locale]/[slug]/page');
  const metadata = await generateMetadata({params: Promise.resolve({locale: 'es', slug: 'beginner-tips'})});

  expect(page.frontmatter.title).toBe(spanishTitle);
  expect(page.frontmatter.title).toHaveLength(48);
  expect(page.frontmatter.description).toBe(spanishDescription);
  expect(page.frontmatter.description).toHaveLength(152);
  expect(metadata).toMatchObject({title: spanishTitle, description: spanishDescription});
  expect(page.content).toMatch(/^## Mecanismos básicos\n\nLa primera hora tiene 12 mecanismos y consejos de Big Walk que conviene conocer antes de explorar\./);
  expect(page.content).toContain('unos 10 segundos');
  expect(page.content).toContain('terminal naranja');
  expect(page.content).toContain('cuatro objetos rojos');
  expect(page.content).toContain('**Pendiente de confirmación:**');
  expect(JSON.stringify(page)).not.toMatch(/[\u3400-\u9fff\ufffd]/u);
});
```

- [ ] **Step 4: Add Spanish counts, word range, route, and absence assertions**

```tsx
expect(page.frontmatter.toc).toHaveLength(6);
expect(page.frontmatter.steps).toHaveLength(5);
expect(page.frontmatter.faqs).toHaveLength(8);
expect(wordCount(page.content)).toBeGreaterThanOrEqual(1_050);
expect(wordCount(page.content)).toBeLessThanOrEqual(1_350);
for (const phrase of ['Bloqueo al sostener objetos', 'Deslizamiento por pendientes', 'Lanzar frente a patear', 'Cancelar una patada', 'Pedestal de objetos perdidos', 'Bengalas de señal', 'Escáner de objetos', 'Torre humana', 'Ciclo de día y noche', 'Sin daño por caída', 'Equilibrio por cantidad de jugadores', 'escaleras rojas']) expect(page.content).toContain(phrase);
expect(page.content).not.toMatch(/https?:\/\//);
expect(page.content).not.toMatch(/(?:Xbox|huevo de pascua|código secreto|pulsa [ABXY])/i);
expect(page.frontmatter.relatedLinks.map((link) => link.slug)).toEqual(['puzzles', 'walkthrough', 'crossplay']);

render(<NextIntlClientProvider locale="es" messages={es}><GuidePage page={page} /></NextIntlClientProvider>);
expect(screen.getAllByTestId('status-card')).toHaveLength(2);
expect(screen.getByText('12 claves iniciales')).toBeInTheDocument();
for (const link of screen.getAllByRole('link', {name: 'Soluciones de puzles de Big Walk'})) expect(link).toHaveAttribute('href', '/es/puzzles');
```

- [ ] **Step 5: Run the focused test in RED state**

Run:

```powershell
$env:PATH='C:\Users\34420\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;'+$env:PATH
.\node_modules\.bin\vitest.CMD run tests/beginner-tips.test.tsx
```

Expected: FAIL because the current frontmatter, opening, facts, counts, FAQ data, and step data are placeholders.

- [ ] **Step 6: Commit the red regression contract**

```powershell
git add tests/beginner-tips.test.tsx
git commit -m "test: define beginner tips guide"
```

### Task 2: Replace both localized Beginner Tips knowledge bases

**Files:**
- Modify: `content/en/beginner-tips.mdx`
- Modify: `content/es/beginner-tips.mdx`
- Test: `tests/beginner-tips.test.tsx`

**Interfaces:**
- Consumes: `PageFrontmatter` required by `getPage`; existing valid `PageSlug` values `puzzles`, `walkthrough`, and `crossplay`.
- Produces: complete localized documents rendered directly by `GuidePage` at `/en/beginner-tips` and `/es/beginner-tips`.

- [ ] **Step 1: Replace the English frontmatter and guide data**

Set the exact SEO strings from Global Constraints. Define this six-item TOC in order: `Core mechanics`, `Practical tools`, `World mechanics`, `Playing together`, `First-hour advice`, `Beginner FAQ`. Create two status cards with values `12 first-hour essentials` and `Start with the tutorial`; create five steps in this exact sequence: finish tutorial, test nearby mechanics, find Lost & Found, use communication tools when separated, begin the first red-area puzzle. Create eight FAQs for lock, sliding, throw/kick, flare, Lost & Found, scanner, player-count balancing, and the red-stairs key. Set related links in the exact order `puzzles`, `walkthrough`, `crossplay`.

- [ ] **Step 2: Write English body content through the five required sections**

Start `## Core mechanics` with the exact opening from Task 1. In friendly 3–4 sentence paragraphs, cover item holding lock with about ten seconds, icon fill, release persistence, and a second press to cancel; slope sitting, automatic downhill slide, seated stop, and second press to stand; overhead item plus charged kick for throwing versus a direct charged short kick; and Interact cancelling a charged kick. Mark the missing platform-specific Interact input as `**Pending confirmation:**` rather than name a button.

Under `## Practical tools`, cover Lost & Found in the starting area and its disconnect-held item behavior, signal flares from the orange terminal/red button with flash and loud sound, the in-range scanner X mark and grass searching, and human towers for sight lines and a tall landmark. Under `## World mechanics`, state supplied day of about 8 minutes, supplied dusk of about 6 minutes, sunset as a pause-and-watch moment, no fall damage, and the risk of dropping held items into grass. End these substantive sections with internal read-more links only.

Under `## Playing together`, state player count changes puzzle difficulty, the supplied three-person-to-two-player adjustment, and restart required to change player count. Explain that the red-stairs key is required to leave the starting area and comes from a mechanism using four red objects from four area puzzles. Under `## First-hour advice`, retain only the supplied first-hour order and advice: finish tutorial, test surroundings, find Lost & Found, begin the first red-area puzzle, explore without rushing, communicate, use a flare or human tower if lost, and recognize no single wrong way exists. Keep 1,050–1,350 words and do not add URLs.

- [ ] **Step 3: Replace the Spanish frontmatter and guide data**

Use the exact Spanish SEO strings from Global Constraints. Mirror the English six-item guide structure with `Mecanismos básicos`, `Herramientas prácticas`, `Mecánicas del mundo`, `Jugar en equipo`, `Consejos para la primera hora`, and `Preguntas frecuentes para principiantes`. Use status values `12 claves iniciales` and `Empieza con el tutorial`; preserve the same five steps, eight FAQ subjects, and related-slug order while translating labels naturally.

- [ ] **Step 4: Write a natural Spanish fact mirror**

Open the first H2 with the exact Spanish sentence from Task 1. Cover the twelve supplied facts with these checked labels: `Bloqueo al sostener objetos`, `Deslizamiento por pendientes`, `Lanzar frente a patear`, `Cancelar una patada`, `Pedestal de objetos perdidos`, `Bengalas de señal`, `Escáner de objetos`, `Torre humana`, `Ciclo de día y noche`, `Sin daño por caída`, `Equilibrio por cantidad de jugadores`, and `escaleras rojas`. Use `**Pendiente de confirmación:**` for an unspecified platform input, preserve the first-hour sequence and social advice, add only internal `/es/...` read-more links, and keep the body in the 1,050–1,350 word range with no raw Chinese text.

- [ ] **Step 5: Run focused tests in GREEN state**

Run:

```powershell
$env:PATH='C:\Users\34420\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;'+$env:PATH
.\node_modules\.bin\vitest.CMD run tests/beginner-tips.test.tsx
```

Expected: PASS for English and Spanish metadata, supplied mechanics, guide data, routes, word ranges, uncertainty labels, and rendering.

- [ ] **Step 6: Commit the localized content vertical slice**

```powershell
git add content/en/beginner-tips.mdx content/es/beginner-tips.mdx tests/beginner-tips.test.tsx
git commit -m "feat: add beginner tips guide"
```

### Task 3: Verify the full site and content boundaries

**Files:**
- Verify: `tests/**/*.test.tsx`, `content/en/beginner-tips.mdx`, `content/es/beginner-tips.mdx`

**Interfaces:**
- Consumes: committed localized MDX documents and the project’s existing Next.js build configuration.
- Produces: evidence that existing guides, the extended beginner content, metadata, type checks, and static production build remain valid.

- [ ] **Step 1: Run all tests**

```powershell
$env:PATH='C:\Users\34420\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;'+$env:PATH
.\node_modules\.bin\vitest.CMD run
```

Expected: all test files pass, including `tests/beginner-tips.test.tsx`.

- [ ] **Step 2: Run TypeScript checking**

```powershell
.\node_modules\.bin\tsc.CMD --noEmit
```

Expected: exit 0.

- [ ] **Step 3: Create a production build**

```powershell
.\node_modules\.bin\next.CMD build
```

Expected: exit 0 and successful production compilation.

- [ ] **Step 4: Check word bounds, URLs, and whitespace**

```powershell
$env:PATH='C:\Users\34420\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;'+$env:PATH
node -e "const fs=require('fs'); for (const l of ['en','es']) { const s=fs.readFileSync('content/'+l+'/beginner-tips.mdx','utf8'); const c=s.slice(s.indexOf('---',3)+3).trim(); const words=(c.match(/[\\p{L}\\p{N}]+(?:['’][\\p{L}\\p{N}]+)*/gu)||[]).length; const urls=[...c.matchAll(/\\]\\(([^)]+)\\)/g)].map(m=>m[1]).filter(u=>u.startsWith('http')); if (words<1050 || words>1350 || urls.length) throw new Error(l+': '+words+' words, '+urls.length+' external URLs'); console.log(l+': '+words+' words, 0 external URLs'); }"
git diff --check HEAD~2..HEAD
```

Expected: each article is within the word range with zero external URLs, and `git diff --check` has no output.

- [ ] **Step 5: Amend only if a required check exposed a correction**

If a validation command requires a source correction, make the narrow correction, rerun all Task 3 commands, then amend the source commit. Do not create an empty validation commit.

## Self-Review

1. **Spec coverage:** Task 1 proves dual-language SEO, first-hour opening, every supplied mechanism, FAQ/step counts, related links, uncertainty handling, absence boundaries, and rendering. Task 2 replaces only the two approved MDX documents with the exact data structure and fact set. Task 3 covers tests, types, production output, word bounds, link policy, and whitespace.
2. **Placeholder scan:** The plan supplies exact file paths, tested strings, commands, content labels, fact boundaries, and expected results without incomplete implementation markers.
3. **Type consistency:** The existing `getPage` accepts `beginner-tips`; all declared related links are existing values of `PageSlug`, and `GuidePage` consumes the existing `PageDocument` returned by the loader.

## Execution Handoff

Execute this plan on the existing `bigwalk-wiki-build` branch, as requested by the user. Preserve user-untracked files, use the established bundled Node runtime, and keep deployment outside scope.
