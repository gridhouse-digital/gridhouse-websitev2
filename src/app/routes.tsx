import { createBrowserRouter } from "react-router-dom";
import type { ComponentType } from "react";
import ShellFrame from "../components/layout/ShellFrame";

const page = (load: () => Promise<{ default: ComponentType }>) => async () => ({
  Component: (await load()).default,
});

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ShellFrame />,
    HydrateFallback: () => (
      <div className="min-h-screen bg-ink" role="status" aria-label="Loading page" />
    ),
    children: [
      { index: true, lazy: page(() => import("../pages/HomePage")) },
      { path: "about", lazy: page(() => import("../pages/AboutPage")) },
      { path: "services", lazy: page(() => import("../pages/ServicesPage")) },
      { path: "products", lazy: page(() => import("../pages/ProductsPage")) },
      { path: "products/compliance-training", lazy: page(() => import("../pages/ProductDetailPage")) },
      { path: "industries", lazy: page(() => import("../pages/IndustriesPage")) },
      { path: "work", lazy: page(() => import("../pages/WorkPage")) },
      { path: "process", lazy: page(() => import("../pages/ProcessPage")) },
      { path: "insights", lazy: page(() => import("../pages/InsightsPage")) },
      { path: "insights/:slug", lazy: page(() => import("../pages/InsightDetailPage")) },
      { path: "work/:slug", lazy: page(() => import("../pages/CaseStudyDetailPage")) },
      { path: "contact", lazy: page(() => import("../pages/ContactPage")) },
      { path: "demo/hero-visuals", lazy: page(() => import("../pages/HeroVisualDemoPage")) },
      { path: "*", lazy: page(() => import("../pages/NotFoundPage")) },
    ],
  },
]);
