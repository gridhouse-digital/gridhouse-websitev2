import type { ReactNode } from "react";
import SimulationMatrixCanvas from "./SimulationMatrixCanvas";

interface Props {
  label?: string;
  children?: ReactNode;
  seed?: number;
}

export default function WebGLPanel({ label = "SIMULATION_MATRIX", seed }: Props) {
  return (
    <div className="relative w-full h-full min-h-[280px] bg-void overflow-hidden group">
      <SimulationMatrixCanvas seed={seed} />
      <div className="absolute top-4 left-4 z-10 bg-ink/80 border border-white/5 px-2 py-1 text-mono-label text-white/50 backdrop-blur-sm">
        {label}
      </div>
      <div className="absolute top-0 right-0 w-4 h-4 border-l border-b border-white/20 z-10" />
    </div>
  );
}
