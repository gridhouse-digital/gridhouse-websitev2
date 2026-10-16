export default function HeroCityGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-ink" aria-hidden>
      <div className="absolute inset-0 bg-tech-grid-64 opacity-60" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--gh-br-15)] to-transparent" />
      <div className="absolute -left-48 top-1/3 h-[34rem] w-[34rem] rounded-full bg-accent/[0.08] blur-[120px]" />
      <div className="absolute -right-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-[color:var(--gh-s-03)] blur-[140px]" />
    </div>
  )
}
