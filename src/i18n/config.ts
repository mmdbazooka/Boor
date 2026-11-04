export const locales = ['en', 'fa'] as const;
export type Locale = (typeof locales)[number];
export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
export const formatNumber = (value: number, locale: Locale) =>
  new Intl.NumberFormat(locale === 'fa' ? 'fa-IR' : 'en-US').format(value);
