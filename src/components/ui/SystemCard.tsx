import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
}

export default function SystemCard({
  children,
  className = "",
  as = "div",
}: Props) {
  const Tag = as;
  return (
    <Tag
      className={`relative bg-white/[0.02] border border-white/10 backdrop-blur-sm transition-colors hover:border-white/20 ${className}`}
    >
      {children}
    </Tag>
  );
}
