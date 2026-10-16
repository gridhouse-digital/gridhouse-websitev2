import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { NAV_LINKS } from "../../data/nav";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousFocus = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
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

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden transition-opacity ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      aria-hidden={!open}
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close navigation"
      />
      <div
        ref={panelRef}
        className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-ink border-l border-white/10 flex flex-col transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-white/10 px-4 h-14">
          <span className="text-mono-label text-white/60">MENU</span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="text-white/70 hover:text-white p-3"
            aria-label="Close navigation"
          >
            <Icon icon="solar:close-square-linear" className="w-5 h-5" />
          </button>
        </header>
        <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-2">
          <NavLink
            to="/"
            end
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center justify-between border-b border-white/5 py-4 text-base font-display font-light transition-colors ${
                isActive ? "text-accent" : "text-white/80 hover:text-white"
              }`
            }
          >
            <span className="flex items-center gap-3">
              <Icon
                icon="solar:home-2-linear"
                className="w-[18px] h-[18px] shrink-0"
                aria-hidden
              />
              Home
            </span>
            <Icon
              icon="solar:arrow-right-linear"
              className="w-4 h-4"
              aria-hidden
            />
          </NavLink>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between border-b border-white/5 py-4 text-base font-display font-light transition-colors ${
                  isActive ? "text-accent" : "text-white/80 hover:text-white"
                }`
              }
            >
              <span>{link.label}</span>
              <Icon
                icon="solar:arrow-right-linear"
                className="w-4 h-4"
                aria-hidden
              />
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            onClick={onClose}
            className="mt-5 flex items-center justify-between bg-accent px-4 py-4 text-mono-label text-ink"
          >
            <span>Start a project</span>
            <Icon icon="solar:arrow-right-linear" className="w-4 h-4" aria-hidden />
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
