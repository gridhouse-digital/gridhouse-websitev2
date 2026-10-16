import { Icon } from '@iconify/react'
import ShellCornerMarkers from '../ui/ShellCornerMarkers'

const NODES = [
  {
    id: 'intake',
    icon: 'solar:inbox-in-linear',
    label: 'Intake',
    detail: 'Form, email, or API event',
  },
  {
    id: 'agent',
    icon: 'solar:cpu-bolt-linear',
    label: 'Agent',
    detail: 'Retrieve, classify, decide',
  },
  {
    id: 'guardrail',
    icon: 'solar:shield-check-linear',
    label: 'Guardrail',
    detail: 'Policy + confidence checks',
  },
  {
    id: 'human',
    icon: 'solar:user-hand-up-linear',
    label: 'Human control',
    detail: 'Exceptions pause + route',
  },
] as const

interface Props {
  className?: string
}

export default function HeroAgentDiagram({ className = '' }: Props) {
  return (
    <div
      className={`relative overflow-hidden border border-white/10 bg-ink-deep shadow-2xl shadow-black/20 ${className}`}
      role="img"
      aria-label="Agent workflow diagram: intake, agent, guardrail, human control"
    >
      <div className="relative" aria-hidden="true">
        <ShellCornerMarkers />
        <div className="absolute inset-0 bg-tech-grid-32 opacity-40" />
        <div className="absolute right-0 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />

        <div className="relative flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse-dot rounded-full bg-accent" />
            <span className="text-mono-label text-white/55">Agent + human control</span>
          </div>
          <span className="text-mono-label text-white/55">Thesis diagram</span>
        </div>

        <div className="relative p-4 sm:p-6">
          <p className="text-mono-label text-accent">How the system moves work</p>
          <h3 className="mt-2 max-w-md font-display text-xl font-light leading-tight text-white sm:text-2xl">
            Agents execute. Guardrails decide. Humans stay in control.
          </h3>

          <ol className="relative mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {NODES.map((node, index) => (
              <li
                key={node.id}
                className="relative border border-white/10 bg-white/[0.02] p-4"
              >
                {index < NODES.length - 1 && (
                  <span className="pointer-events-none absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-accent lg:block">
                    <Icon icon="solar:arrow-right-linear" className="h-3.5 w-3.5" />
                  </span>
                )}
                <div className="mb-4 flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center border border-accent/25 bg-accent/[0.08] text-accent">
                    <Icon icon={node.icon} className="h-4 w-4" />
                  </span>
                  <span className="text-mono-label text-white/55">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-sm font-medium text-white">{node.label}</p>
                <p className="mt-1 text-xs font-normal leading-relaxed text-white/60">
                  {node.detail}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-6 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-3">
            <div>
              <p className="text-mono-label text-white/55">Defined tools</p>
              <p className="mt-1 text-xs font-normal text-white/55">
                Retrieval, validation, write-back
              </p>
            </div>
            <div>
              <p className="text-mono-label text-white/55">Fail closed</p>
              <p className="mt-1 text-xs font-normal text-white/55">
                Low confidence stops the flow
              </p>
            </div>
            <div>
              <p className="text-mono-label text-white/55">Audit trail</p>
              <p className="mt-1 text-xs font-normal text-white/55">
                Every step is attributable
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
