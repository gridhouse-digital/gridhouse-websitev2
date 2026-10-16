import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import ShellCornerMarkers from '../ui/ShellCornerMarkers'
import { SERVICES } from '../../data/services'
import { PRODUCTS } from '../../data/products'

const CAPABILITIES = SERVICES.slice(0, 4).map((s) => ({
  id: s.id,
  title: s.title.replace(/^AI-First /, ''),
  href: '/services',
}))

const PRODUCT_ITEMS = PRODUCTS.slice(0, 4).map((p) => ({
  id: p.id,
  code: p.code,
  name: p.name,
  lifecycle: p.lifecycle,
  href: p.href ?? '/products',
}))

interface Props {
  className?: string
}

export default function HeroOfferingsCompose({ className = '' }: Props) {
  return (
    <div
      className={`relative overflow-hidden border border-white/10 bg-ink-deep shadow-2xl shadow-black/20 ${className}`}
      role="img"
      aria-label="Capabilities and products composed into one operating system"
    >
      <div className="relative" aria-hidden="true">
        <ShellCornerMarkers />
        <div className="absolute inset-0 bg-tech-grid-32 opacity-40" />
        <div className="absolute -left-20 top-0 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="text-mono-label text-white/55">Capabilities × Products</span>
          </div>
          <span className="text-mono-label text-white/55">Compose the stack</span>
        </div>

        <div className="relative p-4 sm:p-5">
          <p className="text-mono-label text-accent">One operating partner</p>
          <h3 className="mt-2 max-w-lg font-display text-xl font-light leading-tight text-white sm:text-2xl">
            Services that build systems. Products that keep them running.
          </h3>

          <div className="mt-6 grid gap-px bg-white/10 lg:grid-cols-2">
            <section className="bg-ink-deep p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-mono-label text-white/55">Capabilities</span>
                <Link
                  to="/services"
                  className="text-mono-label text-white/55 transition-colors hover:text-accent"
                >
                  View all
                </Link>
              </div>
              <ul className="flex flex-col gap-2">
                {CAPABILITIES.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.href}
                      className="group flex items-start gap-3 border border-white/10 bg-white/[0.02] px-3 py-3 transition-colors hover:border-accent/30 hover:bg-accent/[0.04]"
                    >
                      <span className="text-mono-label text-accent">/{item.id}</span>
                      <span className="flex-1 text-sm font-normal leading-snug text-white/80 group-hover:text-white">
                        {item.title}
                      </span>
                      <Icon
                        icon="solar:arrow-right-linear"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/20 group-hover:text-accent"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-ink p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-mono-label text-white/55">Products</span>
                <Link
                  to="/products"
                  className="text-mono-label text-white/55 transition-colors hover:text-accent"
                >
                  View all
                </Link>
              </div>
              <ul className="flex flex-col gap-2">
                {PRODUCT_ITEMS.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={item.href}
                      className="group flex items-start gap-3 border border-white/10 bg-white/[0.02] px-3 py-3 transition-colors hover:border-accent/30 hover:bg-accent/[0.04]"
                    >
                      {item.code ? (
                        <span className="shrink-0 border border-accent/25 bg-accent/[0.08] px-1.5 py-0.5 text-mono-label text-accent">
                          {item.code}
                        </span>
                      ) : null}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-normal text-white/80 group-hover:text-white">
                          {item.name}
                        </span>
                        <span className="mt-0.5 block text-mono-label text-white/55">
                          {item.lifecycle}
                        </span>
                      </span>
                      <Icon
                        icon="solar:arrow-right-linear"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/20 group-hover:text-accent"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border border-white/10 bg-white/[0.02] px-4 py-3">
            <p className="text-xs font-normal text-white/60">
              Start with one bottleneck — or compose product + automation + agents.
            </p>
            <div className="flex items-center gap-3">
              <Link
                to="/services"
                className="text-mono-label text-white/55 transition-colors hover:text-accent"
              >
                Capabilities
              </Link>
              <span className="text-white/20">/</span>
              <Link
                to="/products"
                className="text-mono-label text-white/55 transition-colors hover:text-accent"
              >
                Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
