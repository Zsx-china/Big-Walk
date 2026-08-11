import { useTranslations } from 'next-intl';

import type { Locale } from '../i18n/config';
import { OFFICIAL_LINKS, localizeHref } from '../lib/links';

const officialEntries = [
  ['Official site', OFFICIAL_LINKS.site], ['FAQ', OFFICIAL_LINKS.faq], ['Press kit', OFFICIAL_LINKS.pressKit],
  ['Steam', OFFICIAL_LINKS.steam], ['PlayStation', OFFICIAL_LINKS.playstation], ['Nintendo', OFFICIAL_LINKS.nintendo], ['YouTube', OFFICIAL_LINKS.youtube],
] as const;

export function Footer({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 py-10 md:grid-cols-3">
        <section>
          <p className="text-lg font-black text-white">{t('Footer.Heading')}</p>
          <p className="mt-2 text-sm">{t('Footer.Statement')}</p>
          <p className="mt-4 text-xs text-slate-400">This independent fan site is not affiliated with, endorsed by, or sponsored by House House or any platform holder.</p>
        </section>
        <section aria-label="Official links">
          <h2 className="text-sm font-black uppercase tracking-wide text-white">Official links</h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {officialEntries.map(([label, href]) => <li key={label}><a href={href} target="_blank" rel="noreferrer">{label}</a></li>)}
          </ul>
        </section>
        <section className="text-sm">
          <h2 className="font-black uppercase tracking-wide text-white">Wiki</h2>
          <div className="mt-3 flex gap-4"><a href={localizeHref(locale, '/about')}>{t('Header.About')}</a><a href={localizeHref(locale, '/privacy')}>{t('Footer.Privacy')}</a><a href={localizeHref(locale, '/terms')}>{t('Footer.Terms')}</a></div>
          <p className="mt-6 text-xs text-slate-400">© {year} Big Walk Wiki. All game trademarks belong to their respective owners.</p>
        </section>
      </div>
    </footer>
  );
}
