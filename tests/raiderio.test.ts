import { describe, expect, it } from "vitest";
import { fetchCharacter, parseCharacter, raiderUrl } from "../src/lib/raiderio.ts";
import fullFixture from "./fixtures/raiderio-full.json";
import sparseFixture from "./fixtures/raiderio-sparse.json";

const cfg = { name: "Paintóxic", realm: "ragnaros", region: "us" };
const belathilCfg = { name: "Belathil", realm: "quelthalas", region: "us" };

describe("raiderUrl", () => {
  it("percent-encodes accented names", () => {
    expect(raiderUrl(cfg)).toBe(
      "https://raider.io/api/v1/characters/profile?region=us&realm=ragnaros&name=Paint%C3%B3xic&fields=gear,mythic_plus_scores_by_season:current,mythic_plus_recent_runs",
    );
  });
});

describe("parseCharacter", () => {
  it("maps a full profile and picks the newest run regardless of order", () => {
    const full = parseCharacter(cfg, fullFixture);
    expect(full.key).toBe("us/ragnaros/paintóxic");
    expect(full.lastRun?.upgrades).toBe(0);
    expect(full.lastRun?.completedAt).toBe("2026-10-27T02:19:16.000Z");
    expect(full.lastRun?.url).toMatch(/^https:\/\/raider\.io\//);
    expect(typeof full.score).toBe("number");
    expect(typeof full.itemLevel).toBe("number");
    expect(full).toMatchObject({ className: "Paladin", spec: "Holy", race: "Blood Elf" });
  });
  it("tolerates sparse profiles", () => {
    const sparse = parseCharacter(belathilCfg, sparseFixture);
    expect(sparse).toMatchObject({ score: null, itemLevel: null, lastRun: null, className: "Monk", thumbnailUrl: null });
    expect(sparse.profileUrl).toBe("https://raider.io/characters/us/quelthalas/Belathil");
  });
  it("does not throw on garbage", () => {
    expect(() => parseCharacter(cfg, null)).not.toThrow();
    expect(parseCharacter(cfg, "x").lastRun).toBeNull();
  });
});

describe("fetchCharacter", () => {
  it("throws with status and name on non-2xx", async () => {
    await expect(fetchCharacter(cfg, async () => new Response("nope", { status: 400 }))).rejects.toThrow(/400.*Paintóxic/);
  });
  it("parses a successful response", async () => {
    const c = await fetchCharacter(cfg, async () => Response.json(fullFixture));
    expect(c.className).toBe("Paladin");
  });
});
