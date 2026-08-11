import { cleanup, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { afterEach, describe, expect, it } from 'vitest';

import { GuidePage } from '../components/GuidePage';
import { getPage } from '../lib/content';
import en from '../messages/en.json';
import es from '../messages/es.json';

const englishTitle = 'Big Walk Beginner Tips: 12 First-Hour Essentials';
const englishDescription = 'Big Walk beginner tips explain 12 first-hour mechanics, tools, multiplayer habits, and starting-area goals using only supplied beginner-guide facts.';
const spanishTitle = 'Gu\u00eda Big Walk beginner tips: 12 claves iniciales';
const spanishDescription = 'Big Walk beginner tips presenta 12 claves para la primera hora: mec\u00e1nicas, herramientas, cooperaci\u00f3n y objetivos iniciales confirmados para gente nueva.';
const relatedSlugs = ['puzzles', 'walkthrough', 'crossplay'];

afterEach(cleanup);

function wordCount(content: string) {
  return (content.match(/[\p{L}\p{N}]+(?:['\u2019][\p{L}\p{N}]+)*/gu) ?? []).length;
}

function expectRelatedLinks(locale: 'en' | 'es') {
  const expectedHrefs = relatedSlugs.map((slug) => `/${locale}/${slug}`);
  const links = screen.getAllByRole('link');

  expect(links.filter((link) => expectedHrefs.includes(link.getAttribute('href') ?? ''))).toHaveLength(3);
  for (const href of expectedHrefs) expect(links.some((link) => link.getAttribute('href') === href)).toBe(true);
}

function expectNoExternalUrls(page: object) {
  expect(JSON.stringify(page)).not.toMatch(/https?:\/\//i);
  for (const link of screen.getAllByRole('link')) {
    expect(link.getAttribute('href') ?? '').not.toMatch(/^https?:\/\//i);
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
    expect(page.content).not.toMatch(/\b(?:Xbox|Easter egg|secret code|(?:(?:press|tap|hit|hold)\s+(?:the\s+)?(?!Interact\b)(?:[A-Za-z0-9]+|(?:[A-Za-z0-9]+\s+){0,3}(?:button|key)|(?:button|key)(?:\s+[A-Za-z0-9]+){0,3})|use\s+(?:the\s+)?(?:[A-Za-z0-9]+\s+){0,3}(?:button|key)|(?:button|key)(?:\s+[A-Za-z0-9]+){0,3})|keyboard|controller|gamepad|d-?pad|trigger|thumbstick|analog stick|joystick|mouse|WASD|arrow keys)\b/i);

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
    expectNoExternalUrls({ metadata, frontmatter: page.frontmatter, content: page.content });
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
    expect(page.content).toMatch(/^## Mecanismos b\u00e1sicos\n\nLa primera hora tiene 12 mecanismos y consejos de Big Walk que conviene conocer antes de explorar\./);
    expect(page.frontmatter.toc).toHaveLength(6);
    expect(page.frontmatter.steps).toHaveLength(5);
    expect(page.frontmatter.faqs).toHaveLength(8);
    expect(wordCount(page.content)).toBeGreaterThanOrEqual(1_050);
    expect(wordCount(page.content)).toBeLessThanOrEqual(1_350);
    expect(page.frontmatter.relatedLinks.map(({ slug }) => slug)).toEqual(relatedSlugs);
    expect(page.content).not.toMatch(/\b(?:Xbox|huevo de pascua|c\u00f3digo secreto|(?:(?:pulsa|presiona|toca|mant[e\u00e9]n)\s+(?:el\s+|la\s+)?(?!Interact(?:uar)?\b)(?:[A-Za-z0-9]+|(?:[A-Za-z0-9]+\s+){0,3}(?:bot[o\u00f3]n|tecla)|(?:bot[o\u00f3]n|tecla)(?:\s+[A-Za-z0-9]+){0,3})|usa\s+(?:el\s+|la\s+)?(?:[A-Za-z0-9]+\s+){0,3}(?:bot[o\u00f3]n|tecla)|(?:bot[o\u00f3]n|tecla)(?:\s+[A-Za-z0-9]+){0,3})|teclado|controlador|mando|gamepad|cruceta|gatillo|palanca|joystick|rat[o\u00f3]n|WASD|flechas)\b/i);

    for (const phrase of [
      'Bloqueo al sostener objetos', 'Deslizamiento por pendientes', 'Lanzar frente a patear',
      'Cancelar una patada', 'Pedestal de objetos perdidos', 'Bengalas de se\u00f1al', 'Esc\u00e1ner de objetos',
      'Torre humana', 'Ciclo de d\u00eda y noche', 'Sin da\u00f1o por ca\u00edda', 'Equilibrio por cantidad de jugadores',
      'escaleras rojas', 'unos 10 segundos', 'terminal naranja', 'cuatro objetos rojos',
      '8 minutos', '6 minutos', '**Pendiente de confirmaci\u00f3n:**',
    ]) expect(page.content).toContain(phrase);

    const serializedSpanish = JSON.stringify({ metadata, frontmatter: page.frontmatter, content: page.content });
    expect(serializedSpanish).not.toMatch(/[\u3400-\u9fff\ufffd]/u);

    render(<NextIntlClientProvider locale="es" messages={es}><GuidePage page={page} /></NextIntlClientProvider>);

    expect(screen.getAllByTestId('status-card')).toHaveLength(2);
    expect(screen.getByText('12 claves iniciales')).toBeInTheDocument();
    expectRelatedLinks('es');
    expectNoExternalUrls({ metadata, frontmatter: page.frontmatter, content: page.content });
  });
});
