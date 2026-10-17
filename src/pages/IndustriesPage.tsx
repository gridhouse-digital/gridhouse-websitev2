import { useEffect, useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import IndustryPanel from "../components/ui/IndustryPanel";
import PageCTA from "../components/ui/PageCTA";
import { INDUSTRIES, type Industry } from "../data/industries";
import { normalizeIndustryCopy } from "../data/naming";
import { sanityClient, industriesQuery } from "../lib/sanity";

export default function IndustriesPage() {
  const [industries, setIndustries] = useState<Industry[]>(INDUSTRIES as Industry[]);

  useEffect(() => {
    sanityClient
      .fetch<Industry[]>(industriesQuery)
      .then((data) => {
        if (data && data.length > 0) setIndustries(data.map(normalizeIndustryCopy));
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <PageHeader
        label="SECTOR FOCUS / 01"
        title="Five industries. One operating pattern."
        description="The pattern is consistent across sectors — replace manual workflows with designed systems. Healthcare is our deepest engagement; the others follow the same operational logic."
      />
      <section className="px-4 sm:px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-rail mx-auto flex flex-col gap-6">
          {industries.map((i) => (
            <IndustryPanel key={i.id} industry={i} />
          ))}
        </div>
      </section>
      <PageCTA
        headline="Operating in one of these sectors?"
        subtext="We scope engagements around the workflows operators actually run — not generic software. Tell us about your operation and we'll respond within 24 hours."
        primaryLabel="Start a project"
        primaryTo="/contact"
        secondaryLabel="View our work"
        secondaryTo="/work"
      />
    </>
  );
}
