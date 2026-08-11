import { cleanup, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { afterEach, describe, expect, it } from 'vitest';

import { GuidePage } from '../components/GuidePage';
import { getPage } from '../lib/content';
import en from '../messages/en.json';
import es from '../messages/es.json';

const title = 'Big Walk Walkthrough: Towers, Tunnels & Ending';
const description = 'Big Walk walkthrough maps the Tutorial Area, Drawbridge, towers, Yellow Tunnel, and ending, with host-save facts and clearly marked unknowns.';
const englishStages = ['Tutorial Area', 'Drawbridge', 'Red Tower', 'Green Tower', 'Blue Tower', 'Yellow Tunnel', 'Black Tower', 'Ending'];
const spanishStages = ['\u00c1rea de tutorial', 'Puente levadizo', 'Torre Roja', 'Torre Verde', 'Torre Azul', 'T\u00fanel Amarillo', 'Torre Negra', 'Final'];

function expectRenderedStageStructure(container: HTMLElement, stages: string[]) {
  const firstHeading = container.querySelector('article h2');
  const contentSection = firstHeading?.closest('section');
  const headings = Array.from(contentSection?.querySelectorAll('h2') ?? []);

  expect(headings.map((heading) => heading.textContent)).toEqual(stages);
  for (const heading of headings) {
    const prose = heading.nextElementSibling;

    expect(prose?.tagName).toBe('P');
    expect(prose?.textContent?.match(/[.!?](?=\s|$)/g) ?? []).toHaveLength(4);
  }
}

afterEach(cleanup);

describe('English walkthrough guide', () => {
  it('loads the staged, source-bounded walkthrough through the real content and route boundaries', async () => {
    const page = await getPage('en', 'walkthrough');
    const { generateMetadata } = await import('../app/[locale]/[slug]/page');
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: 'en', slug: 'walkthrough' }),
    });

    expect(page.frontmatter.title).toBe(title);
    expect(page.frontmatter.description).toHaveLength(141);
    expect(page.content).toMatch(/^## Tutorial Area\n\nA complete walkthrough from the Tutorial Area to the Black Tower ending\./);
    expect(page.frontmatter.toc).toHaveLength(8);
    expect(page.frontmatter.steps).toHaveLength(8);
    expect(page.frontmatter.faqs).toHaveLength(8);
    expect(page.content).toContain('Map Room');
    expect(page.content).toContain('chairlift');
    expect(page.content).toContain('underground maze');
    expect(page.content).toContain('host owns the save');
    expect(page.content).toContain('Pending confirmation');
    expect((page.content.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? []).length).toBeGreaterThanOrEqual(1_050);
    expect((page.content.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? []).length).toBeLessThanOrEqual(1_350);
    expect(metadata).toMatchObject({ title, description });

    const { container } = render(
      <NextIntlClientProvider locale="en" messages={en}>
        <GuidePage page={page} />
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole('region', { name: 'Wiki status' })).toBeInTheDocument();
    expect(screen.getAllByTestId('status-card')).toHaveLength(2);
    expect(screen.getByText('Route, milestone, and save-progress facts below are supplied research, not official confirmation.')).toBeInTheDocument();
    expectRenderedStageStructure(container, englishStages);
    expect(screen.getByRole('link', { name: 'Big Walk Puzzle Solutions' })).toHaveAttribute('href', '/en/puzzles');
    expect(screen.getByRole('link', { name: 'Big Walk Save Ownership Guide' })).toHaveAttribute('href', '/en/save');
    expect(screen.getByRole('link', { name: 'Big Walk Game Guide' })).toHaveAttribute('href', '/en/game');
    expect(screen.getByText('Supplied walkthrough research closes with the first ending after Black Tower, not official confirmation.')).toBeInTheDocument();
  });
});

describe('Spanish walkthrough guide', () => {
  it('loads the staged, source-bounded walkthrough through the real content and route boundaries', async () => {
    const page = await getPage('es', 'walkthrough');
    const { generateMetadata } = await import('../app/[locale]/[slug]/page');
    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: 'es', slug: 'walkthrough' }),
    });

    expect(page.frontmatter.title).toBe('Recorrido de Big Walk: torres, t\u00faneles y final');
    expect(page.frontmatter.description).toHaveLength(145);
    expect(page.content).toMatch(/^## \u00c1rea de tutorial\n\nUna gu\u00eda completa desde el \u00e1rea de tutorial hasta el primer final de la Torre Negra\./);
    expect(page.frontmatter.toc).toHaveLength(8);
    expect(page.frontmatter.steps).toHaveLength(8);
    expect(page.frontmatter.faqs).toHaveLength(8);
    expect(page.content.match(/\*\*Pendiente de confirmaci\u00f3n:\*\*/g)).toHaveLength(8);
    for (const stage of page.content.trim().split('\n\n## ')) {
      const [supportedResearch, pendingResearch] = stage.split('**Pendiente de confirmaci\u00f3n:**');

      expect(pendingResearch).toBeDefined();
      expect(supportedResearch).not.toMatch(/no identifica|no describe|no da|sin describir|sin definir/i);
    }
    expect((page.content.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? []).length).toBeGreaterThanOrEqual(1_050);
    expect((page.content.match(/[\p{L}\p{N}]+(?:['’][\p{L}\p{N}]+)*/gu) ?? []).length).toBeLessThanOrEqual(1_350);
    expect(metadata).toMatchObject({
      title: 'Recorrido de Big Walk: torres, t\u00faneles y final',
      description: 'El recorrido de Big Walk resume el \u00e1rea de tutorial, el puente levadizo, las torres, el t\u00fanel amarillo y el final, con dudas claramente marcadas.',
    });
    const serializedSpanish = JSON.stringify({ metadata, frontmatter: page.frontmatter, content: page.content });

    expect(serializedSpanish).not.toMatch(/[\u3400-\u9fff\ufffd]/u);
    expect(serializedSpanish).toContain('\u00e1');
    expect(serializedSpanish).toContain('\u00ed');
    expect(serializedSpanish).toContain('\u00f3');
    expect(serializedSpanish).toContain('\u00fa');
    expect(serializedSpanish).toContain('\u00bf');

    const { container } = render(
      <NextIntlClientProvider locale="es" messages={es}>
        <GuidePage page={page} />
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole('region', { name: 'Wiki status' })).toBeInTheDocument();
    expect(screen.getAllByTestId('status-card')).toHaveLength(2);
    expect(screen.getByText('Los hechos de ruta, hitos y progreso siguientes son investigaci\u00f3n suministrada, no confirmaci\u00f3n oficial.')).toBeInTheDocument();
    expectRenderedStageStructure(container, spanishStages);
    expect(screen.getByRole('link', { name: 'Soluciones de puzles de Big Walk' })).toHaveAttribute('href', '/es/puzzles');
    expect(screen.getByRole('link', { name: 'Gu\u00eda de guardado de Big Walk' })).toHaveAttribute('href', '/es/save');
    expect(screen.getByRole('link', { name: 'Gu\u00eda del juego Big Walk' })).toHaveAttribute('href', '/es/game');
  });
});
