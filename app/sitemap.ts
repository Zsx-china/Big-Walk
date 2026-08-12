import { MetadataRoute } from 'next'
import { locales } from '../i18n/config'
import { SITE_ORIGIN } from '../lib/schema'
import { pageSlugs } from '../lib/types'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const slug of pageSlugs) {
      const path = slug === 'home' ? '' : `/${slug}`
      routes.push({
        url: `${SITE_ORIGIN}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: path === '' ? 1 : 0.8,
      })
    }
  }

  return routes
}
