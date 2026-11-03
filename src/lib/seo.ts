import { links, yunoUrl } from "../data/content.ts";
import { localePath, t, type Locale } from "../i18n/index.ts";

export const SITE = "https://paintoxic.io";

export function pageTitle(locale: Locale): string {
  return `Paintoxic — ${t(locale).hero.role} · Status`;
}

export function personJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Paintoxic",
    jobTitle: t(locale).hero.role,
    url: `${SITE}${localePath(locale)}`,
    image: `${SITE}/og.png`,
    worksFor: { "@type": "Organization", name: "Yuno", url: yunoUrl },
    homeLocation: { "@type": "Place", name: "Bogotá, Colombia" },
    sameAs: [links.github.url, links.linkedin.url, links.x.url],
  };
}
