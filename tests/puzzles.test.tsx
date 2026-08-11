import { describe, expect, it } from 'vitest';

import { getPage } from '../lib/content';

const title = 'Big Walk Puzzle Solutions: Coordinates, Pegs & More';
const description = 'Big Walk puzzle solutions for coordinate inputs, including 4166 and 1899, peg boards, and hidden answers. See confirmed co-op clues and pending details.';
const officialUrl = 'https://store.steampowered.com/app/1478500/Big_Walk/';

describe('English puzzles guide', () => {
  it('loads the source-bounded keyword guide through the real content loader', async () => {
    const page = await getPage('en', 'puzzles');

    expect(page.frontmatter).toMatchObject({ title, description });
    expect(page.frontmatter.toc).toEqual([
      { id: 'confirmed-facts', label: 'What this guide confirms' },
      { id: 'coordinate-puzzles', label: 'Coordinate puzzles: 4166 and 1899' },
      { id: 'co-op-voice-chat', label: 'Co-op puzzle solving and proximity voice chat' },
      { id: 'puzzle-types', label: 'Item interaction and environmental puzzles' },
      { id: 'peg-board-puzzles', label: 'Peg-board puzzles' },
      { id: 'hidden-answers', label: 'Hidden answers' },
      { id: 'safe-use', label: 'How to use this page safely' },
      { id: 'official-source-review', label: 'Official-source review' },
    ]);
    expect(page.frontmatter.faqs).toHaveLength(8);
    expect(page.frontmatter.steps).toHaveLength(4);
    expect(page.frontmatter.relatedLinks.map(({ slug }) => slug)).toEqual([
      'walkthrough',
      'game',
      'beginner-tips',
    ]);

    expect(page.content).toMatch(/^## What this guide confirms\n\nAll Big Walk puzzle solutions are collected here\./);
    expect(page.content).toContain(
      'The values 4166 and 1899 are recorded here for the coordinate-puzzle topic. The official material reviewed for this page does not confirm where to enter them, which order to use, or what result they produce. **Pending confirmation:** treat both values as research notes, not a verified walkthrough.',
    );
    expect(page.content).toContain(
      'Peg-board puzzles are a topic this guide tracks, but the supplied official information does not confirm a board layout, a placement sequence, or a completion result. **Pending confirmation:** do not treat an unverified diagram or arrangement as a solution.',
    );
    expect(page.content).toContain(
      'Hidden answers are also tracked here, but the supplied information does not identify their locations or answer strings. **Pending confirmation:** this page will only add those details after an official source confirms them.',
    );

    const urls = page.content.match(/https?:\/\/[^\s)]+/g) ?? [];
    expect(urls).toEqual([officialUrl]);

    const words = page.content.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) ?? [];
    expect(words.length).toBeGreaterThanOrEqual(1_050);
    expect(words.length).toBeLessThanOrEqual(1_350);
  });

  it('returns the approved search metadata from the real article route', async () => {
    const { generateMetadata } = await import('../app/[locale]/[slug]/page');

    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: 'en', slug: 'puzzles' }),
    });

    expect(metadata).toMatchObject({ title, description });
  });
});
