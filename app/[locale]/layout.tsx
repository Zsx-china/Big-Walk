import '../globals.css';

import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import { isSupportedLocale } from '../../i18n/config';
import en from '../../messages/en.json';
import es from '../../messages/es.json';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
});

const dictionaries = { en, es };

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={dictionaries[locale]}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
