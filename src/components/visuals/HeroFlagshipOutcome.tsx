import { Link } from 'react-router-dom'
import { Icon } from '@iconify/react'
import ShellCornerMarkers from '../ui/ShellCornerMarkers'
import { CASE_STUDIES } from '../../data/caseStudies'

const FLAGSHIP =
  CASE_STUDIES.find((c) => c.featured) ?? CASE_STUDIES[0]

interface Props {
  className?: string
}

export default function HeroFlagshipOutcome({ className = '' }: Props) {
  const outcomes = FLAGSHIP.outcomes?.slice(0, 3) ?? []
  const stages = FLAGSHIP.systemStages?.slice(0, 4) ?? []
  const href = FLAGSHIP.slug ? `/work/${FLAGSHIP.slug}` : '/work'

  return (
    <div
      className={`relative overflow-hidden border border-white/10 bg-ink-deep shadow-2xl shadow-black/20 ${className}`}
      role="img"
      aria-label={`${FLAGSHIP.title}, flagship engagement outcome`}
    >
      <div className="relative" aria-hidden="true">
        <ShellCornerMarkers />
        <div className="absolute inset-0 bg-tech-grid-32 opacity-40" />
        <div className="absolute -left-16 top-0 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="text-mono-label text-white/55">Flagship engagement</span>
          </div>
          <span className="text-mono-label text-white/55">{FLAGSHIP.status}</span>
        </div>

        <div className="relative grid gap-px bg-white/10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="bg-ink-deep p-4 sm:p-6">
            <p className="text-mono-label text-accent">
              {FLAGSHIP.clientLabel ?? FLAGSHIP.kind}
            </p>
            <h3 className="mt-2 max-w-md font-display text-xl font-light leading-tight text-white sm:text-2xl">
              {FLAGSHIP.title}
            </h3>
            <p className="mt-4 max-w-lg text-sm font-normal leading-relaxed text-white/55">
              {FLAGSHIP.problem}
            </p>

            <ol className="mt-6 grid gap-2 sm:grid-cols-2">
              {stages.map((stage, index) => (
                <li
                  key={stage.label}
                  className="border border-white/10 bg-white/[0.02] px-3 py-3"
                >
                  <span className="text-mono-label text-white/55">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-1 text-sm font-medium text-white">{stage.label}</p>
                  <p className="mt-1 text-xs font-normal leading-relaxed text-white/60">
                    {stage.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <aside className="flex flex-col bg-ink p-4 sm:p-6">
            <span className="text-mono-label text-white/55">Operational result</span>
            <ul className="mt-5 flex flex-col gap-4">
              {outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex items-start gap-3 text-sm font-normal leading-relaxed text-white/70"
                >
                  <Icon
                    icon="solar:check-circle-linear"
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    aria-hidden
                  />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
            <Link
              to={href}
              className="mt-auto inline-flex items-center gap-2 border-t border-white/10 pt-5 text-mono-label text-white/55 transition-colors hover:text-accent"
            >
              Read the case
              <Icon icon="solar:arrow-right-linear" className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </aside>
        </div>
      </div>
    </div>
  )
}
