import PageHeader from "../components/ui/PageHeader";
import ServiceCard from "../components/ui/ServiceCard";
import { SERVICES } from "../data/services";

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        label="CAPABILITIES / INVENTORY"
        title="Services. Eight modules, one operating system."
        description="Each service is a working module of the Gridhouse operating system. Compose one or all eight — websites, portals, automation, agents, infrastructure, training."
        meta={[
          { label: "Active modules", value: "08" },
          { label: "Archived", value: "00" },
          { label: "Lead engineer", value: "On rotation" },
          { label: "Intake", value: "24h" },
        ]}
      />
      <section className="px-6 md:px-12 py-12">
        <div className="max-w-rail mx-auto">
          <header className="grid grid-cols-12 gap-8 pb-4 mb-2 border-b border-white/20">
            <span className="col-span-3 text-mono-label text-white/40">Module</span>
            <span className="col-span-5 text-mono-label text-white/40">Description</span>
            <span className="col-span-4 text-mono-label text-white/40">Spec</span>
          </header>
          {SERVICES.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>
    </>
  );
}
