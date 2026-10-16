import { Icon } from "@iconify/react";
import PageHeader from "../components/ui/PageHeader";
import SectionHeader from "../components/ui/SectionHeader";
import CTAButton from "../components/ui/CTAButton";
import TerminalLabel from "../components/ui/TerminalLabel";

const PRINCIPLES = [
  { id: "01", title: "System before decoration", body: "Architecture and operating logic are decided first — surfaces follow the system, not the other way around." },
  { id: "02", title: "Automation before repetition", body: "If the same step happens twice, it becomes a candidate for an automation, an agent, or a deletion." },
  { id: "03", title: "Clarity before complexity", body: "Operators don't have time for clever; they need legible interfaces and predictable behavior." },
  { id: "04", title: "Compliance-aware by default", body: "Healthcare clients live and die on audit readiness. Access, retention, logging — never an afterthought." },
  { id: "05", title: "Build for operators, not just visitors", body: "Marketing surfaces matter; operating systems matter more. We build for the people running the work." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="AGENCY / PROFILE"
        title="A digital studio for operators."
        description="Gridhouse Digital helps businesses move from scattered tools and manual workflows into designed digital systems: websites, portals, automations, AI agents, and operational platforms built to scale."
        meta={[
          { label: "Founded", value: "2024" },
          { label: "Base", value: "Canada / Remote" },
          { label: "Focus", value: "Healthcare / SMB" },
          { label: "Status", value: "Accepting projects" },
        ]}
      />

      <section className="px-6 md:px-12 py-20">
        <div className="max-w-rail mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <SectionHeader
            label="MISSION / 01"
            title="Move teams from manual work to designed systems."
          />
          <div className="text-white/70 text-body-md font-normal flex flex-col gap-4">
            <p>
              We work with healthcare agencies, professional services, and
              ops-heavy SMBs. The pattern is consistent: spreadsheets and
              email chains where there should be platforms; ad-hoc compliance
              where there should be auditable systems; AI tools deployed as
              novelties when they could be quietly absorbing the operational load.
            </p>
            <p>
              Gridhouse exists to engineer that transition — and to do it
              quickly enough that the operator can feel the difference within a
              quarter, not a year.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 border-t border-white/10 bg-tech-grid-32">
        <div className="max-w-rail mx-auto flex flex-col gap-10">
          <SectionHeader
            label="OPERATING PRINCIPLES / 02"
            title="Five principles, applied every engagement."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-white/5">
            {PRINCIPLES.map((p) => (
              <article key={p.id} className="bg-ink p-6 flex flex-col gap-3">
                <TerminalLabel variant="accent">/ {p.id}</TerminalLabel>
                <h3 className="text-white text-base font-display font-light leading-snug">
                  {p.title}
                </h3>
                <p className="text-white/55 text-sm font-normal">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 md:px-12 py-16 md:py-20 border-t border-white/10">
        <div className="max-w-rail mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <SectionHeader label="LEADERSHIP / 03" title="Founder profile" />
          </div>
          <article className="lg:col-span-8 border border-white/10 bg-white/[0.02] p-6 md:p-8 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-mono-label text-accent">FOUNDER / GRIDHOUSE DIGITAL</span>
              <h3 className="text-white text-display-sm font-display font-light leading-tight">
                Adeyemi Oyinlola
              </h3>
            </div>
            <p className="text-white/65 text-body-md font-normal max-w-2xl">
              Adeyemi is the founder of Gridhouse Digital. His work focuses on turning complex
              workflows into clean, usable digital systems — from compliance training platforms
              and internal dashboards to AI-powered assistants and automation infrastructure.
              He helps organizations modernize their operations without adding unnecessary
              technical complexity.
            </p>
            <ul className="flex flex-col gap-2">
              {[
                "Builds SaaS platforms, internal applications, AI assistants, and workflow automation systems — as well as the websites that front them",
                "Healthcare compliance and training platforms — WordPress, LearnDash, JotForm, Supabase, and custom integrations",
                "Works with healthcare agencies, service businesses, and growth-focused teams",
                "Combines product strategy, system design, web development, and automation architecture",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2 text-white/60 text-sm font-normal">
                  <Icon icon="solar:arrow-right-linear" className="w-3 h-3 mt-1 text-accent shrink-0" aria-hidden />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 border-t border-white/10">
              <a
                href="https://www.linkedin.com/in/aoyinlola/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-mono-label text-white/55 hover:text-accent transition-colors py-2 -my-2"
              >
                <Icon icon="solar:linkedin-linear" className="w-4 h-4" aria-hidden />
                linkedin.com/in/aoyinlola
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 border-t border-white/10">
        <div className="max-w-rail mx-auto flex flex-col items-start gap-6">
          <TerminalLabel variant="accent">CONTACT / 04</TerminalLabel>
          <h2 className="text-white text-display-md font-display font-light leading-tight max-w-2xl">
            If the operation is ready, the system can be live within a quarter.
          </h2>
          <CTAButton variant="primary" to="/contact" icon="solar:arrow-right-linear">
            Start a project
          </CTAButton>
        </div>
      </section>
    </>
  );
}
