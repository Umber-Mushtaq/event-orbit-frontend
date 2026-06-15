import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  FolderKanban,
  CalendarRange,
  MessageSquare,
  Settings,
  LogOut,
  AlertTriangle,
  X,
} from "lucide-react";
import AppLogo from "../../home/components/Logo";

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
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    navigate("/auth/login");
  };

  return (
    <>
      <aside className='fixed top-0 left-0 h-screen w-20 bg-neutral-900 backdrop-blur-md border-r border-white/5 flex flex-col justify-between items-center py-6 z-40 transition-all duration-300 hover:border-r-border-gold/20 shadow-xl'>
        <Link
          to='/dashboard'
          className='w-13 h-13 rounded-xl bg-glass-gold border border-border-gold/30 text-border-gold flex items-center justify-center shadow-gold-glow animate-pulse [animation-duration:4s]'
        >
          <AppLogo />
        </Link>

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
      {isLogoutModalOpen && (
        <div className='fixed inset-0 w-full h-full bg-white/10 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in'>
          <div className='w-full max-w-md bg-neutral-900 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative flex flex-col items-center text-center animate-scale-fade'>
            <button
              onClick={() => setIsLogoutModalOpen(false)}
              className='absolute top-4 right-4 text-stone-500 hover:text-white transition-colors cursor-pointer'
            >
              <X className='w-5 h-5' />
            </button>

            <div className='w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 mb-5 shadow-[0_0_15px_rgba(239,68,68,0.1)]'>
              <AlertTriangle className='w-6 h-6' />
            </div>

            <h2 className='font-montserrat font-bold text-xl text-white tracking-tight'>
              Confirm Log Out
            </h2>
            <p className='font-poppins font-light text-xs text-stone-400 mt-2 leading-relaxed max-w-xs'>
              Are you sure you want to log out of your session? You will need to
              re-authenticate to access your vendor wedding dashboard planner
              again.
            </p>

            <div className='grid grid-cols-2 gap-4 w-full mt-8'>
              <button
                type='button'
                onClick={() => setIsLogoutModalOpen(false)}
                className='w-full bg-neutral-800 hover:bg-neutral-700 border border-white/5 text-stone-300 font-poppins text-xs font-semibold py-3 px-4 rounded-xl transition-all cursor-pointer'
              >
                No, Stay
              </button>

              <button
                type='button'
                onClick={handleConfirmLogout}
                className='w-full bg-red-500 text-white font-poppins text-xs font-semibold py-3 px-4 rounded-xl hover:bg-red-600 active:scale-98 transition-all cursor-pointer shadow-lg shadow-red-500/10'
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
