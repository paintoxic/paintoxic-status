export type LangAction = "redirect-en" | "show-banner" | "none";

export function decideLangAction(args: {
  path: string;
  stored: string | null;
  navigatorLanguages: readonly string[];
}): LangAction {
  if (args.path !== "/") return "none";
  if (args.stored === "en") return "redirect-en";
  if (args.stored) return "none";
  const speaksSpanish = args.navigatorLanguages.some((l) => l.toLowerCase().startsWith("es"));
  return speaksSpanish ? "none" : "show-banner";
}
