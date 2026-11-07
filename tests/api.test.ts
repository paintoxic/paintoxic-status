import { describe, expect, it } from "vitest";
import { buildStatusApi } from "../src/lib/api.ts";
import type { Snapshot } from "../src/lib/types.ts";

const snapshot: Snapshot = {
  updatedAt: "2026-11-03T16:00:00.000Z",
  characters: [],
  contributions: [
    { date: "2026-11-02", count: 3 },
    { date: "2026-11-03", count: 0 },
  ],
  stats: { publicRepos: 10, yearContributions: 2101 },
};

describe("buildStatusApi", () => {
  const api = buildStatusApi(snapshot, "2026-11-03");

  it("reports the service as operational with 90-day uptime from contributions", () => {
    expect(api.status).toBe("operational");
    expect(api.uptime).toEqual({ window_days: 90, percent: 1.1, source: "github-contributions" });
  });
  it("includes metrics, components, regions and links", () => {
    expect(api.metrics).toEqual({ contributions_12m: 2101, active_days_90d: 1, public_repos: 10 });
    expect(api.components).toHaveLength(4);
    expect(api.components.every((c) => c.status === "operational")).toBe(true);
    expect(api.regions.timezone).toBe("America/Bogota");
    expect(api.regions.languages.map((l) => l.code)).toEqual(["es", "en"]);
    expect(api.links.github).toBe("https://github.com/paintoxic");
    expect(api.updated_at).toBe("2026-11-03T16:00:00.000Z");
  });
  it("uses null when data is missing", () => {
    const empty = buildStatusApi({ updatedAt: null, characters: [], contributions: null }, "2026-11-03");
    expect(empty.uptime.percent).toBeNull();
    expect(empty.metrics).toEqual({ contributions_12m: null, active_days_90d: null, public_repos: null });
  });
});
