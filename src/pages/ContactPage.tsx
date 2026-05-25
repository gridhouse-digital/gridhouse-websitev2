import PageHeader from "../components/ui/PageHeader";
import ContactFormPanel from "../components/ui/ContactFormPanel";
import StatusBadge from "../components/ui/StatusBadge";
import TerminalLabel from "../components/ui/TerminalLabel";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="CONTACT / INTAKE"
        title="Initialize a project request."
        description="Tell us about the operation. We'll come back with a structured scope and a delivery plan within 24 hours."
        meta={[
          { label: "Channel", value: "hello@gridhouse.digital" },
          { label: "Location", value: "Canada / Remote" },
          { label: "Response", value: "Within 24h" },
          { label: "Availability", value: "Selected projects" },
        ]}
      />
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-rail mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ContactFormPanel />
          </div>
          <aside className="flex flex-col gap-6">
            <article className="border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-4">
              <TerminalLabel variant="accent">AVAILABILITY</TerminalLabel>
              <StatusBadge label="Accepting selected projects" variant="active" />
              <p className="text-white/70 text-sm font-light">
                We onboard a small number of new engagements per quarter so each
                client gets a real system, not a queued ticket.
              </p>
              <dl className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                <div>
                  <dt className="text-mono-label text-white/40">Response</dt>
                  <dd className="text-white text-sm font-light">Within 24h</dd>
                </div>
                <div>
                  <dt className="text-mono-label text-white/40">Location</dt>
                  <dd className="text-white text-sm font-light">Canada / Remote</dd>
                </div>
              </dl>
            </article>
            <article className="bg-accent text-white p-6 flex flex-col gap-3">
              <span className="text-mono-label">DIRECT CHANNEL</span>
              <h3 className="text-display-sm font-display font-light leading-tight">
                Skip the form. Email the founder.
              </h3>
              <a
                href="mailto:hello@gridhouse.digital"
                className="text-white text-base font-light underline underline-offset-4 decoration-white/40 hover:decoration-white"
              >
                hello@gridhouse.digital
              </a>
            </article>
            <article className="border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-3">
              <TerminalLabel variant="accent">EXPECTED FIT</TerminalLabel>
              <p className="text-white/70 text-sm font-light">
                Healthcare agencies, ops-heavy SMBs, professional services, and
                AI-first operators tend to be the strongest fit.
              </p>
            </article>
          </aside>
        </div>
      </section>
    </>
  );
}
