import type { ContributionDay } from "./types.ts";

const QUERY = `query($login: String!, $from: DateTime!, $to: DateTime!) {
  user(login: $login) {
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar { weeks { contributionDays { date contributionCount } } }
    }
  }
}`;

export function contributionsQuery(login: string, from: string, to: string): { query: string; variables: object } {
  return { query: QUERY, variables: { login, from, to } };
}

interface CalendarResponse {
  errors?: { message: string }[];
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: { weeks: { contributionDays: { date: string; contributionCount: number }[] }[] };
      };
    } | null;
  };
}

export function parseCalendar(json: unknown): ContributionDay[] {
  const r = json as CalendarResponse;
  if (r?.errors?.length) throw new Error(`github graphql: ${r.errors.map((e) => e.message).join("; ")}`);
  const user = r?.data?.user;
  if (!user) throw new Error("github graphql: user not found");
  return user.contributionsCollection.contributionCalendar.weeks.flatMap((w) =>
    w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount })),
  );
}

export async function fetchContributions(
  login: string,
  token: string,
  today: string,
  fetchFn: typeof fetch = fetch,
): Promise<ContributionDay[]> {
  const end = new Date(`${today}T00:00:00Z`);
  const start = new Date(end.getTime() - 89 * 86_400_000);
  const from = `${start.toISOString().slice(0, 10)}T00:00:00Z`;
  const to = `${today}T23:59:59Z`;
  const res = await fetchFn("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `bearer ${token}`, "User-Agent": "paintoxic-status", "Content-Type": "application/json" },
    body: JSON.stringify(contributionsQuery(login, from, to)),
  });
  if (!res.ok) throw new Error(`github ${res.status}`);
  return parseCalendar(await res.json());
}
