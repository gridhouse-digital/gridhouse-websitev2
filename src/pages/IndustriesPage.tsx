import PageHeader from "../components/ui/PageHeader";
import IndustryPanel from "../components/ui/IndustryPanel";
import { INDUSTRIES } from "../data/industries";

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        label="SECTOR FOCUS / 01"
        title="Five industries. One operating pattern."
        description="The pattern is consistent across sectors — replace manual workflows with designed systems. Healthcare is our deepest engagement; the others follow the same operational logic."
      />
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-rail mx-auto flex flex-col gap-6">
          {INDUSTRIES.map((i) => (
            <IndustryPanel key={i.id} industry={i} />
          ))}
        </div>
      </section>
    </>
  );
}
