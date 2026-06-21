import { useLocation, Link } from "react-router";

const NAV_ITEMS = [
  { label: "Services", path: "services" },
  { label: "Vendors", path: "vendors" },
  { label: "How It Works", path: "how-it-works" },
];

function MobileNav({ mobileMenuOpen }) {
  const location = useLocation();

  const currentSection =
    location.pathname.replace("/", "") || location.hash.replace("#", "");

  return (
    <>
      {mobileMenuOpen && (
        <div className='absolute top-[calc(100%+12px)] left-0 right-0 bg-neutral-900/95 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex flex-col gap-4 text-center font-poppins text-sm tracking-wide uppercase text-stone-300 shadow-2xl md:hidden z-40 animate-fade-in'>
          {NAV_ITEMS.map((item) => {
            const isActive = currentSection === item.path;

            return (
              <a
                key={item.path}
                href={`#${item.path}`}
                className={`py-2 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "text-border-gold-hover font-semibold"
                    : "text-stone-400 hover:text-border-gold-hover"
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <Link
            to='/auth'
            className='w-full bg-glass-gold text-white border border-border-gold shadow-gold-glow font-poppins tracking-wide font-semibold py-3 px-5 rounded-xl backdrop-blur-md hover:bg-glass-gold-hover hover:border-border-gold-hover hover:shadow-gold-glow-hover active:scale-98 transition-all duration-300 cursor-pointer  inline-flex items-center justify-center disabled:opacity-50'
          >
            Get Started
          </Link>
        </div>
      )}
    </>
  );
}

export default MobileNav;
