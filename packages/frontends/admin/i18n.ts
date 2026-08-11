// Shared i18n configuration — imported by both proxy.ts (locale routing)
// and app/[lang]/dictionaries.ts (localized content).

export const locales = ['en-US', 'de-DE'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en-US';

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

export const localeNames: Record<Locale, string> = {
  'en-US': 'English (US)',
  'de-DE': 'Deutsch (Deutschland)',
};
