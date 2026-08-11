import { cleanup, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { afterEach, describe, expect, it } from 'vitest';

import { GuidePage } from '../components/GuidePage';
import { getPage, type PageSlug } from '../lib/content';
import en from '../messages/en.json';
import es from '../messages/es.json';

const englishTitle = 'Big Walk Wiki: Game Overview and Official Resources';
const englishDescription = 'Big Walk wiki covers House House, release platforms, cooperative features, official resources, and confirmed facts for the 2–12 player adventure.';
const spanishTitle = 'Guía Big Walk wiki: juego y recursos oficiales';
const spanishDescription = 'Big Walk wiki reúne plataformas, funciones cooperativas, recursos oficiales y los datos confirmados de esta aventura para 2–12 jugadores en una sola guía.';
const officialUrls = [
  'https://bigwalk.game/',
  'https://bigwalk.game/eula/',
  'https://bigwalk.game/faq/',
  'https://bigwalk.game/presskit/',
  'https://www.youtube.com/@HouseHouseGames',
];

function wordCount(content: string) {
  return (content.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? []).length;
}

function externalUrls(content: string) {
  return Array.from(content.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g), (match) => match[1]).sort();
}

afterEach(cleanup);

describe('English wiki overview', () => {
  it('renders the supplied overview facts, metadata, official resources, and uncertainty boundary', async () => {
    const page = await getPage('en', 'wiki' as PageSlug);
    const { generateMetadata } = await import('../app/[locale]/[slug]/page');
    const metadata = await generateMetadata({ params: Promise.resolve({ locale: 'en', slug: 'wiki' }) });

    expect(page.frontmatter.title).toBe(englishTitle);
    expect(page.frontmatter.title).toHaveLength(51);
    expect(page.frontmatter.description).toBe(englishDescription);
    expect(page.frontmatter.description).toHaveLength(145);
    expect(metadata).toMatchObject({ title: englishTitle, description: englishDescription });
    expect(page.content).toMatch(/^## Game overview\n\nBig Walk is a 2–12 player cooperative adventure game developed by House House, released on August 4, 2026\./);
    expect(page.frontmatter.toc).toHaveLength(6);
    expect(page.frontmatter.faqs).toHaveLength(8);
    expect(page.frontmatter.steps).toHaveLength(5);
    expect(wordCount(page.content)).toBeGreaterThanOrEqual(1_050);
    expect(wordCount(page.content)).toBeLessThanOrEqual(1_350);
    expect(page.content).toContain('Panic Inc.');
    expect(page.content).toContain('Windows (Steam), PlayStation 5, and Nintendo Switch 2');
    expect(page.content).toContain('proximity voice chat');
    expect(page.content).toContain('**Pending confirmation:**');
    expect(page.content).not.toMatch(/(?:Unity|10–20|1 million)/i);
    expect(externalUrls(page.content)).toEqual(officialUrls);
    expect(page.frontmatter.relatedLinks.map((link) => link.slug)).toEqual(['game', 'crossplay', 'beginner-tips']);

    render(<NextIntlClientProvider locale="en" messages={en}><GuidePage page={page} /></NextIntlClientProvider>);
    expect(screen.getByRole('region', { name: 'Wiki status' })).toBeInTheDocument();
    expect(screen.getAllByTestId('status-card')).toHaveLength(2);
    expect(screen.getByText('2–12 players')).toBeInTheDocument();
    expect(screen.getByText('August 4, 2026')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Big Walk Game Guide' })).toHaveAttribute('href', '/en/game');
    expect(screen.getByRole('link', { name: 'Big Walk Crossplay Guide' })).toHaveAttribute('href', '/en/crossplay');
    expect(screen.getByRole('link', { name: 'Big Walk Beginner Tips' })).toHaveAttribute('href', '/en/beginner-tips');
  });
});

describe('Spanish wiki overview', () => {
  it('renders the equivalent overview without introducing engine, staffing, sales, or social claims', async () => {
    const page = await getPage('es', 'wiki' as PageSlug);
    const { generateMetadata } = await import('../app/[locale]/[slug]/page');
    const metadata = await generateMetadata({ params: Promise.resolve({ locale: 'es', slug: 'wiki' }) });

    expect(page.frontmatter.title).toBe(spanishTitle);
    expect(page.frontmatter.title).toHaveLength(46);
    expect(page.frontmatter.description).toBe(spanishDescription);
    expect(page.frontmatter.description).toHaveLength(154);
    expect(metadata).toMatchObject({ title: spanishTitle, description: spanishDescription });
    expect(page.content).toMatch(/^## Resumen del juego\n\nBig Walk es una aventura cooperativa para 2–12 jugadores desarrollada por House House y lanzada el 4 de agosto de 2026\./);
    expect(page.frontmatter.toc).toHaveLength(6);
    expect(page.frontmatter.faqs).toHaveLength(8);
    expect(page.frontmatter.steps).toHaveLength(5);
    expect(wordCount(page.content)).toBeGreaterThanOrEqual(1_050);
    expect(wordCount(page.content)).toBeLessThanOrEqual(1_350);
    expect(page.content).toContain('Panic Inc.');
    expect(page.content).toContain('Windows (Steam), PlayStation 5 y Nintendo Switch 2');
    expect(page.content).toContain('chat de voz por proximidad');
    expect(page.content).toContain('**Pendiente de confirmación:**');
    expect(page.content).not.toMatch(/(?:Unity|10–20|1 millón)/i);
    expect(externalUrls(page.content)).toEqual(officialUrls);
    expect(page.frontmatter.relatedLinks.map((link) => link.slug)).toEqual(['game', 'crossplay', 'beginner-tips']);
    expect(JSON.stringify({ metadata, frontmatter: page.frontmatter, content: page.content })).not.toMatch(/[\u3400-\u9fff\ufffd]/u);

    render(<NextIntlClientProvider locale="es" messages={es}><GuidePage page={page} /></NextIntlClientProvider>);
    expect(screen.getByRole('region', { name: 'Wiki status' })).toBeInTheDocument();
    expect(screen.getAllByTestId('status-card')).toHaveLength(2);
    expect(screen.getByText('2–12 jugadores')).toBeInTheDocument();
    expect(screen.getByText('4 de agosto de 2026')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Guía del juego Big Walk' })).toHaveAttribute('href', '/es/game');
    expect(screen.getByRole('link', { name: 'Guía de crossplay de Big Walk' })).toHaveAttribute('href', '/es/crossplay');
    expect(screen.getByRole('link', { name: 'Consejos para principiantes de Big Walk' })).toHaveAttribute('href', '/es/beginner-tips');
  });
});
