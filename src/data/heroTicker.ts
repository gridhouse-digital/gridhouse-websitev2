/**
 * Marks absent from every Iconify set ship as local PNGs in /public/tech
 * instead. The union keeps each entry to exactly one source, so an entry can
 * never end up with no mark at all.
 */
export type TechItem =
  | { name: string; icon: string } // Iconify name (logos:* or simple-icons:*)
  | { name: string; src: string }; // Path under /public

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
  { name: "InstaWP", src: "/tech/instawp.png" },
  { name: "LearnDash", src: "/tech/learndash.png" },
  { name: "JotForm", src: "/tech/jotform.png" },
  { name: "n8n", icon: "simple-icons:n8n" },
  { name: "Make", icon: "simple-icons:make" },
  { name: "Claude", icon: "simple-icons:anthropic" },
  { name: "OpenAI", icon: "simple-icons:openai" },
  { name: "GSAP", icon: "simple-icons:greensock" },
  { name: "Stripe", icon: "logos:stripe" },
  { name: "Cloudflare", icon: "logos:cloudflare" },
  { name: "Vercel", icon: "logos:vercel-icon" },
  { name: "AWS", icon: "logos:aws" },
  { name: "GitHub Actions", icon: "logos:github-actions" },
];

const HOMEPAGE_TECH_NAMES = new Set([
  "WordPress",
  "LearnDash",
  "JotForm",
  "React",
  "Supabase",
  "n8n",
  "OpenAI",
  "Cloudflare",
]);

export const HOMEPAGE_TECH_STACK = TECH_STACK.filter((item) =>
  HOMEPAGE_TECH_NAMES.has(item.name),
);
