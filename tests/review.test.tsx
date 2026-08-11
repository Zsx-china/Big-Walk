import { cleanup, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { afterEach, describe, expect, it } from 'vitest';

import { GuidePage } from '../components/GuidePage';
import { getPage, type PageSlug } from '../lib/content';
import en from '../messages/en.json';
import es from '../messages/es.json';

const englishTitle = 'Big Walk Review: 93 Metascore & IGN 9/10';
const englishDescription = "Big Walk review covers Metacritic's 93/100, IGN's 9/10, critic praise and mild criticism, plus early Steam player feedback at launch from supplied reviews.";
const spanishTitle = 'Big Walk review: 93 Metascore e IGN 9/10';
const spanishDescription = 'Big Walk review cubre el 93/100 de Metacritic y el 9/10 de IGN, con elogios de críticos, crítica leve y comentarios tempranos de Steam al lanzamiento.';
const ignQuote = 'A delightful, chaotic co-op adventure that captures the joy of simply hanging out with friends.';

function wordCount(content: string) {
  return (content.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) ?? []).length;
}

afterEach(cleanup);

describe('English review guide', () => {
  it('renders the supplied scores, quote, and balanced criticism through the real route content', async () => {
    const page = await getPage('en', 'review' as PageSlug);
    const { generateMetadata } = await import('../app/[locale]/[slug]/page');
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: 'en', slug: 'review' }),
    });

    expect(page.frontmatter.title).toBe(englishTitle);
    expect(page.frontmatter.title).toHaveLength(40);
    expect(page.frontmatter.description).toBe(englishDescription);
    expect(page.frontmatter.description).toHaveLength(155);
    expect(metadata).toMatchObject({ title: englishTitle, description: englishDescription });
    expect(page.content).toMatch(/^## Scores and consensus\n\nBig Walk has a 93\/100 Metascore, IGN gave it 9\/10, and the supplied reviews are broadly positive\./);
    expect(page.frontmatter.toc).toHaveLength(6);
    expect(page.frontmatter.faqs).toHaveLength(8);
    expect(wordCount(page.content)).toBeGreaterThanOrEqual(1_050);
    expect(wordCount(page.content)).toBeLessThanOrEqual(1_350);
    expect(page.content.match(new RegExp(ignQuote.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'))).toHaveLength(1);
    expect(page.content).toContain('some puzzles can feel unclear without external guidance');
    expect(page.content).toContain('Overwhelmingly Positive');
    expect(page.content).toContain('**Pending confirmation:** sales figures');
    expect(page.content).not.toMatch(/https?:\/\//);
    expect(page.frontmatter.relatedLinks.map((link) => link.slug)).toEqual(['game', 'puzzles', 'walkthrough']);

    render(
      <NextIntlClientProvider locale="en" messages={en}>
        <GuidePage page={page} />
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole('region', { name: 'Wiki status' })).toBeInTheDocument();
    expect(screen.getAllByTestId('status-card')).toHaveLength(2);
    expect(screen.getByText('93/100')).toBeInTheDocument();
    expect(screen.getByText('9/10')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Big Walk Game Guide' })).toHaveAttribute('href', '/en/game');
    expect(screen.getByRole('link', { name: 'Big Walk Puzzle Solutions' })).toHaveAttribute('href', '/en/puzzles');
    expect(screen.getByRole('link', { name: 'Big Walk Walkthrough' })).toHaveAttribute('href', '/en/walkthrough');
  });
});

describe('Spanish review guide', () => {
  it('renders equivalent sourced review facts with valid Spanish text through the real route content', async () => {
    const page = await getPage('es', 'review' as PageSlug);
    const { generateMetadata } = await import('../app/[locale]/[slug]/page');
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: 'es', slug: 'review' }),
    });

    expect(page.frontmatter.title).toBe(spanishTitle);
    expect(page.frontmatter.title).toHaveLength(40);
    expect(page.frontmatter.description).toBe(spanishDescription);
    expect(page.frontmatter.description).toHaveLength(150);
    expect(metadata).toMatchObject({ title: spanishTitle, description: spanishDescription });
    expect(page.content).toMatch(/^## Puntuaciones y consenso\n\nBig Walk tiene un Metascore de 93\/100, IGN le dio 9\/10 y las reseñas suministradas son ampliamente positivas\./);
    expect(page.frontmatter.toc).toHaveLength(6);
    expect(page.frontmatter.faqs).toHaveLength(8);
    expect(wordCount(page.content)).toBeGreaterThanOrEqual(1_050);
    expect(wordCount(page.content)).toBeLessThanOrEqual(1_350);
    expect(page.content).toContain('Overwhelmingly Positive');
    expect(page.content).toContain('algunos puzles pueden sentirse poco claros sin orientación externa');
    expect(page.content).toContain('**Pendiente de confirmación:** cifras de ventas');
    expect(page.content).not.toMatch(/https?:\/\//);
    expect(page.frontmatter.relatedLinks.map((link) => link.slug)).toEqual(['game', 'puzzles', 'walkthrough']);
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
    expect(screen.getByText('93/100')).toBeInTheDocument();
    expect(screen.getByText('9/10')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Guía del juego Big Walk' })).toHaveAttribute('href', '/es/game');
    expect(screen.getByRole('link', { name: 'Soluciones de puzles de Big Walk' })).toHaveAttribute('href', '/es/puzzles');
    expect(screen.getByRole('link', { name: 'Recorrido de Big Walk' })).toHaveAttribute('href', '/es/walkthrough');
  });
});
