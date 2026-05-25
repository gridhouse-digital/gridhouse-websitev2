import type { ProcessPhase } from "../../data/process";
import StatusBadge from "./StatusBadge";

interface Props {
  phase: ProcessPhase;
  isLast?: boolean;
}

export default function ProcessStep({ phase, isLast = false }: Props) {
  return (
    <div className="relative grid grid-cols-[3rem_1fr] gap-6">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 border border-accent/60 bg-ink flex items-center justify-center text-mono-label text-accent">
          {phase.id}
        </div>
        {!isLast && <div className="flex-1 w-px bg-white/10 my-2" />}
      </div>
      <div className="pb-12">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h3 className="text-white text-display-sm font-display font-light">
            {phase.name}
          </h3>
          <StatusBadge label={phase.output} variant="muted" />
        </div>
        <p className="text-white/70 text-body-md font-light max-w-2xl">
          {phase.action}
        </p>
        <div className="mt-4 inline-flex items-center gap-2 text-mono-label text-white/40 border border-white/10 px-3 py-1.5">
          <span className="text-accent">/</span>
          <span>OUTPUT</span>
          <span className="text-white/70">{phase.output}</span>
        </div>
      </div>
    </div>
  );
}
