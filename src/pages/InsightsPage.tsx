import { useMemo, useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import InsightCard from "../components/ui/InsightCard";
import { INSIGHTS, INSIGHT_CATEGORIES } from "../data/insights";

export default function InsightsPage() {
  const [active, setActive] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!active) return INSIGHTS;
    return INSIGHTS.filter((i) => i.category === active);
  }, [active]);

  return (
    <>
      <PageHeader
        label="INSIGHTS / RESEARCH"
        title="Notes on AI, operations, and digital systems."
        description="Working notes, drafts, and research threads from the build queue. Most pieces are unfinished — published when they're useful, not before."
        meta={[
          { label: "Items", value: String(INSIGHTS.length).padStart(2, "0") },
          { label: "Categories", value: String(INSIGHT_CATEGORIES.length).padStart(2, "0") },
          { label: "Cadence", value: "Irregular" },
          { label: "Format", value: "Notes / drafts" },
        ]}
      />
      <section className="px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-12 border-b border-white/10">
        <div className="max-w-rail mx-auto flex flex-wrap gap-2">
          <FilterPill
            label="ALL"
            active={active === null}
            onClick={() => setActive(null)}
          />
          {INSIGHT_CATEGORIES.map((c) => (
            <FilterPill
              key={c}
              label={c}
              active={active === c}
              onClick={() => setActive(c)}
            />
          ))}
        </div>
      </section>
      <section className="px-4 sm:px-6 md:px-12 py-10 sm:py-12 md:py-16">
        <div className="max-w-rail mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((i) => (
            <InsightCard key={i.id} insight={i} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="max-w-rail mx-auto mt-8 text-white/50 text-sm font-light">
            No notes published in this category yet.
          </p>
        )}
      </section>
    </>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-mono-label px-3 py-2 sm:py-1.5 border transition-colors ${
        active
          ? "bg-accent text-white border-accent"
          : "border-white/15 text-white/60 hover:text-white hover:border-white/40"
      }`}
    >
      {label}
    </button>
  );
}
