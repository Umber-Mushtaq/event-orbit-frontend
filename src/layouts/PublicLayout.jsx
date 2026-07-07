import { Outlet } from "react-router";
import LandingPageFooter from "../pages/landing/ui/LandingPageFooter";
import LandingPageHeader from "../pages/landing/ui/LandingPageHeader";

function PublicLayout() {
  return (
    <div className='flex flex-col min-h-screen bg-neutral-800'>
      <LandingPageHeader />
      <main className='flex-grow'>
        <Outlet />
      </main>
      <LandingPageFooter />
    </div>
  );
}

export default PublicLayout;
