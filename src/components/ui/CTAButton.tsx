import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

type Variant = "primary" | "secondary" | "ghost";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  icon?: string;
  className?: string;
}

interface ButtonProps extends BaseProps {
  to?: undefined;
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

interface InternalLinkProps extends BaseProps {
  to: string;
  href?: undefined;
}

interface ExternalLinkProps extends BaseProps {
  href: string;
  to?: undefined;
}

type Props = ButtonProps | InternalLinkProps | ExternalLinkProps;

const VARIANTS: Record<Variant, string> = {
  // Near-black on #FF4500 is 5.56:1; white is only 3.44:1 and fails AA.
  primary:
    "bg-accent text-ink hover:bg-accent/90 hover:shadow-glow-accent-subtle focus-visible:ring-2 focus-visible:ring-accent/60",
  secondary:
    "border border-white/30 text-white hover:bg-white/5 hover:border-white/60 focus-visible:ring-2 focus-visible:ring-white/40",
  ghost:
    "text-white/70 hover:text-white focus-visible:ring-2 focus-visible:ring-white/40",
};

const BASE =
  "group inline-flex items-center gap-2 px-5 py-3.5 min-h-[44px] text-mono-label rounded-none transition-all duration-300 active:translate-y-px outline-none focus-visible:outline-none";

export default function CTAButton(props: Props) {
  const { children, variant = "primary", icon, className = "" } = props;
  const inner = (
    <>
      <span>{children}</span>
      {icon && (
        <Icon
          icon={icon}
          className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
          aria-hidden
        />
      )}
    </>
  );
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`;

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={cls}>
        {inner}
      </Link>
    );
  }
  if ("href" in props && props.href) {
    return (
      <a
        href={props.href}
        className={cls}
        target={props.href.startsWith("http") ? "_blank" : undefined}
        rel={props.href.startsWith("http") ? "noreferrer" : undefined}
      >
        {inner}
      </a>
    );
  }
  const btn = props as ButtonProps;
  return (
    <button
      type={btn.type ?? "button"}
      onClick={btn.onClick}
      disabled={btn.disabled}
      className={`${cls} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {inner}
    </button>
  );
}
