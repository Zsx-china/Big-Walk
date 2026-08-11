import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';

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

describe('shared site shell', () => {
  it('renders the header navigation and Steam play CTA', () => {
    renderWithLocale(<Header locale="en" />);

    const nav = screen.getByLabelText('Primary navigation');
    expect(nav.querySelector('a[href="/en"]')).toHaveTextContent('Home');
    expect(nav).toHaveTextContent('Official FAQ');
    expect(screen.getAllByRole('link', { name: 'Play Big Walk' })[0]).toHaveAttribute(
      'href',
      expect.stringContaining('store.steampowered.com'),
    );
  });

  it('lists seven official destinations in the footer', () => {
    renderWithLocale(<Footer locale="en" />);

    expect(screen.getByLabelText('Official links').querySelectorAll('a')).toHaveLength(7);
  });

  it('renders the current breadcrumb as uppercase text rather than a link', () => {
    render(<Breadcrumbs items={[{ label: 'Home', href: '/en' }, { label: 'Game Guides' }]} />);

    expect(screen.getByRole('link', { name: 'HOME' })).toHaveAttribute('href', '/en');
    expect(screen.getByText('GAME GUIDES')).not.toHaveAttribute('href');
  });
});
