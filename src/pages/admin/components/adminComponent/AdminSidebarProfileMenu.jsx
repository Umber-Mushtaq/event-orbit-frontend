import { LogOut } from "lucide-react";

function AdminSidebarProfileMenu({
  onOpenProfile,
  onOpenPreferences,
  onLogout,
}) {
  return (
    <div
      role='menu'
      className='absolute bottom-[calc(100%+10px)] left-3 right-3 z-50 rounded-2xl border border-admin-border bg-admin-surface p-2 shadow-2xl'
    >
      <button
        type='button'
        onClick={onOpenProfile}
        className='w-full rounded-2xl border border-admin-border bg-admin-surface px-4 py-3 text-left text-sm text-admin-foreground transition hover:border-border-gold/30 hover:text-white'
        role='menuitem'
      >
        Profile settings
      </button>
      <button
        type='button'
        onClick={onOpenPreferences}
        className='mt-2 w-full rounded-2xl border border-admin-border bg-admin-surface px-4 py-3 text-left text-sm text-admin-foreground transition hover:border-border-gold/30 hover:text-white'
        role='menuitem'
      >
        Workspace preferences
      </button>
      <button
        type='button'
        onClick={onLogout}
        className='mt-2 flex w-full items-center gap-3 rounded-2xl border border-admin-border bg-admin-surface px-4 py-3 text-left text-sm font-semibold text-admin-foreground transition hover:border-red-400/30 hover:text-white'
        role='menuitem'
      >
        <LogOut className='h-4 w-4 text-border-gold-hover/80' />
        Logout
      </button>
    </div>
  );
}

export default AdminSidebarProfileMenu;
