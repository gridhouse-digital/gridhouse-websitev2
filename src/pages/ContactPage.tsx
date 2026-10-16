import PageHeader from "../components/ui/PageHeader";
import ContactFormPanel from "../components/ui/ContactFormPanel";
import StatusBadge from "../components/ui/StatusBadge";
import TerminalLabel from "../components/ui/TerminalLabel";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="CONTACT / INTAKE"
        title="Start a project request."
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
              <p className="text-white/70 text-sm font-normal">
                We onboard a small number of new engagements per quarter so each
                client gets a real system, not a queued ticket.
              </p>
              <dl className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                <div>
                  <dt className="text-mono-label text-white/55">Response</dt>
                  <dd className="text-white text-sm font-normal">Within 24h</dd>
                </div>
                <div>
                  <dt className="text-mono-label text-white/55">Location</dt>
                  <dd className="text-white text-sm font-normal">Canada / Remote</dd>
                </div>
              </dl>
            </article>
            <article className="bg-accent text-ink p-6 flex flex-col gap-3">
              <span className="text-mono-label">DIRECT CHANNEL</span>
              <h3 className="text-display-sm font-display font-light leading-tight">
                Skip the form. Email the founder.
              </h3>
              <a
                href="mailto:hello@gridhouse.digital"
                className="text-ink text-base font-normal underline underline-offset-4 decoration-ink/40 hover:decoration-ink py-2 -my-2"
              >
                hello@gridhouse.digital
              </a>
            </article>
            <article className="border border-white/10 bg-white/[0.02] p-6 flex flex-col gap-3">
              <TerminalLabel variant="accent">WHAT HAPPENS NEXT</TerminalLabel>
              <ol className="flex flex-col gap-4">
                {[
                  ["01", "Review within one business day"],
                  ["02", "Workflow-fit conversation"],
                  ["03", "Structured scope and next step"],
                ].map(([number, step]) => (
                  <li key={number} className="flex items-start gap-3 text-sm font-normal text-white/70">
                    <span className="text-mono-label text-accent">{number}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </article>
          </aside>
        </div>
      </section>
    </>
  );
}
