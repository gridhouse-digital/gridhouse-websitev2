export interface ProcessPhase {
  id: string;
  name: string;
  action: string;
  output: string;
}

export const PROCESS_PHASES: readonly ProcessPhase[] = [
  {
    id: "01",
    name: "Discover",
    action:
      "Identify the operational bottlenecks, real users, and constraints. We talk to the people doing the work, not just the people commissioning it.",
    output: "Discovery brief + system map",
  },
  {
    id: "02",
    name: "Map",
    action:
      "Architect data flow, integrations, and decision points. Define what the system needs to know, who acts on it, and where automation belongs.",
    output: "Architecture diagram + data model",
  },
  {
    id: "03",
    name: "Design",
    action:
      "Design the interface language — components, tokens, and patterns. Establish the system before the surfaces.",
    output: "Design system + key surfaces",
  },
  {
    id: "04",
    name: "Build",
    action:
      "Engineer the core application against the system spec. Iteratively, with working software in front of stakeholders early.",
    output: "Working application in staging",
  },
  {
    id: "05",
    name: "Automate",
    action:
      "Wire up APIs, automation pipelines, and AI agent workflows. Replace the manual steps that should never have been manual.",
    output: "Automation pipelines + agent flows",
  },
  {
    id: "06",
    name: "Launch",
    action:
      "Deploy with monitoring, alerting, and runbooks. Migrate users with care; nothing about launch should be surprising.",
    output: "Production deploy + runbook",
  },
  {
    id: "07",
    name: "Improve",
    action:
      "Iterate on telemetry, support volume, and operator feedback. Tighten loops; remove friction; extend the system.",
    output: "Iteration cadence + KPI digest",
  },
];

export const AI_DELIVERY_NOTES: readonly string[] = [
  "Discovery is faster — AI-assisted research compresses interviews into structured maps.",
  "Architecture surfaces alternatives early instead of late.",
  "Design systems are seeded from real product context, not generic templates.",
  "Build phases lean on AI pair-coding with human review on the architecture-critical paths.",
  "Automation and agents become the default for repetitive operational work.",
  "Telemetry and evaluation matter more — so they get instrumented from day one.",
];
