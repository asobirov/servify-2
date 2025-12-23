import type { LinguiConfig } from "@lingui/conf";

import { DEFAULT_LOCALE, LOCALES } from "./languages";

const config: LinguiConfig = {
  locales: LOCALES as unknown as string[],
  pseudoLocale: "pseudo",
  sourceLocale: DEFAULT_LOCALE,
  fallbackLocales: {
    default: DEFAULT_LOCALE,
  },
  orderBy: "origin",
};

export default config;
