import { Icon } from "@iconify/react";
import type { Industry } from "../../data/industries";
import TerminalLabel from "./TerminalLabel";

interface Props {
  industry: Industry;
}

export default function IndustryPanel({ industry }: Props) {
  const featured = industry.featured;
  return (
    <article
      className={`group relative overflow-hidden border p-5 sm:p-6 md:p-8 transform-gpu transition-all duration-300 ease-out will-change-transform hover:scale-[1.01] hover:shadow-glow-accent-subtle ${
        featured
          ? "border-accent/40 border-l-2 border-l-accent bg-accent/[0.04] hover:border-accent/70 hover:bg-accent/[0.08]"
          : "border-white/10 hover:border-accent/40 hover:bg-white/[0.03]"
      }`}
    >
      {/* persistent gridline backdrop, intensifies on hover */}
      <div
        aria-hidden
        className="absolute inset-0 bg-tech-grid-32 opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />
      {/* corner accents */}
      <span
        aria-hidden
        className="absolute top-2 left-2 w-1.5 h-1.5 border border-white/15 group-hover:border-accent/70 transition-colors pointer-events-none"
      />
      <span
        aria-hidden
        className="absolute top-2 right-2 w-1.5 h-1.5 border border-white/15 group-hover:border-accent/70 transition-colors pointer-events-none"
      />
      <span
        aria-hidden
        className="absolute bottom-2 left-2 w-1.5 h-1.5 border border-white/15 group-hover:border-accent/70 transition-colors pointer-events-none"
      />
      <span
        aria-hidden
        className="absolute bottom-2 right-2 w-1.5 h-1.5 border border-white/15 group-hover:border-accent/70 transition-colors pointer-events-none"
      />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-3 flex flex-col gap-3">
          <TerminalLabel variant={featured ? "accent" : "muted"}>
            SECTOR / {industry.id}
          </TerminalLabel>
          <h3 className="text-white text-display-sm font-display font-light leading-tight transition-colors group-hover:text-accent">
            {industry.name}
          </h3>
          {featured && (
            <span className="text-mono-label text-accent">PRIORITY FOCUS</span>
          )}
        </div>
        <div className="lg:col-span-4 flex flex-col gap-2">
          <span className="text-mono-label text-white/55">Pain points</span>
          <ul className="flex flex-col gap-1.5">
            {industry.painPoints.map((p) => (
              <li
                key={p}
                className="flex items-start gap-2 text-sm text-white/70 font-light"
              >
                <Icon
                  icon="solar:danger-triangle-linear"
                  className="w-3.5 h-3.5 mt-0.5 text-accent shrink-0"
                  aria-hidden
                />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div>
            <span className="text-mono-label text-white/55">Gridhouse fit</span>
            <p className="mt-2 text-white/80 text-body-sm font-normal">
              {industry.gridhouseFit}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {industry.mappedOfferings.map((o) => (
              <span
                key={o}
                className="text-mono-label text-white/70 border border-white/15 px-2 py-1 transition-colors group-hover:border-accent/40"
              >
                {o}
              </span>
            ))}
          </div>
          <ul className="mt-2 flex flex-col gap-1.5">
            {industry.useCases.map((u) => (
              <li
                key={u}
                className="flex items-start gap-2 text-sm text-white/60 font-light"
              >
                <Icon
                  icon="solar:arrow-right-linear"
                  className="w-3.5 h-3.5 mt-0.5 text-white/30 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
                  aria-hidden
                />
                <span>{u}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
