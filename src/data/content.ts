// Copied once from https://github.com/paintoxic/paintoxic (README, branch master).
export const stack = {
  code: ["Python", "Javascript", "Typescript", "Go"],
  databases: ["Redis", "Mongo", "Postgres"],
  devops_tools: ["Docker", "k8s", "Ansible", "Terraform", "Kaniko", "Jinja"],
  frameworks: ["express", "fastapi"],
  messaging: ["RabbitMQ"],
  web_servers: ["Nginx"],
  os: ["Linux <3"],
  architecture: ["microservices", "event-driven", "clean architecture", "tdd"],
  cloud: ["AWS"],
  cncf: ["argo-cd", "argo-workflows", "argo-rollouts", "testkube"],
  monitoring: ["Prometheus", "Grafana", "ELK Stack"],
  ai: ["SDD", "Claude Code", "Codex", "OpenCode", "OpenClaw"],
} as const;

export type GroupKey = keyof typeof stack;

export const links = {
  github: { label: "GitHub", handle: "paintoxic", url: "https://github.com/paintoxic" },
  linkedin: { label: "LinkedIn", handle: "in/paintoxic", url: "https://www.linkedin.com/in/paintoxic/" },
  x: { label: "X", handle: "@Paintox1c", url: "https://twitter.com/paintox1c" },
  raiderio: { label: "Raider.io", handle: "Paintóxic", url: "https://raider.io/characters/us/ragnaros/Paint%C3%B3xic" },
} as const;

export const yunoUrl = "https://www.y.uno/";
export const avatarUrl = "https://avatars.githubusercontent.com/u/52616558?v=4";
