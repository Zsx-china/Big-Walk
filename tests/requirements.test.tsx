import { cleanup, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { afterEach, describe, expect, it } from 'vitest';

import { GuidePage } from '../components/GuidePage';
import { getPage, type PageSlug } from '../lib/content';
import en from '../messages/en.json';
import es from '../messages/es.json';

const englishTitle = 'Big Walk System Requirements: PC & Console Guide';
const englishDescription = 'Big Walk system requirements: confirmed Windows, RAM, DirectX, PS5, Switch 2, internet, and microphone details, with unannounced hardware marked pending.';
const spanishTitle = 'Guía de Big Walk system requirements para PC y consolas';
const spanishDescription = 'Big Walk system requirements resume Windows, RAM, DirectX, PS5, Switch 2, internet y micrófono, y marca CPU, GPU y almacenamiento sin anunciar como pendientes.';

function wordCount(content: string) {
  return (content.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? []).length;
}

afterEach(cleanup);

describe('English requirements guide', () => {
  it('renders supplied PC and console facts while keeping unannounced hardware pending', async () => {
    const page = await getPage('en', 'requirements' as PageSlug);
    const { generateMetadata } = await import('../app/[locale]/[slug]/page');
    const metadata = await generateMetadata({ params: Promise.resolve({ locale: 'en', slug: 'requirements' }) });

    expect(page.frontmatter.title).toBe(englishTitle);
    expect(page.frontmatter.title).toHaveLength(48);
    expect(page.frontmatter.description).toBe(englishDescription);
    expect(page.frontmatter.description).toHaveLength(153);
    expect(metadata).toMatchObject({ title: englishTitle, description: englishDescription });
    expect(page.content).toMatch(/^## PC minimum requirements\n\nPC minimum: 8 GB RAM and Windows 10; PS5 and Switch 2 play natively\./);
    expect(page.frontmatter.toc).toHaveLength(6);
    expect(page.frontmatter.faqs).toHaveLength(8);
    expect(wordCount(page.content)).toBeGreaterThanOrEqual(1_050);
    expect(wordCount(page.content)).toBeLessThanOrEqual(1_350);
    expect(page.content).toContain('8 GB RAM');
    expect(page.content).toContain('16 GB RAM');
    expect(page.content).toContain('DirectX 11');
    expect(page.content).toContain('**Pending confirmation:**');
    expect(page.content).toContain('official Steam page');
    expect(page.content).not.toMatch(/(?:i[357]-\d|GTX|RTX|Radeon|5[–-]10 GB)/i);
    expect(page.content).not.toMatch(/https?:\/\//);
    expect(page.frontmatter.relatedLinks.map((link) => link.slug)).toEqual(['crossplay', 'game', 'beginner-tips']);

    render(<NextIntlClientProvider locale="en" messages={en}><GuidePage page={page} /></NextIntlClientProvider>);
    expect(screen.getByRole('region', { name: 'Wiki status' })).toBeInTheDocument();
    expect(screen.getAllByTestId('status-card')).toHaveLength(2);
    expect(screen.getByText('8 GB RAM')).toBeInTheDocument();
    expect(screen.getByText('Native consoles')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Big Walk Crossplay Guide' })).toHaveAttribute('href', '/en/crossplay');
    expect(screen.getByRole('link', { name: 'Big Walk Game Guide' })).toHaveAttribute('href', '/en/game');
    expect(screen.getByRole('link', { name: 'Big Walk Beginner Tips' })).toHaveAttribute('href', '/en/beginner-tips');
  });
});

describe('Spanish requirements guide', () => {
  it('renders equivalent requirements with valid Spanish text and no invented hardware models', async () => {
    const page = await getPage('es', 'requirements' as PageSlug);
    const { generateMetadata } = await import('../app/[locale]/[slug]/page');
    const metadata = await generateMetadata({ params: Promise.resolve({ locale: 'es', slug: 'requirements' }) });

    expect(page.frontmatter.title).toBe(spanishTitle);
    expect(page.frontmatter.title).toHaveLength(55);
    expect(page.frontmatter.description).toBe(spanishDescription);
    expect(page.frontmatter.description).toHaveLength(159);
    expect(metadata).toMatchObject({ title: spanishTitle, description: spanishDescription });
    expect(page.content).toMatch(/^## Requisitos mínimos de PC\n\nPC mínimo: 8 GB de RAM y Windows 10; PS5 y Switch 2 se juegan de forma nativa\./);
    expect(page.frontmatter.toc).toHaveLength(6);
    expect(page.frontmatter.faqs).toHaveLength(8);
    expect(wordCount(page.content)).toBeGreaterThanOrEqual(1_050);
    expect(wordCount(page.content)).toBeLessThanOrEqual(1_350);
    expect(page.content).toContain('8 GB de RAM');
    expect(page.content).toContain('16 GB de RAM');
    expect(page.content).toContain('DirectX 11');
    expect(page.content).toContain('**Pendiente de confirmación:**');
    expect(page.content).not.toMatch(/(?:i[357]-\d|GTX|RTX|Radeon|5[–-]10 GB)/i);
    expect(page.content).not.toMatch(/https?:\/\//);
    expect(page.frontmatter.relatedLinks.map((link) => link.slug)).toEqual(['crossplay', 'game', 'beginner-tips']);
    const serialized = JSON.stringify({ metadata, frontmatter: page.frontmatter, content: page.content });
    expect(serialized).not.toMatch(/[\u3400-\u9fff\ufffd]/u);

    render(<NextIntlClientProvider locale="es" messages={es}><GuidePage page={page} /></NextIntlClientProvider>);
    expect(screen.getByRole('region', { name: 'Wiki status' })).toBeInTheDocument();
    expect(screen.getAllByTestId('status-card')).toHaveLength(2);
    expect(screen.getByText('8 GB de RAM')).toBeInTheDocument();
    expect(screen.getByText('Consolas nativas')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Guía de crossplay de Big Walk' })).toHaveAttribute('href', '/es/crossplay');
    expect(screen.getByRole('link', { name: 'Guía del juego Big Walk' })).toHaveAttribute('href', '/es/game');
    expect(screen.getByRole('link', { name: 'Consejos para principiantes de Big Walk' })).toHaveAttribute('href', '/es/beginner-tips');
  });
});
