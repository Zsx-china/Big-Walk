import type { Locale } from '../i18n/config';
import type { FaqItem, StepItem } from './types';

export const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.bigwalk.blog').replace(/\/$/, '');

export function absoluteUrl(pathname: string) {
  return `${SITE_ORIGIN}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

export function createWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Big Walk Wiki',
    url: SITE_ORIGIN,
  };
}

function pathFor(locale: Locale, slug?: string) {
  return slug && slug !== 'home' ? `/${locale}/${slug}` : `/${locale}`;
}

function labelFor(locale: Locale, slug: string) {
  if (slug === 'home') return locale === 'es' ? 'Inicio' : 'Home';
  return slug.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
}

/** Creates a two-level breadcrumb for a locale's home or guide page. */
export function createBreadcrumbSchema(locale: Locale, slug: string) {
  const pagePath = pathFor(locale, slug);
  const items = [
    {
      name: labelFor(locale, 'home'),
      path: pathFor(locale),
    },
  ];
  if (slug !== 'home') items.push({ name: labelFor(locale, slug), path: pagePath });
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${SITE_ORIGIN}${item.path}`,
    })),
  };
}

export function createFaqSchema(faqItems: FaqItem[], locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function createHowToSchema(steps: StepItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    step: steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.title,
      text: step.description,
    })),
  };
}
