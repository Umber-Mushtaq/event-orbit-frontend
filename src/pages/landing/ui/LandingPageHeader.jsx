import React, { useState, useEffect } from "react";
import AppLogo from "../../../shared_components/AppLogo";
import { NavLink } from "react-router";
import ThemeToggle from "../../../shared_components/ThemeToggle";

function LandingPageHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const isLoggedIn = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  const getDashboardPath = () => {
    if (!isLoggedIn || !userString) return "/auth";

    try {
      const user = JSON.parse(userString);
      const role = user.role?.toLowerCase();

      if (role === "admin") return "/admin/dashboard";
      if (role === "vendor") return "/vendor/dashboard";
      if (role === "customer") return "/customer/dashboard";

      return "/dashboard";
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return "/auth";
    }
  };

  const dashboardPath = getDashboardPath();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClasses = ({ isActive }) =>
    `transition ${
      isActive
        ? "border-b-2 border-amber-400 font-semibold drop-shadow-md text-amber-400"
        : "text-foreground hover:text-primary"
    }`;

  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${
        isSticky
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-md"
          : "bg-background border-b border-border"
      }`}
    >
      <AppLogo />

      <nav className='hidden md:flex flex-1 justify-center space-x-6 font-medium'>
        <NavLink to='/' className={linkClasses}>
          Home
        </NavLink>
        <NavLink to='/categories' className={linkClasses}>
          Categories
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
        <NavLink to='/blog' className={linkClasses}>
          Blog
        </NavLink>
      </nav>

      <div className='hidden items-center gap-3 md:flex'>
        <ThemeToggle />
        <NavLink
          to={isLoggedIn ? dashboardPath : "/auth"}
          className={({ isActive }) =>
            `rounded-md px-4 py-2 font-semibold shadow-gold-glow transition ${
              isActive
                ? "bg-primary/90 text-primary-foreground shadow-gold-glow-hover"
                : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-gold-glow-hover"
            }`
          }
        >
          {isLoggedIn ? "Dashboard" : "Login"}
        </NavLink>
      </div>

      <div className='flex items-center gap-2 md:hidden'>
        <ThemeToggle className='h-10 w-10' />
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className='rounded-xl border border-border bg-background p-2 text-foreground transition hover:text-primary'
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

      {menuOpen && (
        <div className='absolute left-0 top-full z-50 w-full border-b border-border bg-background/95 shadow-md backdrop-blur-lg md:hidden'>
          <nav className='flex flex-col px-5 space-y-4 py-6 font-medium'>
            <NavLink to='/' className={linkClasses}>
              Home
            </NavLink>
            <NavLink to='/categories' className={linkClasses}>
              Categories
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
            <NavLink to='/blog' className={linkClasses}>
              Blog
            </NavLink>
            <NavLink
              to={isLoggedIn ? dashboardPath : "/auth"}
              className={({ isActive }) =>
                `rounded-md px-4 py-2 text-center font-semibold shadow-gold-glow transition ${
                  isActive
                    ? "bg-primary/90 text-primary-foreground shadow-gold-glow-hover"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-gold-glow-hover"
                }`
              }
            >
              {isLoggedIn ? "Dashboard" : "Login"}
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}

export default LandingPageHeader;
