import ModalShell from "./shared/ModalShell";

function AdminPreferencesEditorModal({
  open,
  onClose,
  onSave,
  saving,
  error,
  preferencesForm,
  setPreferencesForm,
}) {
  if (!open) return null;

  return (
    <ModalShell open={open} outerClassName='z-[70]' innerClassName='max-w-lg'>
      <div className='max-h-[calc(100vh-4rem)] overflow-y-auto rounded-[2rem] border border-admin-border bg-admin-surface p-6 shadow-[0_30px_80px_rgba(0,0,0,0.6)]'>
        <h3 className='text-2xl font-black text-admin-foreground'>
          Workspace preferences
        </h3>
        {error ? (
          <p className='mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200'>
            {error}
          </p>
        ) : null}
        <div className='mt-5 grid gap-4 md:grid-cols-2'>
          <label className='block'>
            <span className='mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400'>
              Language
            </span>
            <input
              value={preferencesForm.language}
              onChange={(event) =>
                setPreferencesForm((current) => ({
                  ...current,
                  language: event.target.value,
                }))
              }
              className='w-full rounded-2xl border border-admin-border bg-admin-input px-4 py-3 text-sm text-admin-foreground outline-none focus:border-border-gold/40'
            />
          </label>
          <label className='flex items-center gap-3 rounded-2xl border border-admin-border bg-admin-input px-4 py-3 md:col-span-2'>
            <input
              type='checkbox'
              checked={preferencesForm.sidebarCollapsed}
              onChange={(event) =>
                setPreferencesForm((current) => ({
                  ...current,
                  sidebarCollapsed: event.target.checked,
                }))
              }
              className='h-4 w-4 accent-[#d69d2f]'
            />
            <span className='text-sm text-admin-foreground'>
              Sidebar collapsed by default
            </span>
          </label>
          <label className='flex items-center gap-3 rounded-2xl border border-admin-border bg-admin-input px-4 py-3 md:col-span-2'>
            <input
              type='checkbox'
              checked={preferencesForm.notificationsEnabled}
              onChange={(event) =>
                setPreferencesForm((current) => ({
                  ...current,
                  notificationsEnabled: event.target.checked,
                }))
              }
              className='h-4 w-4 accent-[#d69d2f]'
            />
            <span className='text-sm text-admin-foreground'>
              Enable notifications
            </span>
          </label>
        </div>
        <div className='mt-6 flex justify-end gap-3'>
          <button
            type='button'
            onClick={onClose}
            className='rounded-2xl border border-admin-border bg-admin-surface px-4 py-3 text-sm font-semibold text-admin-foreground transition hover:border-border-gold/30 hover:text-white'
          >
            Cancel
          </button>
          <button
            type='button'
            disabled={saving}
            onClick={onSave}
            className='rounded-2xl border border-border-gold/25 bg-glass-gold px-4 py-3 text-sm font-semibold text-border-gold-hover shadow-gold-glow transition hover:border-border-gold/40 hover:bg-glass-gold-hover disabled:cursor-not-allowed disabled:opacity-60'
          >
            {saving ? "Saving..." : "Save Preferences"}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

export default AdminPreferencesEditorModal;
