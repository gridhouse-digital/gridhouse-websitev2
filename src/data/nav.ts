export interface NavLink {
  label: string;
  to: string;
  end?: boolean;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Work", to: "/work" },
  { label: "Compliance", to: "/products/compliance-training" },
  { label: "Capabilities", to: "/services" },
  { label: "Products", to: "/products", end: true },
  { label: "Industries", to: "/industries" },
  { label: "Company", to: "/about" },
];
