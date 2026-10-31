import WebGLPanel from './WebGLPanel'
import ShellCornerMarkers from '../ui/ShellCornerMarkers'

interface Props {
  className?: string
}

export default function HeroWebGLDemo({ className = '' }: Props) {
  return (
    <div
      className={`relative overflow-hidden border border-white/10 bg-void shadow-2xl shadow-black/30 ${className}`}
      role="img"
      aria-label="Simulation matrix WebGL visual"
    >
      <ShellCornerMarkers />
      <div className="relative h-[22rem] sm:h-[26rem] lg:h-[28rem]">
        <WebGLPanel label="SIMULATION_MATRIX" seed={42} />
      </div>
      <div className="relative border-t border-white/10 bg-ink-deep/90 px-4 py-3 sm:px-5">
        <p className="text-mono-label text-accent">Atmospheric signature</p>
        <p className="mt-1 text-sm font-normal text-white/55">
          WebGL matrix field — strong presence, weaker product proof.
        </p>
      </div>
    </div>
  )
}
