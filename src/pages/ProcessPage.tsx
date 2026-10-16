import { Icon } from "@iconify/react";
import PageHeader from "../components/ui/PageHeader";
import ProcessStep from "../components/ui/ProcessStep";
import TerminalLabel from "../components/ui/TerminalLabel";
import PageCTA from "../components/ui/PageCTA";
import { PROCESS_PHASES, AI_DELIVERY_NOTES } from "../data/process";

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        label="DELIVERY / PIPELINE"
        title="A 7-phase delivery pipeline."
        description="Each engagement runs the same pipeline — discovery to iteration — with telemetry at every step. AI accelerates the work; it doesn't replace the structure."
        meta={[
          { label: "Phases", value: "07" },
          { label: "Engagement min", value: "8 weeks" },
          { label: "Cycle time", value: "2-week sprints" },
          { label: "Reviews", value: "Weekly" },
        ]}
      />
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-rail mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8">
            <div className="flex flex-col">
              {PROCESS_PHASES.map((p, i) => (
                <ProcessStep
                  key={p.id}
                  phase={p}
                  isLast={i === PROCESS_PHASES.length - 1}
                />
              ))}
            </div>
          </div>
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-20 border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-4">
              <TerminalLabel variant="accent">AI / IMPACT</TerminalLabel>
              <h3 className="text-white text-display-sm font-display font-light leading-tight">
                How AI changes the delivery process.
              </h3>
              <ul className="flex flex-col gap-3 mt-2">
                {AI_DELIVERY_NOTES.map((note) => (
                  <li
                    key={note}
                    className="flex items-start gap-2 text-white/70 text-sm font-normal"
                  >
                    <Icon
                      icon="solar:cpu-bolt-linear"
                      className="w-3.5 h-3.5 mt-0.5 text-accent shrink-0"
                      aria-hidden
                    />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <PageCTA
        headline="Ready to run this pipeline on your operation?"
        subtext="Engagements start with a structured discovery sprint — fixed scope, defined outputs, no open-ended retainer required upfront."
        primaryLabel="Start a project"
        primaryTo="/contact"
        secondaryLabel="View our work"
        secondaryTo="/work"
      />
    </>
  );
}
