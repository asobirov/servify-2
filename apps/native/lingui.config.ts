import { defineConfig } from "@lingui/conf";
import baseConfig from "@servify/i18n/base";

export default defineConfig({
  ...baseConfig,
  catalogs: [
    {
      path: "src/locale/locales/{locale}/messages",
      include: ["src"],
      exclude: ["**/node_modules/**"],
    },
  ],
});
