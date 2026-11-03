import { describe, expect, it } from "vitest";
import { contributionsQuery, fetchContributions, parseCalendar } from "../src/lib/github.ts";
import calendarFixture from "./fixtures/github-calendar.json";

describe("contributionsQuery", () => {
  it("passes login and range as variables", () => {
    const q = contributionsQuery("paintoxic", "2026-08-05T00:00:00Z", "2026-11-02T23:59:59Z");
    expect(q.query).toContain("contributionCalendar");
    expect(q.variables).toEqual({ login: "paintoxic", from: "2026-08-05T00:00:00Z", to: "2026-11-02T23:59:59Z" });
  });
});

describe("parseCalendar", () => {
  it("flattens weeks into days", () => {
    const days = parseCalendar(calendarFixture);
    expect(days).toHaveLength(14);
    expect(days[0]).toEqual({ date: "2026-10-18", count: 0 });
  });
  it("throws on graphql errors or missing user", () => {
    expect(() => parseCalendar({ errors: [{ message: "x" }] })).toThrow();
    expect(() => parseCalendar({ data: { user: null } })).toThrow();
  });
});

describe("fetchContributions", () => {
  it("sends bearer token and a 90-day range ending today", async () => {
    let seen: { headers: Headers; body: { variables: Record<string, string> } } | undefined;
    const fetchFn = (async (_url: string, init: RequestInit) => {
      seen = { headers: new Headers(init.headers), body: JSON.parse(init.body as string) };
      return Response.json(calendarFixture);
    }) as typeof fetch;
    const days = await fetchContributions("paintoxic", "tok", "2026-11-02", fetchFn);
    expect(days).toHaveLength(14);
    expect(seen!.headers.get("authorization")).toBe("bearer tok");
    expect(seen!.body.variables).toMatchObject({ from: "2026-08-05T00:00:00Z", to: "2026-11-02T23:59:59Z" });
  });
  it("throws on non-2xx", async () => {
    await expect(
      fetchContributions("paintoxic", "tok", "2026-11-02", (async () => new Response("", { status: 401 })) as typeof fetch),
    ).rejects.toThrow(/401/);
  });
});
