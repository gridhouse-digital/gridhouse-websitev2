import { Icon } from '@iconify/react'
import ShellCornerMarkers from '../ui/ShellCornerMarkers'

type PreviewVariant = 'workflow' | 'compliance' | 'employee' | 'records' | 'audit'

interface Props {
  variant?: PreviewVariant
  label?: string
  className?: string
}

const PREVIEWS: Record<
  PreviewVariant,
  {
    eyebrow: string
    title: string
    status: string
    stages: { icon: string; label: string; detail: string }[]
    outcomes: string[]
  }
> = {
  workflow: {
    eyebrow: 'Representative workflow',
    title: 'Credential intake and compliance routing',
    status: 'Guardrails active',
    stages: [
      {
        icon: 'solar:document-add-linear',
        label: 'Intake',
        detail: 'Credential received',
      },
      {
        icon: 'solar:magnifer-linear',
        label: 'Retrieval',
        detail: 'Policy and staff record matched',
      },
      {
        icon: 'solar:shield-check-linear',
        label: 'Validation',
        detail: 'Requirements checked',
      },
      {
        icon: 'solar:route-linear',
        label: 'Action',
        detail: 'Record updated or escalated',
      },
    ],
    outcomes: ['Audit trail written', 'Expiry workflow scheduled', 'Exception sent for review'],
  },
  compliance: {
    eyebrow: 'Representative interface',
    title: 'Compliance overview',
    status: 'Records synchronized',
    stages: [
      {
        icon: 'solar:users-group-rounded-linear',
        label: 'Workforce',
        detail: 'Active staff profiles',
      },
      {
        icon: 'solar:check-circle-linear',
        label: 'Current',
        detail: 'Requirements complete',
      },
      {
        icon: 'solar:clock-circle-linear',
        label: 'Upcoming',
        detail: 'Renewals prioritized',
      },
      {
        icon: 'solar:danger-triangle-linear',
        label: 'Exceptions',
        detail: 'Human review queue',
      },
    ],
    outcomes: ['Training status visible', 'Renewals grouped by urgency', 'Export-ready records'],
  },
  employee: {
    eyebrow: 'Representative interface',
    title: 'Staff learning workspace',
    status: 'Profile current',
    stages: [
      {
        icon: 'solar:user-id-linear',
        label: 'Profile',
        detail: 'Role requirements loaded',
      },
      {
        icon: 'solar:book-2-linear',
        label: 'Learning',
        detail: 'Assigned courses',
      },
      {
        icon: 'solar:calendar-linear',
        label: 'Deadlines',
        detail: 'Renewals and due dates',
      },
      {
        icon: 'solar:medal-ribbons-star-linear',
        label: 'Records',
        detail: 'Completion history',
      },
    ],
    outcomes: ['Clear next actions', 'Self-service progress', 'One record of completion'],
  },
  records: {
    eyebrow: 'Representative interface',
    title: 'Staff record workspace',
    status: 'Audit history on',
    stages: [
      {
        icon: 'solar:list-check-linear',
        label: 'Directory',
        detail: 'Filterable staff records',
      },
      {
        icon: 'solar:folder-with-files-linear',
        label: 'Documents',
        detail: 'Credentials and evidence',
      },
      {
        icon: 'solar:history-linear',
        label: 'History',
        detail: 'Changes are traceable',
      },
      {
        icon: 'solar:bell-linear',
        label: 'Follow-up',
        detail: 'Renewals automated',
      },
    ],
    outcomes: ['Role-based access', 'Fast record review', 'Missing items surfaced'],
  },
  audit: {
    eyebrow: 'Representative interface',
    title: 'Audit and reporting',
    status: 'Evidence ready',
    stages: [
      {
        icon: 'solar:filter-linear',
        label: 'Scope',
        detail: 'Team and date range',
      },
      {
        icon: 'solar:verified-check-linear',
        label: 'Validate',
        detail: 'Required evidence checked',
      },
      {
        icon: 'solar:document-text-linear',
        label: 'Report',
        detail: 'Structured export prepared',
      },
      {
        icon: 'solar:archive-check-linear',
        label: 'Retain',
        detail: 'Snapshot recorded',
      },
    ],
    outcomes: ['Traceable activity', 'Consistent exports', 'Review gaps identified'],
  },
}

export default function ProductUiPreview({
  variant = 'workflow',
  label,
  className = '',
}: Props) {
  const preview = PREVIEWS[variant]

  return (
    <div
      className={`relative overflow-hidden border border-white/10 bg-ink-deep shadow-2xl shadow-black/20 ${className}`}
      role="img"
      aria-label={label ?? `${preview.title}, representative interface`}
    >
      <div className="relative" aria-hidden="true">
        <ShellCornerMarkers />
        <div className="absolute inset-0 bg-tech-grid-32 opacity-40" />
        <div className="absolute -right-20 -top-28 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />

        <div className="relative flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_16px_rgba(52,211,153,0.65)]" />
            <span className="text-mono-label text-white/55">{preview.eyebrow}</span>
          </div>
          <span className="text-mono-label text-white/55">Gridhouse / System view</span>
        </div>

        <div className="relative grid gap-px bg-white/10 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="bg-ink-deep p-4 sm:p-6">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-mono-label text-accent">AI + automation layer</p>
                <h3 className="mt-2 max-w-md font-display text-xl font-light leading-tight text-white sm:text-2xl">
                  {preview.title}
                </h3>
              </div>
              <span className="border border-success/30 bg-success/10 px-2.5 py-1.5 text-mono-label text-success">
                {preview.status}
              </span>
            </div>

            <ol className="grid gap-3 sm:grid-cols-2">
              {preview.stages.map((stage, index) => (
                <li
                  key={stage.label}
                  className="group relative border border-white/10 bg-white/[0.02] p-4"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="grid h-8 w-8 place-items-center border border-accent/25 bg-accent/[0.08] text-accent">
                      <Icon icon={stage.icon} className="h-4 w-4" aria-hidden />
                    </span>
                    <span className="text-mono-label text-white/55">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-white">{stage.label}</p>
                  <p className="mt-1 text-xs font-normal leading-relaxed text-white/60">
                    {stage.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <aside className="flex flex-col bg-ink p-4 sm:p-6">
            <span className="text-mono-label text-white/55">Operational result</span>
            <ul className="mt-6 flex flex-col gap-4">
              {preview.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3 text-sm font-normal text-white/70">
                  <Icon
                    icon="solar:check-circle-linear"
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    aria-hidden
                  />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
            <div className="mt-auto border-t border-white/10 pt-5">
              <p className="text-mono-label text-white/55">Human control</p>
              <p className="mt-2 text-xs font-normal leading-relaxed text-white/60">
                Defined exceptions pause the workflow and route context to an operator.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
