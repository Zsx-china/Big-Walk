import type { Locale } from '../i18n/config';
import type { FaqItem, StepItem } from './types';

const siteUrl = 'https://bigwalk-wiki.example.com';

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
  const items = [{ name: labelFor(locale, 'home'), path: pathFor(locale) }];
  if (slug !== 'home') items.push({ name: labelFor(locale, slug), path: pagePath });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function createFaqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function createHowToSchema(steps: StepItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };
}
