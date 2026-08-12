import { describe, expect, it } from 'vitest';

import { createBreadcrumbSchema, createFaqSchema } from '../lib/schema';

describe('structured data schemas', () => {
  it('creates an FAQPage from FAQ items', () => {
    const schema = createFaqSchema([{ question: 'Can I join?', answer: 'Yes.' }]);
    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity[0]).toMatchObject({ '@type': 'Question', name: 'Can I join?' });
    expect(schema.mainEntity[0].acceptedAnswer).toEqual({ '@type': 'Answer', text: 'Yes.' });
  });

  it('creates a two-item breadcrumb for a guide', () => {
    const schema = createBreadcrumbSchema('en', 'beginner-tips');
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement).toHaveLength(2);
    expect(schema.itemListElement.map((item) => item.position)).toEqual([1, 2]);
    expect(schema.itemListElement.map((item) => item.item)).toEqual([
      'https://www.bigwalk.blog/en',
      'https://www.bigwalk.blog/en/beginner-tips',
    ]);
  });
});
