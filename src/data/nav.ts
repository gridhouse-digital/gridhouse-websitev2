export interface NavLink {
  label: string;
  to: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: "Work", to: "/work" },
  { label: "Capabilities", to: "/services" },
  { label: "Products", to: "/products" },
  { label: "Company", to: "/about" },
];
