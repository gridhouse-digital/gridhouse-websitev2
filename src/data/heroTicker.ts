export interface TechItem {
  name: string;
  icon: string; // Iconify icon name (logos:* or simple-icons:*)
}

/**
 * The Aether hero's bottom rail is now a TECH STACK scroller.
 * Each entry renders as: [logo icon] + name in mono-label style.
 * Order roughly mirrors the order we touch stacks: web → typed runtime →
 * styling → backend → DB → CMS/LMS → automation → AI → infra.
 */
export const TECH_STACK: readonly TechItem[] = [
  { name: "React", icon: "logos:react" },
  { name: "Next.js", icon: "logos:nextjs-icon" },
  { name: "TypeScript", icon: "logos:typescript-icon" },
  { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
  { name: "Node.js", icon: "logos:nodejs-icon" },
  { name: "Postgres", icon: "logos:postgresql" },
  { name: "Supabase", icon: "logos:supabase-icon" },
  { name: "WordPress", icon: "logos:wordpress-icon" },
  { name: "LearnDash", icon: "simple-icons:wordpress" },
  { name: "JotForm", icon: "simple-icons:jotform" },
  { name: "n8n", icon: "logos:n8n" },
  { name: "Make", icon: "simple-icons:makerbot" },
  { name: "Claude", icon: "simple-icons:anthropic" },
  { name: "OpenAI", icon: "simple-icons:openai" },
  { name: "GSAP", icon: "simple-icons:greensock" },
  { name: "Stripe", icon: "logos:stripe" },
  { name: "Cloudflare", icon: "logos:cloudflare" },
  { name: "Vercel", icon: "logos:vercel-icon" },
  { name: "AWS", icon: "logos:aws" },
  { name: "GitHub Actions", icon: "logos:github-actions" },
];
