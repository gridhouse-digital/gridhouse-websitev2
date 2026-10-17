import { useCallback, useEffect, useId, useRef, useState, type RefObject } from "react";
import { Icon } from "@iconify/react";
import TerminalLabel from "./TerminalLabel";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const VIDEO_SRC = "/images/gridhouse-compliance-demo.mp4";
const POSTER_SRC = "/images/admin-compliance-dashboard.webp";
const SESSION_KEY = "gh_compliance_demo_seen";

function rememberDemoSeen() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // Private mode can block storage. The modal still closes for this view.
  }
}

function demoAlreadySeen() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export default function ComplianceDemo() {
  const reduced = usePrefersReducedMotion();
  const [open, setOpen] = useState(false);
  const inlineRef = useRef<HTMLVideoElement>(null);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (demoAlreadySeen()) return;

    let opened = false;
    const openOnce = () => {
      if (opened || demoAlreadySeen()) return;
      if (document.querySelector("[data-gh-intro]")) return;
      opened = true;
      rememberDemoSeen();
      setOpen(true);
    };

    openOnce();
    const observer = new MutationObserver(openOnce);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="border-b border-white/10 px-4 sm:px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-rail mx-auto flex flex-col gap-6">
          <div className="flex flex-col gap-3 max-w-3xl">
            <TerminalLabel variant="accent">Watch the demo</TerminalLabel>
            <h2 className="font-display font-light text-white text-display-sm leading-tight">
              Gridhouse Compliance, on screen.
            </h2>
            <p className="text-white/65 text-body-md font-normal max-w-2xl">
              A short walkthrough of the dashboard. Play it here any time.
            </p>
          </div>
          <InlinePlayer videoRef={inlineRef} />
        </div>
      </section>
      {open ? (
        <DemoModal reduced={reduced} onClose={close} />
      ) : null}
    </>
  );
}

function InlinePlayer({
  videoRef,
}: {
  videoRef: RefObject<HTMLVideoElement | null>;
}) {
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  return (
    <div className="border border-white/10 bg-white/[0.03] p-1.5 sm:p-2">
      <div className="relative bg-ink">
        <video
          ref={videoRef}
          className="aspect-video w-full bg-black"
          controls
          playsInline
          preload="none"
          poster={POSTER_SRC}
          src={VIDEO_SRC}
          aria-label="Gridhouse Compliance product demo"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
        {playing ? null : (
          <button
            type="button"
            onClick={play}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/35 transition-colors hover:bg-ink/20"
            aria-label="Play Gridhouse Compliance demo"
          >
            <span className="grid h-16 w-16 place-items-center bg-accent text-ink">
              <Icon icon="solar:play-bold" className="h-7 w-7 translate-x-0.5" aria-hidden />
            </span>
            <span className="text-mono-label text-white">Play demo</span>
          </button>
        )}
      </div>
    </div>
  );
}

function DemoModal({
  reduced,
  onClose,
}: {
  reduced: boolean;
  onClose: () => void;
}) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const [muted, setMuted] = useState(true);

  const close = useCallback(() => {
    videoRef.current?.pause();
    onClose();
  }, [onClose]);

  useEffect(() => {
    const previous = document.activeElement;
    returnFocus.current = previous instanceof HTMLElement ? previous : null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), video, [tabindex]:not([tabindex="-1"])',
        ),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    const video = videoRef.current;
    if (video && !reduced) {
      video.muted = true;
      video.play().catch(() => {});
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", onKey);
      video?.pause();
      returnFocus.current?.focus();
    };
  }, [close, reduced]);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    const next = !video.muted;
    video.muted = next;
    setMuted(next);
    if (!next) video.play().catch(() => {});
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6">
      <button
        type="button"
        tabIndex={-1}
        className="absolute inset-0 bg-ink-deep/80 backdrop-blur-sm"
        aria-label="Close demo video"
        onClick={close}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-[min(100%,calc((100svh-7.5rem)*16/9))] max-h-[calc(100svh-1.5rem)] overflow-auto border border-accent/30 bg-ink shadow-nav-pill"
      >
        <header className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
          <div className="min-w-0">
            <p className="text-mono-label text-accent">Gridhouse Compliance</p>
            <h2 id={titleId} className="truncate font-display text-base font-light text-white">
              Product demo
            </h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={!muted}
              aria-label={muted ? "Turn sound on" : "Turn sound off"}
              className="inline-flex min-h-11 items-center gap-2 border border-white/20 px-3 text-mono-label text-white/80 transition-colors hover:border-accent hover:text-accent"
            >
              <Icon
                icon={muted ? "solar:volume-cross-linear" : "solar:volume-loud-linear"}
                className="h-4 w-4"
                aria-hidden
              />
              {muted ? "Sound off" : "Sound on"}
            </button>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close demo video"
              className="grid h-11 w-11 place-items-center text-white/80 transition-colors hover:text-accent"
            >
              <Icon icon="solar:close-square-linear" className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </header>
        <video
          ref={videoRef}
          className="aspect-video w-full bg-black"
          controls
          playsInline
          muted
          autoPlay={!reduced}
          preload="metadata"
          poster={POSTER_SRC}
          src={VIDEO_SRC}
          aria-label="Gridhouse Compliance product demo"
        />
      </div>
    </div>
  );
}
