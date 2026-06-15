import { useLocation } from "react-router";

const NAV_ITEMS = [
  { label: "Services", path: "services" },
  { label: "Vendors", path: "vendors" },
  { label: "How It Works", path: "how-it-works" },
];

function DesktopNav() {
  const location = useLocation();
  const currentSection =
    location.pathname.replace("/", "") || location.hash.replace("#", "");

  return (
    <div className='hidden md:flex items-center gap-8 font-poppins font-medium tracking-wide uppercase'>
      {NAV_ITEMS.map((item) => {
        const isActive = currentSection === item.path;

        return (
          <a
            key={item.path}
            href={`#${item.path}`}
            className={`transition-all duration-200 cursor-pointer relative ${
              isActive
                ? "text-border-gold font-semibold"
                : "text-stone-400 hover:text-border-gold-hover"
            }`}
          >
            {item.label}
          </a>
        );
      })}
    </div>
  );
}

export default DesktopNav;
