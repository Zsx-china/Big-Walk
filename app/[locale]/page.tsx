import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { HomePage } from '../../components/HomePage';
import { StructuredData } from '../../components/StructuredData';
import { isSupportedLocale } from '../../i18n/config';
import { getPage } from '../../lib/content';
import { absoluteUrl, createBreadcrumbSchema } from '../../lib/schema';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) return {};
  const { frontmatter } = await getPage(locale, 'home');
  return { title: frontmatter.title, description: frontmatter.description, alternates: { canonical: absoluteUrl(`/${locale}`) } };
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();

  const page = await getPage(locale, 'home');
  return <><StructuredData data={createBreadcrumbSchema(locale, 'home')} /><HomePage page={page} /></>;
}
