import { Icon } from "@iconify/react";
import type { Product } from "../../data/products";
import StatusBadge from "./StatusBadge";
import TerminalLabel from "./TerminalLabel";

interface Props {
  product: Product;
}

const LIFECYCLE_VARIANT: Record<Product["lifecycle"], "active" | "muted" | "accent"> = {
  Production: "active",
  Beta: "accent",
  Development: "muted",
};

export default function ProductSystemPanel({ product }: Props) {
  return (
    <article className="border border-white/10 bg-white/[0.02] backdrop-blur-sm">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-3">
        <div className="flex items-center gap-3">
          <TerminalLabel variant="accent">SYSTEM / {product.id}</TerminalLabel>
          <span className="text-mono-label text-white/40">[{product.code}]</span>
        </div>
        <StatusBadge label={product.status} variant={LIFECYCLE_VARIANT[product.lifecycle]} />
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5">
        <div className="bg-ink p-8 flex flex-col gap-4">
          <h3 className="text-white text-display-sm font-display font-light leading-tight">
            {product.name}
          </h3>
          <p className="text-white/70 text-body-md font-light">
            {product.description}
          </p>
          <dl className="grid grid-cols-2 gap-4 mt-2 border-t border-white/10 pt-4">
            <div>
              <dt className="text-mono-label text-white/40">Lifecycle</dt>
              <dd className="text-white text-sm font-light">{product.lifecycle}</dd>
            </div>
            <div>
              <dt className="text-mono-label text-white/40">Code</dt>
              <dd className="text-white text-sm font-light">{product.code}</dd>
            </div>
          </dl>
        </div>
        <div className="bg-ink p-8 flex flex-col gap-6">
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
            <span className="text-mono-label text-white/40">Integrations</span>
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
    </article>
  );
}
