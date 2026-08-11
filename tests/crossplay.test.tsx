import { cleanup, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { afterEach, describe, expect, it } from 'vitest';

import { GuidePage } from '../components/GuidePage';
import { getPage, type PageSlug } from '../lib/content';
import en from '../messages/en.json';
import es from '../messages/es.json';

const englishTitle = 'Big Walk Crossplay Guide: PC, PS5 & Switch 2';
const englishDescription = 'Big Walk crossplay lets PC, PS5, and Nintendo Switch 2 players join the same session with Join Codes; saves and achievements stay platform-specific.';
const spanishTitle = 'Guía de Big Walk crossplay: PC, PS5 y Switch 2';
const spanishDescription = 'Big Walk crossplay permite que jugadores de PC, PS5 y Nintendo Switch 2 se unan con Join Codes; los guardados y logros son específicos de cada plataforma.';

function wordCount(content: string) {
  return (content.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) ?? []).length;
}

afterEach(cleanup);

describe('English crossplay guide', () => {
  it('renders its search metadata and confirmed cross-platform boundaries through the real route content', async () => {
    const page = await getPage('en', 'crossplay' as PageSlug);
    const { generateMetadata } = await import('../app/[locale]/[slug]/page');
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: 'en', slug: 'crossplay' }),
    });

    expect(page.frontmatter.title).toBe(englishTitle);
    expect(page.frontmatter.title).toHaveLength(44);
    expect(page.frontmatter.description).toBe(englishDescription);
    expect(page.frontmatter.description).toHaveLength(148);
    expect(metadata).toMatchObject({ title: englishTitle, description: englishDescription });
    expect(page.content).toMatch(/^## Crossplay status\n\nBig Walk supports cross-platform multiplayer between PC, PS5, and Nintendo Switch 2\./);
    expect(page.frontmatter.toc).toHaveLength(8);
    expect(page.frontmatter.faqs).toHaveLength(8);
    expect(wordCount(page.content)).toBeGreaterThanOrEqual(1_050);
    expect(wordCount(page.content)).toBeLessThanOrEqual(1_350);
    expect(page.content).toContain('12 players total');
    expect(page.content).toContain('proximity voice chat');
    expect(page.content).toContain('platform-specific');
    expect(page.content).toContain('Pending confirmation');
    expect(page.content).not.toMatch(/Xbox/i);
    expect(page.content).not.toMatch(/https?:\/\//);
    expect(page.frontmatter.relatedLinks.map((link) => link.slug)).toEqual(['codes', 'save', 'game']);

    render(
      <NextIntlClientProvider locale="en" messages={en}>
        <GuidePage page={page} />
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole('region', { name: 'Wiki status' })).toBeInTheDocument();
    expect(screen.getAllByTestId('status-card')).toHaveLength(2);
    expect(screen.getByText('Fully supported')).toBeInTheDocument();
    expect(screen.getByText('Platform-specific')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Big Walk Codes Guide' })).toHaveAttribute('href', '/en/codes');
    expect(screen.getByRole('link', { name: 'Big Walk Save Guide' })).toHaveAttribute('href', '/en/save');
    expect(screen.getByRole('link', { name: 'Big Walk Game Guide' })).toHaveAttribute('href', '/en/game');
  });
});

describe('Spanish crossplay guide', () => {
  it('renders equivalent crossplay facts with valid Spanish text through the real route content', async () => {
    const page = await getPage('es', 'crossplay' as PageSlug);
    const { generateMetadata } = await import('../app/[locale]/[slug]/page');
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: 'es', slug: 'crossplay' }),
    });

    expect(page.frontmatter.title).toBe(spanishTitle);
    expect(page.frontmatter.title).toHaveLength(46);
    expect(page.frontmatter.description).toBe(spanishDescription);
    expect(page.frontmatter.description).toHaveLength(154);
    expect(metadata).toMatchObject({ title: spanishTitle, description: spanishDescription });
    expect(page.content).toMatch(/^## Estado del crossplay\n\nBig Walk admite multijugador multiplataforma entre PC, PS5 y Nintendo Switch 2\./);
    expect(page.frontmatter.toc).toHaveLength(8);
    expect(page.frontmatter.faqs).toHaveLength(8);
    expect(wordCount(page.content)).toBeGreaterThanOrEqual(1_050);
    expect(wordCount(page.content)).toBeLessThanOrEqual(1_350);
    expect(page.content).toContain('12 jugadores en total');
    expect(page.content).toContain('chat de voz por proximidad');
    expect(page.content).toContain('específicos de cada plataforma');
    expect(page.content).toContain('Pendiente de confirmación');
    expect(page.content).not.toMatch(/Xbox/i);
    expect(page.content).not.toMatch(/https?:\/\//);
    expect(page.frontmatter.relatedLinks.map((link) => link.slug)).toEqual(['codes', 'save', 'game']);
    const serializedSpanish = JSON.stringify({ metadata, frontmatter: page.frontmatter, content: page.content });

    expect(serializedSpanish).not.toMatch(/[\u3400-\u9fff\ufffd]/u);
    expect(serializedSpanish).toContain('á');
    expect(serializedSpanish).toContain('í');
    expect(serializedSpanish).toContain('ó');

    render(
      <NextIntlClientProvider locale="es" messages={es}>
        <GuidePage page={page} />
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole('region', { name: 'Wiki status' })).toBeInTheDocument();
    expect(screen.getAllByTestId('status-card')).toHaveLength(2);
    expect(screen.getByText('Totalmente compatible')).toBeInTheDocument();
    expect(screen.getByText('Específicos de cada plataforma')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Guía de códigos de Big Walk' })).toHaveAttribute('href', '/es/codes');
    expect(screen.getByRole('link', { name: 'Guía de guardado de Big Walk' })).toHaveAttribute('href', '/es/save');
    expect(screen.getByRole('link', { name: 'Guía del juego Big Walk' })).toHaveAttribute('href', '/es/game');
  });
});
