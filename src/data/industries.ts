export interface Industry {
  id: string;
  name: string;
  featured?: boolean;
  painPoints: string[];
  gridhouseFit: string;
  mappedOfferings: string[];
  useCases: string[];
}

export const INDUSTRIES: readonly Industry[] = [
  {
    id: "01",
    name: "Healthcare Agencies",
    featured: true,
    painPoints: [
      "Credentialing and training tracked in spreadsheets",
      "Manual onboarding for staff and contractors",
      "Audit cycles that consume weeks of admin time",
      "Disconnected portals across staffing and care",
    ],
    gridhouseFit:
      "Operational software designed for staffing, home care, and training-heavy healthcare — HOMS, the Compliance Training Platform, AI agents for support and intake.",
    mappedOfferings: ["HOMS", "Compliance Training Platform", "AI Agents", "Workflow Automation"],
    useCases: [
      "Replace credential spreadsheets with HOMS",
      "Automate onboarding for new hires and contractors",
      "AI-assisted training intake and support",
    ],
  },
  {
    id: "02",
    name: "Education & Training",
    painPoints: [
      "Course operations split across LMS, forms, and email",
      "Slow course production cycles",
      "No clear view of learner progress at scale",
    ],
    gridhouseFit:
      "AI-assisted course production, LMS configuration, and learner-side automations that move trainers from manual ops into a working platform.",
    mappedOfferings: ["AI Video / Course Production", "Web Apps", "Workflow Automation"],
    useCases: [
      "Convert lectures into structured courses",
      "Automate enrollment + progress reporting",
      "Build a learner portal layered on the LMS",
    ],
  },
  {
    id: "03",
    name: "Professional Services",
    painPoints: [
      "Client work coordinated through email chains",
      "No portal for deliverables, sign-offs, or invoices",
      "Reporting cycles that never quite ship on time",
    ],
    gridhouseFit:
      "Client portals, intake automation, and reporting pipelines that turn ad-hoc service delivery into a tracked, repeatable system.",
    mappedOfferings: ["Web Apps & Portals", "Workflow Automation", "AI Agents"],
    useCases: [
      "Custom client portal with auth and roles",
      "Automated proposal and onboarding flows",
      "Reporting digests on a schedule",
    ],
  },
  {
    id: "04",
    name: "Small and Medium Businesses",
    painPoints: [
      "Stuck on a brochure website that cannot evolve",
      "Manual ops that scale linearly with headcount",
      "AI tools deployed as toys, not systems",
    ],
    gridhouseFit:
      "AI-first websites paired with operational pipelines, so the marketing presence and the back-office actually share a system.",
    mappedOfferings: ["AI-First Websites", "Workflow Automation", "AI Agents"],
    useCases: [
      "Replace static site with content + ops platform",
      "Automate billing, invoicing, and reminders",
      "Internal AI assistant for staff queries",
    ],
  },
  {
    id: "05",
    name: "Operations-Heavy Teams",
    painPoints: [
      "High-volume, repetitive operational work",
      "Knowledge trapped in inboxes and shared drives",
      "Dashboards stitched together from CSV exports",
    ],
    gridhouseFit:
      "Dashboards, AI agents, and automations sized for operational teams — built to absorb repetitive load and surface what actually needs attention.",
    mappedOfferings: ["AI Agents", "Workflow Automation", "Web Apps"],
    useCases: [
      "Triage agents on top of helpdesk + email",
      "Operational dashboards with live data",
      "Onboarding workflows for new tools",
    ],
  },
];
