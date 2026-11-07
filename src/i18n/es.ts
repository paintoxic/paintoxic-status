import type { Dict } from "./index.ts";

export const es: Dict = {
  status: { operational: "Operativo", degraded: "Degradado", no_data: "Sin datos" },
  overall: { operational: "Todos los sistemas operativos", degraded: "Degradación parcial" },
  header: { subtitle: "status" },
  hero: {
    role: "Ingeniero DevOps & SRE",
    location: "Bogotá · on-call en Yuno",
    tagline: "La confiabilidad primero, siempre",
    motto: "¡Me encanta construir sistemas que permiten a los equipos moverse rápido sin romper nada!",
    intro:
      "Construyo infraestructura que no solo funciona: sigue funcionando, pase lo que pase. Ciclos de desarrollo más rápidos, más confiabilidad y mejor eficiencia operativa.",
  },
  uptime: {
    title: "Uptime",
    label: "uptime · actividad en GitHub, últimos 90 días",
    tooltip: (date: string, count: number) =>
      count === 0 ? `${date} · sin actividad` : `${date} · ${count} contribución${count === 1 ? "" : "es"}`,
    ago: "Hace 90 días",
    today: "Hoy",
  },
  components: {
    title: "Componentes",
    items: [
      {
        title: "Automatización y bots",
        description:
          "Flujos de automatización inteligentes y bots que reducen los tiempos de respuesta de soporte y optimizan las rotaciones de on-call",
      },
      {
        title: "Infraestructura como código",
        description:
          "Gestiono y evoluciono la infraestructura con automatización total, para que cada deploy sea reproducible, seguro y escalable",
      },
      {
        title: "Optimización de CI/CD",
        description:
          "Mejora continua de pipelines para deploys más rápidos y confiables, con estrategias zero-downtime",
      },
      {
        title: "Internal Developer Platform (IDP)",
        description:
          "Creé Kingdom, el IDP de Yuno, para que los equipos de ingeniería puedan crear y operar sus servicios en self-service. Y vienen más proyectos en camino.",
      },
    ],
  },
  deps: {
    title: "Dependencias",
    groups: {
      code: "Código",
      databases: "Bases de datos",
      devops_tools: "Herramientas DevOps",
      frameworks: "Frameworks",
      messaging: "Mensajería",
      web_servers: "Servidores web",
      os: "SO",
      architecture: "Arquitectura",
      cloud: "Nube",
      cncf: "CNCF",
      monitoring: "Monitoreo",
      ai: "IA y agentes",
    },
  },
  mythic: {
    title: "Mythic+ (carga fuera de horario)",
    subtitle: "Cuando no estoy rompiendo prod — empujando keys",
    depleted: "depleted",
    timed: "timed",
    noRuns: "Sin runs esta temporada",
    latestEvent: "Último evento",
    score: "Score M+",
    ilvl: "Item level",
    profile: "Perfil en Raider.io",
  },
  metrics: {
    title: "Métricas",
    yearContrib: "Contribuciones · 12 meses",
    activeDays: "Días activos · 90 días",
    publicRepos: "Repos públicos",
  },
  now: { title: "Current deployment", subtitle: "Lo que está corriendo en producción ahora mismo", building: "Construyendo", learning: "Aprendiendo" },
  incidents: {
    title: "Incidentes pasados",
    subtitle: "Mi trayectoria, en formato status page",
    kinds: { resolved: "Resuelto", maintenance: "Mantenimiento", degraded: "Degradado" },
    todo: "por completar",
    unknownDate: "¿fecha?",
  },
  slo: {
    title: "SLOs",
    subtitle: "Objetivos de servicio (algunos más serios que otros)",
    met: "Cumpliendo",
    missed: "Fuera de objetivo",
    github: { name: "Actividad en GitHub · 90 días", target: "≥ 50 % de días activos" },
    items: [
      { name: "Respuesta a mensajes", target: "p95 < 24 h" },
      { name: "Deploys un viernes a las 5 p. m.", target: "0" },
      { name: "Incidentes sin postmortem", target: "0 · blameless" },
      { name: "Café antes del primer standup", target: "≥ 1 taza" },
    ],
  },
  regions: {
    title: "Regiones",
    subtitle: "Idiomas y zona horaria desde donde respondo",
    languages: "Idiomas",
    timezone: "Zona horaria",
    localTime: "hora local",
    inHours: "En horario",
    offHours: "Fuera de horario",
  },
  compliance: { title: "Compliance", subtitle: "Certificaciones" },
  konami: { incident: "Incidente mayor: alguien ingresó el código Konami", recovered: "Resuelto · auto-recuperado" },
  footer: { updated: "Última actualización", links: "Enlaces", api: "API de estado (JSON)" },
  banner: { text: "View in English? →", dismiss: "Seguir en español" },
  lang: { switch: "Idioma" },
};
