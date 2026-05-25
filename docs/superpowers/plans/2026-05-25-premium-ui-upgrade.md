# Premium UI Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the Gridhouse Digital site from "well-executed" to "premium agency" by upgrading design tokens, card surfaces, typography contrast, magnetic tilt interactions, hero animation smoothing, and a floating scroll-aware navigation pill.

**Architecture:** Approach 1 — token-driven upgrade. Add named shadow/surface tokens to `tailwind.config.js` and `globals.css`, then update 7 targeted components and 2 hooks. WebGL (`SimulationMatrixCanvas`, `WebGLPanel`) and GSAP animation structure are untouched; only hero timing values are refined. All changes are additive.

**Tech Stack:** React 19, TypeScript 6 (strict), Tailwind CSS 3, GSAP 3, Vite 8. All commands run from `gridhouse-digital-react-site/`.

---

## Task 1: Design Tokens — Tailwind Config

**Files:**
- Modify: `tailwind.config.js`

- [ ] **Step 1: Add named box-shadow tokens**

In `tailwind.config.js`, add a `boxShadow` key inside `theme.extend`:

```js
boxShadow: {
  'glow-accent':        '0 0 40px -10px rgba(255,69,0,0.35), 0 25px 60px -15px rgba(255,69,0,0.3)',
  'glow-accent-subtle': '0 20px 60px -20px rgba(255,69,0,0.25)',
  'nav-pill':           'inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.5)',
},
```

The full updated `theme.extend` block becomes:

```js
theme: {
  extend: {
    colors: {
      accent: "#FF4500",
      ink: "#0F0F0F",
      "ink-deep": "#0A0A0A",
      shell: "#F4F3ED",
      "text-muted": "#71717A",
      reserved: "#FFF80A",
    },
    fontFamily: {
      display: ["Space Grotesk", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      body:    ["Space Grotesk", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      mono:    ["Syncopate", "Space Grotesk", "system-ui", "sans-serif"],
    },
    fontSize: {
      "label-md":   ["10px",                      { lineHeight: "15px",   letterSpacing: "0.16em" }],
      "body-md":    ["16px",                       { lineHeight: "26px" }],
      "display-sm": ["clamp(22px, 2.5vw, 32px)",  { lineHeight: "1.1",  letterSpacing: "-0.03em" }],
      "display-md": ["clamp(28px, 4vw, 48px)",    { lineHeight: "1.05", letterSpacing: "-0.03em" }],
      "display-lg": ["clamp(48px, 7vw, 96px)",    { lineHeight: "1",    letterSpacing: "-0.05em" }],
    },
    letterSpacing: { mono: "0.16em" },
    maxWidth:      { rail: "1440px" },
    boxShadow: {
      'glow-accent':        '0 0 40px -10px rgba(255,69,0,0.35), 0 25px 60px -15px rgba(255,69,0,0.3)',
      'glow-accent-subtle': '0 20px 60px -20px rgba(255,69,0,0.25)',
      'nav-pill':           'inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.5)',
    },
    backgroundImage: {
      "ignition-overlay": "linear-gradient(to bottom right, rgba(255, 184, 0, 0.4), transparent, rgba(154, 0, 255, 0.3))",
      "shell-border":     "linear-gradient(to bottom, rgba(113,113,122,0.4), rgba(39,39,42,0.4), rgba(0,0,0,0.8))",
    },
    animation: { "pulse-dot": "pulse-dot 2s ease-in-out infinite" },
    keyframes:  { "pulse-dot": { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.3" } } },
  },
},
```

- [ ] **Step 2: Verify build compiles**

```bash
npm run build
```

Expected: build succeeds, no errors.

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.js
git commit -m "feat: add glow-accent and nav-pill shadow tokens"
```

---

## Task 2: Design Tokens — globals.css

**Files:**
- Modify: `src/styles/globals.css`

- [ ] **Step 1: Add `.glow-surface` and `.magnetic-card` utilities**

Append the following block to `src/styles/globals.css`, inside the `@layer utilities` block (after the existing `.bg-dot-grid` and `.text-mono-label` entries):

```css
  /* Top-edge glow line on hover */
  .glow-surface {
    position: relative;
  }
  .glow-surface::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,69,0,0.55), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 1;
  }
  .glow-surface:hover::before {
    opacity: 1;
  }

  /* Base perspective for magnetic tilt hook */
  .magnetic-card {
    transform-style: preserve-3d;
    perspective: 600px;
  }
