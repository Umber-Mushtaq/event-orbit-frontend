import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import AppLogo from "../../../../shared_components/AppLogo";
import useAdminSidebar from "./useAdminSidebar";
import AdminSidebarNavList from "./AdminSidebarNavList";
import AdminSidebarProfileCard from "./AdminSidebarProfileCard";
import AdminProfileEditorModal from "./AdminProfileEditorModal";
import AdminPreferencesEditorModal from "./AdminPreferencesEditorModal";

function AdminSidebar({ isCollapsed, isMobileOpen, closeMobileOpen, toggleCollapsed }) {
  const location = useLocation();
  const navigate = useNavigate();
  const activePath = useMemo(() => location.pathname, [location.pathname]);
  const sidebar = useAdminSidebar(navigate);

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
        className={`fixed left-0 top-0 z-50 flex h-screen w-[286px] flex-col border-r border-admin-border bg-admin-surface/95 px-2 py-4 backdrop-blur-xl transition-all duration-300 ${
          isCollapsed ? "lg:w-[84px]" : "lg:w-[286px]"
        } ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className='relative mb-4 flex items-center gap-2 px-1'>
          <div className='flex min-w-0 flex-1 items-center gap-2'>
            <AppLogo to='/admin/dashboard' className='shrink-0' imgClassName={isCollapsed ? "w-8" : ""} />
            <div
              className={`text-[11px] font-semibold uppercase tracking-[0.3em] text-border-gold-hover/80 ${
                isCollapsed ? "hidden" : ""
              }`}
            >
              Workspace
            </div>
          </div>
          <button
            type='button'
            onClick={toggleCollapsed}
            className='absolute -right-6 top-1/2 hidden h-8 w-8 shrink-0 -translate-y-1/2 items-center justify-center rounded-full border border-admin-border bg-admin-surface text-admin-muted transition hover:border-border-gold/30 hover:text-admin-foreground lg:inline-flex'
            aria-label='Collapse sidebar'
          >
            {isCollapsed ? <ChevronRight className='h-5 w-5' /> : <ChevronLeft className='h-5 w-5' />}
          </button>
          <button
            type='button'
            onClick={closeMobileOpen}
            className='inline-flex rounded-full border border-admin-border bg-admin-surface p-2 text-admin-muted lg:hidden'
            aria-label='Close sidebar'
          >
            <X className='h-4 w-4' />
          </button>
        </div>

        <AdminSidebarNavList
          activePath={activePath}
          isCollapsed={isCollapsed}
          onNavigate={closeMobileOpen}
        />

        <AdminSidebarProfileCard
          isCollapsed={isCollapsed}
          profileMenuOpen={sidebar.profileMenuOpen}
          profileAvatar={sidebar.profileAvatar}
          profileInitials={sidebar.profileInitials}
          profileName={sidebar.profileName}
          profileRole={sidebar.profileRole}
          onToggleMenu={() => sidebar.setProfileMenuOpen((open) => !open)}
          onOpenProfile={sidebar.openProfileEditor}
          onOpenPreferences={sidebar.openPreferencesEditor}
          onLogout={sidebar.handleLogout}
        />
      </aside>

      <AdminProfileEditorModal
        open={sidebar.profileEditorOpen}
        onClose={() => sidebar.setProfileEditorOpen(false)}
        onSave={sidebar.handleProfileSave}
        saving={sidebar.savingProfile}
        error={sidebar.profileError}
        profileForm={sidebar.profileForm}
        setProfileForm={sidebar.setProfileForm}
        avatarDisplay={sidebar.avatarDisplay}
        avatarFileName={sidebar.avatarFileName}
        avatarDragging={sidebar.avatarDragging}
        onChooseAvatar={sidebar.openAvatarPicker}
        onAvatarInputChange={sidebar.handleAvatarInputChange}
        onAvatarDrop={sidebar.handleAvatarDrop}
        onAvatarDragOver={(event) => {
          event.preventDefault();
          sidebar.setAvatarDragging(true);
        }}
        onAvatarDragLeave={() => sidebar.setAvatarDragging(false)}
        fileInputRef={sidebar.fileInputRef}
        profileInitials={sidebar.profileInitials}
      />

      <AdminPreferencesEditorModal
        open={sidebar.preferencesEditorOpen}
        onClose={() => sidebar.setPreferencesEditorOpen(false)}
        onSave={sidebar.handlePreferencesSave}
        saving={sidebar.savingPreferences}
        error={sidebar.preferencesError}
        preferencesForm={sidebar.preferencesForm}
        setPreferencesForm={sidebar.setPreferencesForm}
      />

      {sidebar.toast ? (
        <div
          className={`fixed right-4 top-4 z-[90] max-w-sm rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur-xl ${
            sidebar.toast.type === "success"
              ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-200"
              : "border-red-400/25 bg-red-500/10 text-red-200"
          }`}
        >
          <p className='text-sm font-semibold'>{sidebar.toast.message}</p>
        </div>
      ) : null}
    </>
  );
}

export default AdminSidebar;
