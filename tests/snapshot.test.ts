import { describe, expect, it } from "vitest";
import { mergeSnapshot, stabilizeTimestamp, type FetchResult } from "../src/lib/snapshot.ts";
import type { CharacterConfig, CharacterData, ContributionDay, Snapshot } from "../src/lib/types.ts";

const paint: CharacterConfig = { name: "Paintóxic", realm: "ragnaros", region: "us" };
const bela: CharacterConfig = { name: "Belathil", realm: "quelthalas", region: "us" };
const data = (c: CharacterConfig, score: number): CharacterData => ({
  key: `${c.region}/${c.realm}/${c.name}`.toLowerCase(),
  name: c.name, realm: c.realm, region: c.region,
  race: null, className: null, spec: null, thumbnailUrl: null,
  profileUrl: "https://raider.io/x", score, itemLevel: null, lastRun: null,
});
const ok = <T,>(value: T): FetchResult<T> => ({ ok: true, value });
const fail = (error: string): { ok: false; error: string } => ({ ok: false, error });
const empty: Snapshot = { updatedAt: null, characters: [], contributions: null };
const days: ContributionDay[] = [{ date: "2026-11-01", count: 3 }];
const NOW = "2026-11-03T16:00:00.000Z";

describe("mergeSnapshot", () => {
  it("uses fetched values on success", () => {
    const { snapshot, warnings } = mergeSnapshot(empty, [paint, bela], [ok(data(paint, 1)), ok(data(bela, 2))], ok(days), NOW);
    expect(snapshot.characters.map((c) => c.name)).toEqual(["Paintóxic", "Belathil"]);
    expect(snapshot.contributions).toEqual(days);
    expect(snapshot.updatedAt).toBe(NOW);
    expect(warnings).toEqual([]);
  });
  it("falls back to the previous character on failure", () => {
    const prev = { ...empty, characters: [data(bela, 9)] };
    const { snapshot, warnings } = mergeSnapshot(prev, [paint, bela], [ok(data(paint, 1)), fail("raider.io 500")], ok(days), NOW);
    expect(snapshot.characters[1]!.score).toBe(9);
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toMatch(/Belathil.*using snapshot/);
  });
  it("omits a failed character with no previous data", () => {
    const { snapshot, warnings } = mergeSnapshot(empty, [paint, bela], [ok(data(paint, 1)), fail("404")], ok(days), NOW);
    expect(snapshot.characters).toHaveLength(1);
    expect(warnings[0]).toMatch(/Belathil.*no data/);
  });
  it("keeps previous contributions when skipped or failed", () => {
    const prev = { ...empty, contributions: days };
    expect(mergeSnapshot(prev, [], [], fail("skipped: no token"), NOW).snapshot.contributions).toEqual(days);
    expect(mergeSnapshot(empty, [], [], fail("github 502"), NOW).snapshot.contributions).toBeNull();
  });
  it("drops characters removed from config", () => {
    const prev = { ...empty, characters: [data(paint, 1), data(bela, 2)] };
    const { snapshot } = mergeSnapshot(prev, [paint], [ok(data(paint, 5))], ok(days), NOW);
    expect(snapshot.characters.map((c) => c.name)).toEqual(["Paintóxic"]);
  });
  it("follows config order", () => {
    const { snapshot } = mergeSnapshot(empty, [bela, paint], [ok(data(bela, 2)), ok(data(paint, 1))], ok(days), NOW);
    expect(snapshot.characters.map((c) => c.name)).toEqual(["Belathil", "Paintóxic"]);
  });
});

describe("stabilizeTimestamp", () => {
  it("keeps the previous timestamp when data is unchanged", () => {
    const prev: Snapshot = { updatedAt: "2026-10-27T16:00:00.000Z", characters: [data(paint, 1)], contributions: days };
    const next: Snapshot = { ...prev, updatedAt: NOW };
    expect(stabilizeTimestamp(prev, next).updatedAt).toBe("2026-10-27T16:00:00.000Z");
  });
  it("uses the new timestamp when data changed", () => {
    const prev: Snapshot = { updatedAt: "2026-10-27T16:00:00.000Z", characters: [data(paint, 1)], contributions: days };
    const next: Snapshot = { ...prev, characters: [data(paint, 2)], updatedAt: NOW };
    expect(stabilizeTimestamp(prev, next).updatedAt).toBe(NOW);
  });
});

describe("mergeSnapshot stats", () => {
  const stats = { publicRepos: 9, yearContributions: 1234 };
  it("stores fetched stats", () => {
    const { snapshot } = mergeSnapshot(empty, [], [], ok(days), NOW, ok(stats));
    expect(snapshot.stats).toEqual(stats);
  });
  it("keeps previous stats on failure, with a warning", () => {
    const prev = { ...empty, stats };
    const { snapshot, warnings } = mergeSnapshot(prev, [], [], ok(days), NOW, fail("github 502"));
    expect(snapshot.stats).toEqual(stats);
    expect(warnings.some((w) => /github stats.*using snapshot/.test(w))).toBe(true);
  });
  it("keeps previous stats silently when not requested", () => {
    const prev = { ...empty, stats };
    const { snapshot, warnings } = mergeSnapshot(prev, [], [], ok(days), NOW);
    expect(snapshot.stats).toEqual(stats);
    expect(warnings).toEqual([]);
  });
});
