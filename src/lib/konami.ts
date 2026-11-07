export const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

// KMP failure table: longest proper prefix of KONAMI[0..i] that is also its suffix.
const fail = KONAMI.map(() => 0);
for (let i = 1, k = 0; i < KONAMI.length; i++) {
  while (k > 0 && KONAMI[i] !== KONAMI[k]) k = fail[k - 1]!;
  if (KONAMI[i] === KONAMI[k]) k++;
  fail[i] = k;
}

/** Advance the match position by one key. Returns KONAMI.length when the code is complete. */
export function konamiStep(pos: number, key: string): number {
  const k0 = key.length === 1 ? key.toLowerCase() : key;
  let p = pos >= KONAMI.length ? 0 : pos;
  while (p > 0 && KONAMI[p] !== k0) p = fail[p - 1]!;
  return KONAMI[p] === k0 ? p + 1 : 0;
}
