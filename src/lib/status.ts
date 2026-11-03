import type { CharacterData, ContributionDay, Status } from "./types.ts";

const DAY_MS = 86_400_000;

export function characterKey(c: { region: string; realm: string; name: string }): string {
  return `${c.region}/${c.realm}/${c.name}`.toLowerCase();
}

export function characterStatus(c: CharacterData | null): Status {
  if (!c || !c.lastRun) return "no_data";
  return c.lastRun.upgrades >= 1 ? "operational" : "degraded";
}

export function overallStatus(statuses: Status[]): "operational" | "degraded" {
  return statuses.includes("degraded") ? "degraded" : "operational";
}

function toUtcMs(date: string): number {
  const [y, m, d] = date.split("-").map(Number);
  return Date.UTC(y!, m! - 1, d!);
}

function toIsoDate(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

/** Exactly `n` days ending at `today` (inclusive), oldest first, zero-filled. */
export function lastNDays(days: ContributionDay[] | null, today: string, n = 90): ContributionDay[] {
  const counts = new Map((days ?? []).map((d) => [d.date, d.count]));
  const end = toUtcMs(today);
  const out: ContributionDay[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const date = toIsoDate(end - i * DAY_MS);
    out.push({ date, count: counts.get(date) ?? 0 });
  }
  return out;
}

export function uptimePercent(days: ContributionDay[]): number {
  if (days.length === 0) return 0;
  const active = days.filter((d) => d.count >= 1).length;
  return Math.round((active / days.length) * 1000) / 10;
}

/** Window end for the uptime bar: today, unless the data is stale — then its last known day. */
export function uptimeEndDate(days: ContributionDay[] | null, today: string): string {
  if (!days || days.length === 0) return today;
  const last = days.reduce((max, d) => (d.date > max ? d.date : max), days[0]!.date);
  return last < today ? last : today;
}
