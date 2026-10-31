import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import type { Product } from "../../data/products";
import StatusBadge from "./StatusBadge";
import TerminalLabel from "./TerminalLabel";

interface Props {
  product: Product;
  cta?: { label: string; to: string };
}

const LIFECYCLE_VARIANT: Record<Product["lifecycle"], "active" | "muted" | "accent"> = {
  Production: "active",
  Beta: "accent",
  Development: "muted",
};

export default function ProductSystemPanel({ product, cta }: Props) {
  return (
    <article className="glass-surface glow-surface border border-accent/[0.15] bg-gradient-to-br from-accent/[0.06] to-transparent transition-all duration-400 hover:border-accent/[0.35] hover:shadow-glow-accent-subtle">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-3">
        <div className="flex items-center gap-3">
          <TerminalLabel variant="accent">SYSTEM / {product.id}</TerminalLabel>
          {product.code ? (
            <span className="text-mono-label text-white/55">[{product.code}]</span>
          ) : null}
        </div>
        <StatusBadge label={product.status} variant={LIFECYCLE_VARIANT[product.lifecycle]} />
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
        <div className="bg-ink p-5 sm:p-6 md:p-8 flex flex-col gap-4">
          <h3 className="text-white text-display-sm font-display font-light leading-tight">
            {product.name}
          </h3>
          {product.tagline ? (
            <p className="text-sm font-normal text-white/60">{product.tagline}</p>
          ) : null}
          <p className="text-white/50 text-body-md font-normal">
            {product.description}
          </p>
          <dl className={`mt-2 grid gap-4 border-t border-white/10 pt-4 ${product.code ? "grid-cols-2" : "grid-cols-1"}`}>
            <div>
              <dt className="text-mono-label text-white/55">Lifecycle</dt>
              <dd className="text-white text-sm font-normal">{product.lifecycle}</dd>
            </div>
            {product.code ? (
              <div>
                <dt className="text-mono-label text-white/55">Code</dt>
                <dd className="text-white text-sm font-normal">{product.code}</dd>
              </div>
            ) : null}
          </dl>
        </div>
        <div className="bg-ink p-5 sm:p-6 md:p-8 flex flex-col gap-6">
          <div>
            <span className="text-mono-label text-accent">Capabilities</span>
            <ul className="mt-3 flex flex-col gap-2">
              {product.capabilities.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-2 text-sm text-white/80 font-light"
                >
                  <Icon
                    icon="solar:check-circle-linear"
                    className="w-3.5 h-3.5 mt-0.5 text-accent shrink-0"
                    aria-hidden
                  />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="text-mono-label text-white/55">Integrations</span>
            <ul className="mt-3 flex flex-wrap gap-2">
              {product.integrations.map((i) => (
                <li
                  key={i}
                  className="text-mono-label text-white/70 border border-white/15 px-2 py-1"
                >
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {cta && (
        <div className="border-t border-white/10 px-6 py-4 flex items-center justify-between">
          <span className="text-mono-label text-white/55">INTERESTED?</span>
          <Link
            to={cta.to}
            className="text-mono-label text-accent hover:text-accent/80 inline-flex items-center gap-1.5 transition-colors py-2 -my-2"
          >
            {cta.label}
            <Icon icon="solar:arrow-right-linear" className="w-3 h-3" aria-hidden />
          </Link>
        </div>
      )}
    </article>
  );
}
