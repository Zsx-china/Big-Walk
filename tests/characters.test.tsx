import { cleanup, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { afterEach, describe, expect, it } from 'vitest';

import { GuidePage } from '../components/GuidePage';
import { getPage, type PageSlug } from '../lib/content';
import en from '../messages/en.json';
import es from '../messages/es.json';

const englishTitle = 'Big Walk Characters Guide: Custom Avatars';
const englishDescription = 'Big Walk characters are customizable avatars, not a named cast: learn supplied outfits, backpacks, belt gear, cosmetics, and shared player abilities.';
const spanishTitle = 'Guía de Big Walk characters: avatares personalizables';
const spanishDescription = 'Big Walk characters son avatares personalizables, no un reparto con nombres: conoce ropa, mochilas, equipo de cintura, cosméticos y capacidades compartidas.';

function wordCount(content: string) {
  return (content.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? []).length;
}

afterEach(cleanup);

describe('English characters guide', () => {
  it('renders the supplied avatar, equipment, and shared-ability boundaries through the real route', async () => {
    const page = await getPage('en', 'characters' as PageSlug);
    const { generateMetadata } = await import('../app/[locale]/[slug]/page');
    const metadata = await generateMetadata({ params: Promise.resolve({ locale: 'en', slug: 'characters' }) });

    expect(page.frontmatter.title).toBe(englishTitle);
    expect(page.frontmatter.title).toHaveLength(41);
    expect(page.frontmatter.description).toBe(englishDescription);
    expect(page.frontmatter.description).toHaveLength(149);
    expect(metadata).toMatchObject({ title: englishTitle, description: englishDescription });
    expect(page.content).toMatch(/^## Character concept\n\nBig Walk has no traditional named characters; players control customizable avatars\./);
    expect(page.frontmatter.toc).toHaveLength(6);
    expect(page.frontmatter.faqs).toHaveLength(8);
    expect(wordCount(page.content)).toBeGreaterThanOrEqual(1_050);
    expect(wordCount(page.content)).toBeLessThanOrEqual(1_350);
    expect(page.content).toContain('No NPC roster');
    expect(page.content).toContain('Backpacks');
    expect(page.content).toContain('Yellow Tower');
    expect(page.content).toContain('overhead hold');
    expect(page.content).toContain('**Pending confirmation:**');
    expect(page.content).not.toMatch(/https?:\/\//);
    expect(page.frontmatter.relatedLinks.map((link) => link.slug)).toEqual(['game', 'beginner-tips', 'walkthrough']);

    render(<NextIntlClientProvider locale="en" messages={en}><GuidePage page={page} /></NextIntlClientProvider>);
    expect(screen.getByRole('region', { name: 'Wiki status' })).toBeInTheDocument();
    expect(screen.getAllByTestId('status-card')).toHaveLength(2);
    expect(screen.getByText('Custom avatar')).toBeInTheDocument();
    expect(screen.getAllByText('Shared abilities')).toHaveLength(3);
    expect(screen.getByRole('link', { name: 'Big Walk Game Guide' })).toHaveAttribute('href', '/en/game');
    expect(screen.getByRole('link', { name: 'Big Walk Beginner Tips' })).toHaveAttribute('href', '/en/beginner-tips');
    expect(screen.getByRole('link', { name: 'Big Walk Walkthrough' })).toHaveAttribute('href', '/en/walkthrough');
  });
});

describe('Spanish characters guide', () => {
  it('renders equivalent avatar facts with valid Spanish text through the real route', async () => {
    const page = await getPage('es', 'characters' as PageSlug);
    const { generateMetadata } = await import('../app/[locale]/[slug]/page');
    const metadata = await generateMetadata({ params: Promise.resolve({ locale: 'es', slug: 'characters' }) });

    expect(page.frontmatter.title).toBe(spanishTitle);
    expect(page.frontmatter.title).toHaveLength(53);
    expect(page.frontmatter.description).toBe(spanishDescription);
    expect(page.frontmatter.description).toHaveLength(156);
    expect(metadata).toMatchObject({ title: spanishTitle, description: spanishDescription });
    expect(page.content).toMatch(/^## Concepto de personaje\n\nBig Walk no tiene personajes tradicionales con nombre; los jugadores controlan avatares personalizables\./);
    expect(page.frontmatter.toc).toHaveLength(6);
    expect(page.frontmatter.faqs).toHaveLength(8);
    expect(wordCount(page.content)).toBeGreaterThanOrEqual(1_050);
    expect(wordCount(page.content)).toBeLessThanOrEqual(1_350);
    expect(page.content).toContain('Mochilas');
    expect(page.content).toContain('Yellow Tower');
    expect(page.content).toContain('sujeción por encima de la cabeza');
    expect(page.content).toContain('**Pendiente de confirmación:**');
    expect(page.content).not.toMatch(/https?:\/\//);
    expect(page.frontmatter.relatedLinks.map((link) => link.slug)).toEqual(['game', 'beginner-tips', 'walkthrough']);
    const serialized = JSON.stringify({ metadata, frontmatter: page.frontmatter, content: page.content });
    expect(serialized).not.toMatch(/[\u3400-\u9fff\ufffd]/u);

    render(<NextIntlClientProvider locale="es" messages={es}><GuidePage page={page} /></NextIntlClientProvider>);
    expect(screen.getByRole('region', { name: 'Wiki status' })).toBeInTheDocument();
    expect(screen.getAllByTestId('status-card')).toHaveLength(2);
    expect(screen.getByText('Avatar personalizable')).toBeInTheDocument();
    expect(screen.getAllByText('Habilidades compartidas')).toHaveLength(3);
    expect(screen.getByRole('link', { name: 'Guía del juego Big Walk' })).toHaveAttribute('href', '/es/game');
    expect(screen.getByRole('link', { name: 'Consejos para principiantes de Big Walk' })).toHaveAttribute('href', '/es/beginner-tips');
    expect(screen.getByRole('link', { name: 'Guía de Big Walk paso a paso' })).toHaveAttribute('href', '/es/walkthrough');
  });
});
