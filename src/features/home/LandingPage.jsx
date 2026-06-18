import LandingMain from "./sections/LandingMain";
import LandingServices from "./sections/LandingServices";
import LandingVendors from "./sections/LandingVendors";
import LandingSteps from "./sections/LandingSteps";
import LandingStatistics from "./sections/LandingStatistics";
import LandingFooter from "./sections/LandingFooter";
import DesktopNav from "./components/DesktopNav";
import MobileNav from "./components/MobileNav";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import AppLogo from "../../global_components/AppLogo";

function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className='min-h-screen w-full bg-gradient-to-b from-[#1c160e] via-[#0f0d0a] to-[#050505] text-white overflow-x-hidden relative dark'>
      <header className='fixed top-0 left-0 w-full z-50 bg-[#1c160e]/40 backdrop-blur-md border-b border-white/5 transition-all duration-300'>
        <nav className='w-full max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between'>
          <div className='flex items-center'>
            <AppLogo to='/' />
          </div>

          <div className='flex items-center'>
            <DesktopNav />
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='md:hidden text-stone-400 hover:text-yellow-500 transition-colors cursor-pointer flex items-center'
          >
            {mobileMenuOpen ? (
              <X className='w-6 h-6' />
            ) : (
              <Menu className='w-6 h-6' />
            )}
          </button>

          <MobileNav mobileMenuOpen={mobileMenuOpen} />
        </nav>
      </header>

      <main className='w-full px-4 sm:px-8 md:px-16 pt-24 flex flex-col gap-12 md:gap-20 lg:gap-24 relative z-10'>
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
