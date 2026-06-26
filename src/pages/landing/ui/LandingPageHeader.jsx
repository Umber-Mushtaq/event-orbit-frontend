import React, { useState } from "react";
import AppLogo from "../../../shared_components/AppLogo";
import { NavLink } from "react-router";

function LandingPageHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `transition ${
      isActive
        ? "border-b-2 border-amber-400 font-semibold drop-shadow-md"
        : "hover:text-amber-400"
    }`;

  return (
    <header className='sticky top-0 z-1000 flex items-center text-neutral-900 bg-neutral-800 justify-between px-6 py-4 border-b border-border-gold shadow-md'>
      <AppLogo />
      <nav className='hidden md:flex flex-1 justify-center space-x-6 font-medium'>
        <NavLink to='/' className={linkClasses}>
          Home
        </NavLink>
        <NavLink to='/services' className={linkClasses}>
          Services
        </NavLink>
        <NavLink to='/vendors' className={linkClasses}>
          Vendors
        </NavLink>
        <NavLink to='/about' className={linkClasses}>
          About
        </NavLink>
        <NavLink to='/contact' className={linkClasses}>
          Contact
        </NavLink>
      </nav>

      {/* Desktop Login */}
      <div className='hidden md:block'>
        <NavLink
          to='/auth'
          className={({ isActive }) =>
            `px-4 py-2 rounded-md font-semibold shadow-gold-glow transition ${
              isActive
                ? "bg-amber-300 text-neutral-950 shadow-gold-glow-hover"
                : "bg-amber-400 text-neutral-950 hover:bg-amber-300 hover:shadow-gold-glow-hover"
            }`
          }
        >
          Login
        </NavLink>
      </div>

      {/* Mobile Hamburger */}
      <div className='md:hidden'>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='text-neutral-900 hover:text-amber-400 transition'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            {menuOpen ? (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            ) : (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className='absolute top-full left-0 w-full bg-neutral-800 shadow-md md:hidden z-50'>
          <nav className='flex flex-col px-5 space-y-4 py-6 font-medium'>
            <NavLink to='/' className={linkClasses}>
              Home
            </NavLink>
            <NavLink to='/services' className={linkClasses}>
              Services
            </NavLink>
            <NavLink to='/vendors' className={linkClasses}>
              Vendors
            </NavLink>
            <NavLink to='/about' className={linkClasses}>
              About
            </NavLink>
            <NavLink to='/contact' className={linkClasses}>
              Contact
            </NavLink>
            {/* Mobile Login */}
            <NavLink
              to='/auth'
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-center font-semibold shadow-gold-glow transition ${
                  isActive
                    ? "bg-amber-300 text-neutral-950 shadow-gold-glow-hover"
                    : "bg-amber-400 text-neutral-950 hover:bg-amber-300 hover:shadow-gold-glow-hover"
                }`
              }
            >
              Login
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}

export default LandingPageHeader;
