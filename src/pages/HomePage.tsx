import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import TerminalLabel from "../components/ui/TerminalLabel";
import CTAButton from "../components/ui/CTAButton";
import StatusBadge from "../components/ui/StatusBadge";
import SectionHeader from "../components/ui/SectionHeader";
import HeroTicker from "../components/visuals/HeroTicker";
import HeroCityGrid from "../components/visuals/HeroCityGrid";
import ProductSystemPanel from "../components/ui/ProductSystemPanel";
import { SERVICES } from "../data/services";
import { INDUSTRIES } from "../data/industries";
import { PRODUCTS } from "../data/products";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const HERO_LINES = [
  { text: "Build the systems", color: "text-white" },
  { text: "that run your", color: "text-white/75" },
  { text: "digital operations.", color: "text-accent" },
];

const HERO_PILLS = [
  "AI Websites",
  "Automation Systems",
  "Compliance Platforms",
  "Agent Workflows",
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const subCopyRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const pillsRef = useRef<HTMLUListElement | null>(null);

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
      const fadeTargets = [subCopyRef.current, ctaRef.current, pillsRef.current].filter(Boolean);
      if (fadeTargets.length) {
        gsap.fromTo(
          fadeTargets,
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
      }
    }, heroRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <>
      {/* HERO */}
      <section
        ref={heroRef}
        className="theme-fixed-dark relative min-h-[92vh] flex flex-col border-b border-white/10 overflow-hidden"
      >
        <HeroCityGrid />
        <div className="relative z-10 flex-1 flex flex-col justify-center px-4 sm:px-6 md:px-12 py-20 md:py-24">
          <div className="w-full">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4">
                <TerminalLabel variant="accent">AI OPERATIONS STUDIO</TerminalLabel>
                <span className="text-mono-label text-white/40">/ 089</span>
              </div>
              <h1 className="font-display font-light text-white text-[clamp(38px,5.8vw,80px)] leading-[1.05] tracking-[-0.04em] mt-10 mb-8">
                {HERO_LINES.map((line, i) => (
                  <span
                    key={i}
                    data-hero-line
                    className={`block ${line.color}`}
                  >
                    {line.text}
                  </span>
                ))}
              </h1>
              <p ref={subCopyRef} className="text-white/60 text-body-md font-light max-w-xl mb-8">
                Gridhouse Digital designs and builds AI-powered websites,
                automation systems, compliance platforms, and operational tools
                for healthcare teams and growing businesses.
              </p>
              <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mb-10">
                <CTAButton variant="primary" to="/contact" icon="solar:arrow-right-linear">
                  Start a project
                </CTAButton>
                <CTAButton variant="secondary" to="/services">
                  Explore services
                </CTAButton>
              </div>
              <ul ref={pillsRef} className="flex flex-wrap gap-2 border-t border-white/10 pt-6">
                {HERO_PILLS.map((pill) => (
                  <li
                    key={pill}
                    className="text-mono-label text-white/65 border border-white/15 bg-white/[0.03] backdrop-blur-sm px-3 py-2 transition-all duration-300 hover:border-accent/60 hover:text-white hover:-translate-y-0.5"
                  >
                    {pill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="relative z-10">
          <HeroTicker />
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="relative px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-20">
        <div className="max-w-rail mx-auto flex flex-col gap-10">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <SectionHeader
              label="CAPABILITIES / 01"
              title="Eight services. One operating system."
              description="Each capability is a module. Pick one or compose the full system — sites, portals, automations, agents, infrastructure."
            />
            <Link
              to="/services"
              className="text-mono-label text-white/60 hover:text-accent inline-flex items-center gap-2"
            >
              View all 8 services <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
            {SERVICES.slice(0, 4).map((s) => (
              <Link
                key={s.id}
                to="/services"
                className="bg-ink p-6 flex flex-col gap-3 hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-mono-label text-accent">/ {s.id}</span>
                <h3 className="text-white text-base font-display font-light leading-snug">
                  {s.title}
                </h3>
                <p className="text-white/50 text-sm font-light">
                  {s.description}
                </p>
                <Icon icon="solar:arrow-right-linear" className="w-4 h-4 text-white/30 mt-auto" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES PREVIEW */}
      <section className="relative px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-20 border-t border-white/10 bg-tech-grid-32">
        <div className="max-w-rail mx-auto flex flex-col gap-10">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <SectionHeader
              label="SECTOR FOCUS / 02"
              title="Built for operators in five sectors."
              description="Healthcare is our deepest engagement; the rest follow the same operational pattern — replace manual work with designed systems."
            />
            <Link
              to="/industries"
              className="text-mono-label text-white/60 hover:text-accent inline-flex items-center gap-2"
            >
              View all sectors <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Asymmetric rack: featured Healthcare on the left + 2x2 of remaining sectors on the right */}
          <div className="flex flex-col lg:flex-row gap-px bg-white/5">
            {/* Featured: Healthcare */}
            {INDUSTRIES.slice(0, 1).map((i) => (
              <Link
                key={i.id}
                to="/industries"
                className="lg:w-[42%] relative bg-ink p-8 md:p-10 flex flex-col gap-6 group transition-colors hover:bg-accent/[0.06]"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-0 bottom-0 w-px bg-accent"
                />
                <header className="flex items-center justify-between">
                  <span className="text-mono-label text-accent">SECTOR / {i.id}</span>
                  <span className="text-mono-label text-accent">PRIORITY FOCUS</span>
                </header>
                <h3 className="text-white text-display-md font-display font-light leading-tight">
                  {i.name}
                </h3>
                <p className="text-white/65 text-body-md font-light max-w-md">
                  {i.gridhouseFit}
                </p>
                <ul className="flex flex-wrap gap-2 mt-2">
                  {i.mappedOfferings.map((o) => (
                    <li
                      key={o}
                      className="text-mono-label text-white/70 border border-white/15 px-2 py-1"
                    >
                      {o}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/10">
                  <span className="text-mono-label text-white/40">
                    {i.painPoints.length} pain points · {i.useCases.length} use cases
                  </span>
                  <Icon
                    icon="solar:arrow-right-linear"
                    className="w-4 h-4 text-white/40 group-hover:text-accent transition-colors"
                    aria-hidden
                  />
                </div>
              </Link>
            ))}

            {/* The other four sectors as a 2×2 compact grid */}
            <div className="lg:w-[58%] grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5">
              {INDUSTRIES.slice(1).map((i) => (
                <Link
                  key={i.id}
                  to="/industries"
                  className="group bg-ink p-6 flex flex-col gap-3 min-h-[200px] transition-colors hover:bg-white/[0.03]"
                >
                  <header className="flex items-center justify-between">
                    <span className="text-mono-label text-white/40 group-hover:text-accent transition-colors">
                      SECTOR / {i.id}
                    </span>
                    <Icon
                      icon="solar:arrow-right-linear"
                      className="w-3.5 h-3.5 text-white/25 group-hover:text-accent group-hover:translate-x-0.5 transition-all"
                      aria-hidden
                    />
                  </header>
                  <h3 className="text-white text-lg font-display font-light leading-snug">
                    {i.name}
                  </h3>
                  <p className="text-white/55 text-sm font-light line-clamp-3">
                    {i.gridhouseFit}
                  </p>
                  <span className="mt-auto text-mono-label text-white/35">
                    {i.mappedOfferings.slice(0, 2).join(" · ")}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS PREVIEW */}
      <section className="relative px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-20 border-t border-white/10">
        <div className="max-w-rail mx-auto flex flex-col gap-10">
          <SectionHeader
            label="SYSTEMS / 03"
            title="Internal products and platforms."
            description="HOMS, the Compliance Training Platform, AI agent systems, and an automation template library — the systems we ship and the ones powering our client work."
          />
          <div className="grid grid-cols-1 gap-6">
            {PRODUCTS.slice(0, 2).map((p) => (
              <ProductSystemPanel key={p.id} product={p} />
            ))}
          </div>
          <Link
            to="/products"
            className="self-start text-mono-label text-white/60 hover:text-accent inline-flex items-center gap-2"
          >
            View product command center <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* PROOF / OUTCOMES */}
      <section className="relative px-4 sm:px-6 md:px-12 py-12 sm:py-16 md:py-20 border-t border-white/10 bg-ink-deep">
        <div className="max-w-rail mx-auto flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <span className="text-mono-label text-accent">OUTCOMES / 03</span>
            <span className="text-mono-label text-white/30">WHAT ACTUALLY SHIPS</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {[
              {
                sector: "HEALTHCARE",
                headline: "Spreadsheet credentialing replaced with auditable records",
                detail: "A home care agency moved staff training and credential tracking from email chains into a structured LMS with automated expiry reminders and AI-assisted intake.",
              },
              {
                sector: "OPERATIONS",
                headline: "Tier-1 support handled by an AI agent before staff see it",
                detail: "A retrieval-augmented intake agent answers policy and how-to questions directly, escalating only real issues — with full conversational context attached.",
              },
              {
                sector: "TRAINING",
                headline: "Hours of unused video turned into published courses",
                detail: "An AI-assisted production pipeline converted unedited lecture and SOP recordings into structured, captioned LMS courses in weeks rather than months.",
              },
            ].map((o) => (
              <div key={o.sector} className="bg-ink p-6 md:p-8 flex flex-col gap-4">
                <span className="text-mono-label text-accent">{o.sector}</span>
                <h3 className="text-white text-display-sm font-display font-light leading-tight">
                  {o.headline}
                </h3>
                <p className="text-white/45 text-sm font-light leading-relaxed">{o.detail}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between flex-wrap gap-4 pt-2 border-t border-white/10">
            <p className="text-mono-label text-white/30">
              * CLIENT DETAILS ANONYMISED. CASE-LEVEL SPECIFICS AVAILABLE UNDER NDA.
            </p>
            <Link to="/work" className="text-mono-label text-white/50 hover:text-accent inline-flex items-center gap-2 transition-colors">
              View all engagements <Icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative px-4 sm:px-6 md:px-12 py-16 sm:py-20 md:py-24 border-t border-white/10">
        <div className="max-w-rail mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <TerminalLabel variant="accent">DEPLOY / 04</TerminalLabel>
            <h2 className="text-white text-display-md font-display font-light leading-tight">
              Ready to move from scattered tools into a designed system?
            </h2>
            <p className="text-white/60 text-body-md font-light max-w-xl">
              Tell us about the operation. We'll come back with a structured
              scope and a delivery plan within 24 hours.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <CTAButton variant="primary" to="/contact" icon="solar:arrow-right-linear">
                Start a project
              </CTAButton>
              <CTAButton variant="secondary" to="/process">
                See our process
              </CTAButton>
            </div>
          </div>
          <div className="border border-white/10 bg-white/[0.02] p-8 flex flex-col gap-4">
            <StatusBadge label="Accepting selected projects" />
            <p className="text-white/70 text-body-md font-light">
              We take on engagements where we can ship a real system — not just
              a deliverable. Healthcare, ops-heavy SMBs, and AI-first operators
              get priority.
            </p>
            <div className="border-t border-white/10 pt-4 flex justify-between items-center text-mono-label">
              <span className="text-white/40">CHANNEL</span>
              <a className="text-accent" href="mailto:hello@gridhouse.digital">
                hello@gridhouse.digital
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
