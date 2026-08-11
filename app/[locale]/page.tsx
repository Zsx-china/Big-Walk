import { notFound } from 'next/navigation';

import { HomePage } from '../../components/HomePage';
import { isSupportedLocale } from '../../i18n/config';
import { getPage } from '../../lib/content';

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) notFound();

  const page = await getPage(locale, 'home');
  return <HomePage page={page} />;
}
