import type { ReactNode } from "react";
import { Icon } from "@iconify/react";

interface Props {
  children: ReactNode;
  icon?: string;
  variant?: "muted" | "accent" | "white";
  className?: string;
}

const TONES: Record<NonNullable<Props["variant"]>, string> = {
  muted: "text-white/60",
  accent: "text-accent",
  white: "text-white",
};

export default function TerminalLabel({
  children,
  icon,
  variant = "muted",
  className = "",
}: Props) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-display-label ${TONES[variant]} ${className}`}
    >
      {icon && <Icon icon={icon} className="w-3 h-3" aria-hidden />}
      <span>{children}</span>
    </span>
  );
}
