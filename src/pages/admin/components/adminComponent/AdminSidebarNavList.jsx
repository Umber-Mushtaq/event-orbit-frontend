import { NavLink } from "react-router";
import { adminNavigation } from "../../data/admin-data/adminNavigationData";
import { iconMap } from "./adminIconMap";

function AdminSidebarNavList({ activePath, isCollapsed, onNavigate }) {
  return (
    <nav className='flex-1 space-y-1.5 overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'>
      {adminNavigation.map((item) => {
        const Icon = iconMap[item.icon];
        const isActive =
          item.path === "/admin/dashboard" ? activePath === item.path : activePath.startsWith(item.path);

        return (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={`group relative flex items-center gap-4 rounded-2xl border px-3 py-2.5 text-[17px] font-semibold transition-all duration-300 ${
              isActive
                ? "border-border-gold/35 bg-admin-surface-2 text-border-gold-hover shadow-[0_0_0_1px_rgba(212,175,55,0.16)]"
                : "border-transparent text-admin-muted hover:bg-admin-input hover:text-admin-foreground"
            } ${isCollapsed ? "lg:mx-auto lg:h-12 lg:w-12 lg:justify-center lg:gap-0 lg:px-0" : ""}`}
            title={isCollapsed ? item.label : undefined}
          >
            {isActive ? (
              <span
                className={`absolute bg-border-gold ${
                  isCollapsed ? "left-1/2 top-1 h-1 w-6 -translate-x-1/2 rounded-full" : "left-0 top-2 bottom-2 w-1 rounded-r-full"
                }`}
              />
            ) : null}
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/5 bg-black/20 transition-all duration-300 ${
                isActive
                  ? "text-border-gold-hover shadow-[0_0_0_1px_rgba(212,175,55,0.18)]"
                  : "text-border-gold-hover/80 group-hover:border-border-gold/20 group-hover:bg-admin-input"
              } ${isCollapsed ? "lg:h-11 lg:w-11" : ""}`}
            >
              <Icon className='h-5 w-5 shrink-0' />
            </span>
            <span className={isCollapsed ? "lg:sr-only" : "block"}>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

export default AdminSidebarNavList;
