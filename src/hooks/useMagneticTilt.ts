import { type RefObject, useEffect } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function useMagneticTilt(ref: RefObject<HTMLElement | null>): void {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    el.style.transition = "transform 0.1s ease, box-shadow 0.4s ease, border-color 0.4s ease";

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) translateZ(4px)`;
    };

    const onLeave = () => {
      el.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease, border-color 0.4s ease";
      el.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref, reduced]);
}
