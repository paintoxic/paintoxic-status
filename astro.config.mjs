// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://paintoxic.io",
  build: { inlineStylesheets: "always" },
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "es",
        locales: { es: "es", en: "en" },
      },
    }),
  ],
});
