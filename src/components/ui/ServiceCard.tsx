import { Icon } from "@iconify/react";
import type { Service } from "../../data/services";
import CTAButton from "./CTAButton";
import TerminalLabel from "./TerminalLabel";

interface Props {
  service: Service;
}

export default function ServiceCard({ service }: Props) {
  return (
    <article className="glow-surface group relative overflow-hidden border-t border-white/10 px-6 py-10 transform-gpu transition-all duration-400 ease-out will-change-transform hover:scale-[1.005] hover:bg-white/[0.025] hover:shadow-glow-accent">
      <div
        aria-hidden
        className="absolute inset-0 bg-tech-grid-32 opacity-30 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none"
      />
      {/* accent gradient surface */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-accent/[0.06] to-transparent pointer-events-none"
      />
      {/* left accent rail that fills on hover */}
      <span
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-px bg-accent/0 group-hover:bg-accent transition-colors duration-300 pointer-events-none"
      />
      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        <div className="lg:col-span-3 flex flex-col gap-3">
          <TerminalLabel variant="accent">MODULE / {service.id}</TerminalLabel>
          <h3 className="text-white text-display-sm font-display font-light leading-tight transition-colors group-hover:text-accent">
            {service.title}
          </h3>
        </div>
        <div className="lg:col-span-5 flex flex-col gap-6">
          <p className="text-white/50 text-body-md font-light">
            {service.description}
          </p>
          <CTAButton variant="secondary" to="/contact" icon="solar:arrow-right-linear">
            Request scope
          </CTAButton>
        </div>
        <div className="lg:col-span-4 grid grid-cols-1 gap-6">
          <DetailBlock label="Solves" items={service.problemsSolved} accent />
          <DetailBlock label="Deliverables" items={service.deliverables} />
          <DetailBlock label="Best fit" items={service.bestFitClients} />
        </div>
      </div>
    </article>
  );
}

function DetailBlock({
  label,
  items,
  accent = false,
}: {
  label: string;
  items: string[];
  accent?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-mono-label text-white/40">{label}</span>
      <ul className="flex flex-col gap-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm font-light text-white/80">
            <Icon
              icon={accent ? "solar:point-on-map-linear" : "solar:check-circle-linear"}
              className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${accent ? "text-accent" : "text-white/40"}`}
              aria-hidden
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
