export interface Service {
  id: string;
  title: string;
  description: string;
  problemsSolved: string[];
  deliverables: string[];
  bestFitClients: string[];
}

export const SERVICES: readonly Service[] = [
  {
    id: "01",
    title: "AI-First Website Design & Development",
    description:
      "Marketing sites and brand presences engineered around the way modern teams actually work — content-driven, instrumented, and ready for AI-assisted operations from day one.",
    problemsSolved: [
      "Static legacy sites that cannot evolve with the business",
      "Brand presence disconnected from real product systems",
      "Marketing teams blocked by engineering bottlenecks",
    ],
    deliverables: [
      "Design system + component library",
      "Headless or Next/React build",
      "Analytics, SEO, and AI-search readiness",
    ],
    bestFitClients: [
      "Agencies, healthcare operators, professional services, AI-first startups",
    ],
  },
  {
    id: "02",
    title: "Web Apps & Client Portals",
    description:
      "Operational platforms that move teams off spreadsheets and email chains: client portals, internal tools, dashboards, and bespoke web apps with auth, roles, and audit trails.",
    problemsSolved: [
      "Manual workflows split across email, Drive, and chat",
      "No single source of truth for client work",
      "Tools that scale poorly as the operation grows",
    ],
    deliverables: [
      "React/Node or Next.js application",
      "Roles, permissions, audit logging",
      "Reporting + integration layer",
    ],
    bestFitClients: [
      "Healthcare agencies, professional services, ops-heavy SMBs",
    ],
  },
  {
    id: "03",
    title: "Workflow Automation",
    description:
      "Replace recurring manual work with reliable, observable automations that connect the tools you already use — intake, onboarding, billing, reporting, compliance.",
    problemsSolved: [
      "Repetitive admin draining staff time",
      "Disconnected tools requiring copy-paste handoffs",
      "Slow, error-prone reporting cycles",
    ],
    deliverables: [
      "Automation pipelines (n8n, Make, custom code)",
      "Monitoring + retry + alerting",
      "Operational runbook and handoff",
    ],
    bestFitClients: ["Operations-heavy teams across any sector"],
  },
  {
    id: "04",
    title: "AI Agents & Intelligent Assistants",
    description:
      "Domain-specific AI agents that triage support, answer policy questions, run intake, and assist staff — with guardrails, retrieval, and human-in-the-loop where it matters.",
    problemsSolved: [
      "Support queues overwhelmed by repetitive questions",
      "Knowledge buried in PDFs, wikis, and inboxes",
      "Onboarding bottlenecks for new staff and clients",
    ],
    deliverables: [
      "Retrieval-augmented agent (Claude / GPT)",
      "Knowledge ingestion + evaluation harness",
      "Escalation + audit logging",
    ],
    bestFitClients: ["Healthcare, education, support-heavy SaaS, SMBs"],
  },
  {
    id: "05",
    title: "Healthcare Compliance / Training Platforms",
    description:
      "Compliance training and credentialing platforms for healthcare staffing and care agencies — built on WordPress, LearnDash, JotForm, and automation, with AI-assisted support.",
    problemsSolved: [
      "Manual credential tracking across spreadsheets",
      "Training records scattered across providers",
      "Audit-readiness gaps under regulator review",
    ],
    deliverables: [
      "LMS configuration + course pipeline",
      "Credential + expiry tracking",
      "Reporting + AI-assisted intake",
    ],
    bestFitClients: ["Home care, staffing agencies, training providers"],
  },
  {
    id: "06",
    title: "UX, Product Strategy & Design Systems",
    description:
      "Strategy, IA, and design systems for operators building serious products. We define the system first — components, tokens, patterns — so engineering ships consistently.",
    problemsSolved: [
      "Inconsistent UI across products and surfaces",
      "Design debt slowing every release",
      "Unclear product priorities and unowned roadmap",
    ],
    deliverables: [
      "Design tokens + Figma library",
      "Documented component system",
      "Product strategy + roadmap artifacts",
    ],
    bestFitClients: ["Funded startups, internal product teams, agencies"],
  },
  {
    id: "07",
    title: "Cloud, DevOps & Platform Setup",
    description:
      "Deploy, monitor, and harden the systems we build — or take over fragile setups already in production. CI/CD, infra-as-code, observability, and security baselines.",
    problemsSolved: [
      "Deploys that only one person can run",
      "No monitoring or alerting in production",
      "Compliance gaps in cloud infrastructure",
    ],
    deliverables: [
      "CI/CD pipelines (GitHub Actions / etc.)",
      "Infra-as-code + environment parity",
      "Logging, metrics, alerting baseline",
    ],
    bestFitClients: ["Teams shipping web apps and AI products"],
  },
  {
    id: "08",
    title: "AI Video / Course Production",
    description:
      "Transform lectures, SOPs, and policy documents into structured AI-assisted video courses — useful for compliance training, onboarding, and product education.",
    problemsSolved: [
      "Hours of unedited video locked away unused",
      "Policy documents that no one reads",
      "Manual course production that takes months",
    ],
    deliverables: [
      "Course outline + scriptwriting",
      "AI-assisted production pipeline",
      "Published course inside an LMS",
    ],
    bestFitClients: ["Healthcare trainers, educators, internal L&D"],
  },
];
