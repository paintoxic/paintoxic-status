// Editable presentation content. Entries with `todo: true` are placeholders to fill in.
export type IncidentKind = "resolved" | "maintenance" | "degraded";

export interface Incident {
  /** "YYYY-MM", "YYYY", or null when unknown (rendered as a placeholder) */
  date: string | null;
  kind: IncidentKind;
  es: string;
  en: string;
  todo?: boolean;
}

/** Newest first. */
export const incidents: Incident[] = [
  { date: "2026-11", kind: "resolved", es: "paintoxic.io pasa a producción", en: "paintoxic.io goes live" },
  { date: "2022-06", kind: "resolved", es: "Lanzamiento de Kingdom v1, el IDP de Yuno, 2 meses después de entrar", en: "Launched Kingdom v1, Yuno's IDP, 2 months after joining" },
  { date: "2022-04", kind: "maintenance", es: "Entré a Yuno como DevOps & SRE", en: "Joined Yuno as DevOps & SRE" },
  { date: "2020-2021", kind: "maintenance", es: "Fuerza Aérea Colombiana: desarrollo de simuladores de vuelo y software para cajas negras", en: "Colombian Air Force: built flight simulators and flight data recorder (black box) software" },
  { date: "2019-07", kind: "maintenance", es: "Cuenta aprovisionada: github.com/paintoxic", en: "Account provisioned: github.com/paintoxic" },
];

export interface NowItem {
  key: "building" | "learning";
  es: string;
  en: string;
  todo?: boolean;
}

export const now: NowItem[] = [
  { key: "building", es: "Kingdom, el IDP de Yuno", en: "Kingdom, Yuno's IDP" },
  {
    key: "learning",
    es: "Modelos de IA: manejo de modelos open-weight, agentes y agentic programming",
    en: "AI models: running open-weight models, agents and agentic programming",
  },
];

export interface Language {
  code: string;
  es: string;
  en: string;
  level: { es: string; en: string };
}

/** "Regions": languages spoken and the timezone on-call runs from. */
export const regions = {
  timezone: "America/Bogota",
  utcOffset: "-05:00",
  city: { es: "Bogotá", en: "Bogotá" },
  languages: [
    { code: "es", es: "Español", en: "Spanish", level: { es: "Nativo", en: "Native" } },
    { code: "en", es: "Inglés", en: "English", level: { es: "Avanzado", en: "Advanced" } },
  ] satisfies Language[],
};

export interface Certification {
  name: string;
  issuer: string;
  /** "YYYY" or "YYYY-MM" */
  date?: string;
  url?: string;
}

/** Shown as "compliance" badges. The section stays hidden while this list is empty. */
export const certifications: Certification[] = [];