```

- [ ] **Step 2: Verify dev server shows no CSS errors**

```bash
npm run dev
```

Open browser, check console — no CSS parse errors.

- [ ] **Step 3: Commit**

```bash
git add src/styles/globals.css
git commit -m "feat: add glow-surface and magnetic-card CSS utilities"
```

---

## Task 3: `useMagneticTilt` Hook

**Files:**
- Create: `src/hooks/useMagneticTilt.ts`

- [ ] **Step 1: Create the hook**

```ts
import { type RefObject, useEffect } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function useMagneticTilt(ref: RefObject<HTMLElement | null>): void {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transition = "transform 0.1s ease, box-shadow 0.4s ease, border-color 0.4s ease";
      el.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) translateZ(4px)`;
    };

    const onLeave = () => {
      el.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease, border-color 0.4s ease";
      el.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref, reduced]);
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npm run build
```

Expected: no type errors.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useMagneticTilt.ts
git commit -m "feat: add useMagneticTilt hook with reduced-motion guard"
```

---

## Task 4: `SystemCard` — Deep Glow Surface

**Files:**
- Modify: `src/components/ui/SystemCard.tsx`

- [ ] **Step 1: Update SystemCard with deep glow treatment**

Replace the entire file contents:

```tsx
import { useRef, type ReactNode } from "react";
import { useMagneticTilt } from "../../hooks/useMagneticTilt";

interface Props {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
  tilt?: boolean;
}

export default function SystemCard({
  children,
  className = "",
  as = "div",
  tilt = false,
}: Props) {
  const Tag = as;
  const ref = useRef<HTMLElement>(null);
  useMagneticTilt(tilt ? ref : { current: null });

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement & HTMLElement>}
      className={`glow-surface ${tilt ? "magnetic-card" : ""} relative bg-white/[0.02] bg-gradient-to-br from-accent/[0.06] to-transparent border border-accent/[0.15] backdrop-blur-sm transition-all duration-400 hover:border-accent/[0.35] hover:shadow-glow-accent ${className}`}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npm run build
```

Expected: no type errors. The `ref` cast is necessary because `Tag` is polymorphic — this is acceptable.

- [ ] **Step 3: Check dev server visually**

```bash
npm run dev
```

Visit any page using `SystemCard`. Hover a card — you should see the accent border brighten, orange bloom shadow, and top-edge glow line appear.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/SystemCard.tsx
git commit -m "feat: apply deep glow surface treatment to SystemCard"
```

---

## Task 5: `ServiceCard` — Deep Glow Surface

**Files:**
- Modify: `src/components/ui/ServiceCard.tsx`

- [ ] **Step 1: Add glow-surface class and upgrade shadow token**

In `ServiceCard.tsx`, update the `<article>` opening tag. Change:

```tsx
<article className="group relative overflow-hidden border-t border-white/10 px-6 py-10 transform-gpu transition-all duration-300 ease-out will-change-transform hover:scale-[1.005] hover:bg-white/[0.025] hover:shadow-[0_20px_60px_-20px_rgba(255,69,0,0.25)]">
```

To:

```tsx
<article className="glow-surface group relative overflow-hidden border-t border-white/10 px-6 py-10 transform-gpu transition-all duration-400 ease-out will-change-transform hover:scale-[1.005] hover:bg-white/[0.025] hover:shadow-glow-accent">
```

- [ ] **Step 2: Add surface glow gradient**

After the existing `bg-tech-grid-32` div, add a gradient overlay div:

```tsx
{/* existing tech grid div — unchanged */}
<div
  aria-hidden
  className="absolute inset-0 bg-tech-grid-32 opacity-30 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none"
/>
{/* NEW: accent gradient surface */}
<div
  aria-hidden
  className="absolute inset-0 bg-gradient-to-br from-accent/[0.06] to-transparent pointer-events-none"
/>
```

- [ ] **Step 3: Update body copy opacity**

In the description paragraph, change `text-white/70` to `text-white/50`:

```tsx
<p className="text-white/50 text-body-md font-light">
  {service.description}
</p>
```

- [ ] **Step 4: Verify TypeScript and lint**

```bash
npm run build && npm run lint
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/ServiceCard.tsx
git commit -m "feat: apply deep glow surface and body copy contrast to ServiceCard"
```

---

## Task 6: `CaseStudyCard` — Deep Glow + Magnetic Tilt

**Files:**
- Modify: `src/components/ui/CaseStudyCard.tsx`

- [ ] **Step 1: Replace full file contents**

