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
          <div className="text-white/70 text-body-md font-light flex flex-col gap-4">
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
                <p className="text-white/55 text-sm font-light">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 border-t border-white/10">
        <div className="max-w-rail mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <SectionHeader label="LEADERSHIP / 03" title="Founder profile" />
          </div>
          <article className="lg:col-span-8 border border-white/10 bg-white/[0.02] p-8 flex flex-col md:flex-row gap-6">
            <div className="w-24 h-24 border border-accent/40 bg-ink-deep flex items-center justify-center shrink-0">
              <Icon icon="solar:user-linear" className="w-10 h-10 text-accent" aria-hidden />
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-mono-label text-accent">FOUNDER</span>
              <h3 className="text-white text-display-sm font-display font-light leading-tight">
                Operator-led, engineer-built.
              </h3>
              <p className="text-white/65 text-body-md font-light">
                Gridhouse is led by a builder with a decade across web platforms,
                healthcare operations, and AI tooling — translating real
                operational requirements into systems that ship.
              </p>
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
