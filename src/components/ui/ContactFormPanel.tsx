import { useState, type FormEvent } from "react";
import CTAButton from "./CTAButton";
import TerminalLabel from "./TerminalLabel";

const SERVICE_OPTIONS = [
  "AI-First Website Design & Development",
  "Web Apps & Client Portals",
  "Workflow Automation",
  "AI Agents & Intelligent Assistants",
  "Healthcare Compliance / Training Platforms",
  "UX, Product Strategy & Design Systems",
  "Cloud, DevOps & Platform Setup",
  "AI Video / Course Production",
];

const BUDGET_OPTIONS = [
  "Under $10k",
  "$10k – $25k",
  "$25k – $75k",
  "$75k – $150k",
  "$150k+",
];

const TIMELINE_OPTIONS = [
  "Ready now",
  "1–2 months",
  "3–6 months",
  "6+ months",
  "Exploratory",
];

type Status = "idle" | "submitting" | "success" | "error";

const ENDPOINT =
  (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined) ?? "/api/contact";

export default function ContactFormPanel() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Endpoint responded ${res.status}`);
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Submission failed — see CONTACT_INTEGRATION.md to wire up the endpoint.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="border border-emerald-500/30 bg-emerald-500/5 p-10 flex flex-col gap-4">
        <TerminalLabel variant="accent">REQUEST RECEIVED</TerminalLabel>
        <h3 className="text-white text-display-sm font-display font-light">
          Intake confirmed.
        </h3>
        <p className="text-white/70 text-body-md font-light">
          Thanks — we'll respond within 24 hours from{" "}
          <span className="text-accent">hello@gridhouse.digital</span>.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-mono-label text-white/60 hover:text-white self-start"
        >
          Submit another →
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-white/10 bg-white/[0.02] p-6 md:p-10 flex flex-col gap-6"
      noValidate
    >
      <header className="flex items-center justify-between">
        <TerminalLabel variant="accent">INITIALIZE_REQUEST</TerminalLabel>
        <span className="text-mono-label text-white/40">FORM / 01</span>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field name="name" label="Name" required>
          <input name="name" required className="field-input" autoComplete="name" />
        </Field>
        <Field name="email" label="Email" required>
          <input
            name="email"
            type="email"
            required
            className="field-input"
            autoComplete="email"
          />
        </Field>
        <Field name="company" label="Company">
          <input name="company" className="field-input" autoComplete="organization" />
        </Field>
        <Field name="website" label="Website">
          <input name="website" type="url" className="field-input" placeholder="https://" />
        </Field>
        <Field name="service" label="Service interest">
          <select name="service" className="field-input" defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field name="budget" label="Budget range">
          <select name="budget" className="field-input" defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            {BUDGET_OPTIONS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
        <Field name="timeline" label="Timeline" className="md:col-span-2">
          <select name="timeline" className="field-input" defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            {TIMELINE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field name="description" label="Project description" required>
        <textarea
          name="description"
          required
          rows={5}
          className="field-input resize-y"
          placeholder="Tell us about the system you need to build…"
        />
      </Field>

      {status === "error" && (
        <div className="border border-accent/40 bg-accent/5 px-4 py-3 text-mono-label text-accent">
          {errorMsg}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-white/10 pt-6">
        <span className="text-mono-label text-white/40">
          POST → {ENDPOINT}
        </span>
        <CTAButton
          type="submit"
          variant="primary"
          icon="solar:arrow-right-linear"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Transmitting…" : "Initialize"}
        </CTAButton>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  required,
  className = "",
  children,
}: {
  name: string;
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label htmlFor={name} className="field-label">
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
