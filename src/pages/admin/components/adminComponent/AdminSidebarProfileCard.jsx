import { ChevronDown } from "lucide-react";
import AdminSidebarProfileMenu from "./AdminSidebarProfileMenu";

function AdminSidebarProfileCard({
  isCollapsed,
  profileMenuOpen,
  profileAvatar,
  profileInitials,
  profileName,
  profileRole,
  onToggleMenu,
  onOpenProfile,
  onOpenPreferences,
  onLogout,
}) {
  return (
    <div className={`relative mt-4 rounded-[1.6rem] border border-admin-border bg-admin-surface p-3 ${isCollapsed ? "lg:p-2" : ""}`}>
      <button
        type='button'
        onClick={onToggleMenu}
        className={`flex w-full items-center gap-3 text-left ${isCollapsed ? "lg:flex-col lg:items-center lg:gap-2" : ""}`}
        aria-expanded={profileMenuOpen}
        aria-haspopup='menu'
      >
        {profileAvatar ? (
          <img
            src={profileAvatar}
            alt='Admin profile'
            className={`h-12 w-12 rounded-full object-cover ring-1 ring-border-gold/20 ${isCollapsed ? "lg:h-11 lg:w-11" : ""}`}
          />
        ) : (
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full border border-border-gold/25 bg-gradient-to-br from-[#251c09] to-[#111111] text-sm font-extrabold tracking-[0.08em] text-[#ffd36c] ring-1 ring-border-gold/20 ${isCollapsed ? "lg:h-11 lg:w-11" : ""}`}
            aria-label='Admin profile initials'
          >
            {profileInitials}
          </div>
        )}
        <div className={isCollapsed ? "lg:hidden" : "min-w-0 flex-1"}>
          <p className='truncate text-sm font-semibold text-white'>{profileName}</p>
          <p className='text-xs text-stone-400'>{profileRole}</p>
        </div>
        <ChevronDown
          className={`h-4 w-4 text-stone-300 transition-transform ${
            profileMenuOpen ? "rotate-180" : ""
          } ${isCollapsed ? "lg:hidden" : ""}`}
        />
      </button>

      {profileMenuOpen ? (
        <AdminSidebarProfileMenu
          onOpenProfile={onOpenProfile}
          onOpenPreferences={onOpenPreferences}
          onLogout={onLogout}
        />
      ) : null}
    </div>
  );
}

export default AdminSidebarProfileCard;