```tsx
import { useRef } from "react";
import { Icon } from "@iconify/react";
import type { CaseStudy } from "../../data/caseStudies";
import StatusBadge from "./StatusBadge";
import { useMagneticTilt } from "../../hooks/useMagneticTilt";

interface Props {
  caseStudy: CaseStudy;
}

export default function CaseStudyCard({ caseStudy }: Props) {
  const ref = useRef<HTMLElement>(null);
  useMagneticTilt(ref);

  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      className="glow-surface magnetic-card group flex flex-col border border-accent/[0.15] bg-white/[0.02] bg-gradient-to-br from-accent/[0.06] to-transparent transition-all duration-400 hover:border-accent/[0.5] hover:shadow-glow-accent-subtle"
    >
      <div className="aspect-video bg-ink-deep bg-tech-grid relative flex items-center justify-center border-b border-white/10">
        <Icon
          icon="solar:code-square-linear"
          className="w-12 h-12 text-white/15"
          aria-hidden
        />
        <span className="absolute top-3 left-3 text-mono-label text-accent">
          {caseStudy.kind.toUpperCase()}
        </span>
        <span className="absolute top-3 right-3 text-mono-label text-white/40">
          / {caseStudy.id}
        </span>
      </div>
      <div className="p-6 flex flex-col gap-4 flex-1">
        <h3 className="text-white text-lg font-display font-light leading-snug">
          {caseStudy.title}
        </h3>
        <p className="text-white/50 text-sm font-light">{caseStudy.problem}</p>
        <p className="text-white/[0.38] text-sm font-light border-l border-accent/40 pl-3">
          {caseStudy.solution}
        </p>
        <div className="mt-auto flex flex-col gap-3">
          <ul className="flex flex-wrap gap-2">
            {caseStudy.stack.map((s) => (
              <li
                key={s}
                className="text-mono-label text-white/60 border border-white/15 px-2 py-1"
              >
                {s}
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between border-t border-white/10 pt-3">
            <StatusBadge label={caseStudy.status} variant="active" />
            <Icon
              icon="solar:arrow-right-up-linear"
              className="w-4 h-4 text-white/40 group-hover:text-accent transition-colors"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Verify TypeScript and lint**

```bash
npm run build && npm run lint
```

Expected: no errors.

- [ ] **Step 3: Check magnetic tilt in dev server**

```bash
npm run dev
```

Visit `/work`. Hover a case study card slowly — the card should tilt toward the cursor with a max of ~8° horizontal, ~6° vertical. Moving mouse away should smoothly reset.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/CaseStudyCard.tsx
git commit -m "feat: apply deep glow surface and magnetic tilt to CaseStudyCard"
```

---

## Task 7: `InsightCard` — Body Copy Contrast

**Files:**
- Modify: `src/components/ui/InsightCard.tsx`

- [ ] **Step 1: Update surface classes and text opacity**

Replace the `<article>` opening tag. Change:

```tsx
<article className="group flex flex-col gap-4 p-6 border border-white/10 bg-white/[0.02] hover:border-accent/30 transition-colors">
```

To:

```tsx
<article className="glow-surface group flex flex-col gap-4 p-6 border border-accent/[0.15] bg-white/[0.02] bg-gradient-to-br from-accent/[0.06] to-transparent transition-all duration-400 hover:border-accent/[0.4] hover:shadow-glow-accent-subtle">
```

- [ ] **Step 2: Update excerpt text opacity**

Change:

```tsx
<p className="text-white/60 text-sm font-light flex-1">{insight.excerpt}</p>
```

To:

```tsx
<p className="text-white/50 text-sm font-light flex-1">{insight.excerpt}</p>
```

- [ ] **Step 3: Verify build**

```bash
npm run build && npm run lint
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/InsightCard.tsx
git commit -m "feat: apply deep glow surface to InsightCard"
```

---

## Task 8: `ProductSystemPanel` — Body Copy Contrast

**Files:**
- Modify: `src/components/ui/ProductSystemPanel.tsx`

- [ ] **Step 1: Update article border and background**

Replace the `<article>` opening tag. Change:

```tsx
<article className="border border-white/10 bg-white/[0.02] backdrop-blur-sm">
```

To:

```tsx
<article className="glow-surface border border-accent/[0.15] bg-white/[0.02] bg-gradient-to-br from-accent/[0.06] to-transparent backdrop-blur-sm transition-all duration-400 hover:border-accent/[0.35] hover:shadow-glow-accent-subtle">
```

- [ ] **Step 2: Update description text opacity**

Change:

```tsx
<p className="text-white/70 text-body-md font-light">
  {product.description}
</p>
```

To:

```tsx
<p className="text-white/50 text-body-md font-light">
  {product.description}
</p>
```

- [ ] **Step 3: Verify build**

