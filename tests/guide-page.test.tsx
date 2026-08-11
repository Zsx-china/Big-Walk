import { cleanup, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { afterEach, describe, expect, it } from 'vitest';

import { GuidePage } from '../components/GuidePage';
import en from '../messages/en.json';

const codesPage = {
  locale: 'en' as const,
  slug: 'codes' as const,
  content: '## Current status\n\nCodes are **shared** by the community.\n\n## How to redeem\n\nFollow the steps below.\n\n## FAQ\n\nAnswers to common questions.',
  frontmatter: {
    title: 'Big Walk Codes',
    description: 'A careful list of currently known codes.',
    eyebrow: 'Field notes',
    updatedAt: '2026-08-06',
    toc: [
      { id: 'codes', label: 'Known codes' },
      { id: 'steps', label: 'How to redeem' },
      { id: 'faq', label: 'FAQ' },
    ],
    heroCard: {
      title: 'Codes',
      description: 'Keep your notes handy.',
      statusCards: [],
    },
    faqs: [
      { question: 'Where do I enter a code?', answer: 'Use the in-game redemption screen.' },
      { question: 'Do codes expire?', answer: 'Check each code before sharing it.' },
    ],
    steps: [
      { title: 'Open the menu', description: 'Start from the game menu.' },
      { title: 'Enter the code', description: 'Type it exactly as shown.' },
    ],
    relatedLinks: [],
  },
};

afterEach(cleanup);

describe('guide page', () => {
  it('renders a Codes guide with navigation, disclosure FAQs, and numbered steps', () => {
    render(
      <NextIntlClientProvider locale="en" messages={en}>
        <GuidePage page={codesPage} />
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole('heading', { name: 'ON THIS PAGE' })).toBeInTheDocument();
    expect(document.querySelectorAll('article details')).toHaveLength(2);
    expect(screen.getByText('01')).toBeInTheDocument();
  });

  it('renders safe MDX headings with table-of-contents ids instead of raw source', () => {
    render(
      <NextIntlClientProvider locale="en" messages={en}>
        <GuidePage page={codesPage} />
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole('heading', { name: 'Current status' })).toHaveAttribute('id', 'codes');
    expect(screen.getByRole('heading', { name: 'How to redeem' })).toHaveAttribute('id', 'steps');
    expect(screen.queryByText(/## Current status/)).not.toBeInTheDocument();
  });
});
