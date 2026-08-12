import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.bigwalk.blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en']
  const staticPaths = [
    '',
    '/beginner-tips',
    '/codes',
    '/puzzles',
    '/crossplay',
    '/walkthrough',
  ]

  const routes: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const path of staticPaths) {
      routes.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: path === '' ? 1 : 0.8,
      })
    }
  }

  return routes
}
