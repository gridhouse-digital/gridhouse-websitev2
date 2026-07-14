interface Props {
  value: string;
  label: string;
}

export default function StatBlock({ value, label }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-display font-light text-display-sm text-white leading-none tracking-display">
        {value}
      </span>
      <span className="text-mono-label text-white/30">{label}</span>
    </div>
  );
}
