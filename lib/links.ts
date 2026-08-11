import type { Locale } from '../i18n/config';

type OfficialDestination =
  | 'site'
  | 'faq'
  | 'pressKit'
  | 'steam'
  | 'playstation'
  | 'nintendo'
  | 'youtube';

export const OFFICIAL_LINKS = {
  site: 'https://bigwalk.game/',
  faq: 'https://bigwalk.game/faq',
  pressKit: 'https://bigwalk.game/presskit/',
  steam: 'https://store.steampowered.com/app/1478500/Big_Walk/',
  playstation: 'https://www.playstation.com/en-us/games/big-walk/',
  nintendo: 'https://www.nintendo.com/us/store/products/big-walk-switch-2/',
  youtube: 'https://www.youtube.com/@HouseHouseGames',
} as const satisfies Record<OfficialDestination, `https://${string}`>;

export function localizeHref(locale: Locale, href: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;

  const pathname = href.startsWith('/') ? href : `/${href}`;
  if (/^\/(en|es)(?=\/|$)/.test(pathname)) {
    return pathname.replace(/^\/(en|es)(?=\/|$)/, `/${locale}`);
  }

  return pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
}
