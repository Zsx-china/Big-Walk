import type { Locale } from '../i18n/config';

export const OFFICIAL_LINKS = {
  site: 'https://bigwalk.game',
  faq: 'https://bigwalk.game/faq',
  pressKit: 'https://bigwalk.game/press',
  steam: 'https://store.steampowered.com/app/2868840/BIG_WALK/',
  playstation: 'https://www.playstation.com/',
  nintendo: 'https://www.nintendo.com/',
  youtube: 'https://www.youtube.com/',
} as const;

export function localizeHref(locale: Locale, href: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;

  const pathname = href.startsWith('/') ? href : `/${href}`;
  if (/^\/(en|es)(?=\/|$)/.test(pathname)) {
    return pathname.replace(/^\/(en|es)(?=\/|$)/, `/${locale}`);
  }

  return pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
}
