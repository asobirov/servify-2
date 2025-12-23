export const LOCALES = ["en", "ru", "uz"] as const;
export const DEFAULT_LOCALE = "en";

export type SupportedLocales = (typeof LOCALES)[number];

/**
 * Validates whether a locale is supported. If not, the default locale will be used.
 */
export const isSupportedLocale = (locale: string): locale is SupportedLocales => {
  return LOCALES.includes(locale as SupportedLocales);
};
