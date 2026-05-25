import PageHeader from "../components/ui/PageHeader";
import ProductSystemPanel from "../components/ui/ProductSystemPanel";
import { PRODUCTS } from "../data/products";

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        label="SYSTEMS / COMMAND CENTER"
        title="Internal products and platforms."
        description="HOMS for healthcare operations. The Compliance Training Platform for staffing and care agencies. AI agent systems and an automation template library — the systems we ship and the ones quietly powering our client work."
        meta={[
          { label: "Live systems", value: "04" },
          { label: "In development", value: "01" },
          { label: "Beta", value: "01" },
          { label: "Production", value: "02" },
        ]}
      />
      <section className="px-6 md:px-12 py-16">
        <div className="max-w-rail mx-auto flex flex-col gap-10">
          {PRODUCTS.map((p) => (
            <ProductSystemPanel key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
