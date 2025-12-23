import { defineConfig } from "@lingui/conf";

import baseConfig from "@servify/i18n/base";

export default defineConfig({
  ...baseConfig,
  catalogs: [
    {
      path: "locale/locales/{locale}/messages",
      include: ["app", "components", "contexts", "utils", "lib"],
      exclude: ["**/node_modules/**", "**/.*"],
    },
  ],
});
