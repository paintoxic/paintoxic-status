import { characterKey } from "./status.ts";
import type { CharacterConfig, CharacterData, LastRun } from "./types.ts";

const FIELDS = "gear,mythic_plus_scores_by_season:current,mythic_plus_recent_runs";

export function raiderUrl(c: CharacterConfig): string {
  return `https://raider.io/api/v1/characters/profile?region=${c.region}&realm=${c.realm}&name=${encodeURIComponent(c.name)}&fields=${FIELDS}`;
}

type Json = Record<string, unknown>;
const obj = (v: unknown): Json => (v && typeof v === "object" && !Array.isArray(v) ? (v as Json) : {});
const str = (v: unknown): string | null => (typeof v === "string" && v !== "" ? v : null);
const num = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) ? v : null);
const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);

function parseRun(v: unknown): LastRun | null {
  const r = obj(v);
  const dungeon = str(r.dungeon);
  const level = num(r.mythic_level);
  const upgrades = num(r.num_keystone_upgrades);
  const completedAt = str(r.completed_at);
  if (!dungeon || level === null || upgrades === null || !completedAt) return null;
  return { dungeon, level, upgrades, completedAt, url: str(r.url) ?? "" };
}

export function parseCharacter(c: CharacterConfig, json: unknown): CharacterData {
  const d = obj(json);
  const season = obj(arr(d.mythic_plus_scores_by_season)[0]);
  const runs = arr(d.mythic_plus_recent_runs)
    .map(parseRun)
    .filter((r): r is LastRun => r !== null)
    .sort((a, b) => Date.parse(b.completedAt) - Date.parse(a.completedAt));
  return {
    key: characterKey(c),
    name: c.name,
    realm: c.realm,
    region: c.region,
    race: str(d.race),
    className: str(d.class),
    spec: str(d.active_spec_name),
    thumbnailUrl: str(d.thumbnail_url),
    profileUrl:
      str(d.profile_url) ?? `https://raider.io/characters/${c.region}/${c.realm}/${encodeURIComponent(c.name)}`,
    score: num(obj(season.scores).all),
    itemLevel: num(obj(d.gear).item_level_equipped),
    lastRun: runs[0] ?? null,
  };
}

export async function fetchCharacter(c: CharacterConfig, fetchFn: typeof fetch = fetch): Promise<CharacterData> {
  const res = await fetchFn(raiderUrl(c), { headers: { "User-Agent": "paintoxic-status" } });
  if (!res.ok) throw new Error(`raider.io ${res.status} for ${c.name}@${c.realm}`);
  return parseCharacter(c, await res.json());
}
