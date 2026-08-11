import { cleanup, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { afterEach, describe, expect, it } from 'vitest';

import { Breadcrumbs } from '../components/Breadcrumbs';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import en from '../messages/en.json';

function renderWithLocale(ui: React.ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={en}>
      {ui}
    </NextIntlClientProvider>,
  );
}

afterEach(cleanup);

describe('shared site shell', () => {
  it('renders the header navigation and Steam play CTA', () => {
    renderWithLocale(<Header locale="en" />);

    const nav = screen.getByLabelText('Primary navigation');
    expect(nav.querySelector('a[href="/en"]')).toHaveTextContent('Home');
    expect(nav).toHaveTextContent('Official FAQ');
    expect(nav.querySelector('a[href="/en/beginner-tips"]')).toHaveTextContent('Start Here');
    expect(nav.querySelector('a[href="/en/game"]')).toHaveTextContent('Game Guides');
    expect(nav.querySelector('a[href="/en/start-here"]')).not.toBeInTheDocument();
    expect(nav.querySelector('a[href="/en/game-guides"]')).not.toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'Play Big Walk' })[0]).toHaveAttribute(
      'href',
      'https://store.steampowered.com/app/1478500/Big_Walk/',
    );
  });

  it('preserves the current page when switching locale', () => {
    renderWithLocale(<Header locale="en" href="/codes" />);

    const selectors = screen.getAllByLabelText('Language selector');
    expect(selectors[0].querySelector('a[lang="es"]')).toHaveAttribute('href', '/es/codes');
  });

  it('lists seven official destinations in the footer', () => {
    renderWithLocale(<Footer locale="en" />);

    const links = screen.getByLabelText('Official links').querySelectorAll('a');

    expect(links).toHaveLength(7);
    expect(Array.from(links, (link) => link.getAttribute('href'))).toEqual([
      'https://bigwalk.game/',
      'https://bigwalk.game/faq',
      'https://bigwalk.game/presskit/',
      'https://store.steampowered.com/app/1478500/Big_Walk/',
      'https://www.playstation.com/en-us/games/big-walk/',
      'https://www.nintendo.com/us/store/products/big-walk-switch-2/',
      'https://www.youtube.com/@HouseHouseGames',
    ]);
  });

  it('renders the current breadcrumb as uppercase text rather than a link', () => {
    render(<Breadcrumbs items={[{ label: 'Home', href: '/en' }, { label: 'Game Guides' }]} />);

    expect(screen.getByRole('link', { name: 'HOME' })).toHaveAttribute('href', '/en');
    expect(screen.getByText('GAME GUIDES')).not.toHaveAttribute('href');
  });
});
