"use client";

import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";

import { useLocaleLanguage } from "@/locale/dynamic-activate";

type LinguiClientProviderProps = {
  children: React.ReactNode;
};

export function LinguiClientProvider({ children }: LinguiClientProviderProps) {
  useLocaleLanguage();

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