```bash
npm run build && npm run lint
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/ProductSystemPanel.tsx
git commit -m "feat: apply deep glow surface to ProductSystemPanel"
```

---

## Task 9: Typography — Section Headings + `StatBlock` Component

**Files:**
- Modify: `src/components/ui/SectionHeader.tsx`
- Modify: `src/components/ui/PageHeader.tsx`
- Create: `src/components/ui/StatBlock.tsx`

- [ ] **Step 1: Update SectionHeader h2 weight**

In `SectionHeader.tsx`, change the `<h2>` className:

From:
```tsx
<h2 className="font-display font-light text-white text-display-md">
```

To:
```tsx
<h2 className="font-display font-normal text-white text-display-md">
```

- [ ] **Step 2: Update PageHeader description opacity**

In `PageHeader.tsx`, change the description paragraph:

From:
```tsx
<p className="text-white/60 text-body-md font-light max-w-2xl">
```

To:
```tsx
<p className="text-white/50 text-body-md font-light max-w-2xl">
```

- [ ] **Step 3: Create StatBlock component**

Create `src/components/ui/StatBlock.tsx`:

```tsx
interface Props {
  value: string;
  label: string;
}

export default function StatBlock({ value, label }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-display font-light text-display-sm text-white leading-none tracking-[-0.04em]">
        {value}
      </span>
      <span className="text-mono-label text-white/30">{label}</span>
    </div>
  );
}
```

- [ ] **Step 4: Verify build and lint**

```bash
npm run build && npm run lint
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/SectionHeader.tsx src/components/ui/PageHeader.tsx src/components/ui/StatBlock.tsx
git commit -m "feat: upgrade section heading weight and add StatBlock component"
```

---

## Task 10: Hero GSAP Animation Smoothing

**Files:**
- Modify: `src/pages/HomePage.tsx`

- [ ] **Step 1: Add refs for sub-copy and CTA**

In `HomePage.tsx`, after the existing `heroRef` and `reduced` declarations (around line 22), add:

```tsx
const subCopyRef = useRef<HTMLParagraphElement | null>(null);
const ctaRef = useRef<HTMLDivElement | null>(null);
```

- [ ] **Step 2: Update the hero GSAP useEffect**

Replace the existing `useEffect` block (lines 29–46) with:

```tsx
useEffect(() => {
  if (reduced || !heroRef.current) return;
  const ctx = gsap.context(() => {
    const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
    gsap.fromTo(
      lines,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.12,
        ease: "expo.out",
        delay: 0.2,
      },
    );
    const lineCount = lines.length;
    const afterDelay = 0.2 + lineCount * 0.12 + 1.2;
    gsap.fromTo(
      [subCopyRef.current, ctaRef.current],
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "expo.out",
        stagger: 0.1,
        delay: afterDelay,
      },
    );
  }, heroRef);
  return () => ctx.revert();
}, [reduced]);
```

- [ ] **Step 3: Attach refs to JSX elements**

Find the sub-copy paragraph in the hero section (the one with `text-white/70 text-body-md font-light max-w-xl`) and add the ref:

```tsx
<p ref={subCopyRef} className="text-white/50 text-body-md font-light max-w-xl">
```

Note: also update `text-white/70` → `text-white/50` on this paragraph (body copy dimming).

Find the CTA button wrapper div immediately below and add the ref. It wraps the two `CTAButton` elements — wrap them in a `<div ref={ctaRef}>` if not already wrapped:

```tsx
<div ref={ctaRef} className="flex flex-wrap gap-3">
  <CTAButton variant="primary" to="/contact" icon="solar:arrow-right-linear">Start a project</CTAButton>
  <CTAButton variant="secondary" to="/services">View capabilities</CTAButton>
</div>
```

- [ ] **Step 4: Verify animation in dev server**

```bash
npm run dev
```

Visit `/`. Hard-refresh (Ctrl+Shift+R). Observe:
- Hero lines animate in with a longer, smoother settle (expo.out feels more graceful than power3.out)
- Sub-copy and CTA fade up after lines finish — not simultaneously

- [ ] **Step 5: Commit**

```bash
git add src/pages/HomePage.tsx
git commit -m "feat: smooth hero GSAP animation with expo.out and two-pass fade-in"
```

---

## Task 11: PageHeader Scroll Reveal Standardisation

**Files:**
- Modify: `src/components/ui/PageHeader.tsx`

- [ ] **Step 1: Update GSAP ease and duration**

In `PageHeader.tsx`, inside the `useEffect`, change the `gsap.fromTo` call:

From:
```ts
{ y: 0, opacity: 1, duration: 1, ease: "power3.out" },
```

