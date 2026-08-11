import { cleanup, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { afterEach, describe, expect, it } from 'vitest';

import { GuidePage } from '../components/GuidePage';
import { getPage, type PageSlug } from '../lib/content';
import en from '../messages/en.json';
import es from '../messages/es.json';

const englishTitle = 'Big Walk Map Guide: Map Room & Region Overview';
const englishDescription = "Big Walk map guide explains how to unlock the Red Tower Map Room, use MapGenie's top-down tools, and navigate six supplied regions without invented markers.";
const spanishTitle = 'Guía de Big Walk map: sala de mapas y regiones';
const spanishDescription = 'Big Walk map explica cómo obtener la sala de mapas de Red Tower, usar las herramientas cenitales de MapGenie y orientar seis regiones suministradas.';

function wordCount(content: string) {
  return (content.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? []).length;
}

afterEach(cleanup);

describe('English map guide', () => {
  it('renders the supplied Map Room route and external-map boundary through the real route', async () => {
    const page = await getPage('en', 'map' as PageSlug);
    const { generateMetadata } = await import('../app/[locale]/[slug]/page');
    const metadata = await generateMetadata({ params: Promise.resolve({ locale: 'en', slug: 'map' }) });

    expect(page.frontmatter.title).toBe(englishTitle);
    expect(page.frontmatter.title).toHaveLength(46);
    expect(page.frontmatter.description).toBe(englishDescription);
    expect(page.frontmatter.description).toHaveLength(156);
    expect(metadata).toMatchObject({ title: englishTitle, description: englishDescription });
    expect(page.content).toMatch(/^## In-game map\n\nThe in-game map is obtained in the Red Tower Map Room; MapGenie is the recommended external interactive map\./);
    expect(page.frontmatter.toc).toHaveLength(6);
    expect(page.frontmatter.faqs).toHaveLength(8);
    expect(wordCount(page.content)).toBeGreaterThanOrEqual(1_050);
    expect(wordCount(page.content)).toBeLessThanOrEqual(1_350);
    expect(page.content).toContain('Starting Hub');
    expect(page.content).toContain('**Pending confirmation:**');
    expect(page.content).not.toMatch(/https?:\/\//);
    expect(page.frontmatter.relatedLinks.map((link) => link.slug)).toEqual(['walkthrough', 'puzzles', 'game']);

    render(<NextIntlClientProvider locale="en" messages={en}><GuidePage page={page} /></NextIntlClientProvider>);
    expect(screen.getByRole('region', { name: 'Wiki status' })).toBeInTheDocument();
    expect(screen.getAllByTestId('status-card')).toHaveLength(2);
    expect(screen.getByText('Map Room')).toBeInTheDocument();
    expect(screen.getByText('MapGenie')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Big Walk Walkthrough' })).toHaveAttribute('href', '/en/walkthrough');
    expect(screen.getByRole('link', { name: 'Big Walk Puzzle Solutions' })).toHaveAttribute('href', '/en/puzzles');
    expect(screen.getByRole('link', { name: 'Big Walk Game Guide' })).toHaveAttribute('href', '/en/game');
  });
});

describe('Spanish map guide', () => {
  it('renders the equivalent map facts with valid Spanish text through the real route', async () => {
    const page = await getPage('es', 'map' as PageSlug);
    const { generateMetadata } = await import('../app/[locale]/[slug]/page');
    const metadata = await generateMetadata({ params: Promise.resolve({ locale: 'es', slug: 'map' }) });

    expect(page.frontmatter.title).toBe(spanishTitle);
    expect(page.frontmatter.title).toHaveLength(46);
    expect(page.frontmatter.description).toBe(spanishDescription);
    expect(page.frontmatter.description).toHaveLength(148);
    expect(metadata).toMatchObject({ title: spanishTitle, description: spanishDescription });
    expect(page.content).toMatch(/^## Mapa dentro del juego\n\nEl mapa dentro del juego se obtiene en la sala de mapas de Red Tower; MapGenie es el mapa interactivo externo recomendado\./);
    expect(page.frontmatter.toc).toHaveLength(6);
    expect(page.frontmatter.faqs).toHaveLength(8);
    expect(wordCount(page.content)).toBeGreaterThanOrEqual(1_050);
    expect(wordCount(page.content)).toBeLessThanOrEqual(1_350);
    expect(page.content).toContain('Starting Hub');
    expect(page.content).toContain('**Pendiente de confirmación:**');
    expect(page.content).not.toMatch(/https?:\/\//);
    expect(page.frontmatter.relatedLinks.map((link) => link.slug)).toEqual(['walkthrough', 'puzzles', 'game']);
    const serialized = JSON.stringify({ metadata, frontmatter: page.frontmatter, content: page.content });
    expect(serialized).not.toMatch(/[\u3400-\u9fff\ufffd]/u);

    render(<NextIntlClientProvider locale="es" messages={es}><GuidePage page={page} /></NextIntlClientProvider>);
    expect(screen.getByRole('region', { name: 'Wiki status' })).toBeInTheDocument();
    expect(screen.getAllByTestId('status-card')).toHaveLength(2);
    expect(screen.getByText('Sala de mapas')).toBeInTheDocument();
    expect(screen.getByText('MapGenie')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Guía de Big Walk paso a paso' })).toHaveAttribute('href', '/es/walkthrough');
    expect(screen.getByRole('link', { name: 'Soluciones de puzles de Big Walk' })).toHaveAttribute('href', '/es/puzzles');
    expect(screen.getByRole('link', { name: 'Guía del juego Big Walk' })).toHaveAttribute('href', '/es/game');
  });
});
