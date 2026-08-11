import { cleanup, render, screen, within } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { afterEach, describe, expect, it } from 'vitest';

import { HomePage } from '../components/HomePage';
import { getPage } from '../lib/content';
import en from '../messages/en.json';
import es from '../messages/es.json';

afterEach(cleanup);

async function renderEnglishHome() {
  const page = await getPage('en', 'home');

  return render(
    <NextIntlClientProvider locale="en" messages={en}>
      <HomePage page={page} />
    </NextIntlClientProvider>,
  );
}

async function renderSpanishHome() {
  const page = await getPage('es', 'home');

  return render(
    <NextIntlClientProvider locale="es" messages={es}>
      <HomePage page={page} />
    </NextIntlClientProvider>,
  );
}

describe('English home page', () => {
  it('uses the approved hero and accessible accent theme roles', async () => {
    const { container } = await renderEnglishHome();

    const hero = screen.getByRole('heading', { level: 1, name: 'Big Walk' }).closest('section');
    expect(hero).toHaveClass('bg-ink');
    expect(screen.getByText('Fan-Made Community Wiki')).toHaveClass('text-ember-light');
    expect(screen.getByRole('link', { name: 'Start Beginner Guide' })).toHaveClass(
      'border-ember-light',
      'bg-ember-light',
      'text-ink',
    );

    const firstGuide = screen.getByRole('link', { name: /^01 Beginner Guide/ });
    expect(firstGuide).toHaveClass('border-ink', 'text-ink', 'shadow-[5px_5px_0_0_var(--color-ember)]');
    expect(within(firstGuide).getByText('01')).toHaveClass('border-teal', 'text-ink');
    expect(container.querySelector('.text-teal')).not.toBeInTheDocument();

    const finalCta = screen.getByRole('heading', { name: 'Ready to Master Big Walk?' }).closest('section');
    expect(finalCta).toHaveClass('border-ink', 'bg-ember-light', 'shadow-[8px_8px_0_0_var(--color-ember)]');

    cleanup();
    const spanishHome = await renderSpanishHome();
    expect(screen.getByText('Pick a direction')).toHaveClass('border-teal', 'text-ink');
    expect(screen.getAllByText('01')[0]).toHaveClass('border-teal', 'text-ink');
    expect(spanishHome.container.querySelector('.text-teal')).not.toBeInTheDocument();
  });

  it('renders the approved hero, factual status cards, and guide routes', async () => {
    await renderEnglishHome();

    expect(screen.getByText('Fan-Made Community Wiki')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Big Walk' })).toBeInTheDocument();
    expect(screen.getByText(
      'Hang out and get lost with close friends in a big, colorful open world. Solve puzzles together, explore at your own pace, and enjoy proximity voice chat — the farther your friend walks, the quieter they get.',
    )).toBeInTheDocument();

    const expectedStatus = [
      ['Launched', 'Aug 2026'],
      ['Updated', 'Daily'],
      ['Metascore', '93'],
      ['Players', 'Up to 12'],
      ['Cross-Platform', 'Play'],
    ];
    const statusCards = screen.getAllByTestId('status-card');
    expect(statusCards).toHaveLength(expectedStatus.length);
    expectedStatus.forEach(([label, value], index) => {
      expect(statusCards[index]).toHaveTextContent(label);
      expect(statusCards[index]).toHaveTextContent(value);
    });

    expect(screen.getByRole('link', { name: 'Start Beginner Guide' })).toHaveAttribute('href', '/en/beginner-tips');
    expect(screen.getByRole('link', { name: 'Check Active Codes' })).toHaveAttribute('href', '/en/codes');
    expect(screen.getByRole('link', { name: 'Puzzle Solutions' })).toHaveAttribute('href', '/en/puzzles');
  });

  it('renders all four starting points with the approved descriptions and routes', async () => {
    await renderEnglishHome();

    expect(screen.getByRole('heading', { name: 'Your Big Walk Journey' })).toBeInTheDocument();
    const guides = [
      {
        title: 'Beginner Guide',
        description: 'New to Big Walk? Learn the basics: controls, how movement works, what to do first, and tips for your first hour in the open world.',
        href: '/en/beginner-tips',
      },
      {
        title: 'Puzzle Solutions',
        description: 'Stuck on a puzzle? Find every solution including coordinate puzzles (4166, 1899), peg puzzles, and all hidden answers across the map.',
        href: '/en/puzzles',
      },
      {
        title: 'Active Codes',
        description: 'Looking for redemption codes? Check the latest working codes, how to redeem them, and when they expire.',
        href: '/en/codes',
      },
      {
        title: 'Crossplay & Multiplayer',
        description: 'Want to play with friends on different platforms? Learn how crossplay works, player limits, split-screen options, and voice chat setup.',
        href: '/en/game',
      },
    ];

    for (const guide of guides) {
      const link = screen.getByRole('link', { name: new RegExp(`^\\d{2} ${guide.title}`) });
      expect(link).toHaveAttribute('href', guide.href);
      expect(link).toHaveTextContent(guide.description);
    }
  });

  it('renders the approved game overview, facts, and final calls to action', async () => {
    await renderEnglishHome();

    const overviewHeading = screen.getByRole('heading', { name: 'What is Big Walk?' });
    const overview = overviewHeading.closest('section');
    expect(overview).not.toBeNull();
    expect(within(overview!).getByText(
      'Big Walk is a multiplayer cooperative adventure game from House House, the creators of the beloved Untitled Goose Game. Set in a vast, colorful open world inspired by the Australian outback, you and up to 11 friends can walk, talk, explore, solve puzzles, and simply hang out together.',
    )).toBeInTheDocument();
    expect(within(overview!).getByText(
      "Featuring a unique proximity-based voice chat system where friends sound quieter the further away they are, Big Walk embraces nonlinear exploration over rigid objectives. Wander off the path, discover hidden areas, watch the sunset, or steal your friend's items — there's no wrong way to play.",
    )).toBeInTheDocument();

    const facts = [
      ['Developer', 'House House'],
      ['Publisher', 'Panic'],
      ['Platform', 'PC, PS5, Switch 2'],
      ['Genre', 'Co-op Adventure/Puzzle'],
      ['Release Date', 'Aug 4 2026'],
      ['Players', 'Up to 12 Online'],
      ['Metacritic', '93'],
    ];
    for (const [label, value] of facts) {
      expect(within(overview!).getByText(label)).toBeInTheDocument();
      expect(within(overview!).getByText(value)).toBeInTheDocument();
    }
    expect(within(overview!).getByRole('link', { name: 'Explore All Guides' })).toHaveAttribute('href', '/en/walkthrough');

    const finalHeading = screen.getByRole('heading', { name: 'Ready to Master Big Walk?' });
    const finalCta = finalHeading.closest('section');
    expect(finalCta).not.toBeNull();
    expect(within(finalCta!).getByText(
      'From your first steps into the open world to solving every last puzzle, our community wiki has you covered. Join thousands of players finding codes, solutions, and tips updated daily.',
    )).toBeInTheDocument();
    expect(within(finalCta!).getByRole('link', { name: 'Read the Beginner Guide' })).toHaveAttribute('href', '/en/beginner-tips');
    expect(within(finalCta!).getByRole('link', { name: 'Play on Steam' })).toHaveAttribute(
      'href',
      'https://store.steampowered.com/app/1478500/Big_Walk/',
    );
  });
});
