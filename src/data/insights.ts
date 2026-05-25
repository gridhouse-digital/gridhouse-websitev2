export type InsightStatus = "Published" | "Draft" | "Research";

export interface Insight {
  id: string;
  slug?: string;
  category: string;
  title: string;
  readTime: string;
  status: InsightStatus;
  excerpt: string;
  publishedAt?: string;
}

export const INSIGHT_CATEGORIES: readonly string[] = [
  "AI for SMBs",
  "Healthcare Operations",
  "Workflow Automation",
  "Web Platforms",
  "Design Systems",
  "Compliance Training",
  "AI Agents",
  "Digital Transformation",
];

export const INSIGHTS: readonly Insight[] = [
  {
    id: "01",
    category: "AI for SMBs",
    title: "Why small businesses need operational systems, not just websites",
    readTime: "6 min",
    status: "Draft",
    excerpt:
      "A modern site is the surface. The system is what determines whether the business actually scales when traffic shows up.",
  },
  {
    id: "02",
    category: "Healthcare Operations",
    title: "How healthcare agencies can modernize compliance training",
    readTime: "8 min",
    status: "Draft",
    excerpt:
      "Spreadsheets are an audit risk. A managed training and credentialing platform replaces them — without becoming a multi-year SaaS migration.",
  },
  {
    id: "03",
    category: "AI Agents",
    title: "AI agents as support triage systems",
    readTime: "5 min",
    status: "Research",
    excerpt:
      "Most support load is repetitive. An agent on the front of the queue answers what it can and routes the rest with full context.",
  },
  {
    id: "04",
    category: "Design Systems",
    title: "Design systems for AI-first websites",
    readTime: "7 min",
    status: "Draft",
    excerpt:
      "AI-first sites need stronger systems, not weaker ones. Tokens and components are how you keep generated work coherent.",
  },
  {
    id: "05",
    category: "Workflow Automation",
    title: "From manual onboarding to automated workflows",
    readTime: "6 min",
    status: "Research",
    excerpt:
      "Onboarding is one of the highest-return surfaces to automate. We map the steps and replace each one that should never have been manual.",
  },
  {
    id: "06",
    category: "Compliance Training",
    title: "What makes a web platform compliance-ready",
    readTime: "9 min",
    status: "Research",
    excerpt:
      "Audit-readiness, access control, retention, and observable workflows — none of which are afterthoughts.",
  },
];
