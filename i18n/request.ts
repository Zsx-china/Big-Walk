import { getRequestConfig } from 'next-intl/server';

import { defaultLocale, isSupportedLocale, type Locale } from './config';
import en from '../messages/en.json';
import es from '../messages/es.json';

const dictionaries = { en, es };

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale: Locale = isSupportedLocale(requestedLocale ?? '')
    ? (requestedLocale as Locale)
    : defaultLocale;

  return {
    locale,
    messages: dictionaries[locale]
  };
});
