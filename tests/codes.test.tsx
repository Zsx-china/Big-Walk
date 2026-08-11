import { cleanup, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { afterEach, describe, expect, it } from 'vitest';

import { GuidePage } from '../components/GuidePage';
import { getPage } from '../lib/content';
import en from '../messages/en.json';

const title = 'Big Walk Codes: Join Codes, Not Redeem Codes';
const description = 'Big Walk codes are temporary Join Codes for multiplayer sessions, not redeem codes. Learn how hosts create them, guests use them, and what remains unconfirmed.';

afterEach(cleanup);

describe('English codes guide', () => {
  it('loads the Join Codes guidance through the real content loader', async () => {
    const page = await getPage('en', 'codes');

    expect(page.frontmatter.title).toBe(title);
    expect(page.frontmatter.description.length).toBeGreaterThanOrEqual(140);
    expect(page.frontmatter.description.length).toBeLessThanOrEqual(160);
    expect(page.content).toMatch(/^## Current status\n\nThere are currently no official Big Walk redeem codes\./);
    expect(page.content).toContain('None announced');
    expect(page.content).toContain('August 6, 2026');
    expect(page.content).toContain('PC, PS5, and Switch 2');
    expect(page.content).toContain('Pending confirmation');

    const words = page.content.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? [];
    expect(words.length).toBeGreaterThanOrEqual(1_050);
    expect(words.length).toBeLessThanOrEqual(1_350);
  });

  it('returns the Join Codes metadata from the real article route', async () => {
    const { generateMetadata } = await import('../app/[locale]/[slug]/page');

    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: 'en', slug: 'codes' }),
    });

    expect(metadata).toMatchObject({ title, description });
  });

  it('renders the English related guide link and pending label', async () => {
    const page = await getPage('en', 'codes');

    render(
      <NextIntlClientProvider locale="en" messages={en}>
        <GuidePage page={page} />
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole('link', { name: /Big Walk Game Guide/ })).toHaveAttribute('href', '/en/game');
    const pendingLabels = screen.getAllByText('Pending confirmation:');
    expect(pendingLabels).toHaveLength(7);
    for (const label of pendingLabels) expect(label.tagName).toBe('STRONG');
  });
});
