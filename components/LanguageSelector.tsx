import { useTranslations } from 'next-intl';

import type { Locale } from '../i18n/config';
import { localizeHref } from '../lib/links';

export function LanguageSelector({ locale, href = `/${locale}` }: { locale: Locale; href?: string }) {
  const t = useTranslations('Languages');
  const alternateLocale: Locale = locale === 'en' ? 'es' : 'en';

  return (
    <nav aria-label="Language selector" className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide">
      <a aria-current="page" href={localizeHref(locale, href)}>{locale.toUpperCase()}</a>
      <span aria-hidden="true">/</span>
      <a href={localizeHref(alternateLocale, href)} lang={alternateLocale} title={t(alternateLocale === 'en' ? 'English' : 'Spanish')}>
        {alternateLocale.toUpperCase()}
      </a>
    </nav>
  );
}
