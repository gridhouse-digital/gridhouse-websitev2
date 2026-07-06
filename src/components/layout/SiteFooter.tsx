import { Link } from "react-router-dom";

const PLATFORM_LINKS = [
  { label: "Services", to: "/services" },
  { label: "Products", to: "/products" },
  { label: "Process", to: "/process" },
  { label: "Work", to: "/work" },
];

const SYSTEMS_LINKS = [
  { label: "Industries", to: "/industries" },
  { label: "Insights", to: "/insights" },
  { label: "About", to: "/about" },
];

const CONNECT_LINKS = [
  { label: "Contact", to: "/contact" },
  { label: "hello@gridhouse.digital", href: "mailto:hello@gridhouse.digital" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink-deep px-4 sm:px-6 md:px-12 py-12 md:py-16">
      <div className="max-w-rail mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
        <div className="md:col-span-5 flex flex-col items-start gap-4">
          <img
            src="/gridhouse-logo.svg"
            alt="Gridhouse Digital"
            width={2400}
            height={720}
            className="gh-logo-dark h-10 md:h-14 lg:h-16 w-auto max-w-none block"
            draggable={false}
          />
          <img
            src="/gridhouse-logo-light.svg"
            alt="Gridhouse Digital"
            width={2400}
            height={720}
            className="gh-logo-light h-10 md:h-14 lg:h-16 w-auto max-w-none"
            draggable={false}
          />
          <p className="text-white/60 text-sm font-light max-w-md">
            Engineering AI-first digital systems for operators. Websites, portals,
            automation, AI agents, and operational platforms — built to scale.
          </p>
          <span className="text-mono-label text-white/40">CANADA / REMOTE — WORLDWIDE</span>
        </div>
        <FooterColumn title="Platform" items={PLATFORM_LINKS} />
        <FooterColumn title="Systems" items={SYSTEMS_LINKS} />
        <FooterColumn title="Connect" items={CONNECT_LINKS} />
      </div>
      <div className="max-w-rail mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4">
        <span className="text-mono-label text-white/40">
          © 2026 GRIDHOUSE DIGITAL. ALL RIGHTS RESERVED.
        </span>
        <span className="text-mono-label text-white/40">
          BUILT WITH AETHER SYSTEM TERMINAL
        </span>
      </div>
    </footer>
  );
}

interface ColumnLink {
  label: string;
  to?: string;
  href?: string;
}

function FooterColumn({ title, items }: { title: string; items: ColumnLink[] }) {
  return (
    <div className="md:col-span-2 flex flex-col gap-3">
      <span className="text-mono-label text-accent">{title}</span>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.label}>
            {item.to ? (
              <Link
                to={item.to}
                className="text-sm font-light text-white/70 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <a
                href={item.href}
                className="text-sm font-light text-white/70 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
