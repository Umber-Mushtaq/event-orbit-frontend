import { X, AlertTriangle } from "lucide-react";

export function LogoutConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-background/70 p-4 backdrop-blur-sm animate-fade-in'>
      <div className='relative flex w-full max-w-md flex-col items-center rounded-3xl border border-border bg-card p-6 text-center shadow-2xl animate-scale-fade md:p-8'>
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute right-4 top-4 cursor-pointer text-muted-foreground transition-colors hover:text-foreground'
        >
          <X className='w-5 h-5' />
        </button>

        {/* Warning Icon Banner */}
        <div className='w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 mb-5 shadow-[0_0_15px_rgba(239,68,68,0.1)]'>
          <AlertTriangle className='w-6 h-6' />
        </div>

        <h2 className='font-montserrat text-xl font-bold tracking-tight text-foreground'>
          Confirm Log Out
        </h2>
        <p className='font-poppins mt-2 max-w-xs text-xs font-light leading-relaxed text-muted-foreground'>
          Are you sure you want to log out of your session? You will need to
          re-authenticate to access your vendor wedding dashboard planner again.
        </p>

        {/* Interactive Actions Grid */}
        <div className='mt-8 grid w-full grid-cols-2 gap-4'>
          <button
            type='button'
            onClick={onClose}
            className='w-full rounded-xl border border-border bg-background px-4 py-3 font-poppins text-xs font-semibold text-foreground transition-all cursor-pointer hover:bg-muted'
          >
            No, Stay
          </button>

          <button
            type='button'
            onClick={onConfirm}
            className='w-full rounded-xl bg-red-500 px-4 py-3 font-poppins text-xs font-semibold text-white shadow-lg shadow-red-500/10 transition-all cursor-pointer hover:bg-red-600 active:scale-98'
          >
            Yes, Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
