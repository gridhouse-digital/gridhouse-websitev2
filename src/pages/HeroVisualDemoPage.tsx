import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import TerminalLabel from '../components/ui/TerminalLabel'
import CTAButton from '../components/ui/CTAButton'
import HeroCityGrid from '../components/visuals/HeroCityGrid'
import ProductUiPreview from '../components/visuals/ProductUiPreview'
import HeroWebGLDemo from '../components/visuals/HeroWebGLDemo'
import HeroFlagshipOutcome from '../components/visuals/HeroFlagshipOutcome'
import HeroProductStack from '../components/visuals/HeroProductStack'
import HeroAgentDiagram from '../components/visuals/HeroAgentDiagram'
import HeroScreenshotStandIn from '../components/visuals/HeroScreenshotStandIn'
import HeroOfferingsCompose from '../components/visuals/HeroOfferingsCompose'

type DemoKey = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
type PreviewVariant = 'workflow' | 'compliance' | 'employee' | 'records' | 'audit'

const DEMOS: {
  key: DemoKey
  label: string
  title: string
  blurb: string
}[] = [
  {
    key: 'A',
    label: 'A · Variants',
    title: 'Product UI variants',
    blurb: 'Same ProductUiPreview component — swap surface: workflow, compliance, employee, records, audit.',
  },
  {
    key: 'B',
    label: 'B · WebGL',
    title: 'Simulation matrix',
    blurb: 'Atmospheric WebGL panel. High presence, low product proof.',
  },
  {
    key: 'C',
    label: 'C · Type only',
    title: 'Typography + grid',
    blurb: 'No right panel. Brand, headline, CTAs, and atmosphere only — ticker gets first-view room.',
  },
  {
    key: 'D',
    label: 'D · Outcome',
    title: 'Flagship outcome card',
    blurb: 'Problem → system stages → results, linked to the case study.',
  },
  {
    key: 'E',
    label: 'E · Stack',
    title: 'Multi-surface product stack',
    blurb: 'Overlapping compliance, record, and audit surfaces.',
  },
  {
    key: 'F',
    label: 'F · Agent',
    title: 'Agent + human-control diagram',
    blurb: 'Abstract pipeline thesis — less fake SaaS chrome, more mechanism.',
  },
  {
    key: 'G',
    label: 'G · Screenshot',
    title: 'Product screenshot treatment',
    blurb: 'Browser-chrome capture shape. Stand-in UI until a Gridhouse Compliance screenshot is supplied.',
  },
  {
    key: 'H',
    label: 'H · Offerings',
    title: 'Capabilities × Products',
    blurb: 'Combined services + products panel — compose the stack in one hero visual.',
  },
]

const VARIANTS: { key: PreviewVariant; label: string }[] = [
  { key: 'workflow', label: 'Workflow' },
  { key: 'compliance', label: 'Compliance' },
  { key: 'employee', label: 'Employee' },
  { key: 'records', label: 'Records' },
  { key: 'audit', label: 'Audit' },
]

const HERO_LINES = [
  { text: 'Turn complex operations', color: 'text-white' },
  { text: 'into systems', color: 'text-white/75' },
  { text: 'that move.', color: 'text-accent' },
]

export default function HeroVisualDemoPage() {
  const [active, setActive] = useState<DemoKey>('A')
  const [variant, setVariant] = useState<PreviewVariant>('compliance')
  const demo = useMemo(() => DEMOS.find((d) => d.key === active)!, [active])
  const typeOnly = active === 'C'

  return (
    <div className="min-h-screen bg-ink">
      <div className="sticky top-[72px] z-30 border-b border-white/10 bg-ink/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-rail flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 md:px-12">
          <div>
            <p className="text-mono-label text-accent">Hero visual demos</p>
            <p className="mt-1 text-sm font-normal text-white/55">
              Compare A–H in a hero frame. Home is unchanged.
            </p>
          </div>
          <Link
            to="/"
            className="text-mono-label text-white/55 transition-colors hover:text-accent"
          >
            ← Back to home
          </Link>
        </div>
        <div className="mx-auto flex max-w-rail gap-2 overflow-x-auto px-4 pb-3 sm:px-6 md:px-12">
          {DEMOS.map((item) => {
            const isActive = item.key === active
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActive(item.key)}
                className={`shrink-0 border px-3 py-2 text-mono-label transition-colors ${
                  isActive
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-white/10 text-white/50 hover:border-white/25 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>
        {active === 'A' && (
          <div className="mx-auto flex max-w-rail gap-2 overflow-x-auto px-4 pb-3 sm:px-6 md:px-12">
            {VARIANTS.map((item) => {
              const isActive = item.key === variant
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setVariant(item.key)}
                  className={`shrink-0 border px-2.5 py-1.5 text-mono-label transition-colors ${
                    isActive
                      ? 'border-white/30 bg-white/[0.06] text-white'
                      : 'border-white/10 text-white/40 hover:text-white/70'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div className="mx-auto max-w-rail px-4 pt-6 sm:px-6 md:px-12">
        <p className="text-mono-label text-white/55">Active demo</p>
        <h1 className="mt-2 font-display text-display-sm font-light text-white">
          {demo.title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm font-normal text-white/55">{demo.blurb}</p>
      </div>

      <section className="relative mt-6 min-h-[calc(100vh-220px)] overflow-hidden border-y border-white/10 bg-ink">
        <HeroCityGrid />
        <div className="relative z-10 flex min-h-[calc(100vh-220px)] items-center px-4 py-12 sm:px-6 md:px-12 md:py-14">
          <div
            className={`mx-auto grid w-full max-w-rail items-center gap-10 ${
              typeOnly
                ? 'lg:grid-cols-1'
                : 'lg:grid-cols-12 lg:gap-10 xl:gap-14'
            }`}
          >
            <div className={typeOnly ? 'max-w-3xl' : 'lg:col-span-6 xl:col-span-5'}>
              <TerminalLabel variant="accent">AI-NATIVE OPERATIONAL SYSTEMS</TerminalLabel>
              <h2 className="mt-8 mb-6 font-display text-display-hero font-light text-white">
                {HERO_LINES.map((line) => (
                  <span key={line.text} className={`block ${line.color}`}>
                    {line.text}
                  </span>
                ))}
              </h2>
              <p className="mb-6 max-w-xl text-body-md font-normal text-white/60">
                Gridhouse designs digital products, automation, and intelligent agents
                around the way regulated and workflow-heavy teams actually work.
              </p>
              <div className="mb-8 flex flex-wrap items-center gap-4">
                <CTAButton variant="primary" to="/contact" icon="solar:arrow-right-linear">
                  Start a project
                </CTAButton>
                <CTAButton variant="secondary" to="/work">
                  View selected work
                </CTAButton>
              </div>
              <p className="border-t border-white/10 pt-5 text-mono-label text-white/55">
                Demo frame · not live on homepage
              </p>
            </div>

            {!typeOnly && (
              <div className="lg:col-span-6 xl:col-span-7">
                {active === 'A' && <ProductUiPreview variant={variant} />}
                {active === 'B' && <HeroWebGLDemo />}
                {active === 'D' && <HeroFlagshipOutcome />}
                {active === 'E' && <HeroProductStack />}
                {active === 'F' && <HeroAgentDiagram />}
                {active === 'G' && <HeroScreenshotStandIn />}
                {active === 'H' && <HeroOfferingsCompose />}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
