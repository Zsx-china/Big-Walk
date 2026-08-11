import { cleanup, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { afterEach, describe, expect, it } from 'vitest';

import { GuidePage } from '../components/GuidePage';
import { getPage } from '../lib/content';
import en from '../messages/en.json';

const title = 'Big Walk Walkthrough: Towers, Tunnels & Ending';
const description = 'Big Walk walkthrough maps the Tutorial Area, Drawbridge, towers, Yellow Tunnel, and ending, with host-save facts and clearly marked unknowns.';

afterEach(cleanup);

describe('English walkthrough guide', () => {
  it('loads the staged, source-bounded walkthrough through the real content and route boundaries', async () => {
    const page = await getPage('en', 'walkthrough');
    const { generateMetadata } = await import('../app/[locale]/[slug]/page');
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: 'en', slug: 'walkthrough' }),
    });

    expect(page.frontmatter.title).toBe(title);
    expect(page.frontmatter.description).toHaveLength(141);
    expect(page.content).toMatch(/^## Tutorial Area\n\nA complete walkthrough from the Tutorial Area to the Black Tower ending\./);
    expect(page.frontmatter.toc).toHaveLength(8);
    expect(page.frontmatter.steps).toHaveLength(8);
    expect(page.frontmatter.faqs).toHaveLength(8);
    expect(page.content).toContain('Map Room');
    expect(page.content).toContain('chairlift');
    expect(page.content).toContain('underground maze');
    expect(page.content).toContain('host owns the save');
    expect(page.content).toContain('Pending confirmation');
    expect((page.content.match(/[\p{L}\p{N}]+(?:['鈥橾[\p{L}\p{N}]+)*/gu) ?? []).length).toBeGreaterThanOrEqual(1_050);
    expect((page.content.match(/[\p{L}\p{N}]+(?:['鈥橾[\p{L}\p{N}]+)*/gu) ?? []).length).toBeLessThanOrEqual(1_350);
    expect(metadata).toMatchObject({ title, description });

    render(
      <NextIntlClientProvider locale="en" messages={en}>
        <GuidePage page={page} />
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole('link', { name: 'Big Walk Puzzle Solutions' })).toHaveAttribute('href', '/en/puzzles');
    expect(screen.getByRole('link', { name: 'Big Walk Save Ownership Guide' })).toHaveAttribute('href', '/en/save');
    expect(screen.getByRole('link', { name: 'Big Walk Game Guide' })).toHaveAttribute('href', '/en/game');
    expect(screen.getByText('Supplied walkthrough research closes with the first ending after Black Tower, not official confirmation.')).toBeInTheDocument();
  });
});
