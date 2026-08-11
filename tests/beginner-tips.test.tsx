import { cleanup, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { afterEach, describe, expect, it } from 'vitest';

import { GuidePage } from '../components/GuidePage';
import { getPage } from '../lib/content';
import en from '../messages/en.json';
import es from '../messages/es.json';

const englishTitle = 'Big Walk Beginner Tips: 12 First-Hour Essentials';
const englishDescription = 'Big Walk beginner tips explain 12 first-hour mechanics, tools, multiplayer habits, and starting-area goals using only supplied beginner-guide facts.';
const spanishTitle = 'Guía Big Walk beginner tips: 12 claves iniciales';
const spanishDescription = 'Big Walk beginner tips presenta 12 claves para la primera hora: mecánicas, herramientas, cooperación y objetivos iniciales confirmados para gente nueva.';
const relatedSlugs = ['puzzles', 'walkthrough', 'crossplay'];

afterEach(cleanup);

function wordCount(content: string) {
  return (content.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? []).length;
}

function expectRelatedLinks(locale: 'en' | 'es') {
  const expectedHrefs = relatedSlugs.map((slug) => `/${locale}/${slug}`);
  const links = screen.getAllByRole('link');

  expect(links.filter((link) => expectedHrefs.includes(link.getAttribute('href') ?? ''))).toHaveLength(3);
  for (const href of expectedHrefs) {
    expect(links.some((link) => link.getAttribute('href') === href)).toBe(true);
  }
}

describe('English beginner tips guide', () => {
  it('loads the complete first-hour beginner contract through real content, metadata, and rendering', async () => {
    const page = await getPage('en', 'beginner-tips');
    const { generateMetadata } = await import('../app/[locale]/[slug]/page');
    const metadata = await generateMetadata({ params: Promise.resolve({ locale: 'en', slug: 'beginner-tips' }) });

    expect(page.frontmatter.title).toBe(englishTitle);
    expect(page.frontmatter.description).toBe(englishDescription);
    expect(englishTitle).toHaveLength(48);
    expect(englishDescription).toHaveLength(148);
    expect(metadata).toMatchObject({ title: englishTitle, description: englishDescription });
    expect(page.content).toMatch(/^## Core mechanics\n\nThe first hour has 12 Big Walk mechanics and tips worth knowing before you roam\./);
    expect(page.frontmatter.toc).toHaveLength(6);
    expect(page.frontmatter.steps).toHaveLength(5);
    expect(page.frontmatter.faqs).toHaveLength(8);
    expect(wordCount(page.content)).toBeGreaterThanOrEqual(1_050);
    expect(wordCount(page.content)).toBeLessThanOrEqual(1_350);
    expect(page.frontmatter.relatedLinks.map(({ slug }) => slug)).toEqual(relatedSlugs);
    expect(page.content).not.toMatch(/https?:\/\//);
    expect(page.content).not.toMatch(/\b(?:Xbox|Easter egg|secret code|press [ABXY])\b/i);

    for (const phrase of [
      'Item holding lock', 'Slope sliding', 'Throw versus kick', 'Cancel kick', 'Lost & Found Pedestal',
      'Signal flares', 'Item scanner', 'Human tower', 'Day-night cycle', 'No fall damage',
      'Player-count balancing', 'red stairs', 'about 10 seconds', 'orange terminal', 'four red objects',
      '8 minutes', '6 minutes', '**Pending confirmation:**',
    ]) expect(page.content).toContain(phrase);

    render(<NextIntlClientProvider locale="en" messages={en}><GuidePage page={page} /></NextIntlClientProvider>);

    expect(screen.getAllByTestId('status-card')).toHaveLength(2);
    expect(screen.getByText('12 first-hour essentials')).toBeInTheDocument();
    expectRelatedLinks('en');
  });
});

describe('Spanish beginner tips guide', () => {
  it('loads the complete first-hour beginner contract through real content, metadata, and rendering', async () => {
    const page = await getPage('es', 'beginner-tips');
    const { generateMetadata } = await import('../app/[locale]/[slug]/page');
    const metadata = await generateMetadata({ params: Promise.resolve({ locale: 'es', slug: 'beginner-tips' }) });

    expect(page.frontmatter.title).toBe(spanishTitle);
    expect(page.frontmatter.description).toBe(spanishDescription);
    expect(spanishTitle).toHaveLength(48);
    expect(spanishDescription).toHaveLength(152);
    expect(metadata).toMatchObject({ title: spanishTitle, description: spanishDescription });
    expect(page.content).toMatch(/^## Mecanismos básicos\n\nLa primera hora tiene 12 mecanismos y consejos de Big Walk que conviene conocer antes de explorar\./);
    expect(page.frontmatter.toc).toHaveLength(6);
    expect(page.frontmatter.steps).toHaveLength(5);
    expect(page.frontmatter.faqs).toHaveLength(8);
    expect(wordCount(page.content)).toBeGreaterThanOrEqual(1_050);
    expect(wordCount(page.content)).toBeLessThanOrEqual(1_350);
    expect(page.frontmatter.relatedLinks.map(({ slug }) => slug)).toEqual(relatedSlugs);
    expect(page.content).not.toMatch(/https?:\/\//);
    expect(page.content).not.toMatch(/\b(?:Xbox|huevo de pascua|código secreto|pulsa [ABXY])\b/i);

    for (const phrase of [
      'Bloqueo al sostener objetos', 'Deslizamiento por pendientes', 'Lanzar frente a patear',
      'Cancelar una patada', 'Pedestal de objetos perdidos', 'Bengalas de señal', 'Escáner de objetos',
      'Torre humana', 'Ciclo de día y noche', 'Sin daño por caída', 'Equilibrio por cantidad de jugadores',
      'escaleras rojas', 'unos 10 segundos', 'terminal naranja', 'cuatro objetos rojos',
      '**Pendiente de confirmación:**',
    ]) expect(page.content).toContain(phrase);

    const serializedSpanish = JSON.stringify({ metadata, frontmatter: page.frontmatter, content: page.content });
    expect(serializedSpanish).not.toMatch(/[\u3400-\u9fff\ufffd]/u);

    render(<NextIntlClientProvider locale="es" messages={es}><GuidePage page={page} /></NextIntlClientProvider>);

    expect(screen.getAllByTestId('status-card')).toHaveLength(2);
    expect(screen.getByText('12 claves iniciales')).toBeInTheDocument();
    expectRelatedLinks('es');
  });
});
