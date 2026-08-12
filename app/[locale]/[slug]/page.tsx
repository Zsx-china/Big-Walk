import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { GuidePage } from '../../../components/GuidePage';
import { StructuredData } from '../../../components/StructuredData';
import { isSupportedLocale } from '../../../i18n/config';
import { getPage, pageSlugs, type PageSlug } from '../../../lib/content';
import { createBreadcrumbSchema, createFaqSchema, createHowToSchema, createPageMetadata } from '../../../lib/schema';

function isArticleSlug(value: string): value is Exclude<PageSlug, 'home'> {
  return value !== 'home' && pageSlugs.includes(value as PageSlug);
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isSupportedLocale(locale) || !isArticleSlug(slug)) return {};
  try {
    const { frontmatter } = await getPage(locale, slug);
    return {
      title: frontmatter.title,
      description: frontmatter.description,
      ...createPageMetadata(locale, frontmatter.title, frontmatter.description, slug),
    };
  } catch {
    return {};
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isSupportedLocale(locale) || !isArticleSlug(slug)) notFound();

  try {
    const page = await getPage(locale, slug);
    const { faqs, steps } = page.frontmatter;
    return <>
      <StructuredData data={createBreadcrumbSchema(locale, slug)} />
      {faqs.length > 0 && <StructuredData data={createFaqSchema(faqs)} />}
      {steps.length > 0 && <StructuredData data={createHowToSchema(steps)} />}
      <GuidePage page={page} />
    </>;
  } catch {
    notFound();
  }
}
