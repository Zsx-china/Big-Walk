import { cleanup, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { afterEach, describe, expect, it } from 'vitest';

import { GuidePage } from '../components/GuidePage';
import { getPage } from '../lib/content';
import en from '../messages/en.json';
import es from '../messages/es.json';

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

describe('Spanish codes guide', () => {
  it('loads the Spanish Join Codes guidance through the real content loader', async () => {
    const page = await getPage('es', 'codes');

    expect(page.content).toMatch(/^## Estado actual\n\nActualmente no hay c\u00f3digos oficiales de canje para Big Walk\./);
    expect(page.content).toContain('None announced');
    expect(page.content).toContain('6 de agosto de 2026');
    expect(page.content).toContain('Join Codes');
    expect(page.content).toContain('PC, PS5 y Switch 2');
    expect(page.content).toContain('Pendiente de confirmaci\u00f3n');
    expect(page.frontmatter.toc).toHaveLength(8);
    expect(page.frontmatter.faqs).toHaveLength(8);
    expect(page.frontmatter.steps).toHaveLength(4);
  });

  it('returns the Spanish Join Codes metadata from the real article route', async () => {
    const { generateMetadata } = await import('../app/[locale]/[slug]/page');

    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: 'es', slug: 'codes' }),
    });

    expect(metadata).toMatchObject({
      title: 'C\u00f3digos de Big Walk: Join Codes, no c\u00f3digos de canje',
      description: 'Los c\u00f3digos de Big Walk son Join Codes temporales para sesiones multijugador, no c\u00f3digos de canje. Aprende lo confirmado y lo que sigue pendiente.',
    });
  });

  it('renders Spanish related guide links and semantic pending labels', async () => {
    const page = await getPage('es', 'codes');

    render(
      <NextIntlClientProvider locale="es" messages={es}>
        <GuidePage page={page} />
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole('link', { name: /Gu\u00eda del juego Big Walk/ })).toHaveAttribute('href', '/es/game');
    expect(screen.getByRole('link', { name: /Gu\u00eda de guardado de Big Walk/ })).toHaveAttribute('href', '/es/save');
    const pendingLabels = screen.getAllByText('Pendiente de confirmaci\u00f3n:');
    expect(pendingLabels).toHaveLength(7);
    for (const label of pendingLabels) expect(label.tagName).toBe('STRONG');
  });
});
