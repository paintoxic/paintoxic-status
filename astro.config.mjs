// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://paintoxic.io",
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: { prefixDefaultLocale: false },
  },
});
