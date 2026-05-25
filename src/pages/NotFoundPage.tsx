import CTAButton from "../components/ui/CTAButton";
import TerminalLabel from "../components/ui/TerminalLabel";

export default function NotFoundPage() {
  return (
    <section className="px-6 md:px-12 py-32 min-h-[60vh] flex items-center">
      <div className="max-w-rail mx-auto flex flex-col gap-6">
        <TerminalLabel variant="accent">SYSTEM / 404</TerminalLabel>
        <h1 className="text-white text-display-md font-display font-light leading-tight max-w-2xl">
          That route is offline.
        </h1>
        <p className="text-white/60 text-body-md font-light max-w-xl">
          The page you requested isn't part of the current system. Head back to
          the home grid or browse the modules.
        </p>
        <div className="flex gap-4">
          <CTAButton variant="primary" to="/" icon="solar:arrow-right-linear">
            Return home
          </CTAButton>
          <CTAButton variant="secondary" to="/services">
            View services
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
