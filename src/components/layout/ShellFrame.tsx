import { Outlet, ScrollRestoration } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import IntroOverlay from "./IntroOverlay";
import RouteMetadata from "./RouteMetadata";

export default function ShellFrame() {
  return (
    <div className="relative min-h-screen bg-ink text-white flex flex-col">
      <IntroOverlay />
      <RouteMetadata />
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <ScrollRestoration />
    </div>
  );
}
