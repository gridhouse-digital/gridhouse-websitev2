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
  return (
    <article className="group flex flex-col gap-4 p-6 border border-white/10 bg-white/[0.02] hover:border-accent/30 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-mono-label text-accent">{insight.category}</span>
        <span className={`text-mono-label ${STATUS_COLORS[insight.status]}`}>
          {insight.status.toUpperCase()}
        </span>
      </div>
      <h3 className="text-white text-lg font-display font-light leading-snug">
        {insight.title}
      </h3>
      <p className="text-white/60 text-sm font-light flex-1">{insight.excerpt}</p>
      <div className="flex items-center justify-between border-t border-white/10 pt-3">
        <span className="text-mono-label text-white/40">{insight.readTime} read</span>
        <Icon
          icon="solar:arrow-right-linear"
          className="w-4 h-4 text-white/40 group-hover:text-accent transition-colors"
          aria-hidden
        />
      </div>
    </article>
  );
}
