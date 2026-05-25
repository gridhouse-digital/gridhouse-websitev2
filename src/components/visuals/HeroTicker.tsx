import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Icon } from "@iconify/react";
import { TECH_STACK } from "../../data/heroTicker";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

export default function HeroTicker() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || !trackRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 45,
        ease: "none",
        repeat: -1,
      });
    });
    return () => ctx.revert();
  }, [reduced]);

  return (
    <div
      data-component="hero-ticker"
      className="relative w-full h-10 border-t border-white/10 bg-ink-deep flex items-stretch overflow-hidden"
    >
      {/* Sticky anchored label */}
      <div className="shrink-0 flex items-center gap-2 px-4 border-r border-white/10 bg-ink-deep z-20">
        <span className="w-1.5 h-1.5 bg-accent" />
        <span className="text-mono-label text-accent">TECH STACK</span>
        <span className="text-mono-label text-white/30">:</span>
      </div>

      {/* Scrolling marquee */}
      <div className="flex-1 overflow-hidden relative flex items-center">
        <div
          ref={trackRef}
          className="flex items-center whitespace-nowrap will-change-transform"
        >
          {/* Two identical copies for seamless -50% wrap */}
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center shrink-0" aria-hidden={copy === 1}>
              {TECH_STACK.map((item) => (
                <span
                  key={`${copy}-${item.name}`}
                  className="inline-flex items-center gap-2 px-6 text-mono-label text-white/70 shrink-0"
                >
                  <Icon icon={item.icon} className="w-4 h-4 shrink-0" aria-hidden />
                  <span>{item.name}</span>
                  <span className="text-white/20 ml-4">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
        {/* Fade-out gradient at right edge for clean exit */}
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-ink-deep to-transparent z-10" />
      </div>
    </div>
  );
}
