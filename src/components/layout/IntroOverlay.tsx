import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const BOOT_LINES = [
  "INITIALISING GRIDHOUSE OS...",
  "LOADING SYSTEM MODULES........OK",
  "CONNECTING TO CONTENT LAYER...OK",
  "RENDERING ENVIRONMENT.........OK",
];

const SESSION_KEY = "gh_intro_seen";

export default function IntroOverlay() {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem(SESSION_KEY);
  });
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;

    if (reduced) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setVisible(false);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem(SESSION_KEY, "1");
          setVisible(false);
        },
      });

      // Lock scroll while overlay is up
      document.body.style.overflow = "hidden";

      // Logo fades in
      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" },
        0.2,
      );

      // Boot lines appear one by one
      const lines = linesRef.current
        ? Array.from(linesRef.current.querySelectorAll("[data-boot-line]"))
        : [];

      tl.fromTo(
        lines,
        { opacity: 0, x: -8 },
        { opacity: 1, x: 0, duration: 0.25, ease: "power2.out", stagger: 0.18 },
        0.8,
      );

      // Progress bar container appears
      tl.fromTo(
        barRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2 },
        0.9,
      );

      // Bar fills
      tl.fromTo(
        barFillRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: "power2.inOut", transformOrigin: "left" },
        1.0,
      );

      // Everything fades out then overlay exits
      tl.to(
        overlayRef.current,
        { opacity: 0, duration: 0.5, ease: "power2.inOut" },
        "+=0.2",
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
      className="theme-fixed-dark fixed inset-0 z-[200] bg-ink-deep flex flex-col items-center justify-center gap-10 pointer-events-all"
      aria-hidden="true"
    >
      {/* Logo */}
      <img
        ref={logoRef}
        src="/gridhouse-logo.svg"
        alt=""
        className="h-10 sm:h-14 w-auto opacity-0"
        draggable={false}
      />

      {/* Boot lines */}
      <div ref={linesRef} className="flex flex-col gap-2">
        {BOOT_LINES.map((line) => (
          <p
            key={line}
            data-boot-line
            className="text-mono-label text-white/30 opacity-0"
            style={{ fontSize: "10px", letterSpacing: "0.16em" }}
          >
            {line}
          </p>
        ))}
      </div>

      {/* Progress bar */}
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
