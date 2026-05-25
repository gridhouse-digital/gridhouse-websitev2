import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { NAV_LINKS } from "../../data/nav";
import MobileNav from "./MobileNav";

function useScrolled(threshold = 40): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-30 px-3 sm:px-4 pt-2 sm:pt-3 pointer-events-none">
        <header
          className={`pointer-events-auto flex items-center justify-between px-5 rounded-sm border transition-all duration-300 ease-out shadow-nav-pill backdrop-saturate-150 ${
            scrolled
              ? "h-11 bg-ink-deep/90 border-white/[0.05] backdrop-blur-3xl"
              : "h-14 bg-ink-deep/70 border-white/[0.07] backdrop-blur-2xl"
          }`}
        >
          <Link
            to="/"
            className="flex items-center group shrink min-w-0"
            aria-label="Gridhouse Digital — home"
          >
            <img
              src="/gridhouse-logo.svg"
              alt="Gridhouse Digital"
              width={2400}
              height={720}
              className="h-8 md:h-10 lg:h-12 w-auto max-w-none block transition-opacity duration-300 opacity-100 group-hover:opacity-70"
              draggable={false}
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative text-mono-label transition-colors ${
                    isActive
                      ? "text-accent"
                      : "text-white/60 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <span
                        aria-hidden
                        className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-accent"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden lg:inline-flex text-mono-label text-accent border border-accent/40 bg-accent/[0.05] px-4 py-2 transition-all duration-300 hover:bg-accent/[0.12] hover:border-accent/70"
            >
              Start a Project
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="lg:hidden text-white/70 hover:text-white p-3"
              aria-label="Open navigation"
            >
              <Icon icon="solar:hamburger-menu-linear" className="w-5 h-5" />
            </button>
          </div>
        </header>
      </div>

      {/* Spacer so page content starts below the fixed pill */}
      <div className="h-[60px] sm:h-[72px]" aria-hidden />

      <MobileNav open={open} onClose={() => setOpen(false)} />
    </>
  );
}
