import React, { useState } from "react";
import { useLogout } from "../../auth/hooks/useLogout";
import { Link, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  FolderKanban,
  CalendarRange,
  MessageSquare,
  LogOut,
} from "lucide-react";
import AppLogo from "../../../shared_components/AppLogo";
import { LogoutConfirmationModal } from "../../../shared_components/LogoutConfirmationModal";

const SIDEBAR_ITEMS = [
  {
    id: "overview",
    label: "Overview",
    Icon: LayoutDashboard,
    to: "/vendor/dashboard",
  },
  {
    id: "services",
    label: "Manage Services",
    Icon: FolderKanban,
    to: "/vendor/dashboard/services",
  },
  {
    id: "bookings",
    label: "Booking Requests",
    Icon: CalendarRange,
    to: "/vendor/dashboard/bookings",
  },
  {
    id: "reviews",
    label: "Reviews",
    Icon: MessageSquare,
    to: "/vendor/dashboard/reviews",
  },
];

export function DashboardSidebar() {
  const logout = useLogout();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  return (
    <>
      <aside className='fixed top-0 left-0 h-screen w-20 bg-neutral-900 backdrop-blur-md border-r border-white/5 flex flex-col justify-between items-center py-6 z-40 transition-all duration-300 hover:border-r-border-gold/20 shadow-xl'>
        <AppLogo to='/vendor/dashboard' />

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
                <IconComponent
                  className={`w-5 h-5 transition-transform duration-300 ${!isActive && "group-hover:scale-110"}`}
                />
                {isActive && (
                  <span className='absolute left-`-left-3` top-1/4 h-1/2 w-`w-0.75` bg-border-gold-hover rounded-r-full' />
                )}
              </Link>
            );
          })}
        </div>

        <div className='w-full px-3'>
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            title='Log Out'
            className='w-full aspect-square rounded-xl flex items-center justify-center text-stone-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer group'
          >
            <LogOut className='w-5 h-5 transition-transform group-hover:-translate-x-0.5' />
          </button>
        </div>
      </aside>

      {/* Render the clean extracted module engine */}
      <LogoutConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={logout}
      />
    </>
  );
}
