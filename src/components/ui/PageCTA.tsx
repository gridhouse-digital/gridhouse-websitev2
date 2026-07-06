import CTAButton from "./CTAButton";
import GridRails from "./GridRails";

interface PageCTAProps {
  headline?: string;
  subtext?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}

export default function PageCTA({
  headline = "Ready to build something that works?",
  subtext = "Tell us about the operation. We'll come back with a structured scope and delivery plan within 24 hours.",
  primaryLabel = "Start a project",
  primaryTo = "/contact",
  secondaryLabel,
  secondaryTo,
}: PageCTAProps) {
  return (
    <section className="relative border-t border-white/10 bg-ink-deep overflow-hidden">
      <GridRails />
      <div className="relative max-w-rail mx-auto px-4 sm:px-6 md:px-12 py-14 sm:py-16 md:py-20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
        <div className="flex flex-col gap-3 max-w-2xl">
          <h2 className="font-display font-light text-white text-display-sm leading-tight">
            {headline}
          </h2>
          {subtext && (
            <p className="text-white/50 text-sm font-light">{subtext}</p>
          )}
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <CTAButton variant="primary" to={primaryTo} icon="solar:arrow-right-linear">
            {primaryLabel}
          </CTAButton>
          {secondaryLabel && secondaryTo && (
            <CTAButton variant="secondary" to={secondaryTo}>
              {secondaryLabel}
            </CTAButton>
          )}
        </div>
      </div>
    </section>
  );
}
