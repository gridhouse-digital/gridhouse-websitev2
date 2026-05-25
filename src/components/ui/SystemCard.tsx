import { useRef, type ReactNode } from "react";
import { useMagneticTilt } from "../../hooks/useMagneticTilt";

interface Props {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
  tilt?: boolean;
}

export default function SystemCard({
  children,
  className = "",
  as = "div",
  tilt = false,
}: Props) {
  const Tag = as;
  const ref = useRef<HTMLElement>(null);
  useMagneticTilt(tilt ? ref : { current: null });

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement & HTMLElement>}
      className={`glow-surface ${tilt ? "magnetic-card" : ""} relative bg-white/[0.02] bg-gradient-to-br from-accent/[0.06] to-transparent border border-accent/[0.15] backdrop-blur-sm transition-all duration-400 hover:border-accent/[0.35] hover:shadow-glow-accent ${className}`}
    >
      {children}
    </Tag>
  );
}
