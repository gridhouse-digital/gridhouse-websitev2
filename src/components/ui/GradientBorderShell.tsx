import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function GradientBorderShell({ children, className = "" }: Props) {
  return (
    <div className={`p-px bg-shell-border ${className}`}>{children}</div>
  );
}
