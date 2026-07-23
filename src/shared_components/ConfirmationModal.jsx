import { AlertTriangle, X, Loader2 } from "lucide-react";

function ConfirmationModal({
  isOpen,
  isLoading,
  onClose,
  onConfirm,
  title = "Confirm Action",
  description = "Are you sure you want to proceed? This change cannot be undone.",
}) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-background/70 p-4 backdrop-blur-sm selection:bg-primary selection:text-primary-foreground'>
      <div className='relative flex w-full max-w-md flex-col items-center rounded-3xl border border-border bg-card p-6 text-center shadow-2xl md:p-8'>
        {/* Upper Right Dismiss Cross Control Icon */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className='absolute right-4 top-4 cursor-pointer text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30'
        >
          <X className='w-5 h-5' />
        </button>

        {/* Warning Badge Glow Node */}
        <div className='w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 mb-5 shadow-[0_0_15px_rgba(239,68,68,0.1)]'>
          <AlertTriangle className='w-6 h-6' />
        </div>

        {/* Dynamic Context Headers Typography */}
        <h2 className='font-montserrat text-xl font-bold tracking-tight text-foreground'>
          {title}
        </h2>
        <p className='font-poppins mt-2 max-w-xs text-sm font-light leading-relaxed text-muted-foreground'>
          {description}
        </p>

        {/* Interactive Action Split Button Grid */}
        <div className='mt-8 grid w-full grid-cols-2 gap-4'>
          <button
            type='button'
            onClick={onClose}
            disabled={isLoading}
            className='w-full rounded-xl border border-border bg-background px-4 py-3 font-poppins text-xs font-semibold text-foreground transition-all cursor-pointer hover:bg-muted disabled:opacity-40'
          >
            No, Cancel
          </button>

          <button
            type='button'
            onClick={onConfirm}
            disabled={isLoading}
            className='flex w-full cursor-pointer items-center justify-center rounded-xl bg-red-500 px-4 py-3 font-poppins text-xs font-semibold text-white shadow-lg shadow-red-500/10 transition-all hover:bg-red-600 active:scale-98 disabled:opacity-40'
          >
            {isLoading ? (
              <Loader2 className='w-4 h-4 animate-spin' />
            ) : (
              "Yes, Confirm"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
