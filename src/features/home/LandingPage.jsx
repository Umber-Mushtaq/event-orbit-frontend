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
import AppLogo from "./components/Logo";

function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <section className='min-h-screen w-full bg-neutral-950 bg-cover bg-center bg-no-repeat flex flex-col justify-between gap-6 pt-4 pb-6 px-8 md:px-16 relative'>
      <nav className='sticky top-4 left-4 w-full max-w-7xl mx-auto bg-glass-gold-hover backdrop-blur-md border border-white/10 rounded-2xl py-3 px-6 flex items-center justify-between z-30 shadow-lg mt-2'>
        <AppLogo />
        <DesktopNav />
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className='md:hidden text-stone-300 hover:text-border-gold-hover transition-colors cursor-pointer'
        >
          {mobileMenuOpen ? (
            <X className='w-6 h-6' />
          ) : (
            <Menu className='w-6 h-6' />
          )}
        </button>

        <MobileNav mobileMenuOpen={mobileMenuOpen} />
      </nav>
      <LandingMain />
      <LandingServices />
      <LandingVendors />
      <LandingSteps />
      <LandingStatistics />
      <LandingFooter />
    </section>
  );
}

export default LandingPage;
