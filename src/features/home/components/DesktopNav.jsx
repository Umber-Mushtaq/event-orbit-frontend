import { useLocation } from "react-router";

const NAV_ITEMS = [
  { label: "Home", path: "" },
  { label: "Services", path: "services" },
  { label: "Vendors", path: "vendors" },
  { label: "How It Works", path: "how-it-works" },
];

function DesktopNav() {
  const location = useLocation();
  const currentSection =
    location.pathname.replace("/", "") || location.hash.replace("#", "");

  return (
    <div className='hidden md:flex items-center gap-10 font-poppins text-sm font-normal tracking-wide'>
      {NAV_ITEMS.map((item) => {
        const isActive = currentSection === item.path;

        return (
          <a
            key={item.path}
            href={item.path === "" ? "#" : `#${item.path}`}
            className={`cursor-pointer transition-all duration-300 text-sm tracking-wide relative pb-2 ${
              isActive
                ? "text-[#d4af37] font-medium drop-shadow-[0_0_12px_rgba(212,175,55,0.5)]"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            {item.label}

            {/* THE LIGHT GOLD BORDER UNDERNEATH THE ACTIVE TEXT */}
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-[#d4af37]/60 rounded-full transition-all duration-300 ${
                isActive ? "w-full opacity-100" : "w-0 opacity-0"
              }`}
            />
          </a>
        );
      })}
    </div>
  );
}

export default DesktopNav;
