import { links } from "../data/content.ts";
import { now, regions } from "../data/presentation.ts";
import { t } from "../i18n/index.ts";
import { SITE } from "./seo.ts";
import { lastNDays, uptimeEndDate, uptimePercent } from "./status.ts";
import type { Snapshot } from "./types.ts";

/** Public, English-only JSON served at /api/status.json — the page's data, machine-readable. */
export function buildStatusApi(snapshot: Snapshot, today: string) {
  const d = t("en");
  const hasContrib = snapshot.contributions !== null;
  const days = lastNDays(snapshot.contributions, uptimeEndDate(snapshot.contributions, today));
  return {
    service: "paintoxic",
    page: `${SITE}/`,
    status: "operational" as const,
    description: `${d.hero.role} at Yuno, Bogotá`,
    uptime: { window_days: 90, percent: hasContrib ? uptimePercent(days) : null, source: "github-contributions" },
    metrics: {
      contributions_12m: snapshot.stats?.yearContributions ?? null,
      active_days_90d: hasContrib ? days.filter((x) => x.count > 0).length : null,
      public_repos: snapshot.stats?.publicRepos ?? null,
    },
    components: d.components.items.map((c) => ({ name: c.title, status: "operational" as const })),
    current_deployment: Object.fromEntries(now.map((n) => [n.key, n.en])),
    regions: {
      timezone: regions.timezone,
      utc_offset: regions.utcOffset,
      languages: regions.languages.map((l) => ({ code: l.code, name: l.en, level: l.level.en })),
    },
    links: Object.fromEntries(Object.entries(links).map(([k, l]) => [k, l.url])) as Record<keyof typeof links, string>,
    updated_at: snapshot.updatedAt,
  };
}
