import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { NAV_LINKS } from "../../data/nav";
import MobileNav from "./MobileNav";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 h-16 md:h-20 lg:h-24 border-b border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="h-full px-4 md:px-8 flex items-center justify-between gap-3">
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
              className="h-10 md:h-14 lg:h-20 w-auto max-w-none block transition-opacity group-hover:opacity-90"
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
                  `text-mono-label transition-colors ${
                    isActive
                      ? "text-accent"
                      : "text-white/60 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="lg:hidden text-white/70 hover:text-white p-2"
            aria-label="Open navigation"
          >
            <Icon icon="solar:hamburger-menu-linear" className="w-5 h-5" />
          </button>
        </div>
      </header>
      <MobileNav open={open} onClose={() => setOpen(false)} />
    </>
  );
}
