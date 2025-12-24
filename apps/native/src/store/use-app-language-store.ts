import type { SupportedLocales } from "@servify/i18n/languages";

import { LOCALES } from "@servify/i18n/languages";
import { getLocales } from "expo-localization";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { zustandMMKVStorage } from "@/store/mmkv";

const SUPPORTED_LOCALES = new Set<string>(LOCALES);

type AppLanguageState = {
  language: SupportedLocales;
  setLanguage: (language: SupportedLocales) => void;
};

const getSystemLanguage = () => {
  try {
    const deviceLocales = getLocales();
    const deviceLanguage = deviceLocales.find(
      (locale) => locale.languageCode && SUPPORTED_LOCALES.has(locale.languageCode),
    );

    return (deviceLanguage?.languageCode ?? "en") as SupportedLocales;
  } catch {
    return "en";
  }
};

export const useAppLanguage = create<AppLanguageState>()(
  persist(
    (set) => ({
      language: getSystemLanguage(),
      setLanguage: (language: SupportedLocales) => {
        if (!SUPPORTED_LOCALES.has(language)) {
          console.warn(`Unsupported language: ${language}`);
          return;
        }
        set({
          language,
        });
      },
    }),
    {
      name: "app-language",
      storage: createJSONStorage(() => zustandMMKVStorage),
    },
  ),
);
