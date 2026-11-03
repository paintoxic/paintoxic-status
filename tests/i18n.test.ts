import { describe, expect, it } from "vitest";
import { formatDate, localePath, t } from "../src/i18n/index.ts";
import { stack } from "../src/data/content.ts";

function shape(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(shape);
  if (typeof v === "function") return "fn";
  if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).sort().map(([k, x]) => [k, shape(x)]));
  return typeof v;
}

describe("dictionaries", () => {
  it("es and en have the same shape", () => {
    expect(shape(t("es"))).toEqual(shape(t("en")));
  });
  it("have four components each", () => {
    expect(t("es").components.items).toHaveLength(4);
    expect(t("en").components.items).toHaveLength(4);
  });
  it("label every stack group", () => {
    for (const key of Object.keys(stack)) {
      expect(t("es").deps.groups).toHaveProperty(key);
      expect(t("en").deps.groups).toHaveProperty(key);
    }
  });
  it("use the required status copy", () => {
    expect(t("es").overall).toEqual({ operational: "Todos los sistemas operativos", degraded: "Degradación parcial" });
    expect(t("en").overall).toEqual({ operational: "All systems operational", degraded: "Partial degradation" });
    expect(t("es").status).toEqual({ operational: "Operativo", degraded: "Degradado", no_data: "Sin datos" });
    expect(t("en").status).toEqual({ operational: "Operational", degraded: "Degraded", no_data: "No data" });
    expect(t("es").banner.text).toBe("View in English? →");
  });
});

describe("helpers", () => {
  it("localePath", () => {
    expect(localePath("es")).toBe("/");
    expect(localePath("en")).toBe("/en/");
  });
  it("formatDate is locale-aware and UTC", () => {
    expect(formatDate("2026-11-02T23:30:00Z", "en")).toBe("Nov 2, 2026");
    expect(formatDate("2026-11-02T23:30:00Z", "es")).toMatch(/^2 de nov\.? de 2026$/);
  });
});
