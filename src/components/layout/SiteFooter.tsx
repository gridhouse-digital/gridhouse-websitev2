import { Link } from "react-router-dom";

const PLATFORM_LINKS = [
  { label: "Compliance", to: "/products/compliance-training" },
  { label: "Capabilities", to: "/services" },
  { label: "Products", to: "/products" },
  { label: "Work", to: "/work" },
];

const SYSTEMS_LINKS = [
  { label: "Industries", to: "/industries" },
  { label: "Process", to: "/process" },
  { label: "Insights", to: "/insights" },
  { label: "Company", to: "/about" },
];

const CONNECT_LINKS = [
  { label: "Contact", to: "/contact" },
  { label: "hello@gridhouse.digital", href: "mailto:hello@gridhouse.digital" },
];

export default function SiteFooter() {
  return (
    <footer className="theme-fixed-dark border-t border-white/10 bg-ink-deep px-4 sm:px-6 md:px-12 py-12 md:py-16">
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
          <p className="text-white/60 text-sm font-normal max-w-md">
            AI-native operational systems for regulated and workflow-heavy
            businesses — digital products, automation, and intelligent agents
            designed around the work.
          </p>
          <span className="text-mono-label text-white/55">CANADA / REMOTE — WORLDWIDE</span>
          <a
            href="https://www.jotform.com/partnership/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block rounded-xl transition-opacity duration-300 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <img
              src="/jotform-partner-badge.png"
              alt="Jotform Partner"
              width={342}
              height={222}
              className="h-16 md:h-20 w-auto"
              draggable={false}
            />
          </a>
        </div>
        <FooterColumn title="Platform" items={PLATFORM_LINKS} />
        <FooterColumn title="Systems" items={SYSTEMS_LINKS} />
        <FooterColumn title="Connect" items={CONNECT_LINKS} />
      </div>
      <div className="max-w-rail mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4">
        <span className="text-mono-label text-white/55">
          © 2026 GRIDHOUSE DIGITAL. ALL RIGHTS RESERVED.
        </span>
        <span className="text-mono-label text-white/55">
          DESIGNED AND ENGINEERED BY GRIDHOUSE
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
      <ul className="flex flex-col gap-0.5">
        {items.map((item) => (
          <li key={item.label}>
            {item.to ? (
              <Link
                to={item.to}
                className="inline-block py-2.5 text-sm font-normal text-white/70 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <a
                href={item.href}
                className="inline-block py-2.5 text-sm font-normal text-white/70 hover:text-white transition-colors"
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
