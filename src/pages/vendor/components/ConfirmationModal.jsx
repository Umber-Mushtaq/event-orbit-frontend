import { X, Loader2, AlertTriangle, CheckCircle2 } from "lucide-react";

function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  variant = "gold",
  isProcessing = false,
}) {
  if (!isOpen) return null;

  const isDanger = variant === "danger";

  return (
    <div className='fixed inset-0 w-full h-full z-50 flex items-center justify-center p-4 animate-fade-in'>
      {/* Premium Dark Backdrop Blur */}
      <div
        className='absolute inset-0 bg-white/10 backdrop-blur-sm  transition-opacity duration-300'
        onClick={isProcessing ? null : onClose}
      />

      {/* Modal Surface Box */}
      <div
        className={`w-full max-w-md bg-neutral-900 border text-white rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-all transform scale-100 z-10 ${
          isDanger ? "border-red-500/30" : "border-border-gold/30"
        }`}
      >
        {/* Subtle Ambient Accent Glow */}
        <div
          className={`absolute -top-12 -right-12 w-32 h-32 blur-3xl rounded-full pointer-events-none ${
            isDanger ? "bg-red-500/10" : "bg-amber-500/10"
          }`}
        />

        {/* Top Header Row Close Trigger Asset */}
        <button
          disabled={isProcessing}
          onClick={onClose}
          className='absolute top-4 right-4 text-stone-500 hover:text-white transition-colors cursor-pointer disabled:opacity-30'
        >
          <X className='w-4 h-4' />
        </button>

        {/* Content Body Stack */}
        <div className='flex items-start gap-4 mt-2'>
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
              isDanger
                ? "bg-red-500/10 border-red-500/20 text-red-400"
                : "bg-glass-gold border-border-gold/20 text-border-gold"
            }`}
          >
            {isDanger ? (
              <AlertTriangle className='w-5 h-5' />
            ) : (
              <CheckCircle2 className='w-5 h-5' />
            )}
          </div>

          <div className='flex flex-col gap-1.5 grow'>
            <h3 className='font-montserrat font-bold text-base text-white uppercase tracking-wide'>
              {title}
            </h3>
            <p className='font-poppins font-light text-sm text-stone-400 leading-relaxed'>
              {message}
            </p>
          </div>
        </div>

        {/* Bottom Interactive Action Buttons Execution Tray */}
        <div className='flex items-center justify-end gap-3 mt-6 pt-4 border-t border-white/5 w-full'>
          <button
            type='button'
            disabled={isProcessing}
            onClick={onClose}
            className='bg-neutral-900/60 hover:bg-neutral-800 border border-white/5 text-stone-300 font-poppins text-xs font-semibold py-2 px-4 rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-30'
          >
            Cancel
          </button>

          <button
            type='button'
            disabled={isProcessing}
            onClick={onConfirm}
            className={`font-poppins text-xs font-semibold py-2 px-5 rounded-xl flex items-center gap-2 transition-all duration-200 cursor-pointer text-white border min-w-[90px] justify-center ${
              isDanger
                ? "bg-red-500/20 hover:bg-red-500/30 border-red-500/40"
                : "bg-glass-gold hover:bg-glass-gold-hover border-border-gold shadow-gold-glow"
            }`}
          >
            {isProcessing ? (
              <Loader2 className='w-3.5 h-3.5 animate-spin' />
            ) : isDanger ? (
              "Decline Request"
            ) : (
              "Confirm Request"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
