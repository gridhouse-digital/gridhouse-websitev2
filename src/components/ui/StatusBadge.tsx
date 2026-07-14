interface Props {
  label: string;
  variant?: "active" | "muted" | "accent";
  className?: string;
}

const DOT: Record<NonNullable<Props["variant"]>, string> = {
  active: "bg-success",
  muted: "bg-text-muted",
  accent: "bg-accent",
};

export default function StatusBadge({
  label,
  variant = "active",
  className = "",
}: Props) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-mono-label text-white/60 ${className}`}
    >
      <span
        className={`relative inline-block w-1.5 h-1.5 rounded-full ${DOT[variant]}`}
      >
        <span
          className={`absolute inset-0 rounded-full ${DOT[variant]} animate-pulse-dot`}
        />
      </span>
      <span>{label}</span>
    </span>
  );
}
