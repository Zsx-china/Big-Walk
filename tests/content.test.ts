import { describe, expect, it } from 'vitest';

import { getPage } from '../lib/content';

describe('MDX content loader', () => {
  it('loads the English home page from its typed content document', async () => {
    const page = await getPage('en', 'home');

    expect(page.frontmatter.title).toContain('Big Walk');
  });

  it('returns an empty table of contents for home', async () => {
    const page = await getPage('en', 'home');

    expect(page.frontmatter.toc).toEqual([]);
  });

  it('rejects inputs outside the allow-listed locale and slugs', async () => {
    await expect(getPage('../en' as never, '../package' as never)).rejects.toThrow(
      'Unsupported locale or page slug',
    );
  });
});
