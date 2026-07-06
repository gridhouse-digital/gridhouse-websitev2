import { useEffect, useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import CaseStudyCard from "../components/ui/CaseStudyCard";
import PageCTA from "../components/ui/PageCTA";
import { CASE_STUDIES, type CaseStudy } from "../data/caseStudies";
import { sanityClient, caseStudiesQuery } from "../lib/sanity";

const CLIENT_KINDS = new Set(["Client System", "Private Engagement", "Prototype"]);
const RD_KINDS = new Set(["Internal Product", "In Development"]);

export default function WorkPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(CASE_STUDIES as CaseStudy[]);

  useEffect(() => {
    sanityClient
      .fetch<CaseStudy[]>(caseStudiesQuery)
      .then((data) => {
        if (data && data.length > 0) setCaseStudies(data);
      })
      .catch(() => {});
  }, []);

  const clientWork = caseStudies.filter((c) => CLIENT_KINDS.has(c.kind));
  const rdWork = caseStudies.filter((c) => RD_KINDS.has(c.kind));

  return (
    <>
      <PageHeader
        label="WORK / CASE STUDIES"
        title="Selected engagements and internal products."
        description="Client systems, prototypes, and private engagements — each showing the operating pattern: replace manual work with a designed system."
        meta={[
          { label: "Engagements", value: String(caseStudies.length).padStart(2, "0") },
          { label: "Client work", value: String(clientWork.length).padStart(2, "0") },
          { label: "Internal R&D", value: String(rdWork.length).padStart(2, "0") },
          { label: "Detail on request", value: "NDA" },
        ]}
      />
      <section className="px-4 sm:px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-rail mx-auto flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="text-mono-label text-accent">CLIENT WORK</span>
              <span className="text-mono-label text-white/30">/ {String(clientWork.length).padStart(2, "0")}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {clientWork.map((c) => (
                <CaseStudyCard key={c.id} caseStudy={c} />
              ))}
            </div>
          </div>
          {rdWork.length > 0 && (
            <div className="flex flex-col gap-6 pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <span className="text-mono-label text-white/40">INTERNAL R&amp;D</span>
                <span className="text-mono-label text-white/20">/ {String(rdWork.length).padStart(2, "0")}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rdWork.map((c) => (
                  <CaseStudyCard key={c.id} caseStudy={c} />
                ))}
              </div>
            </div>
          )}
          <p className="text-mono-label text-white/30">
            * CASE-LEVEL METRICS AND CLIENT DETAIL AVAILABLE UNDER NDA.
          </p>
        </div>
      </section>
      <PageCTA
        headline="See something that looks like your problem?"
        subtext="Most engagements start from a case study conversation. Tell us which one resonates and we'll scope the equivalent for your operation."
        primaryLabel="Discuss similar work"
        primaryTo="/contact"
        secondaryLabel="View our services"
        secondaryTo="/services"
      />
    </>
  );
}
