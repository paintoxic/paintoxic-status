import type { Locale } from "../i18n/index.ts";

/** "YYYY-MM" → short month + year; "YYYY" → year; null → null (unknown). */
export function formatIncidentDate(date: string | null, locale: Locale): string | null {
  if (!date) return null;
  if (/^\d{4}$/.test(date)) return date;
  return new Intl.DateTimeFormat(locale === "es" ? "es-CO" : "en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}-01T00:00:00Z`));
}
