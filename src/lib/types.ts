export type Status = "operational" | "degraded" | "no_data";

export interface CharacterConfig {
  name: string;
  realm: string;
  region: string;
}

export interface LastRun {
  dungeon: string;
  level: number;
  upgrades: number;
  completedAt: string;
  url: string;
}

export interface CharacterData {
  key: string;
  name: string;
  realm: string;
  region: string;
  race: string | null;
  className: string | null;
  spec: string | null;
  thumbnailUrl: string | null;
  profileUrl: string;
  score: number | null;
  itemLevel: number | null;
  lastRun: LastRun | null;
}

/** date = YYYY-MM-DD (UTC) */
export interface ContributionDay {
  date: string;
  count: number;
}

export interface GitHubStats {
  publicRepos: number;
  /** contributions in the last 12 months (GitHub's default calendar range) */
  yearContributions: number;
}

export interface Snapshot {
  updatedAt: string | null;
  characters: CharacterData[];
  contributions: ContributionDay[] | null;
  stats?: GitHubStats | null;
}
