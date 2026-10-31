export type CaseStudyKind =
  | "Internal Product"
  | "Client System"
  | "Prototype"
  | "In Development"
  | "Private Engagement";

export interface CaseStudy {
  id: string;
  displayId?: string;
  slug?: string;
  title: string;
  kind: CaseStudyKind;
  problem: string;
  solution: string;
  stack: string[];
  status: string;
  coverImage?: unknown;
  outcomes?: string[];
  clientLabel?: string;
  featured?: boolean;
  systemStages?: { label: string; detail: string }[];
  disclosure?: string;
  evidenceBasis?: string;
}

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    id: "01",
    displayId: "01",
    slug: "healthcare-compliance-training-platform",
    title: "Gridhouse Compliance",
    kind: "Client System",
    featured: true,
    clientLabel: "Regional home care agency",
    problem:
      "A care agency was tracking staff training and credentialing across spreadsheets and email chains, with limited visibility into expiry and audit-readiness.",
    solution:
      "A managed compliance and training platform on WordPress + LearnDash + JotForm with automation and AI-assisted support, replacing the spreadsheet workflow with auditable records.",
    stack: ["WordPress", "LearnDash", "JotForm", "n8n", "AI assistant"],
    status: "Production engagement",
    evidenceBasis: "Delivered system and workflow records",
    outcomes: [
      "Replaced spreadsheet credentialing with per-staff auditable training records",
      "Automated expiry reminders eliminated manual follow-up cycles",
      "AI-assisted intake handles tier-1 support questions before staff escalation",
    ],
    systemStages: [
      {
        label: "Structured intake",
        detail: "Staff, role, and credential data enters through controlled forms.",
      },
      {
        label: "Training workspace",
        detail: "Assigned learning and completion records live in one managed platform.",
      },
      {
        label: "Workflow automation",
        detail: "Expiry and follow-up events trigger consistent reminder sequences.",
      },
      {
        label: "Assisted support",
        detail: "Defined tier-1 questions are answered before human escalation.",
      },
      {
        label: "Audit evidence",
        detail: "Training activity and staff records remain available for review.",
      },
    ],
    disclosure:
      "Client identity and case-level metrics are withheld. The workflow, delivered system, and outcomes shown here reflect the production engagement.",
  },
  {
    id: "02",
    displayId: "02",
    slug: "training-content-transformation-workflow",
    title: "Training Content Transformation Workflow",
    kind: "Private Engagement",
    clientLabel: "Healthcare training provider",
    problem:
      "Hours of unedited lecture and SOP video were locked away unused, with no realistic path to turning them into a structured course.",
    solution:
      "An AI-assisted production pipeline that turns raw video and policy documents into a published course inside an LMS — outline, script, captions, and modules.",
    stack: ["AI scriptwriting", "Video pipeline", "LearnDash"],
    status: "Private Engagement",
    evidenceBasis: "Published course output",
    outcomes: [
      "Unedited video library converted into structured published courses",
      "Production time reduced from months to weeks using AI-assisted pipeline",
    ],
  },
  {
    id: "03",
    displayId: "03",
    slug: "support-issue-intake-agent",
    title: "Support Issue Intake Agent",
    kind: "Prototype",
    problem:
      "Support inboxes were absorbing dozens of repetitive policy and how-to questions per day, distracting staff from real escalations.",
    solution:
      "A retrieval-augmented intake agent that triages incoming tickets, answers a defined set of questions directly, and escalates the rest with full conversational context.",
    stack: ["Claude", "Vector store", "Helpdesk integration"],
    status: "Prototype",
    evidenceBasis: "Validated prototype",
    outcomes: [
      "Tier-1 policy and how-to questions resolved without staff involvement",
      "Escalations arrive with full conversational context pre-attached",
    ],
  },
  {
    id: "04",
    displayId: "04",
    slug: "client-portal-prototype",
    title: "Client Portal / Web App Prototype",
    kind: "Prototype",
    problem:
      "A professional services firm coordinated client engagements through email and Drive, with no shared portal for status, deliverables, or sign-offs.",
    solution:
      "A working client portal prototype with auth, roles, deliverable tracking, and audit logging — sized to validate the workflow before a full rollout.",
    stack: ["Next.js", "Postgres", "Auth", "S3"],
    status: "Prototype",
    evidenceBasis: "Working prototype",
    outcomes: [
      "Replaced email and Drive coordination with a tracked, role-gated portal",
      "Deliverable sign-offs and audit log built in from day one",
    ],
  },
  {
    id: "05",
    displayId: "05",
    slug: "homs-operations-platform",
    title: "HOMS Operations Platform",
    kind: "Internal Product",
    problem:
      "Healthcare staffing and care agencies need an operational layer that covers recruitment, credentialing, onboarding, training compliance, and (eventually) EVV — without stitching five SaaS tools together.",
    solution:
      "HOMS, an in-development internal product designed as the operational system for staffing and care agencies. Modular, audit-aware, and built around the workflows operators actually run.",
    stack: ["React", "Node", "Postgres", "Workflow engine"],
    status: "In Development",
    evidenceBasis: "In-development product",
  },
  {
    id: "06",
    displayId: "06",
    slug: "gridhouse-digital-platform",
    title: "AI-First Agency Website Redesign",
    kind: "Internal Product",
    problem:
      "Gridhouse needed a brand presence that reflected an AI-first, systems-led operator — not a generic SaaS landing page.",
    solution:
      "This site. Built as a modular React platform with a distinctive visual system, structured content, and room for product stories and AI-search readiness.",
    stack: ["React", "TypeScript", "Tailwind", "GSAP", "WebGL"],
    status: "Production Active",
    evidenceBasis: "Production website",
  },
];
