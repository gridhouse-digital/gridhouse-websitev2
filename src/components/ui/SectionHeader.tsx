import type { ReactNode } from "react";
import TerminalLabel from "./TerminalLabel";

interface Props {
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  label,
  title,
  description,
  align = "left",
  className = "",
}: Props) {
  const alignClass = align === "center" ? "text-center mx-auto max-w-3xl" : "";
  return (
    <header className={`flex flex-col gap-4 ${alignClass} ${className}`}>
      {label && <TerminalLabel variant="accent">{label}</TerminalLabel>}
      <h2 className="font-display font-normal text-white text-display-md">
        {title}
      </h2>
      {description && (
        <p className="text-white/70 text-body-md font-normal max-w-[62ch]">
          {description}
        </p>
      )}
    </header>
  );
}
