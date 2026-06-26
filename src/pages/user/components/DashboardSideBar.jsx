import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  FolderKanban,
  CalendarRange,
  MessageSquare,
  Settings,
  LogOut,
  Orbit,
} from "lucide-react";
import AppLogo from "../../../shared_components/AppLogo";

const SIDEBAR_ITEMS = [
  {
    id: "overview",
    label: "Overview",
    Icon: LayoutDashboard,
    to: "/customer/dashboard",
  },
  {
    id: "services",
    label: "Service Listings",
    Icon: FolderKanban,
    to: "/customer/dashboard/services",
  },
  {
    id: "bookings",
    label: "My Bookings",
    Icon: CalendarRange,
    to: "/customer/dashboard/bookings",
  },
  {
    id: "wishlist",
    label: "My Wishlist",
    Icon: MessageSquare,
    to: "/customer/dashboard/wishlist",
  },
];

export function DashboardSidebar() {
  const location = useLocation();

  return (
    <aside className='fixed top-0 left-0 h-screen w-20 bg-neutral-900 backdrop-blur-md border-r border-white/5 flex flex-col justify-between items-center py-6 z-40 transition-all duration-300 hover:border-r-border-gold/20 shadow-xl'>
      <AppLogo to='/' />

      <div className='flex flex-col gap-5 w-full px-3'>
        {SIDEBAR_ITEMS.map((item) => {
          const IconComponent = item.Icon;
          const isActive =
            item.id === "overview"
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);

          return (
            <Link
              key={item.id}
              to={item.to}
              title={item.label}
              className={`w-full aspect-square rounded-xl flex items-center justify-center relative transition-all duration-300 group cursor-pointer ${
                isActive
                  ? "bg-glass-gold text-border-gold-hover border border-border-gold shadow-gold-glow scale-105"
                  : "text-stone-400 hover:text-stone-300 hover:bg-white/5"
              }`}
            >
              <IconComponent className='w-5 h-5 transition-transform duration-300 group-hover:scale-110' />
              {isActive && (
                <span className='absolute left-[-12px] top-1/4 h-1/2 w-[3px] bg-border-gold-hover rounded-r-full' />
              )}
            </Link>
          );
        })}
      </div>

      <div className='w-full px-3'>
        <Link
          title='Logout'
          to='/auth/login'
          className='w-full aspect-square rounded-xl flex items-center justify-center text-stone-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer'
        >
          <LogOut className='w-5 h-5' />
        </Link>
      </div>
    </aside>
  );
}
