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
      alternates: {
        canonical: 'https://www.bigwalk.blog/en',
        languages: {
          en: 'https://www.bigwalk.blog/en',
          es: 'https://www.bigwalk.blog/es',
          'x-default': 'https://www.bigwalk.blog/en',
        },
      },
      openGraph: {
        url: 'https://www.bigwalk.blog/en',
        siteName: 'Big Walk Wiki',
        images: [expect.objectContaining({ url: 'https://www.bigwalk.blog/images/bigwalk-hero.png' })],
      },
      twitter: {
        card: 'summary_large_image',
        images: ['https://www.bigwalk.blog/images/bigwalk-hero.png'],
      },
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
    expect(metadata.alternates).toEqual({
      canonical: 'https://www.bigwalk.blog/es',
      languages: {
        en: 'https://www.bigwalk.blog/en',
        es: 'https://www.bigwalk.blog/es',
        'x-default': 'https://www.bigwalk.blog/en',
      },
    });
  });

  it('uses page-specific language alternates and social metadata for guides', async () => {
    const { generateMetadata } = await import('../app/[locale]/[slug]/page');

    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: 'es', slug: 'puzzles' }),
    });

    expect(metadata).toMatchObject({
      alternates: {
        canonical: 'https://www.bigwalk.blog/es/puzzles',
        languages: {
          en: 'https://www.bigwalk.blog/en/puzzles',
          es: 'https://www.bigwalk.blog/es/puzzles',
          'x-default': 'https://www.bigwalk.blog/en/puzzles',
        },
      },
      openGraph: {
        url: 'https://www.bigwalk.blog/es/puzzles',
        locale: 'es_ES',
      },
      twitter: { card: 'summary_large_image' },
    });
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
