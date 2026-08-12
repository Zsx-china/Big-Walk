import type { Locale } from '../i18n/config';
import type { Metadata } from 'next';
import type { FaqItem, StepItem } from './types';

export const SITE_ORIGIN = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.bigwalk.blog').replace(/\/$/, '');

export function absoluteUrl(pathname: string) {
  return `${SITE_ORIGIN}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

const SOCIAL_IMAGE = absoluteUrl('/images/bigwalk-hero.png');

export function createPageMetadata(
  locale: Locale,
  title: string,
  description: string,
  slug?: string,
): Pick<Metadata, 'alternates' | 'openGraph' | 'twitter'> {
  const suffix = slug && slug !== 'home' ? `/${slug}` : '';
  const currentUrl = absoluteUrl(`/${locale}${suffix}`);
  const englishUrl = absoluteUrl(`/en${suffix}`);
  const spanishUrl = absoluteUrl(`/es${suffix}`);

  return {
    alternates: {
      canonical: currentUrl,
      languages: {
        en: englishUrl,
        es: spanishUrl,
        'x-default': englishUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: currentUrl,
      siteName: 'Big Walk Wiki',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
      images: [{ url: SOCIAL_IMAGE, width: 1280, height: 512, alt: 'Big Walk Wiki guide' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SOCIAL_IMAGE],
    },
  };
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

export function createFaqSchema(faqItems: FaqItem[]) {
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
