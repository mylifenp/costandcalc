import 'server-only';

import { defaultLocale, isLocale, type Locale } from '@/i18n';

const dictionaries = {
  'en-US': () => import('./dictionaries/en-US.json').then((module) => module.default),
  'de-DE': () => import('./dictionaries/de-DE.json').then((module) => module.default),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)[Locale]>>;

export const getDictionary = async (locale: string): Promise<Dictionary> =>
  dictionaries[isLocale(locale) ? locale : defaultLocale]();
