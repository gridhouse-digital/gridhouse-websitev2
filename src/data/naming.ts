import type { Product } from "./products";

export const GRIDHOUSE_COMPLIANCE_NAME = "Gridhouse Compliance";
export const GRIDHOUSE_COMPLIANCE_TAGLINE =
  "Training & compliance for OLTL/ODP providers";
export const GRIDHOUSE_COMPLIANCE_HREF = "/products/compliance-training";

export const COMPLIANCE_DEMO_INTEREST = "compliance-demo";
export const COMPLIANCE_DEMO_SERVICE =
  "Healthcare Compliance / Training Platforms";
export const COMPLIANCE_DEMO_PATH = `/contact?interest=${COMPLIANCE_DEMO_INTEREST}`;
export const COMPLIANCE_DEMO_HEADING = "Book a Gridhouse Compliance demo";

const RETIRED_PRODUCT_NAMES = [
  "Healthcare Academy & Compliance System",
  "Gridhouse OLTL/ODP Training & Compliance System",
  "OLTL/ODP Training & Compliance System",
  "Healthcare Compliance Training Platform",
  "the Compliance Training Platform",
  "Compliance Training Platform",
] as const;

export function replaceRetiredProductNames(value: string): string {
  return RETIRED_PRODUCT_NAMES.reduce(
    (next, retired) => next.replaceAll(retired, GRIDHOUSE_COMPLIANCE_NAME),
    value,
  );
}

export function normalizeProduct(product: Product): Product {
  const isCompliance =
    product.id === "02" ||
    product.code === "CPT" ||
    product.name === "Compliance Training Platform" ||
    product.name === GRIDHOUSE_COMPLIANCE_NAME;

  if (!isCompliance) return product;

  return {
    ...product,
    code: "",
    name: GRIDHOUSE_COMPLIANCE_NAME,
    tagline: GRIDHOUSE_COMPLIANCE_TAGLINE,
    href: GRIDHOUSE_COMPLIANCE_HREF,
    description: replaceRetiredProductNames(product.description),
  };
}

export function normalizeIndustryCopy<
  T extends { gridhouseFit: string; mappedOfferings: readonly string[] },
>(industry: T): T {
  return {
    ...industry,
    gridhouseFit: replaceRetiredProductNames(industry.gridhouseFit),
    mappedOfferings: industry.mappedOfferings.map(replaceRetiredProductNames),
  };
}
