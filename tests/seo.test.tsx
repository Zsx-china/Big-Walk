import { cleanup, render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { afterEach, describe, expect, it, vi } from 'vitest';

import en from '../messages/en.json';

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe('homepage SEO', () => {
  it('returns the approved English search metadata', async () => {
    const { generateMetadata } = await import('../app/[locale]/page');

    const metadata = await generateMetadata({ params: Promise.resolve({ locale: 'en' }) });

    expect(metadata).toMatchObject({
      title: 'Big Walk Wiki — Puzzle Solutions, Codes & Walkthrough',
      description: 'Your complete guide to Big Walk: all puzzle solutions, active codes, walkthrough tips, crossplay info & more. Updated daily by the community.',
      keywords: 'Big Walk, Big Walk codes, Big Walk puzzle solutions, Big Walk walkthrough, Big Walk crossplay, Big Walk guide',
    });
  });

  it('keeps Spanish homepage metadata sourced from its frontmatter', async () => {
    const { generateMetadata } = await import('../app/[locale]/page');

    const metadata = await generateMetadata({ params: Promise.resolve({ locale: 'es' }) });

    expect(metadata).toMatchObject({
      title: 'Big Walk Wiki | Tu guía tranquila del camino',
      description: 'Guías claras y con avisos de spoilers para jugadores de Big Walk.',
    });
    expect(metadata.keywords).toBeUndefined();
  });

  it('emits WebSite JSON-LD with the configured public site URL', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://bigwalk.test/');
    const { default: LocaleHomePage } = await import('../app/[locale]/page');
    const homepage = await LocaleHomePage({ params: Promise.resolve({ locale: 'en' }) });

    const { container } = render(
      <NextIntlClientProvider locale="en" messages={en}>
        {homepage}
      </NextIntlClientProvider>,
    );
    const schemas = Array.from(container.querySelectorAll('script[type="application/ld+json"]'))
      .map((script) => JSON.parse(script.textContent ?? '{}'));

    expect(schemas).toEqual(expect.arrayContaining([
      expect.objectContaining({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Big Walk Wiki',
        url: 'https://bigwalk.test',
      }),
    ]));
  });
});
