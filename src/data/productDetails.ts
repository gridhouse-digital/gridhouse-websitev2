export interface ProductFeatureBullet {
  lead: string;
  text: string;
}

export interface ProductFeature {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: ProductFeatureBullet[];
  /** Screenshot slots — labels render as GHACS placeholders until images land */
  media: { label: string; image?: string; aspect: string }[];
  /** "left" = text first, "right" = media first, "stacked" = full-width text + media row */
  layout: "left" | "right" | "stacked";
  anchor?: string;
}

export interface ProductDetail {
  slug: string;
  productId: string;
  eyebrow: string;
  headline: string;
  intro: { lead: string; text: string };
  hero: { label: string; image?: string; caption?: string };
  overview: { title: string; text: string };
  features: ProductFeature[];
  cta: { headline: string; subtext: string; primaryLabel: string };
}

export const COMPLIANCE_TRAINING_DETAIL: ProductDetail = {
  slug: "compliance-training",
  productId: "02",
  eyebrow: "Training & compliance for OLTL/ODP providers",
  headline: "Simplify healthcare training and bulletproof your compliance.",
  intro: {
    lead: "Gridhouse Compliance",
    text: " — the all-in-one platform designed to empower your staff, centralize your records, and keep your organization fully compliant without the administrative headache.",
  },
  hero: {
    label: "ADMIN COMPLIANCE DASHBOARD",
    image: "/images/admin-compliance-dashboard.webp",
  },
  overview: {
    title: "The modern healthcare organization needs modern tools",
    text: "Managing employee training, credential tracking, and compliance audits shouldn't require endless spreadsheets and scattered files. Gridhouse Compliance brings everything under one roof. From onboarding new hires to tracking ongoing certifications and surviving audits with ease, our system gives both administrators and employees the tools they need to succeed.",
  },
  features: [
    {
      id: "01",
      anchor: "features",
      eyebrow: "01 · The Admin Compliance Dashboard",
      title: "A bird's-eye view of your organization's compliance",
      description:
        "Never guess where your organization stands. Our robust admin dashboard gives you a real-time overview of your entire staff's compliance status.",
      bullets: [
        {
          lead: "Instant visibility:",
          text: "See exactly who is up-to-date and who requires attention.",
        },
        {
          lead: "Proactive alerts:",
          text: "Stay ahead of expiring certifications and mandatory training deadlines.",
        },
        {
          lead: "Data-driven decisions:",
          text: "Use high-level metrics to ensure your facility is always audit-ready.",
        },
      ],
      media: [
        {
          label: "ADMIN COMPLIANCE DASHBOARD",
          image: "/images/admin-compliance-dashboard.webp",
          aspect: "16/9",
        },
      ],
      layout: "left",
    },
    {
      id: "02",
      eyebrow: "02 · The Employee Dashboard",
      title: "Empower your staff to take charge",
      description:
        "Learning and compliance shouldn't be a chore. We provide a clean, intuitive portal for your employees to manage their own requirements.",
      bullets: [
        {
          lead: "Personalized to-do lists:",
          text: "Staff can easily see their assigned courses, upcoming deadlines, and current compliance standing.",
        },
        {
          lead: "Frictionless learning:",
          text: "Employees can access training materials and take courses directly from their personal dashboard.",
        },
        {
          lead: "Self-service updates:",
          text: "Staff can track their own progress, reducing the administrative burden on your HR and compliance teams.",
        },
      ],
      media: [
        {
          label: "EMPLOYEE DASHBOARD",
          image: "/images/employee-dashboard.webp",
          aspect: "4/3",
        },
      ],
      layout: "right",
    },
    {
      id: "03",
      anchor: "records",
      eyebrow: "03 · The Compliance Employee Table & Drawer",
      title: "Comprehensive record management",
      description:
        "Dive deep into the details when you need to. Our system makes organizing and updating employee records seamless.",
      bullets: [
        {
          lead: "Centralized directory:",
          text: "View all staff members, their roles, and their top-level compliance statuses in one easy-to-read table.",
        },
        {
          lead: "Quick-access drawer:",
          text: "Click on any employee to instantly pull up a detailed drawer of their specific records, course completions, and missing requirements without leaving the page.",
        },
        {
          lead: "Effortless editing:",
          text: "Update employee information, adjust requirements, and log offline training quickly and securely.",
        },
      ],
      media: [
        {
          label: "COMPLIANCE EMPLOYEE TABLE",
          image: "/images/employee-table.webp",
          aspect: "16/10",
        },
        {
          label: "EMPLOYEE RECORD DRAWER",
          image: "/images/employee-table-drawer.webp",
          aspect: "16/10",
        },
      ],
      layout: "stacked",
    },
    {
      id: "04",
      anchor: "audit",
      eyebrow: "04 · The Audit Tab",
      title: "Audit-ready at a moment's notice",
      description: "Say goodbye to the stress of surprise audits.",
      bullets: [
        {
          lead: "Traceable history:",
          text: "Maintain a pristine, unalterable log of all compliance activities, training completions, and system updates.",
        },
        {
          lead: "One-click reporting:",
          text: "Export the exact data surveyors and auditors need in seconds, proving your organization's commitment to excellence and safety.",
        },
      ],
      media: [
        {
          label: "AUDIT TAB",
          image: "/images/audit-tab.webp",
          aspect: "16/10",
        },
      ],
      layout: "left",
    },
  ],
  cta: {
    headline: "Ready to transform your compliance management?",
    subtext: "See how Gridhouse Compliance fits your agency.",
    primaryLabel: "Schedule your personalized demo",
  },
};
