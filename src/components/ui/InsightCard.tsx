import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import type { Insight } from "../../data/insights";

interface Props {
  insight: Insight;
}

const STATUS_COLORS: Record<Insight["status"], string> = {
  Published: "text-emerald-400",
  Draft: "text-accent",
  Research: "text-white/40",
};

export default function InsightCard({ insight }: Props) {
  const inner = (
    <>
      <div className="flex items-center justify-between">
        <span className="text-mono-label text-accent">{insight.category}</span>
        <span className={`text-mono-label ${STATUS_COLORS[insight.status]}`}>
          {insight.status.toUpperCase()}
        </span>
      </div>
      <h3 className="text-white text-lg font-display font-light leading-snug">
        {insight.title}
      </h3>
      <p className="text-white/50 text-sm font-light flex-1">{insight.excerpt}</p>
      <div className="flex items-center justify-between border-t border-white/10 pt-3">
        <span className="text-mono-label text-white/40">{insight.readTime ? `${insight.readTime} read` : insight.category}</span>
        <Icon
          icon="solar:arrow-right-linear"
          className="w-4 h-4 text-white/40 group-hover:text-accent transition-colors"
          aria-hidden
        />
      </div>
    </>
  );

  const className =
    "glow-surface group flex flex-col gap-4 p-6 border border-accent/[0.15] bg-white/[0.02] bg-gradient-to-br from-accent/[0.06] to-transparent transition-all duration-400 hover:border-accent/[0.4] hover:shadow-glow-accent-subtle";

  if (insight.slug) {
    return (
      <Link to={`/insights/${insight.slug}`} className={className}>
        {inner}
      </Link>
    );
  }

  return <article className={className}>{inner}</article>;
}
