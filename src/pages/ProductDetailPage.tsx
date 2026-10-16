import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import TerminalLabel from "../components/ui/TerminalLabel";
import CTAButton from "../components/ui/CTAButton";
import StatusBadge from "../components/ui/StatusBadge";
import PageCTA from "../components/ui/PageCTA";
import GridRails from "../components/ui/GridRails";
import ProductUiPreview from "../components/visuals/ProductUiPreview";
import {
  COMPLIANCE_TRAINING_DETAIL,
  type ProductFeature,
} from "../data/productDetails";
import { PRODUCTS } from "../data/products";
import { COMPLIANCE_DEMO_PATH } from "../data/naming";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const DETAIL = COMPLIANCE_TRAINING_DETAIL;

function MediaSlot({
  label,
  image,
  aspect,
  eager = false,
}: {
  label: string;
  image?: string;
  aspect: string;
  eager?: boolean;
}) {
  if (image) {
    // raised frame cushions light-mode captures on the dark surface (GHACS §9)
    return (
      <div className="border border-white/10 bg-white/[0.03] p-1.5 sm:p-2">
        <img
          src={image}
          alt={label}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          style={{ aspectRatio: aspect }}
          className="w-full object-cover"
        />
      </div>
    );
  }

  const normalized = label.toLowerCase();
  const variant = normalized.includes("employee table") || normalized.includes("record drawer")
    ? "records"
    : normalized.includes("employee")
      ? "employee"
      : normalized.includes("audit")
        ? "audit"
        : "compliance";

  return (
    <ProductUiPreview variant={variant} label={`${label}, representative interface`} />
  );
}

function FeatureBullets({ feature }: { feature: ProductFeature }) {
  return (
    <ul className="flex flex-col gap-3.5">
      {feature.bullets.map((b) => (
        <li
          key={b.lead}
          className="flex items-start gap-3 text-[15px] leading-6 text-white/65 font-light"
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-accent mt-[9px] shrink-0"
            aria-hidden
          />
          <span>
            <strong className="font-medium text-white">{b.lead}</strong>{" "}
            {b.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

function FeatureCopy({ feature }: { feature: ProductFeature }) {
  return (
    <div className="flex flex-col gap-5">
      <TerminalLabel variant="accent">{feature.eyebrow}</TerminalLabel>
      <h2 className="font-display font-light text-white text-display-md leading-[1.08]">
        {feature.title}
      </h2>
      <p className="text-white/65 text-body-md font-normal">
        {feature.description}
      </p>
      <FeatureBullets feature={feature} />
    </div>
  );
}

function FeatureSection({ feature }: { feature: ProductFeature }) {
  if (feature.layout === "stacked") {
    return (
      <section
        id={feature.anchor}
        className="border-t border-white/10 py-12 md:py-20 flex flex-col gap-8 md:gap-12"
      >
        <div className="max-w-3xl">
          <FeatureCopy feature={feature} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {feature.media.map((m) => (
            <MediaSlot key={m.label} {...m} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id={feature.anchor}
      className="border-t border-white/10 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
    >
      <div className={feature.layout === "right" ? "md:order-1" : ""}>
        <FeatureCopy feature={feature} />
      </div>
      <div className={feature.layout === "right" ? "md:order-0" : ""}>
        {feature.media.map((m) => (
          <MediaSlot key={m.label} {...m} />
        ))}
      </div>
    </section>
  );
}

export default function ProductDetailPage() {
  const heroRef = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const product = PRODUCTS.find((p) => p.id === DETAIL.productId);

  useEffect(() => {
    if (reduced || !heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-item]",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "expo.out",
          delay: 0.15,
        },
      );
    }, heroRef);
    return () => ctx.revert();
  }, [reduced]);

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative border-b border-white/5 px-4 sm:px-6 md:px-12 py-12 sm:py-14 md:py-20 overflow-hidden"
      >
        <GridRails />
        <div className="relative max-w-rail mx-auto flex flex-col gap-10 md:gap-12">
          <div className="flex flex-col gap-6 max-w-3xl">
            <div
              className="flex items-center gap-4 flex-wrap"
              data-hero-item
            >
              <TerminalLabel variant="accent">
                {DETAIL.eyebrow.toUpperCase()}
              </TerminalLabel>
              {product && (
                <StatusBadge label={product.status} variant="active" />
              )}
              <Link
                to="/products"
                className="text-mono-label text-white/55 hover:text-accent inline-flex items-center gap-1.5 transition-colors py-2 -my-2"
              >
                <Icon icon="solar:arrow-left-linear" className="w-3 h-3" />
                All Products
              </Link>
            </div>
            <h1
              className="font-display font-light text-white text-display-hero"
              data-hero-item
            >
              {DETAIL.headline}
            </h1>
            <p
              className="text-white/65 text-lg leading-[1.6] font-light max-w-2xl"
              data-hero-item
            >
              Introducing{" "}
              <strong className="font-medium text-white">
                {DETAIL.intro.lead}
              </strong>
              {DETAIL.intro.text}
            </p>
            <div className="flex flex-wrap gap-3" data-hero-item>
              <CTAButton
                variant="primary"
                to={COMPLIANCE_DEMO_PATH}
                icon="solar:arrow-right-linear"
              >
                Request a demo
              </CTAButton>
              <CTAButton variant="secondary" onClick={scrollToFeatures}>
                Explore features
              </CTAButton>
            </div>
          </div>
          <div className="flex flex-col gap-2" data-hero-item>
            <MediaSlot label={DETAIL.hero.label} image={DETAIL.hero.image} aspect="16/9" eager />
            {DETAIL.hero.caption && (
              <p className="text-xs font-normal text-white/60">{DETAIL.hero.caption}</p>
            )}
          </div>
        </div>
      </section>

      {/* OVERVIEW + FEATURES */}
      <div className="px-4 sm:px-6 md:px-12">
        <div className="max-w-rail mx-auto">
          <section className="py-12 md:py-20 flex flex-col gap-4">
            <h2 className="font-display font-light text-white text-display-md leading-[1.08] max-w-3xl">
              {DETAIL.overview.title}
            </h2>
            <p className="text-white/65 text-body-md font-normal max-w-3xl">
              {DETAIL.overview.text}
            </p>
          </section>
          {DETAIL.features.map((feature) => (
            <FeatureSection key={feature.id} feature={feature} />
          ))}
        </div>
      </div>

      <PageCTA
        headline={DETAIL.cta.headline}
        subtext={DETAIL.cta.subtext}
        primaryLabel={DETAIL.cta.primaryLabel}
        primaryTo={COMPLIANCE_DEMO_PATH}
        secondaryLabel="See all products"
        secondaryTo="/products"
      />
    </>
  );
}
