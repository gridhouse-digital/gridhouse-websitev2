import { useEffect, useState } from "react";
import PageHeader from "../components/ui/PageHeader";
import ProductSystemPanel from "../components/ui/ProductSystemPanel";
import PageCTA from "../components/ui/PageCTA";
import { PRODUCTS, type Product } from "../data/products";
import { sanityClient, productsQuery } from "../lib/sanity";

const PRODUCT_CTAS: Record<string, { label: string; to: string }> = {
  "01": { label: "Discuss HOMS early access", to: "/contact" },
  "02": { label: "Scope a compliance platform deployment", to: "/contact" },
  "03": { label: "Pilot an intake agent", to: "/contact" },
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS as Product[]);

  useEffect(() => {
    sanityClient
      .fetch<Product[]>(productsQuery)
      .then((data) => {
        if (data && data.length > 0) setProducts(data);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <PageHeader
        label="SYSTEMS / COMMAND CENTER"
        title="Platforms we build and deploy."
        description="HOMS for healthcare operations. The Compliance Training Platform for staffing and care agencies. AI agent systems and an automation template library — the systems we ship and the ones powering our client work."
        meta={[
          { label: "Live systems", value: "04" },
          { label: "In development", value: "01" },
          { label: "Beta", value: "01" },
          { label: "Production", value: "02" },
        ]}
      />
      <section className="px-4 sm:px-6 md:px-12 py-12 md:py-16">
        <div className="max-w-rail mx-auto flex flex-col gap-10">
          {products.map((p) => (
            <ProductSystemPanel key={p.id} product={p} cta={PRODUCT_CTAS[p.id]} />
          ))}
        </div>
      </section>
      <PageCTA
        headline="Interested in deploying one of these platforms?"
        subtext="HOMS early access, Compliance Training Platform deployments, and agent pilots are available for selected operators. Tell us about your operation."
        primaryLabel="Discuss a deployment"
        primaryTo="/contact"
        secondaryLabel="See our process"
        secondaryTo="/process"
      />
    </>
  );
}
