export type ProductLifecycle = "Development" | "Beta" | "Production";

export interface Product {
  id: string;
  code: string;
  name: string;
  status: string;
  description: string;
  capabilities: string[];
  integrations: string[];
  lifecycle: ProductLifecycle;
}

export const PRODUCTS: readonly Product[] = [
  {
    id: "01",
    code: "HOMS",
    name: "Healthcare Operations Management System",
    status: "Active development",
    description:
      "A healthcare operations management system for staffing and care agencies — covering recruitment, credentialing, onboarding, training compliance, and future EVV support. Built to replace spreadsheets, email chains, and disconnected portals with one operating layer.",
    capabilities: [
      "Recruitment + applicant pipeline",
      "Credentialing + document expiry tracking",
      "Structured onboarding workflows",
      "Training compliance + audit reporting",
      "Future EVV / scheduling module",
    ],
    integrations: [
      "JotForm intake",
      "LMS (LearnDash)",
      "Email / SMS notifications",
      "Document storage",
    ],
    lifecycle: "Development",
  },
  {
    id: "02",
    code: "CPT",
    name: "Compliance Training Platform",
    status: "Production engagement",
    description:
      "A managed training and compliance platform for healthcare agencies, built on WordPress, LearnDash, JotForm, automation, and AI-assisted support. Replaces ad-hoc training spreadsheets with a tracked, auditable system staff and regulators can rely on.",
    capabilities: [
      "Course + curriculum management",
      "Per-staff training records",
      "Automated reminder + expiry workflows",
      "AI-assisted support intake",
      "Audit-ready reporting",
    ],
    integrations: ["WordPress", "LearnDash", "JotForm", "Email automation"],
    lifecycle: "Production",
  },
  {
    id: "03",
    code: "AGT",
    name: "AI Agent Support Systems",
    status: "Beta",
    description:
      "Retrieval-augmented AI agents that triage support, answer policy questions, and assist staff with day-to-day operations — wired into the systems where the work actually happens.",
    capabilities: [
      "Knowledge ingestion + retrieval",
      "Policy + SOP question answering",
      "Ticket triage + routing",
      "Human-in-the-loop escalation",
      "Audit + evaluation harness",
    ],
    integrations: ["Claude / OpenAI", "Vector store", "Slack / email", "Helpdesk"],
    lifecycle: "Beta",
  },
  {
    id: "04",
    code: "TPL",
    name: "Automation Templates",
    status: "Internal library",
    description:
      "A growing library of automation templates Gridhouse uses to deploy operational workflows quickly — intake, onboarding, billing, reporting, compliance reminders.",
    capabilities: [
      "Pre-built intake + onboarding flows",
      "Billing + invoice automation",
      "Reporting + KPI digests",
      "Compliance reminder pipelines",
    ],
    integrations: ["n8n", "Make", "Stripe", "Email / SMS"],
    lifecycle: "Production",
  },
];
