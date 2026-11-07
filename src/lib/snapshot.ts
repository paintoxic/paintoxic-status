import { characterKey } from "./status.ts";
import type { CharacterConfig, CharacterData, ContributionDay, GitHubStats, Snapshot } from "./types.ts";

export type FetchResult<T> = { ok: true; value: T } | { ok: false; error: string };

export function mergeSnapshot(
  previous: Snapshot,
  config: CharacterConfig[],
  characters: FetchResult<CharacterData>[],
  contributions: FetchResult<ContributionDay[]>,
  now: string,
  stats?: FetchResult<GitHubStats>,
): { snapshot: Snapshot; warnings: string[] } {
  const warnings: string[] = [];
  const prevByKey = new Map(previous.characters.map((c) => [c.key, c]));

  const merged: CharacterData[] = [];
  config.forEach((cfg, i) => {
    const result = characters[i];
    if (result?.ok) {
      merged.push(result.value);
      return;
    }
    const prev = prevByKey.get(characterKey(cfg));
    const error = result?.error ?? "not fetched";
    warnings.push(`raider.io ${cfg.name}@${cfg.realm}: ${error} (${prev ? "using snapshot" : "no data"})`);
    if (prev) merged.push(prev);
  });

  let contrib: ContributionDay[] | null;
  if (contributions.ok) {
    contrib = contributions.value;
  } else {
    contrib = previous.contributions;
    warnings.push(`github contributions: ${contributions.error} (${contrib ? "using snapshot" : "no data"})`);
  }

  let nextStats: GitHubStats | null = previous.stats ?? null;
  if (stats?.ok) {
    nextStats = stats.value;
  } else if (stats) {
    warnings.push(`github stats: ${stats.error} (${nextStats ? "using snapshot" : "no data"})`);
  }

  return { snapshot: { updatedAt: now, characters: merged, contributions: contrib, stats: nextStats }, warnings };
}

/** Keep the previous `updatedAt` when nothing but the timestamp changed (no git diff on no-op runs). */
export function stabilizeTimestamp(previous: Snapshot, next: Snapshot): Snapshot {
  const strip = (s: Snapshot) => JSON.stringify({ ...s, updatedAt: null });
  return strip(previous) === strip(next) ? { ...next, updatedAt: previous.updatedAt } : next;
}
