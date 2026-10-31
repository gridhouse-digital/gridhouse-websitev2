import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const SESSION_KEY = "gh_intro_seen";

export default function IntroOverlay() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem(SESSION_KEY, "1");
      return false;
    }
    return !sessionStorage.getItem(SESSION_KEY);
  });
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;

    if (reduced) {
      sessionStorage.setItem(SESSION_KEY, "1");
      const frame = window.requestAnimationFrame(() => setVisible(false));
      return () => window.cancelAnimationFrame(frame);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem(SESSION_KEY, "1");
          setVisible(false);
        },
      });

      document.body.style.overflow = "hidden";

      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, ease: "expo.out" },
        0.1,
      );

      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        0.35,
      );

      tl.fromTo(
        barRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2 },
        0.4,
      );

      tl.fromTo(
        barFillRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: "power2.inOut", transformOrigin: "left" },
        0.45,
      );

      tl.to(
        overlayRef.current,
        { opacity: 0, duration: 0.35, ease: "power2.inOut" },
        "+=0.05",
      );
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, [visible, reduced]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      data-gh-intro=""
      className="theme-fixed-dark fixed inset-0 z-[200] bg-ink-deep flex flex-col items-center justify-center gap-10 pointer-events-all"
      aria-hidden="true"
    >
      <img
        ref={logoRef}
        src="/gridhouse-logo.svg"
        alt=""
        className="h-10 sm:h-14 w-auto opacity-0"
        draggable={false}
      />

      <p ref={taglineRef} className="text-mono-label text-white/55 opacity-0">
        Operational systems, designed around the work
      </p>

      <div
        ref={barRef}
        className="w-48 sm:w-64 h-px bg-white/10 relative overflow-hidden opacity-0"
      >
        <div
          ref={barFillRef}
          className="absolute inset-y-0 left-0 right-0 bg-accent origin-left scale-x-0"
        />
      </div>
    </div>
  );
}
