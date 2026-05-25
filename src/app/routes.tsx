import { createBrowserRouter } from "react-router-dom";
import ShellFrame from "../components/layout/ShellFrame";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ServicesPage from "../pages/ServicesPage";
import ProductsPage from "../pages/ProductsPage";
import IndustriesPage from "../pages/IndustriesPage";
import WorkPage from "../pages/WorkPage";
import ProcessPage from "../pages/ProcessPage";
import InsightsPage from "../pages/InsightsPage";
import InsightDetailPage from "../pages/InsightDetailPage";
import ContactPage from "../pages/ContactPage";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ShellFrame />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "industries", element: <IndustriesPage /> },
      { path: "work", element: <WorkPage /> },
      { path: "process", element: <ProcessPage /> },
      { path: "insights", element: <InsightsPage /> },
      { path: "insights/:slug", element: <InsightDetailPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
