import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe('search engine metadata routes', () => {
  it('allows crawling and advertises the production sitemap', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://www.bigwalk.blog');
    const robotsModulePath = '../app/' + 'robots';
    const robotsModule = await import(robotsModulePath).catch(() => undefined);

    expect(robotsModule?.default?.()).toEqual({
      rules: { userAgent: '*', allow: '/' },
      sitemap: 'https://www.bigwalk.blog/sitemap.xml',
    });
  });

  it('lists every English and Spanish public page exactly once', async () => {
    vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://www.bigwalk.blog');
    const { default: sitemap } = await import('../app/sitemap');
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toHaveLength(40);
    expect(new Set(urls).size).toBe(40);
    expect(urls).toEqual(expect.arrayContaining([
      'https://www.bigwalk.blog/en',
      'https://www.bigwalk.blog/es',
      'https://www.bigwalk.blog/en/achievements',
      'https://www.bigwalk.blog/es/achievements',
      'https://www.bigwalk.blog/en/terms',
      'https://www.bigwalk.blog/es/terms',
    ]));
  });
});
