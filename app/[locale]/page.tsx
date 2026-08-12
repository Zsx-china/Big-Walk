import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { HomePage } from '../../components/HomePage';
import { StructuredData } from '../../components/StructuredData';
import { isSupportedLocale } from '../../i18n/config';
import { getPage } from '../../lib/content';
import { createBreadcrumbSchema, createPageMetadata, createWebsiteSchema } from '../../lib/schema';

const ENGLISH_HOME_METADATA = {
  title: 'Big Walk Wiki — Puzzle Solutions, Codes & Walkthrough',
  description: 'Your complete guide to Big Walk: all puzzle solutions, active codes, walkthrough tips, crossplay info & more. Updated daily by the community.',
  keywords: 'Big Walk, Big Walk codes, Big Walk puzzle solutions, Big Walk walkthrough, Big Walk crossplay, Big Walk guide',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) return {};
  const { frontmatter } = await getPage(locale, 'home');
  const pageMetadata = locale === 'en'
    ? ENGLISH_HOME_METADATA
    : { title: frontmatter.title, description: frontmatter.description };
  return {
    ...pageMetadata,
    ...createPageMetadata(locale, pageMetadata.title, pageMetadata.description, 'home'),
  };
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();

  const page = await getPage(locale, 'home');
  return <><StructuredData data={createWebsiteSchema()} /><StructuredData data={createBreadcrumbSchema(locale, 'home')} /><HomePage page={page} /></>;
}
