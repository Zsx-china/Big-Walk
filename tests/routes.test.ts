import { describe, expect, it } from 'vitest';
import { getPage, pageSlugs } from '../lib/content';

describe('all localized routes', () => {
  for (const locale of ['en', 'es'] as const) for (const slug of pageSlugs) {
    it(`loads ${locale}/${slug}`, async () => expect(getPage(locale, slug)).resolves.toMatchObject({ locale, slug }));
  }
});
