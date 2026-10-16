import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import PageHeader from "../components/ui/PageHeader";
import ServiceCard from "../components/ui/ServiceCard";
import PageCTA from "../components/ui/PageCTA";
import { SERVICES, type Service } from "../data/services";
import { sanityClient, servicesQuery } from "../lib/sanity";

const STARTER_PACKAGES = [
  {
    label: "Compliance Modernisation",
    description: "Replace credential spreadsheets and ad-hoc training with an auditable LMS + workflow layer.",
    modules: ["05", "03"],
    moduleCodes: ["CPT", "AUTO"],
    icon: "solar:shield-check-linear",
  },
  {
    label: "Portal + Automation",
    description: "A client or staff portal with auth, roles, and the automation pipelines connecting it to your ops.",
    modules: ["02", "03"],
    moduleCodes: ["PORTAL", "AUTO"],
    icon: "solar:widget-linear",
  },
  {
    label: "AI Triage Pilot",
    description: "A retrieval-augmented agent handling tier-1 support questions, triaging tickets, and escalating the rest.",
    modules: ["04", "03"],
    moduleCodes: ["AGT", "AUTO"],
    icon: "solar:cpu-bolt-linear",
  },
] as const;

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>(SERVICES as Service[]);

  useEffect(() => {
    sanityClient
      .fetch<Service[]>(servicesQuery)
      .then((data) => {
        if (data && data.length > 0) setServices(data);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <PageHeader
        label="CAPABILITIES"
        title="Product, automation, and AI capabilities."
        description="Start with one operational bottleneck or compose the full system — websites, portals, workflow automation, intelligent agents, infrastructure, and training platforms."
        meta={[
          { label: "Active modules", value: "08" },
          { label: "Primary focus", value: "Operational systems" },
          { label: "Sector depth", value: "Healthcare" },
          { label: "Delivery", value: "Remote / Worldwide" },
        ]}
      />

      {/* Where to start */}
      <section className="px-4 sm:px-6 md:px-12 py-10 border-b border-white/10 bg-white/[0.01]">
        <div className="max-w-rail mx-auto flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="text-mono-label text-white/55">WHERE TO START /</span>
            <span className="text-mono-label text-accent">THREE COMMON ENTRY POINTS</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
            {STARTER_PACKAGES.map((pkg, i) => (
              <Link
                key={pkg.label}
                to="/contact"
                className="group bg-ink p-6 flex flex-col gap-4 hover:bg-white/[0.03] transition-colors relative overflow-hidden"
              >
                <span
                  aria-hidden
                  className="font-display font-light text-display-numeral text-white/[0.06] absolute top-3 right-5 select-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon icon={pkg.icon} className="w-7 h-7 text-accent" aria-hidden />
                <h3 className="text-white text-base font-display font-light leading-snug">
                  {pkg.label}
                </h3>
                <p className="text-white/50 text-sm font-normal flex-1">{pkg.description}</p>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                  {pkg.moduleCodes.map((code) => (
                    <span key={code} className="text-mono-label text-accent border border-accent/20 px-2 py-0.5">
                      {code}
                    </span>
                  ))}
                </div>
                <span className="text-mono-label text-accent group-hover:text-accent inline-flex items-center gap-1.5 transition-colors border-b border-accent/0 group-hover:border-accent/40 pb-px w-fit">
                  Scope this package
                  <Icon icon="solar:arrow-right-linear" className="w-3 h-3" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 md:px-12 py-12">
        <div className="max-w-rail mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-mono-label text-white/55">FULL MODULE INVENTORY</span>
            <span className="flex-1 h-px bg-accent/20" />
            <span className="text-mono-label text-accent">08 ACTIVE</span>
          </div>
          <header className="grid grid-cols-12 gap-8 pb-4 mb-2 border-b border-white/20">
            <span className="col-span-3 text-mono-label text-white/55">Module</span>
            <span className="col-span-5 text-mono-label text-white/55">Description</span>
            <span className="col-span-4 text-mono-label text-white/55">Details</span>
          </header>
          <div className="flex flex-col gap-4">
            {services.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>
      <PageCTA
        headline="Not sure which modules you need?"
        subtext="Tell us about your operation and the problems you're trying to solve. We'll identify the right combination and scope it within 24 hours."
        primaryLabel="Start a project"
        primaryTo="/contact"
        secondaryLabel="See our process"
        secondaryTo="/process"
      />
    </>
  );
}
