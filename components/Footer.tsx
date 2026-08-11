import { useTranslations } from 'next-intl';

import type { Locale } from '../i18n/config';
import { OFFICIAL_LINKS, localizeHref } from '../lib/links';

const officialEntries = [
  ['OfficialSite', OFFICIAL_LINKS.site], ['FAQ', OFFICIAL_LINKS.faq], ['PressKit', OFFICIAL_LINKS.pressKit],
  ['Steam', OFFICIAL_LINKS.steam], ['PlayStation', OFFICIAL_LINKS.playstation], ['Nintendo', OFFICIAL_LINKS.nintendo], ['YouTube', OFFICIAL_LINKS.youtube],
] as const;

export function Footer({ locale }: { locale: Locale }) {
  const t = useTranslations('Footer');
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-10 md:grid-cols-3">
        <section>
          <p className="text-lg font-black text-white">{t('Heading')}</p>
          <p className="mt-2 text-sm">{t('Statement')}</p>
          <p className="mt-4 text-xs text-slate-400">{t('Disclaimer')}</p>
          <p className="mt-4 text-xs text-slate-400">{t('RightsNotice')}</p>
        </section>
        <section aria-label={t('OfficialLinks')}>
          <h2 className="text-sm font-black uppercase tracking-wide text-white">{t('OfficialLinks')}</h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {officialEntries.map(([key, href]) => <li key={key}><a href={href} target="_blank" rel="noreferrer">{t(key)}</a></li>)}
          </ul>
        </section>
        <section className="text-sm">
          <h2 className="font-black uppercase tracking-wide text-white">{t('Wiki')}</h2>
          <div className="mt-3 flex gap-4"><a href={localizeHref(locale, '/about')}>{t('About')}</a><a href={localizeHref(locale, '/privacy')}>{t('Privacy')}</a><a href={localizeHref(locale, '/terms')}>{t('Terms')}</a></div>
          <p className="mt-6 text-xs text-slate-400">{t('Copyright', { year })}</p>
        </section>
      </div>
    </footer>
  );
}
