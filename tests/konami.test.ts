import { describe, expect, it } from "vitest";
import { KONAMI, konamiStep } from "../src/lib/konami.ts";

const run = (keys: string[]) => keys.reduce((pos, k) => konamiStep(pos, k), 0);

describe("konamiStep", () => {
  it("reaches the full length on the exact sequence", () => {
    expect(run(KONAMI)).toBe(KONAMI.length);
  });
  it("accepts uppercase B and A", () => {
    expect(run([...KONAMI.slice(0, 8), "B", "A"])).toBe(KONAMI.length);
  });
  it("resets on a wrong key", () => {
    expect(run(["ArrowUp", "ArrowUp", "x"])).toBe(0);
  });
  it("keeps progress when a wrong key restarts the sequence", () => {
    expect(run(["ArrowUp", "ArrowUp", "ArrowUp"])).toBe(2);
  });
});
