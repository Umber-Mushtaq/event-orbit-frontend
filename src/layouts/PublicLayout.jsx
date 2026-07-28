import { Outlet } from "react-router";
import { useLocation } from "react-router";
import LandingPageFooter from "../pages/landing/ui/LandingPageFooter";
import LandingPageHeader from "../pages/landing/ui/LandingPageHeader";
import SEO from "../seo/SEO";
import { getRouteSeo } from "../seo/routeSeo";

function PublicLayout() {
  const location = useLocation();

  return (
    <div className='flex min-h-screen flex-col bg-background text-foreground'>
      <SEO {...getRouteSeo(location.pathname)} />
      <LandingPageHeader />
      <main className='flex-grow'>
        <Outlet />
      </main>
      <LandingPageFooter />
    </div>
  );
}

export default PublicLayout;
