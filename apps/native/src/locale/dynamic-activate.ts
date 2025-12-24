import type { Messages } from "@lingui/core";
import type { SupportedLocales } from "@servify/i18n/languages";

import { i18n } from "@lingui/core";
import { useEffect } from "react";

import { useAppLanguage } from "@/store/use-app-language-store";

import { messages as messagesEn } from "./locales/en/messages.po";
import { messages as messagesRu } from "./locales/ru/messages.po";
import { messages as messagesUz } from "./locales/uz/messages.po";

export const messages: Record<SupportedLocales, Messages> = {
  en: messagesEn,
  ru: messagesRu,
  uz: messagesUz,
};

const dynamicActivate = (locale: SupportedLocales) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!messages[locale]) {
    i18n.loadAndActivate({ locale, messages: messages.en });
  }
  i18n.loadAndActivate({ locale, messages: messages[locale] });
};

export const useLocaleLanguage = () => {
  const language = useAppLanguage((s) => s.language);

  useEffect(() => {
    dynamicActivate(language);
  }, [language]);
};