To:
```ts
{ y: 0, opacity: 1, duration: 1.1, ease: "expo.out" },
```

Also update the from value from `y: 24` to `y: 30` for consistency with the hero:

```ts
gsap.fromTo(
  titleRef.current,
  { y: 30, opacity: 0 },
  { y: 0, opacity: 1, duration: 1.1, ease: "expo.out" },
);
```

- [ ] **Step 2: Verify build**

```bash
npm run build && npm run lint
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/PageHeader.tsx
git commit -m "feat: standardise PageHeader GSAP to expo.out for animation consistency"
```

---

## Task 12: Floating Pill Navigation

**Files:**
- Modify: `src/components/layout/SiteHeader.tsx`

- [ ] **Step 1: Replace SiteHeader with floating pill implementation**

Replace the entire file contents:

```tsx
import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { NAV_LINKS } from "../../data/nav";
import MobileNav from "./MobileNav";

function useScrolled(threshold = 40): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-30 px-4 pt-3 pointer-events-none">
        <header
          className={`pointer-events-auto flex items-center justify-between px-5 rounded-sm border transition-all duration-300 ease-out shadow-nav-pill backdrop-blur-2xl backdrop-saturate-150 ${
            scrolled
              ? "h-11 bg-ink-deep/90 border-white/[0.05] backdrop-blur-3xl"
              : "h-14 bg-ink-deep/70 border-white/[0.07]"
          }`}
        >
          <Link
            to="/"
            className="flex items-center group shrink min-w-0"
            aria-label="Gridhouse Digital — home"
          >
            <img
              src="/gridhouse-logo.svg"
              alt="Gridhouse Digital"
              width={2400}
              height={720}
              className="h-8 md:h-10 lg:h-12 w-auto max-w-none block transition-opacity duration-300 opacity-100 group-hover:opacity-70"
              draggable={false}
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative text-mono-label transition-colors ${
                    isActive
                      ? "text-accent"
                      : "text-white/60 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <span
                        aria-hidden
                        className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-accent"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden lg:inline-flex text-mono-label text-accent border border-accent/40 bg-accent/[0.05] px-4 py-2 transition-all duration-300 hover:bg-accent/[0.12] hover:border-accent/70"
            >
              Start a Project
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="lg:hidden text-white/70 hover:text-white p-2"
              aria-label="Open navigation"
            >
              <Icon icon="solar:hamburger-menu-linear" className="w-5 h-5" />
            </button>
          </div>
        </header>
      </div>

      {/* Spacer so page content starts below the fixed pill */}
      <div className="h-[72px]" aria-hidden />

      <MobileNav open={open} onClose={() => setOpen(false)} />
    </>
  );
}
```

- [ ] **Step 2: Verify TypeScript and lint**

```bash
npm run build && npm run lint
```

Expected: no errors.

- [ ] **Step 3: Check nav visually in dev server**

```bash
npm run dev
```

- Visit `/` — pill should float with margins from page edges, 56px tall
- Scroll down past 40px — pill shrinks to 44px, background darkens
- Click each nav link — confirm the active orange dot appears below the active item
- Test on mobile viewport (< 1024px) — hamburger shows, pill still floats

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/SiteHeader.tsx
git commit -m "feat: replace sticky header with floating scroll-aware pill nav"
```

---

## Task 13: Final Verification

**Files:** none modified

- [ ] **Step 1: Full build and lint**

```bash
npm run build && npm run lint
```

Expected: zero TypeScript errors, zero ESLint errors.

- [ ] **Step 2: Visual smoke test in dev server**

```bash
npm run dev
```

Check each of these:
- `/` — hero lines animate with smooth expo.out; sub-copy and CTA fade in afterward; WebGL grid still renders
- Scroll header — pill shrinks at 40px scroll threshold
- Active nav dot — visible orange dot under active link
- `/services` — ServiceCard hover shows glow gradient, top-edge line, orange bloom shadow
- `/work` — CaseStudyCard magnetic tilt active on hover
- `/products` — ProductSystemPanel deep glow border active
- `/insights` — InsightCard glow surface active
- Any inner page — PageHeader title animates with expo.out

- [ ] **Step 3: Reduced motion test**

In macOS: System Settings → Accessibility → Display → Reduce Motion ON.
In Windows: Settings → Accessibility → Visual Effects → Animation effects OFF.

Reload the site — all animations (hero lines, card tilt, page header) should be suppressed. Cards should still show hover color/shadow changes (CSS transitions are not suppressed by the hook, only GSAP and JS tilt).

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: premium UI upgrade complete — tokens, surfaces, motion, nav pill"
```
