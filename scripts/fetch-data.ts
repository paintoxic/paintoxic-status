// Fetches Raider.io + GitHub data and merges it into src/data/snapshot.json.
// Runs with plain Node (native TS type stripping): `npm run fetch-data`.
import { appendFileSync, readFileSync, writeFileSync } from "node:fs";
import { fetchContributions, fetchStats } from "../src/lib/github.ts";
import { fetchCharacter } from "../src/lib/raiderio.ts";
import { mergeSnapshot, stabilizeTimestamp, type FetchResult } from "../src/lib/snapshot.ts";
import type { CharacterConfig, CharacterData, ContributionDay, GitHubStats, Snapshot } from "../src/lib/types.ts";

const CHARACTERS = new URL("../src/data/characters.json", import.meta.url);
const SNAPSHOT = new URL("../src/data/snapshot.json", import.meta.url);
const GITHUB_LOGIN = "paintoxic";

const toResult = <T>(r: PromiseSettledResult<T>): FetchResult<T> =>
  r.status === "fulfilled" ? { ok: true, value: r.value } : { ok: false, error: String(r.reason?.message ?? r.reason) };

const config: CharacterConfig[] = JSON.parse(readFileSync(CHARACTERS, "utf8"));
const previous: Snapshot = JSON.parse(readFileSync(SNAPSHOT, "utf8"));

const now = new Date();
const today = now.toISOString().slice(0, 10);
const token = process.env.GH_CONTRIB_TOKEN || process.env.GITHUB_TOKEN || "";

const noToken = { ok: false as const, error: "skipped: no token" };
const [charResults, contribResult, statsResult] = await Promise.all([
  Promise.allSettled(config.map((c) => fetchCharacter(c))),
  token
    ? Promise.allSettled([fetchContributions(GITHUB_LOGIN, token, today)]).then(([r]) => toResult(r!))
    : Promise.resolve<FetchResult<ContributionDay[]>>(noToken),
  token
    ? Promise.allSettled([fetchStats(GITHUB_LOGIN, token)]).then(([r]) => toResult(r!))
    : Promise.resolve<FetchResult<GitHubStats>>(noToken),
]);

const { snapshot: merged, warnings } = mergeSnapshot(
  previous,
  config,
  charResults.map((r) => toResult<CharacterData>(r)),
  contribResult,
  now.toISOString(),
  statsResult,
);
const snapshot = stabilizeTimestamp(previous, merged);

if (snapshot.updatedAt === previous.updatedAt) {
  console.log("fetch-data: no data changes, snapshot left untouched");
} else {
  writeFileSync(SNAPSHOT, JSON.stringify(snapshot, null, 2) + "\n");
  console.log(`fetch-data: snapshot updated (${snapshot.characters.length} characters, ${snapshot.contributions?.length ?? 0} days)`);
}

for (const w of warnings) console.warn(`warning: ${w}`);
if (warnings.length && process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `### fetch-data warnings\n\n${warnings.map((w) => `- ${w}`).join("\n")}\n`);
}
