import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';

import { HomePage } from '../components/HomePage';
import en from '../messages/en.json';

const home = {
  locale: 'en' as const,
  slug: 'home' as const,
  content: '',
  frontmatter: {
    title: 'Big Walk Wiki | Your calm trail guide',
    description: 'Clear, spoiler-aware guides for Big Walk players.',
    eyebrow: 'The field notebook',
    updatedAt: '2026-08-11',
    toc: [],
    heroCard: {
      title: 'Ready for the next mile?',
      description: 'A practical companion for finding your bearings.',
      statusCards: [
        { label: 'Guides', value: '9', detail: 'Focused routes and explainers' },
        { label: 'Languages', value: '2', detail: 'English and Spanish' },
        { label: 'Spoilers', value: 'Gentle', detail: 'Marked before they matter' },
        { label: 'Mood', value: 'Curious', detail: 'Take the scenic route' },
      ],
    },
    faqs: [],
    steps: [],
    relatedLinks: [
      { slug: 'beginner-tips' as const, label: 'Beginner tips', description: 'Set out with useful habits.' },
      { slug: 'walkthrough' as const, label: 'Walkthrough', description: 'Find a little direction when needed.' },
      { slug: 'codes' as const, label: 'Codes', description: 'Keep track of discoveries and rewards.' },
    ],
  },
};

describe('home page', () => {
  it('shows the home eyebrow, four status cards, and the Keep Walking CTA', () => {
    render(
      <NextIntlClientProvider locale="en" messages={en}>
        <HomePage page={home} />
      </NextIntlClientProvider>,
    );

    expect(screen.getByText('The field notebook')).toBeInTheDocument();
    expect(screen.getAllByTestId('status-card')).toHaveLength(4);
    expect(screen.getByRole('heading', { name: 'KEEP WALKING' })).toBeInTheDocument();
  });
});
