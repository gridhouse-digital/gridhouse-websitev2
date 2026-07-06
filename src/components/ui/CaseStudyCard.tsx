import { useRef } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import type { CaseStudy } from "../../data/caseStudies";
import StatusBadge from "./StatusBadge";
import { useMagneticTilt } from "../../hooks/useMagneticTilt";
import { urlFor } from "../../lib/sanity";
import type { SanityImageSource } from "@sanity/image-url";

interface Props {
  caseStudy: CaseStudy;
}

export default function CaseStudyCard({ caseStudy }: Props) {
  const ref = useRef<HTMLElement>(null);
  useMagneticTilt(ref);

  const className =
    "glow-surface magnetic-card group flex flex-col border border-accent/[0.15] bg-white/[0.02] bg-gradient-to-br from-accent/[0.06] to-transparent backdrop-blur-sm transition-all duration-400 hover:border-accent/[0.4] hover:shadow-glow-accent-subtle";

  const inner = (
    <>
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-ink-deep">
        <span className="text-mono-label text-accent">{caseStudy.kind.toUpperCase()}</span>
        <span className="text-mono-label text-white/40">/ {caseStudy.id}</span>
      </div>
      <div className="aspect-video bg-ink-deep bg-tech-grid relative flex items-center justify-center border-b border-white/10 overflow-hidden">
        {caseStudy.coverImage ? (
          <img
            src={urlFor(caseStudy.coverImage as SanityImageSource).width(800).height(450).fit("crop").auto("format").url()}
            alt={caseStudy.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <Icon
            icon="solar:code-square-linear"
            className="w-12 h-12 text-white/15"
            aria-hidden
          />
        )}
      </div>
      <div className="p-6 flex flex-col gap-4 flex-1">
        {caseStudy.clientLabel && (
          <span className="text-mono-label text-white/30">{caseStudy.clientLabel.toUpperCase()}</span>
        )}
        <h3 className="text-white text-lg font-display font-light leading-snug">
          {caseStudy.title}
        </h3>
        <p className="text-white/50 text-sm font-light">{caseStudy.problem}</p>
        {caseStudy.outcomes && caseStudy.outcomes.length > 0 ? (
          <ul className="flex flex-col gap-1.5">
            {caseStudy.outcomes.map((o) => (
              <li key={o} className="flex items-start gap-2 text-sm font-light text-white/65">
                <Icon icon="solar:check-circle-linear" className="w-3.5 h-3.5 mt-0.5 text-accent shrink-0" aria-hidden />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-white/50 text-sm font-light border-l border-accent/40 pl-3">
            {caseStudy.solution}
          </p>
        )}
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
              icon={caseStudy.slug ? "solar:arrow-right-linear" : "solar:arrow-right-up-linear"}
              className="w-4 h-4 text-white/40 group-hover:text-accent transition-colors"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </>
  );

  if (caseStudy.slug) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <Link to={`/work/${caseStudy.slug}`} ref={ref as any} className={className}>
        {inner}
      </Link>
    );
  }

  return (
    <article ref={ref} className={className}>
      {inner}
    </article>
  );
}
