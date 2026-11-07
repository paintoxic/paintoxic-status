export const en = {
  status: { operational: "Operational", degraded: "Degraded", no_data: "No data" },
  overall: { operational: "All systems operational", degraded: "Partial degradation" },
  header: { subtitle: "status" },
  hero: {
    role: "DevOps & SRE Engineer",
    location: "Bogotá · on-call at Yuno",
    tagline: "Reliability first, always",
    motto: "I love building systems that enable teams to move fast and break nothing!",
    intro:
      "I build infrastructure that doesn't just work — it keeps working, no matter what. Faster development cycles, higher reliability, better operational efficiency.",
  },
  uptime: {
    title: "Uptime",
    label: "uptime · GitHub activity, last 90 days",
    tooltip: (date: string, count: number) =>
      count === 0 ? `${date} · no activity` : `${date} · ${count} contribution${count === 1 ? "" : "s"}`,
    ago: "90 days ago",
    today: "Today",
  },
  components: {
    title: "Components",
    items: [
      {
        title: "Automation & Bots",
        description:
          "Intelligent automation workflows and bots to reduce support response times and optimize on-call rotations",
      },
      {
        title: "Infrastructure as Code",
        description:
          "Manage and evolve infrastructure with full automation, ensuring deployments are reproducible, secure, and scalable",
      },
      {
        title: "CI/CD Optimization",
        description: "Continuously improve pipelines for faster, more reliable deployments with zero-downtime strategies",
      },
      {
        title: "Internal Developer Platform (IDP)",
        description:
          "Created Kingdom, Yuno's IDP, so engineering teams can spin up and run their services self-service. More projects on the way.",
      },
    ],
  },
  deps: {
    title: "Dependencies",
    groups: {
      code: "Code",
      databases: "Databases",
      devops_tools: "DevOps tools",
      frameworks: "Frameworks",
      messaging: "Messaging",
      web_servers: "Web servers",
      os: "OS",
      architecture: "Architecture",
      cloud: "Cloud",
      cncf: "CNCF",
      monitoring: "Monitoring",
      ai: "AI & agents",
    },
  },
  mythic: {
    title: "Mythic+ (off-hours workload)",
    subtitle: "When I'm not breaking prod — pushing keys",
    depleted: "depleted",
    timed: "timed",
    noRuns: "No runs this season",
    latestEvent: "Latest event",
    score: "M+ score",
    ilvl: "Item level",
    profile: "Raider.io profile",
  },
  metrics: {
    title: "Metrics",
    yearContrib: "Contributions · 12 months",
    activeDays: "Active days · 90 days",
    publicRepos: "Public repos",
  },
  now: { title: "Current deployment", subtitle: "What's running in production right now", building: "Building", learning: "Learning" },
  incidents: {
    title: "Past incidents",
    subtitle: "Career history, status-page style",
    kinds: { resolved: "Resolved", maintenance: "Maintenance", degraded: "Degraded" },
    todo: "to fill in",
    unknownDate: "date?",
  },
  slo: {
    title: "SLOs",
    subtitle: "Service level objectives (some more serious than others)",
    met: "Meeting",
    missed: "Off target",
    github: { name: "GitHub activity · 90 days", target: "≥ 50% active days" },
    items: [
      { name: "Message response time", target: "p95 < 24 h" },
      { name: "Deploys on Friday at 5 p.m.", target: "0" },
      { name: "Incidents without a postmortem", target: "0 · blameless" },
      { name: "Coffee before the first standup", target: "≥ 1 cup" },
    ],
  },
  regions: {
    title: "Regions",
    subtitle: "Languages and the timezone I answer from",
    languages: "Languages",
    timezone: "Timezone",
    localTime: "local time",
    inHours: "Business hours",
    offHours: "Off-hours",
  },
  compliance: { title: "Compliance", subtitle: "Certifications" },
  konami: { incident: "Major incident: someone entered the Konami code", recovered: "Resolved · self-healed" },
  footer: { updated: "Last updated", links: "Links", api: "Status API (JSON)" },
  banner: { text: "View in English? →", dismiss: "Seguir en español" },
  lang: { switch: "Language" },
};
