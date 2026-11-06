import { describe, expect, it } from "vitest";
import { formatIncidentDate } from "../src/lib/presentation.ts";

describe("formatIncidentDate", () => {
  it("formats YYYY-MM as short month and year per locale", () => {
    expect(formatIncidentDate("2019-07", "en")).toBe("Jul 2019");
    expect(formatIncidentDate("2019-07", "es")).toBe("jul de 2019");
  });
  it("formats a bare year as the year", () => {
    expect(formatIncidentDate("2022", "es")).toBe("2022");
    expect(formatIncidentDate("2022", "en")).toBe("2022");
  });
  it("formats a year range with an en dash", () => {
    expect(formatIncidentDate("2020-2021", "es")).toBe("2020–2021");
    expect(formatIncidentDate("2020-2021", "en")).toBe("2020–2021");
  });
  it("returns null for unknown dates", () => {
    expect(formatIncidentDate(null, "es")).toBeNull();
  });
});
