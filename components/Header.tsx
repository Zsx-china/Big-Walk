import { useTranslations } from 'next-intl';

import type { Locale } from '../i18n/config';
import { OFFICIAL_LINKS, localizeHref } from '../lib/links';
import { LanguageSelector } from './LanguageSelector';

const navigation = [
  ['Home', '/'], ['StartHere', '/start-here'], ['About', '/about'], ['Codes', '/codes'],
  ['Classes', '/classes'], ['Tools', '/tools'], ['GameGuides', '/game-guides'],
] as const;

export function Header({ locale }: { locale: Locale }) {
  const t = useTranslations('Header');
  const navLinks = navigation.map(([key, href]) => ({ label: t(key), href: localizeHref(locale, href) }));

  return (
    <header className="border-b-4 border-slate-950 bg-white text-slate-950">
      <div className="mx-auto flex max-w-[1200px] items-center gap-4 px-4 py-3">
        <a href={localizeHref(locale, '/')} className="shrink-0 text-lg font-black tracking-tighter" aria-label="Big Walk Wiki home">
          BIG WALK <span className="ml-1 rounded bg-slate-950 px-1.5 py-0.5 text-xs tracking-wide text-white">WIKI</span>
        </a>
        <nav aria-label="Primary navigation" className="hidden flex-1 items-center justify-center gap-3 text-xs font-bold lg:flex">
          {navLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          <a href={OFFICIAL_LINKS.faq} target="_blank" rel="noreferrer">{t('OfficialFAQ')}</a>
        </nav>
        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <LanguageSelector locale={locale} />
          <a className="rounded bg-red-600 px-3 py-2 text-xs font-black uppercase tracking-wide text-white" href={OFFICIAL_LINKS.steam} target="_blank" rel="noreferrer">{t('PlayBigWalk')}</a>
        </div>
        <details className="ml-auto lg:hidden">
          <summary className="cursor-pointer text-sm font-black">MENU</summary>
          <nav aria-label="Mobile navigation" className="absolute right-4 z-10 mt-2 grid min-w-52 gap-2 border-2 border-slate-950 bg-white p-4 text-sm font-bold shadow-lg">
            {navLinks.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
            <a href={OFFICIAL_LINKS.faq} target="_blank" rel="noreferrer">{t('OfficialFAQ')}</a>
            <LanguageSelector locale={locale} />
            <a className="rounded bg-red-600 px-3 py-2 text-center text-xs font-black uppercase tracking-wide text-white" href={OFFICIAL_LINKS.steam} target="_blank" rel="noreferrer">{t('PlayBigWalk')}</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
