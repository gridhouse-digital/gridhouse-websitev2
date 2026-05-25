import { useEffect, useRef } from "react";
import gsap from "gsap";
import TerminalLabel from "./TerminalLabel";
import GridRails from "./GridRails";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

interface Props {
  label: string;
  title: string;
  description?: string;
  meta?: { label: string; value: string }[];
}

export default function PageHeader({ label, title, description, meta }: Props) {
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !titleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "expo.out" },
      );
    }, titleRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className="relative border-b border-white/5 px-6 md:px-12 py-16 md:py-24 overflow-hidden">
      <GridRails />
      <div className="relative max-w-rail mx-auto flex flex-col gap-6">
        <TerminalLabel variant="accent">{label}</TerminalLabel>
        <h1
          ref={titleRef}
          className="font-display font-light text-white text-display-lg leading-[1.05] tracking-tight max-w-4xl"
        >
          {title}
        </h1>
        {description && (
          <p className="text-white/50 text-body-md font-light max-w-2xl">
            {description}
          </p>
        )}
        {meta && meta.length > 0 && (
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 border-t border-white/10 pt-6">
            {meta.map((m) => (
              <div key={m.label} className="flex flex-col gap-1">
                <dt className="text-mono-label text-white/40">{m.label}</dt>
                <dd className="text-white text-sm font-light">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
