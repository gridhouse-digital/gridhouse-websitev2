export type CaseStudyKind =
  | "Internal Product"
  | "Client System"
  | "Prototype"
  | "In Development"
  | "Private Engagement";

export interface CaseStudy {
  id: string;
  title: string;
  kind: CaseStudyKind;
  problem: string;
  solution: string;
  stack: string[];
  status: string;
}

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    id: "01",
    title: "Healthcare Compliance Training Platform",
    kind: "Client System",
    problem:
      "A care agency was tracking staff training and credentialing across spreadsheets and email chains, with limited visibility into expiry and audit-readiness.",
    solution:
      "A managed compliance and training platform on WordPress + LearnDash + JotForm with automation and AI-assisted support, replacing the spreadsheet workflow with auditable records.",
    stack: ["WordPress", "LearnDash", "JotForm", "n8n", "AI assistant"],
    status: "Production engagement",
  },
  {
    id: "02",
    title: "HOMS Operations Platform",
    kind: "Internal Product",
    problem:
      "Healthcare staffing and care agencies need an operational layer that covers recruitment, credentialing, onboarding, training compliance, and (eventually) EVV — without stitching five SaaS tools together.",
    solution:
      "HOMS, an in-development internal product designed as the operational system for staffing and care agencies. Modular, audit-aware, and built around the workflows operators actually run.",
    stack: ["React", "Node", "Postgres", "Workflow engine"],
    status: "In Development",
  },
  {
    id: "03",
    title: "AI-First Agency Website Redesign",
    kind: "Internal Product",
    problem:
      "Gridhouse needed a brand presence that reflected an AI-first, systems-led operator — not a generic SaaS landing page.",
    solution:
      "This site. Built on the Aether System Terminal design language with a modular React architecture, instrumented for content evolution and AI-search readiness.",
    stack: ["React", "TypeScript", "Tailwind", "GSAP", "WebGL"],
    status: "Production Active",
  },
  {
    id: "04",
    title: "Support Issue Intake Agent",
    kind: "Prototype",
    problem:
      "Support inboxes were absorbing dozens of repetitive policy and how-to questions per day, distracting staff from real escalations.",
    solution:
      "A retrieval-augmented intake agent that triages incoming tickets, answers a defined set of questions directly, and escalates the rest with full conversational context.",
    stack: ["Claude", "Vector store", "Helpdesk integration"],
    status: "Prototype",
  },
  {
    id: "05",
    title: "Training Content Transformation Workflow",
    kind: "Private Engagement",
    problem:
      "Hours of unedited lecture and SOP video were locked away unused, with no realistic path to turning them into a structured course.",
    solution:
      "An AI-assisted production pipeline that turns raw video and policy documents into a published course inside an LMS — outline, script, captions, and modules.",
    stack: ["AI scriptwriting", "Video pipeline", "LearnDash"],
    status: "Private Engagement",
  },
  {
    id: "06",
    title: "Client Portal / Web App Prototype",
    kind: "Prototype",
    problem:
      "A professional services firm coordinated client engagements through email and Drive, with no shared portal for status, deliverables, or sign-offs.",
    solution:
      "A working client portal prototype with auth, roles, deliverable tracking, and audit logging — sized to validate the workflow before a full rollout.",
    stack: ["Next.js", "Postgres", "Auth", "S3"],
    status: "Prototype",
  },
];
