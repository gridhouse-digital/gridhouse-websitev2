import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import { NAV_LINKS } from "../../data/nav";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MobileNav({ open, onClose }: Props) {
  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden transition-opacity ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close navigation"
      />
      <div
        className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-ink border-l border-white/10 flex flex-col transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-white/10 px-4 h-14">
          <span className="text-mono-label text-white/60">NAVIGATION / 01</span>
          <button
            type="button"
            onClick={onClose}
            className="text-white/70 hover:text-white p-2"
            aria-label="Close navigation"
          >
            <Icon icon="solar:close-square-linear" className="w-5 h-5" />
          </button>
        </header>
        <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-2">
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
              <Icon icon="solar:arrow-right-linear" className="w-4 h-4" />
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
