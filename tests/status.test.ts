import { describe, expect, it } from "vitest";
import {
  characterKey,
  characterStatus,
  lastNDays,
  overallStatus,
  uptimeEndDate,
  uptimePercent,
} from "../src/lib/status.ts";
import type { CharacterData, LastRun } from "../src/lib/types.ts";

const run: LastRun = {
  dungeon: "Ara-Kara, City of Echoes",
  level: 12,
  upgrades: 1,
  completedAt: "2026-10-30T02:00:00.000Z",
  url: "https://raider.io/mythic-plus-runs/x",
};
const base: CharacterData = {
  key: "us/ragnaros/paintóxic",
  name: "Paintóxic",
  realm: "ragnaros",
  region: "us",
  race: "Blood Elf",
  className: "Paladin",
  spec: "Holy",
  thumbnailUrl: null,
  profileUrl: "https://raider.io/characters/us/ragnaros/Paint%C3%B3xic",
  score: 2500,
  itemLevel: 640,
  lastRun: run,
};

describe("characterStatus", () => {
  it("is no_data without character or without runs", () => {
    expect(characterStatus(null)).toBe("no_data");
    expect(characterStatus({ ...base, lastRun: null })).toBe("no_data");
  });
  it("is degraded when the last key was depleted", () => {
    expect(characterStatus({ ...base, lastRun: { ...run, upgrades: 0 } })).toBe("degraded");
  });
  it("is operational when the last key was timed", () => {
    expect(characterStatus({ ...base, lastRun: { ...run, upgrades: 1 } })).toBe("operational");
    expect(characterStatus({ ...base, lastRun: { ...run, upgrades: 3 } })).toBe("operational");
  });
});

describe("overallStatus", () => {
  it("ignores no_data", () => {
    expect(overallStatus(["operational", "no_data"])).toBe("operational");
  });
  it("is degraded when any component is degraded", () => {
    expect(overallStatus(["operational", "degraded", "no_data"])).toBe("degraded");
  });
  it("is operational for empty input", () => {
    expect(overallStatus([])).toBe("operational");
  });
});

describe("characterKey", () => {
  it("lowercases and keeps accents", () => {
    expect(characterKey({ region: "US", realm: "Ragnaros", name: "Paintóxic" })).toBe("us/ragnaros/paintóxic");
  });
});

describe("lastNDays", () => {
  it("returns exactly 90 days ending today, zero-filled, dropping out-of-range", () => {
    const r = lastNDays(
      [
        { date: "2026-11-02", count: 2 },
        { date: "2026-11-03", count: 9 },
        { date: "2026-07-01", count: 5 },
      ],
      "2026-11-02",
    );
    expect(r).toHaveLength(90);
    expect(r[89]).toEqual({ date: "2026-11-02", count: 2 });
    expect(r[0]!.date).toBe("2026-08-05");
    expect(r[0]!.count).toBe(0);
    expect(r.some((d) => d.date === "2026-07-01" || d.date === "2026-11-03")).toBe(false);
  });
  it("handles null input", () => {
    const r = lastNDays(null, "2026-11-02");
    expect(r).toHaveLength(90);
    expect(r.every((d) => d.count === 0)).toBe(true);
  });
});

describe("uptimePercent", () => {
  it("is 0 for empty input", () => {
    expect(uptimePercent([])).toBe(0);
  });
  it("rounds to one decimal", () => {
    expect(
      uptimePercent([
        { date: "a", count: 1 },
        { date: "b", count: 0 },
        { date: "c", count: 4 },
      ]),
    ).toBe(66.7);
  });
});

describe("uptimeEndDate", () => {
  it("is today when there is no data", () => {
    expect(uptimeEndDate(null, "2026-11-24")).toBe("2026-11-24");
    expect(uptimeEndDate([], "2026-11-24")).toBe("2026-11-24");
  });
  it("is today when data is fresh", () => {
    expect(uptimeEndDate([{ date: "2026-11-23", count: 1 }, { date: "2026-11-24", count: 0 }], "2026-11-24")).toBe("2026-11-24");
  });
  it("stops at the last known day when data is stale (does not invent zero days)", () => {
    expect(uptimeEndDate([{ date: "2026-11-02", count: 0 }, { date: "2026-11-03", count: 4 }], "2026-11-24")).toBe("2026-11-03");
  });
});
