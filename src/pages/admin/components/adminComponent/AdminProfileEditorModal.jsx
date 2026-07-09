import { Loader2, UploadCloud } from "lucide-react";
import ModalShell from "./shared/ModalShell";

const fields = [
  ["First name", "firstName"],
  ["Last name", "lastName"],
  ["Email", "email"],
  ["Phone", "phone"],
];

function AdminProfileEditorModal({
  open,
  onClose,
  onSave,
  saving,
  error,
  profileForm,
  setProfileForm,
  avatarDisplay,
  avatarFileName,
  avatarDragging,
  onChooseAvatar,
  onAvatarInputChange,
  onAvatarDrop,
  onAvatarDragOver,
  onAvatarDragLeave,
  fileInputRef,
  profileInitials,
}) {
  if (!open) return null;

  return (
    <ModalShell open={open} outerClassName='z-[70]' innerClassName='max-w-lg'>
      <div className='max-h-[calc(100vh-4rem)] overflow-y-auto rounded-[2rem] border border-admin-border bg-admin-surface p-6 shadow-[0_30px_80px_rgba(0,0,0,0.6)]'>
        <h3 className='text-2xl font-black text-admin-foreground'>Profile settings</h3>
        {error ? (
          <p className='mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200'>
            {error}
          </p>
        ) : null}
        <div className='mt-5 grid gap-4 md:grid-cols-2'>
          {fields.map(([label, field]) => (
            <label key={field}>
              <span className='mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400'>
                {label}
              </span>
              <input
                value={profileForm[field]}
                onChange={(event) =>
                  setProfileForm((current) => ({
                    ...current,
                    [field]: event.target.value,
                  }))
                }
                className='w-full rounded-2xl border border-admin-border bg-admin-input px-4 py-3 text-sm text-admin-foreground outline-none focus:border-border-gold/40'
              />
            </label>
          ))}
          <div className='md:col-span-2'>
            <span className='mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400'>
              Avatar Image
            </span>
            <div className='rounded-[1.5rem] border border-admin-border bg-[#0f0f0f] p-4'>
              <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
                <div className='flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border-gold/20 bg-gradient-to-br from-[#251c09] to-[#111111] ring-1 ring-border-gold/20'>
                  {avatarDisplay ? (
                    <img
                      src={avatarDisplay}
                      alt='Selected avatar preview'
                      className='h-full w-full object-cover'
                    />
                  ) : (
                    <span className='text-xl font-extrabold tracking-[0.08em] text-[#ffd36c]'>
                      {profileInitials}
                    </span>
                  )}
                </div>
                <div className='min-w-0 flex-1'>
                  <p className='text-sm font-semibold text-admin-foreground'>
                    Upload a profile image
                  </p>
                  <p className='mt-1 text-xs text-stone-400'>
                    JPG, JPEG, PNG, or WEBP. Maximum file size is 5MB.
                  </p>
                  <p className='mt-2 text-xs text-stone-300'>
                    {avatarFileName || "No new file selected"}
                  </p>
                </div>
                <button
                  type='button'
                  onClick={onChooseAvatar}
                  className='inline-flex items-center justify-center gap-2 rounded-2xl border border-border-gold/25 bg-glass-gold px-4 py-3 text-sm font-semibold text-border-gold-hover transition hover:border-border-gold/40 hover:bg-glass-gold-hover'
                >
                  <UploadCloud className='h-4 w-4' />
                  {avatarFileName ? "Replace Image" : "Choose Image"}
                </button>
              </div>
              <input
                ref={fileInputRef}
                type='file'
                accept='.jpg,.jpeg,.png,.webp'
                onChange={onAvatarInputChange}
                className='hidden'
              />
              <div
                onClick={onChooseAvatar}
                onDragOver={onAvatarDragOver}
                onDragLeave={onAvatarDragLeave}
                onDrop={onAvatarDrop}
                className={`mt-4 cursor-pointer rounded-[1.25rem] border border-dashed px-4 py-6 text-center transition ${
                  avatarDragging
                    ? "border-border-gold bg-glass-gold/20"
                    : "border-border-gold/25 bg-black/20 hover:border-border-gold/40 hover:bg-black/30"
                }`}
              >
                <p className='text-sm font-semibold text-admin-foreground'>
                  Drag and drop an image here, or click to browse
                </p>
                <p className='mt-1 text-xs text-stone-400'>
                  The selected image will preview before saving.
                </p>
              </div>
            </div>
          </div>
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
            {saving ? (
              <span className='inline-flex items-center gap-2'>
                <Loader2 className='h-4 w-4 animate-spin' />
                Uploading...
              </span>
            ) : (
              "Save Profile"
            )}
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

export default AdminProfileEditorModal;
