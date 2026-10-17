import { Icon } from '@iconify/react'
import ShellCornerMarkers from '../ui/ShellCornerMarkers'

interface Props {
  className?: string
}

/**
 * Shape demo for option G (real product screenshot).
 * No production media in /public yet — this is a framed stand-in
 * that shows the intended hero treatment until a real capture lands.
 */
export default function HeroScreenshotStandIn({ className = '' }: Props) {
  return (
    <div
      className={`relative ${className}`}
      role="img"
      aria-label="Product screenshot stand-in: compliance dashboard in browser chrome"
    >
      <div className="relative overflow-hidden border border-white/10 bg-ink-deep shadow-2xl shadow-black/30">
        <ShellCornerMarkers />

        {/* Browser chrome */}
        <div className="relative flex items-center gap-3 border-b border-white/10 bg-ink px-3 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-2 border border-white/10 bg-white/[0.02] px-3 py-1.5">
            <Icon icon="solar:lock-linear" className="h-3 w-3 shrink-0 text-white/30" />
            <span className="truncate text-mono-label text-white/55">
              app.gridhouse.digital / compliance
            </span>
          </div>
        </div>

        {/* Fake screenshot surface */}
        <div className="relative grid min-h-[20rem] bg-ink sm:min-h-[24rem] lg:grid-cols-[11rem_1fr]">
          <aside className="hidden border-r border-white/10 bg-ink-deep p-4 lg:block">
            <p className="text-mono-label text-accent">Gridhouse Compliance</p>
            <ul className="mt-5 space-y-3">
              {['Overview', 'Staff', 'Training', 'Credentials', 'Reports'].map((item, i) => (
                <li
                  key={item}
                  className={`text-sm font-normal ${
                    i === 0 ? 'text-white' : 'text-white/35'
                  }`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>

          <div className="relative p-4 sm:p-5">
            <div className="absolute inset-0 bg-tech-grid-32 opacity-25" />
            <div className="relative">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p className="text-mono-label text-white/55">Admin dashboard</p>
                  <h3 className="mt-1 font-display text-xl font-light text-white">
                    Compliance overview
                  </h3>
                </div>
                <span className="border border-success/30 bg-success/10 px-2.5 py-1.5 text-mono-label text-success">
                  Live stand-in
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { label: 'Staff', value: '142' },
                  { label: 'Current', value: '128' },
                  { label: 'Due soon', value: '11' },
                  { label: 'Exceptions', value: '3' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="border border-white/10 bg-white/[0.02] px-3 py-3"
                  >
                    <p className="text-mono-label text-white/55">{stat.label}</p>
                    <p className="mt-1 font-display text-2xl font-light text-white">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {['Renewals this week', 'Training completion', 'Audit package'].map(
                  (card, i) => (
                    <div
                      key={card}
                      className="min-h-[5.5rem] border border-white/10 bg-white/[0.02] p-3"
                    >
                      <p className="text-mono-label text-white/55">{card}</p>
                      <div className="mt-3 h-1.5 w-full bg-white/5">
                        <div
                          className="h-full bg-accent/70"
                          style={{ width: `${55 + i * 15}%` }}
                        />
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-between border-t border-white/10 bg-ink-deep/90 px-4 py-3">
          <p className="text-mono-label text-white/55">
            Placeholder until a Gridhouse Compliance capture is supplied
          </p>
          <p className="text-mono-label text-accent">Option G shape</p>
        </div>
      </div>
    </div>
  )
}
