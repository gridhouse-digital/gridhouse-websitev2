export interface NavLink {
  label: string;
  to: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Products", to: "/products" },
  { label: "Industries", to: "/industries" },
  { label: "Work", to: "/work" },
  { label: "Process", to: "/process" },
  { label: "Insights", to: "/insights" },
  { label: "Contact", to: "/contact" },
];
