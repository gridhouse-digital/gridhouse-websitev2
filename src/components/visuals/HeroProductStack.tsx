import { Icon } from '@iconify/react'
import ShellCornerMarkers from '../ui/ShellCornerMarkers'

const FRAMES = [
  {
    offset: 'translate-y-0 translate-x-0 z-30',
    eyebrow: 'Compliance overview',
    title: 'Workforce status at a glance',
    status: 'Records synchronized',
    rows: [
      { label: 'Active staff', value: '142', tone: 'text-white' },
      { label: 'Current', value: '128', tone: 'text-success' },
      { label: 'Upcoming renewals', value: '11', tone: 'text-accent' },
      { label: 'Exceptions', value: '3', tone: 'text-white/70' },
    ],
  },
  {
    offset: 'translate-y-3 translate-x-3 z-20 sm:translate-y-4 sm:translate-x-5',
    eyebrow: 'Staff record',
    title: 'Credential workspace',
    status: 'Audit history on',
    rows: [
      { label: 'Role profile', value: 'Loaded', tone: 'text-white' },
      { label: 'Documents', value: '12 files', tone: 'text-white/70' },
      { label: 'Next expiry', value: '18 days', tone: 'text-accent' },
      { label: 'Follow-up', value: 'Scheduled', tone: 'text-success' },
    ],
  },
  {
    offset: 'translate-y-6 translate-x-6 z-10 sm:translate-y-8 sm:translate-x-10',
    eyebrow: 'Audit export',
    title: 'Evidence package',
    status: 'Ready',
    rows: [
      { label: 'Scope', value: 'Q2 / All teams', tone: 'text-white' },
      { label: 'Validated', value: '98%', tone: 'text-success' },
      { label: 'Gaps', value: '2 items', tone: 'text-accent' },
      { label: 'Export', value: 'Prepared', tone: 'text-white/70' },
    ],
  },
] as const

interface Props {
  className?: string
}

export default function HeroProductStack({ className = '' }: Props) {
  return (
    <div
      className={`relative ${className}`}
      role="img"
      aria-label="Representative product surfaces: compliance overview, staff record, and audit export"
    >
      <div className="relative min-h-[22rem] sm:min-h-[26rem]" aria-hidden="true">
        {FRAMES.map((frame, index) => (
          <div
            key={frame.eyebrow}
            className={`absolute inset-x-0 top-0 overflow-hidden border border-white/10 bg-ink-deep shadow-2xl shadow-black/25 ${frame.offset}`}
            style={{ maxWidth: index === 0 ? '100%' : '94%' }}
          >
            <ShellCornerMarkers />
            <div className="absolute inset-0 bg-tech-grid-32 opacity-30" />
            <div className="relative flex items-center justify-between border-b border-white/10 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                <span className="text-mono-label text-white/55">{frame.eyebrow}</span>
              </div>
              <span className="text-mono-label text-success/80">{frame.status}</span>
            </div>
            <div className="relative p-4 sm:p-5">
              <p className="text-mono-label text-accent">Gridhouse / System view</p>
              <h3 className="mt-1.5 font-display text-lg font-light text-white sm:text-xl">
                {frame.title}
              </h3>
              <ul className="mt-4 grid grid-cols-2 gap-2">
                {frame.rows.map((row) => (
                  <li
                    key={row.label}
                    className="border border-white/10 bg-white/[0.02] px-3 py-2.5"
                  >
                    <p className="text-mono-label text-white/55">{row.label}</p>
                    <p className={`mt-1 text-sm font-medium ${row.tone}`}>{row.value}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}

        <div className="pointer-events-none absolute bottom-2 right-2 z-40 flex items-center gap-2 border border-white/10 bg-ink/90 px-2.5 py-1.5 backdrop-blur-sm sm:bottom-3 sm:right-3">
          <Icon icon="solar:layers-minimalistic-linear" className="h-3.5 w-3.5 text-accent" />
          <span className="text-mono-label text-white/55">3 surfaces · representative</span>
        </div>
      </div>
    </div>
  )
}
