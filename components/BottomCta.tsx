import { useTranslations } from 'next-intl';

import type { Locale } from '../i18n/config';
import { OFFICIAL_LINKS } from '../lib/links';

export function BottomCta({ locale: _locale }: { locale: Locale }) {
  const t = useTranslations('Common');

  return <section className="mt-12 flex flex-col items-start justify-between gap-4 border-4 border-slate-950 bg-amber-300 p-6 sm:flex-row sm:items-center"><h2 className="text-2xl font-black tracking-tight text-slate-950">{t('KeepWalking').toUpperCase()}</h2><a className="rounded bg-red-600 px-5 py-3 text-sm font-black uppercase tracking-wide text-white" href={OFFICIAL_LINKS.site} target="_blank" rel="noreferrer">Official Big Walk site</a></section>;
}
