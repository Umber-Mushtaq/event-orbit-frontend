import { Outlet, Link } from "react-router";
import { Sparkles } from "lucide-react";
import AppLogo from "../../global_components/AppLogo";

function PublicLayout() {
  return (
    <div className='min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans relative antialiased selection:bg-amber-500 selection:text-neutral-950'>
      <header className='border-b border-neutral-900/60 bg-neutral-950/80 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative'>
          <div className='flex items-center'>
            <AppLogo to='/' />
          </div>

          <nav className='flex items-center gap-8 text-sm font-medium tracking-wide h-full'>
            <Link
              to='/'
              className='text-neutral-400 hover:text-white transition-colors font-poppins text-xs uppercase font-semibold tracking-widest relative py-2 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-amber-400 hover:after:w-full after:transition-all after:duration-300'
            >
              Home
            </Link>

            <Link
              to='/allServices'
              className='text-amber-500 whitespace-nowrap hover:text-amber-400 transition-colors font-poppins text-xs uppercase font-semibold tracking-widest flex items-center gap-2 py-2 group'
            >
              <span className='relative flex h-2 w-2'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-2 w-2 bg-amber-500'></span>
              </span>
              Explore Services
            </Link>

            <Link
              to='/auth'
              className='bg-gradient-to-r from-amber-500/10 to-amber-600/10 hover:from-amber-500/20 hover:to-amber-600/20 text-amber-400 hover:text-amber-300 border border-amber-500/30 hover:border-amber-400/60 font-poppins tracking-widest font-bold text-[11px] uppercase px-5 py-2.5 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.05)] hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] active:scale-95 transition-all duration-300 cursor-pointer inline-flex items-center justify-center'
            >
              Get Started
            </Link>
          </nav>
        </div>
      </header>

      <div className='flex-1 flex flex-col '>
        <Outlet />
      </div>

      <footer className='border-t border-neutral-900 bg-neutral-950 py-6 mt-auto'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-poppins'>
          <p>© {new Date().getFullYear()} EventOrbit. All rights reserved.</p>
          <p className='tracking-widest uppercase text-neutral-400'>
            Premium Marketplace Framework
          </p>
        </div>
      </footer>
    </div>
  );
}

export default PublicLayout;
