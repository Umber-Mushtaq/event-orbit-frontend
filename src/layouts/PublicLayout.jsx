import { Outlet } from "react-router";
import LandingPageFooter from "../pages/landing/ui/LandingPageFooter";
import LandingPageHeader from "../pages/landing/ui/LandingPageHeader";

function PublicLayout() {
  return (
    <div className='flex min-h-screen flex-col bg-background text-foreground'>
      <LandingPageHeader />
      <main className='flex-grow'>
        <Outlet />
      </main>
      <LandingPageFooter />
    </div>
  );
}

export default PublicLayout;
