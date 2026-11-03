import { en } from "./en.ts";
import { es } from "./es.ts";

export type Locale = "es" | "en";
export type Dict = typeof en;

const dicts: Record<Locale, Dict> = { es, en };

export function t(locale: Locale): Dict {
  return dicts[locale];
}

export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "es" ? "es-CO" : "en-US", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(iso),
  );
}

export function localePath(locale: Locale): "/" | "/en/" {
  return locale === "es" ? "/" : "/en/";
}
