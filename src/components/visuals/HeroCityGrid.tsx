import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

/**
 * HeroCityGrid — video background for the homepage hero.
 *
 * A 10s looping city render plays behind the hero copy. Users with
 * prefers-reduced-motion get the static poster frame instead of the video.
 * Gradient overlays keep the left column readable on desktop and shift to
 * a bottom-up gradient on mobile so the city becomes a supporting backdrop.
 */
export default function HeroCityGrid() {
  const reduced = usePrefersReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (reduced) return;
    const el = videoRef.current;
    if (!el) return;
    // React doesn't reflect the `muted` prop as a DOM attribute, which makes
    // Chrome's autoplay policy reject the video — set it imperatively.
    el.muted = true;
    el.setAttribute("muted", "");
    const tryPlay = () => {
      // Chrome pauses video-only media in hidden/occluded tabs to save
      // power; retry whenever the page becomes visible again. Rejections
      // are harmless — the poster frame stays up.
      void el.play().catch(() => {});
    };
    tryPlay();
    document.addEventListener("visibilitychange", tryPlay);
    return () => document.removeEventListener("visibilitychange", tryPlay);
  }, [reduced]);

  const mediaStyle = {
    objectPosition: "72% 50%",
    filter: "contrast(1.05) saturate(1.06)",
  } as const;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {reduced ? (
        <img
          src="/images/hero-video-poster.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={mediaStyle}
        />
      ) : (
        <video
          ref={videoRef}
          poster="/images/hero-video-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          style={mediaStyle}
        >
          {/* VP9 first — better quality per byte; MP4 fallback for Safari */}
          <source src="/videos/hero-grid-city.webm" type="video/webm" />
          <source src="/videos/hero-grid-city.mp4" type="video/mp4" />
        </video>
      )}

      {/* Readability gradient — left column stays dark and clean */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(to right, #0F0F0F 8%, rgba(15,15,15,0.82) 32%, rgba(15,15,15,0.35) 52%, rgba(15,15,15,0) 70%)",
        }}
      />
      {/* Mobile: city becomes a supporting backdrop, text contrast from below */}
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(to top, rgba(15,15,15,0.94) 18%, rgba(15,15,15,0.62) 48%, rgba(15,15,15,0.3) 75%, rgba(15,15,15,0.55))",
        }}
      />
      {/* Vignette + top/bottom frame fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 95% at 55% 45%, transparent 55%, rgba(10,10,10,0.55) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(15,15,15,0.65), transparent 20%, transparent 72%, rgba(15,15,15,0.92))",
        }}
      />
      {/* Extra darkening over the bottom-right corner where the video's
          watermark was delogo'd out — hides the residual soft patch */}
      <div
        className="absolute bottom-0 right-0 h-[36%] w-[40%]"
        style={{
          background:
            "radial-gradient(closest-side at 66% 76%, rgba(10,10,10,0.92), rgba(10,10,10,0.45) 62%, transparent)",
        }}
      />
    </div>
  );
}
