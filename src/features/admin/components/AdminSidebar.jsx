import { useMemo } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { ChevronDown, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import avatar from "../../../assets/avatar3.jpg";
import { adminNavigation } from "../data/adminNavigationData";
import { iconMap } from "./adminIconMap";

function AdminSidebar({
  isCollapsed,
  isMobileOpen,
  closeMobileOpen,
  toggleCollapsed,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const activePath = useMemo(() => {
    return location.pathname;
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth/login");
  };

  const sidebarWidth = isCollapsed ? "lg:w-[92px]" : "lg:w-[286px]";
  const mobileClass = isMobileOpen
    ? "translate-x-0"
    : "-translate-x-full lg:translate-x-0";
  const profileName = "Aarav Sharma";
  const profileRole = "Super Admin";

  return (
    <>
      {isMobileOpen ? (
        <button
          type='button'
          onClick={closeMobileOpen}
          className='fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden'
          aria-label='Close navigation'
        />
      ) : null}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[286px] flex-col border-r border-border-gold/10 bg-[#090909]/95 px-3 py-4 backdrop-blur-xl transition-all duration-300 ${sidebarWidth} ${mobileClass}`}
      >
        <div className='mb-4 flex items-center justify-between gap-3 px-1'>
          <div className='text-[11px] font-semibold uppercase tracking-[0.3em] text-border-gold-hover/80'>
            Workspace
          </div>
          <button
            type='button'
            onClick={toggleCollapsed}
            className='hidden rounded-full border border-white/10 bg-white/5 p-2 text-stone-300 transition hover:border-border-gold/30 hover:text-white lg:inline-flex'
            aria-label='Collapse sidebar'
          >
            {isCollapsed ? (
              <PanelLeftOpen className='h-4 w-4' />
            ) : (
              <PanelLeftClose className='h-4 w-4' />
            )}
          </button>
          <button
            type='button'
            onClick={closeMobileOpen}
            className='inline-flex rounded-full border border-white/10 bg-white/5 p-2 text-stone-300 lg:hidden'
            aria-label='Close sidebar'
          >
            <X className='h-4 w-4' />
          </button>
        </div>

        <nav className='flex-1 space-y-2 overflow-y-auto pr-1'>
          {adminNavigation.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive =
              item.path === "/admin/dashboard"
                ? activePath === item.path
                : activePath.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMobileOpen}
                className={`group flex items-center gap-4 rounded-2xl border px-3 py-3.5 text-[17px] font-semibold transition-all duration-300 ${
                  isActive
                    ? "border-border-gold/35 bg-[#111318] text-[#ffd778] shadow-[0_0_0_1px_rgba(212,175,55,0.16)]"
                    : "border-transparent text-stone-300 hover:bg-white/5 hover:text-white"
                } ${isCollapsed ? "lg:justify-center lg:px-2" : ""}`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className='h-5 w-5 shrink-0 text-border-gold-hover/80' />
                <span className={isCollapsed ? "lg:hidden" : "block"}>
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </nav>

        <div className='mt-4 rounded-3xl border border-white/8 bg-[#111111] p-3'>
          <div className={`flex items-center gap-3 ${isCollapsed ? "lg:justify-center" : ""}`}>
            <img
              src={avatar}
              alt='Admin profile'
              className='h-12 w-12 rounded-full object-cover ring-1 ring-border-gold/20'
            />
            <div className={isCollapsed ? "lg:hidden" : "min-w-0 flex-1"}>
              <p className='truncate text-sm font-semibold text-white'>{profileName}</p>
              <p className='text-xs text-stone-400'>{profileRole}</p>
            </div>
            <button
              type='button'
              onClick={handleLogout}
              className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-stone-200 transition hover:border-border-gold/30 hover:text-white ${isCollapsed ? "lg:hidden" : ""}`}
              aria-label='Sign out'
            >
              <ChevronDown className='h-4 w-4' />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
