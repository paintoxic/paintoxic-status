// Editable presentation content. Entries with `todo: true` are placeholders to fill in.
export type IncidentKind = "resolved" | "maintenance" | "degraded";

export interface Incident {
  /** YYYY-MM, or null when unknown (rendered as a placeholder) */
  date: string | null;
  kind: IncidentKind;
  es: string;
  en: string;
  todo?: boolean;
}

/** Newest first. */
export const incidents: Incident[] = [
  { date: "2026-11", kind: "resolved", es: "paintoxic.io pasa a producción", en: "paintoxic.io goes live" },
  { date: null, kind: "resolved", es: "Lanzamiento de Kingdom, el IDP de Yuno", en: "Launched Kingdom, Yuno's IDP", todo: true },
  { date: null, kind: "maintenance", es: "Entré a Yuno como DevOps & SRE", en: "Joined Yuno as DevOps & SRE", todo: true },
  { date: "2019-07", kind: "maintenance", es: "Cuenta aprovisionada: github.com/paintoxic", en: "Account provisioned: github.com/paintoxic" },
];

export interface NowItem {
  key: "building" | "learning" | "playing";
  es: string;
  en: string;
  todo?: boolean;
}

export const now: NowItem[] = [
  { key: "building", es: "Kingdom, el IDP de Yuno", en: "Kingdom, Yuno's IDP" },
  { key: "learning", es: "¿Qué estás aprendiendo?", en: "What are you learning?", todo: true },
  { key: "playing", es: "Keys de Mythic+ como Holy Paladin", en: "Mythic+ keys as a Holy Paladin" },
];
