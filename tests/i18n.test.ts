import { describe, expect, it } from 'vitest';

import { isSupportedLocale, locales } from '../i18n/config';

describe('locale configuration', () => {
  it('supports English and Spanish locales only', () => {
    expect(locales).toEqual(['en', 'es']);
    expect(isSupportedLocale('en')).toBe(true);
    expect(isSupportedLocale('fr')).toBe(false);
  });
});
