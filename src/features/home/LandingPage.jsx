import LandingMain from "./sections/LandingMain";
import LandingServices from "./sections/LandingServices";
import LandingVendors from "./sections/LandingVendors";
import LandingSteps from "./sections/LandingSteps";
import LandingStatistics from "./sections/LandingStatistics";
import LandingFooter from "./sections/LandingFooter";
import DesktopNav from "./components/DesktopNav";
import MobileNav from "./components/MobileNav";

import AppLogo from "../../global_components/AppLogo";
import { Link, Outlet } from "react-router";

function LandingPage() {
  return (
    <div className='min-h-screen w-full bg-gradient-to-b from-[#1c160e] via-[#0f0d0a] to-[#050505] text-white overflow-x-hidden relative dark'>
      <main className='w-full px-4 sm:px-8 md:px-16 pt-10 flex flex-col gap-12 md:gap-20 lg:gap-24 relative z-10'>
        <LandingMain />
        <LandingServices />
        <LandingVendors />
        <LandingSteps />
        <LandingStatistics />
      </main>

      <footer className='w-full px-4 sm:px-8 md:px-16 mt-16 md:mt-24 border-t border-white/5 pt-8 pb-12'>
        <LandingFooter />
      </footer>
    </div>
  );
}

export default LandingPage;
