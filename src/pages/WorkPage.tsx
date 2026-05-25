import PageHeader from "../components/ui/PageHeader";
import CaseStudyCard from "../components/ui/CaseStudyCard";
import { CASE_STUDIES } from "../data/caseStudies";

export default function WorkPage() {
  return (
    <>
      <PageHeader
        label="WORK / CASE STUDIES"
        title="Selected engagements and internal products."
        description="A mix of internal product, client systems, prototypes, and private engagements — picked to show the operating pattern across sectors and stacks."
        meta={[
          { label: "Engagements", value: "06" },
          { label: "Internal products", value: "02" },
          { label: "Client systems", value: "01" },
          { label: "Prototypes", value: "02" },
        ]}
      />
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-rail mx-auto flex flex-col gap-6">
          <p className="text-mono-label text-white/40 max-w-2xl">
            * STATUS INDICATORS REFLECT ENGAGEMENT STATE. METRICS SHOWN
            ELSEWHERE ARE TARGETS, NOT ACTUALS — ASK FOR CASE-LEVEL DETAIL UNDER NDA.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CASE_STUDIES.map((c) => (
              <CaseStudyCard key={c.id} caseStudy={c} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
