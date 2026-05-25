interface Props {
  showHorizontals?: boolean;
  showCornerAccents?: boolean;
  className?: string;
}

export default function GridRails({
  showHorizontals = false,
  showCornerAccents = true,
  className = "",
}: Props) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 hidden md:block ${className}`}
    >
      <span className="absolute top-0 bottom-0 left-[8%] w-px bg-white/5" />
      <span className="absolute top-0 bottom-0 left-[40%] w-px bg-white/5" />
      <span className="absolute top-0 bottom-0 right-[8%] w-px bg-white/5" />
      {showHorizontals && (
        <>
          <span className="absolute left-0 right-0 top-[12%] h-px bg-white/5" />
          <span className="absolute left-0 right-0 bottom-[12%] h-px bg-white/5" />
        </>
      )}
      {showCornerAccents && (
        <>
          <span className="absolute top-2 left-[calc(8%-2px)] w-1 h-1 border border-white/20" />
          <span className="absolute top-2 right-[calc(8%-2px)] w-1 h-1 border border-white/20" />
          <span className="absolute bottom-2 left-[calc(8%-2px)] w-1 h-1 border border-white/20" />
          <span className="absolute bottom-2 right-[calc(8%-2px)] w-1 h-1 border border-white/20" />
        </>
      )}
    </div>
  );
}
