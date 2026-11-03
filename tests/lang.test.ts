import { describe, expect, it } from "vitest";
import { decideLangAction } from "../src/lib/lang.ts";

describe("decideLangAction", () => {
  it("redirects / to /en/ only when en was chosen", () => {
    expect(decideLangAction({ path: "/", stored: "en", navigatorLanguages: ["es-CO"] })).toBe("redirect-en");
  });
  it("never acts on /en/", () => {
    expect(decideLangAction({ path: "/en/", stored: "en", navigatorLanguages: [] })).toBe("none");
    expect(decideLangAction({ path: "/en/", stored: "es", navigatorLanguages: [] })).toBe("none");
    expect(decideLangAction({ path: "/en/", stored: null, navigatorLanguages: ["en-US"] })).toBe("none");
  });
  it("respects a stored es choice", () => {
    expect(decideLangAction({ path: "/", stored: "es", navigatorLanguages: ["en-US"] })).toBe("none");
  });
  it("suggests English to non-Spanish browsers without a choice", () => {
    expect(decideLangAction({ path: "/", stored: null, navigatorLanguages: ["en-US", "fr"] })).toBe("show-banner");
    expect(decideLangAction({ path: "/", stored: null, navigatorLanguages: [] })).toBe("show-banner");
  });
  it("stays quiet for Spanish browsers", () => {
    expect(decideLangAction({ path: "/", stored: null, navigatorLanguages: ["en-US", "es-419"] })).toBe("none");
    expect(decideLangAction({ path: "/", stored: null, navigatorLanguages: ["ES"] })).toBe("none");
  });
});

import { notFoundLocale } from "../src/lib/lang.ts";

describe("notFoundLocale", () => {
  it("uses English under /en/", () => {
    expect(notFoundLocale({ path: "/en/missing", stored: null })).toBe("en");
    expect(notFoundLocale({ path: "/en/missing", stored: "es" })).toBe("en");
  });
  it("uses the stored choice elsewhere", () => {
    expect(notFoundLocale({ path: "/missing", stored: "en" })).toBe("en");
    expect(notFoundLocale({ path: "/missing", stored: "es" })).toBe("es");
  });
  it("defaults to Spanish", () => {
    expect(notFoundLocale({ path: "/missing", stored: null })).toBe("es");
    expect(notFoundLocale({ path: "/english", stored: null })).toBe("es");
  });
});
