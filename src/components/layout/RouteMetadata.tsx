import { useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { CASE_STUDIES } from "../../data/caseStudies";
import {
  COMPLIANCE_DEMO_HEADING,
  COMPLIANCE_DEMO_INTEREST,
} from "../../data/naming";

const SITE_URL = "https://gridhouse.digital";
const DEFAULT_IMAGE = `${SITE_URL}/images/hero-video-poster.jpg`;
const DEFAULT_DESCRIPTION =
  "Gridhouse Digital builds AI-native operational systems for regulated and workflow-heavy businesses.";

const pages: Record<string, { title: string; description: string }> = {
  "/": { title: "Gridhouse Digital: AI-Native Operational Systems", description: DEFAULT_DESCRIPTION },
  "/work": { title: "Work — Gridhouse Digital", description: "Selected operational systems, prototypes, and internal products built by Gridhouse Digital." },
  "/services": { title: "Services — Gridhouse Digital", description: "AI-first websites, web applications, automation, agents, compliance platforms, and product strategy." },
  "/products": { title: "Products — Gridhouse Digital", description: "Operational products built for healthcare, compliance, training, and workflow-heavy teams." },
  "/products/compliance-training": {
    title: "Gridhouse Compliance — Gridhouse Digital",
    description:
      "Gridhouse Compliance is training and compliance for Pennsylvania ODP and OLTL providers. Track required staff training, issue certificates, and catch overdue staff before inspections.",
  },
  "/industries": { title: "Industries — Gridhouse Digital", description: "Digital systems for healthcare, professional services, SMB operations, and regulated teams." },
  "/process": { title: "Process — Gridhouse Digital", description: "A structured delivery model built around two-week sprints, weekly reviews, and working systems." },
  "/insights": { title: "Insights — Gridhouse Digital", description: "Practical analysis on AI, operational systems, automation, compliance, and digital transformation." },
  "/about": { title: "About — Gridhouse Digital", description: "Meet the systems-led digital studio behind Gridhouse Digital." },
  "/contact": { title: "Start a Project — Gridhouse Digital", description: "Tell Gridhouse Digital about the operational system, platform, or automation you need to build." },
};

function titleCase(value: string) {
  return value.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function setMeta(selector: string, attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

export default function RouteMetadata() {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const complianceDemo =
    pathname === "/contact" && searchParams.get("interest") === COMPLIANCE_DEMO_INTEREST;

  useEffect(() => {
    const caseSlug = pathname.match(/^\/work\/([^/]+)$/)?.[1];
    const insightSlug = pathname.match(/^\/insights\/([^/]+)$/)?.[1];
    const study = caseSlug ? CASE_STUDIES.find((item) => item.slug === caseSlug) : undefined;
    const fallbackTitle = titleCase(caseSlug || insightSlug || "Page");
    const pageMetadata = pages[pathname] || (caseSlug
      ? { title: `${study?.title || fallbackTitle} — Gridhouse Digital`, description: study?.problem || DEFAULT_DESCRIPTION }
      : insightSlug
        ? { title: `${fallbackTitle} — Gridhouse Digital`, description: "A Gridhouse Digital insight on operational systems, AI, and workflow design." }
        : { title: "Page Not Found — Gridhouse Digital", description: DEFAULT_DESCRIPTION });
    const metadata = complianceDemo
      ? { ...pageMetadata, title: `${COMPLIANCE_DEMO_HEADING} — Gridhouse Digital` }
      : pageMetadata;
    const canonical = `${SITE_URL}${pathname === "/" ? "" : pathname}`;
    const noIndex = pathname.startsWith("/demo/") || (!pages[pathname] && !caseSlug && !insightSlug);
    const type = insightSlug ? "article" : "website";

    document.title = metadata.title;
    setMeta('meta[name="description"]', "name", "description", metadata.description);
    setMeta('meta[name="robots"]', "name", "robots", noIndex ? "noindex,nofollow" : "index,follow");
    setMeta('meta[property="og:title"]', "property", "og:title", metadata.title);
    setMeta('meta[property="og:description"]', "property", "og:description", metadata.description);
    setMeta('meta[property="og:type"]', "property", "og:type", type);
    setMeta('meta[property="og:url"]', "property", "og:url", canonical);
    setMeta('meta[property="og:image"]', "property", "og:image", DEFAULT_IMAGE);
    setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", metadata.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", metadata.description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", DEFAULT_IMAGE);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;

    document.getElementById("route-jsonld")?.remove();
    if (insightSlug) {
      const script = document.createElement("script");
      script.id = "route-jsonld";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: fallbackTitle,
        description: metadata.description,
        url: canonical,
        image: DEFAULT_IMAGE,
        publisher: { "@type": "Organization", name: "Gridhouse Digital", url: SITE_URL },
      });
      document.head.appendChild(script);
    }
  }, [pathname, complianceDemo]);

  return null;
}
