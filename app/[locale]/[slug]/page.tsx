import { notFound } from 'next/navigation';

import { GuidePage } from '../../../components/GuidePage';
import { isSupportedLocale } from '../../../i18n/config';
import { getPage, pageSlugs, type PageSlug } from '../../../lib/content';

function isArticleSlug(value: string): value is Exclude<PageSlug, 'home'> {
  return value !== 'home' && pageSlugs.includes(value as PageSlug);
}

export default async function ArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isSupportedLocale(locale) || !isArticleSlug(slug)) notFound();

  try {
    return <GuidePage page={await getPage(locale, slug)} />;
  } catch {
    notFound();
  }
}
