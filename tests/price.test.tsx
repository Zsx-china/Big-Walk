import { cleanup, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { afterEach, describe, expect, it } from 'vitest';

import { GuidePage } from '../components/GuidePage';
import { getPage, type PageSlug } from '../lib/content';
import en from '../messages/en.json';
import es from '../messages/es.json';

const englishTitle = 'Big Walk Price Guide: $19.99 on PC, PS5 & Switch 2';
const englishDescription = 'Big Walk price is $19.99 on PC, PS5, and Nintendo Switch 2, with no active discount, DLC, demo, or subscription service confirmed as of August 10, 2026.';
const spanishTitle = 'Guía de Big Walk price: $19.99 en PC, PS5 y Switch 2';
const spanishDescription = 'Big Walk price es $19.99 en PC, PS5 y Nintendo Switch 2, sin descuento activo ni DLC, demo o servicio de suscripción confirmado al 10 de agosto de 2026.';

function wordCount(content: string) {
  return (content.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) ?? []).length;
}

afterEach(cleanup);

describe('English price guide', () => {
  it('renders the supplied price, discount boundary, and conditional value note through the real route', async () => {
    const page = await getPage('en', 'price' as PageSlug);
    const { generateMetadata } = await import('../app/[locale]/[slug]/page');
    const metadata = await generateMetadata({ params: Promise.resolve({ locale: 'en', slug: 'price' }) });

    expect(page.frontmatter.title).toBe(englishTitle);
    expect(page.frontmatter.title).toHaveLength(50);
    expect(page.frontmatter.description).toBe(englishDescription);
    expect(page.frontmatter.description).toHaveLength(152);
    expect(metadata).toMatchObject({ title: englishTitle, description: englishDescription });
    expect(page.content).toMatch(/^## Standard price\n\nBig Walk's standard price is \$19\.99, with the same base price across platforms\./);
    expect(page.frontmatter.toc).toHaveLength(7);
    expect(page.frontmatter.faqs).toHaveLength(8);
    expect(wordCount(page.content)).toBeGreaterThanOrEqual(1_050);
    expect(wordCount(page.content)).toBeLessThanOrEqual(1_350);
    expect(page.content).toContain('No active discount');
    expect(page.content).toContain('**Pending confirmation:**');
    expect(page.content).toContain('93/100 Metascore');
    expect(page.content).not.toMatch(/https?:\/\//);
    expect(page.frontmatter.relatedLinks.map((link) => link.slug)).toEqual(['review', 'crossplay', 'game']);

    render(<NextIntlClientProvider locale="en" messages={en}><GuidePage page={page} /></NextIntlClientProvider>);
    expect(screen.getByRole('region', { name: 'Wiki status' })).toBeInTheDocument();
    expect(screen.getAllByTestId('status-card')).toHaveLength(2);
    expect(screen.getByText('$19.99 USD')).toBeInTheDocument();
    expect(screen.getByText('No active discount')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Big Walk Review' })).toHaveAttribute('href', '/en/review');
    expect(screen.getByRole('link', { name: 'Big Walk Crossplay Guide' })).toHaveAttribute('href', '/en/crossplay');
    expect(screen.getByRole('link', { name: 'Big Walk Game Guide' })).toHaveAttribute('href', '/en/game');
  });
});

describe('Spanish price guide', () => {
  it('renders equivalent price facts with valid Spanish text through the real route', async () => {
    const page = await getPage('es', 'price' as PageSlug);
    const { generateMetadata } = await import('../app/[locale]/[slug]/page');
    const metadata = await generateMetadata({ params: Promise.resolve({ locale: 'es', slug: 'price' }) });

    expect(page.frontmatter.title).toBe(spanishTitle);
    expect(page.frontmatter.title).toHaveLength(52);
    expect(page.frontmatter.description).toBe(spanishDescription);
    expect(page.frontmatter.description).toHaveLength(152);
    expect(metadata).toMatchObject({ title: spanishTitle, description: spanishDescription });
    expect(page.content).toMatch(/^## Precio estándar\n\nEl precio estándar de Big Walk es \$19\.99, con el mismo precio base en todas las plataformas\./);
    expect(page.frontmatter.toc).toHaveLength(7);
    expect(page.frontmatter.faqs).toHaveLength(8);
    expect(wordCount(page.content)).toBeGreaterThanOrEqual(1_050);
    expect(wordCount(page.content)).toBeLessThanOrEqual(1_350);
    expect(page.content).toContain('Sin descuento activo');
    expect(page.content).toContain('**Pendiente de confirmación:**');
    expect(page.content).not.toMatch(/https?:\/\//);
    expect(page.frontmatter.relatedLinks.map((link) => link.slug)).toEqual(['review', 'crossplay', 'game']);
    const serialized = JSON.stringify({ metadata, frontmatter: page.frontmatter, content: page.content });
    expect(serialized).not.toMatch(/[\u3400-\u9fff\ufffd]/u);

    render(<NextIntlClientProvider locale="es" messages={es}><GuidePage page={page} /></NextIntlClientProvider>);
    expect(screen.getByRole('region', { name: 'Wiki status' })).toBeInTheDocument();
    expect(screen.getAllByTestId('status-card')).toHaveLength(2);
    expect(screen.getByText('$19.99 USD')).toBeInTheDocument();
    expect(screen.getByText('Sin descuento activo')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Reseña de Big Walk' })).toHaveAttribute('href', '/es/review');
    expect(screen.getByRole('link', { name: 'Guía de crossplay de Big Walk' })).toHaveAttribute('href', '/es/crossplay');
    expect(screen.getByRole('link', { name: 'Guía del juego Big Walk' })).toHaveAttribute('href', '/es/game');
  });
});
