import { cleanup, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { afterEach, describe, expect, it } from 'vitest';

import { GuidePage } from '../components/GuidePage';
import { getPage } from '../lib/content';
import en from '../messages/en.json';
import es from '../messages/es.json';

const title = 'Big Walk Puzzle Solutions: Coordinates, Pegs & More';
const description = 'Big Walk puzzle solutions for coordinate inputs, including 4166 and 1899, peg boards, and hidden answers. See confirmed co-op clues and pending details.';
const officialUrl = 'https://store.steampowered.com/app/1478500/Big_Walk/';

afterEach(cleanup);

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
      'Peg-board puzzles are a topic this guide tracks, but the supplied research scope does not confirm a board layout, a placement sequence, or a completion result. **Pending confirmation:** do not treat an unverified diagram or arrangement as a solution.',
    );
    expect(page.content).toContain(
      'Hidden answers are also tracked here, but the supplied information does not identify their locations or answer strings. **Pending confirmation:** this page will only add those details after an official source confirms them.',
    );
    expect(page.content).toContain(
      'The supplied research scope records three puzzle categories: coordinate input, item interaction, and environmental puzzles.',
    );
    expect(page.content).not.toMatch(/\bredeem(?:ing)? codes?\b/i);
    expect(page.content).not.toMatch(/\brewards?\b/i);
    expect(page.content).not.toMatch(/\bcharacters?\b/i);

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

  it('renders pending labels as strong text and visible English related-guide links', async () => {
    const page = await getPage('en', 'puzzles');

    render(
      <NextIntlClientProvider locale="en" messages={en}>
        <GuidePage page={page} />
      </NextIntlClientProvider>,
    );

    const pendingLabels = screen.getAllByText('Pending confirmation:');
    expect(pendingLabels).toHaveLength(3);
    for (const label of pendingLabels) expect(label.tagName).toBe('STRONG');

    const walkthroughLink = screen.getByRole('link', { name: 'Big Walk Walkthrough' });
    expect(walkthroughLink).toHaveAttribute('href', '/en/walkthrough');
    expect(walkthroughLink.closest('p')).toHaveTextContent(/^Read more:/);
    expect(screen.getByRole('link', { name: 'Big Walk Game Guide' })).toHaveAttribute(
      'href',
      '/en/game',
    );
    expect(screen.getByRole('link', { name: 'Big Walk Beginner Tips' })).toHaveAttribute(
      'href',
      '/en/beginner-tips',
    );
  });
});

describe('Spanish puzzles guide', () => {
  it('mirrors the source-bounded puzzle facts through the real content loader', async () => {
    const page = await getPage('es', 'puzzles');

    expect(page.frontmatter.toc).toEqual([
      { id: 'hechos-confirmados', label: 'Hechos confirmados' },
      { id: 'rompecabezas-coordenadas', label: 'Rompecabezas de coordenadas: 4166 y 1899' },
      { id: 'cooperacion-voz', label: 'Cooperación y chat de voz por proximidad' },
      { id: 'tipos-rompecabezas', label: 'Interacción con objetos y entorno' },
      { id: 'tablero-clavijas', label: 'Rompecabezas de tablero de clavijas' },
      { id: 'respuestas-ocultas', label: 'Respuestas ocultas' },
      { id: 'uso-seguro', label: 'Cómo usar esta página' },
      { id: 'revision-fuente-oficial', label: 'Revisión de fuente oficial' },
    ]);
    expect(page.frontmatter.faqs).toHaveLength(8);
    expect(page.frontmatter.steps).toHaveLength(4);
    expect(page.frontmatter.relatedLinks.map(({ slug }) => slug)).toEqual([
      'walkthrough',
      'game',
      'beginner-tips',
    ]);

    expect(page.content).toMatch(
      /^## Hechos confirmados\n\nTodas las soluciones de puzles de Big Walk se recopilan aquí\./,
    );
    expect(page.content).toContain('4166');
    expect(page.content).toContain('1899');
    expect(page.content).toContain('Pendiente de confirmación');
    expect(page.content).toContain(
      'El alcance de investigación proporcionado registra tres categorías de puzles: introducción de coordenadas, interacción con objetos y entorno.',
    );
    expect(page.content).not.toMatch(/\bcanjear c[oó]digos?\b/i);
    expect(page.content).not.toMatch(/\bc[oó]digos? de canje\b/i);
    expect(page.content).not.toMatch(/\brecompensas?\b/i);
    expect(page.content).not.toMatch(/\bpersonajes?\b/i);

    const urls = page.content.match(/https?:\/\/[^\s)]+/g) ?? [];
    expect(urls).toEqual([officialUrl]);
  });

  it('renders pending labels as strong text and visible Spanish related-guide links', async () => {
    const page = await getPage('es', 'puzzles');

    render(
      <NextIntlClientProvider locale="es" messages={es}>
        <GuidePage page={page} />
      </NextIntlClientProvider>,
    );

    const pendingLabels = screen.getAllByText('Pendiente de confirmación:');
    expect(pendingLabels).toHaveLength(3);
    for (const label of pendingLabels) expect(label.tagName).toBe('STRONG');

    const walkthroughLink = screen.getByRole('link', { name: 'Guía paso a paso de Big Walk' });
    expect(walkthroughLink).toHaveAttribute('href', '/es/walkthrough');
    expect(walkthroughLink.closest('p')).toHaveTextContent(/^Leer más:/);
    expect(screen.getByRole('link', { name: 'Guía del juego Big Walk' })).toHaveAttribute(
      'href',
      '/es/game',
    );
    expect(screen.getByRole('link', { name: 'Consejos para principiantes de Big Walk' })).toHaveAttribute(
      'href',
      '/es/beginner-tips',
    );
  });
});
