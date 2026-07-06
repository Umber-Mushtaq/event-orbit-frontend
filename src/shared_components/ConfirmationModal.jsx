import React from "react";
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
    <div className='fixed inset-0 w-full h-full bg-neutral-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 selection:bg-amber-500 selection:text-black'>
      <div className='w-full max-w-md bg-neutral-900 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative flex flex-col items-center text-center'>
        {/* Upper Right Dismiss Cross Control Icon */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className='absolute top-4 right-4 text-stone-500 hover:text-white transition-colors cursor-pointer disabled:opacity-30'
        >
          <X className='w-5 h-5' />
        </button>

        {/* Warning Badge Glow Node */}
        <div className='w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 mb-5 shadow-[0_0_15px_rgba(239,68,68,0.1)]'>
          <AlertTriangle className='w-6 h-6' />
        </div>

        {/* Dynamic Context Headers Typography */}
        <h2 className='font-montserrat font-bold text-xl text-white tracking-tight'>
          {title}
        </h2>
        <p className='font-poppins font-light text-sm text-stone-400 mt-2 leading-relaxed max-w-xs'>
          {description}
        </p>

        {/* Interactive Action Split Button Grid */}
        <div className='grid grid-cols-2 gap-4 w-full mt-8'>
          <button
            type='button'
            onClick={onClose}
            disabled={isLoading}
            className='w-full bg-neutral-950 hover:bg-neutral-800 border border-white/5 text-stone-300 font-poppins text-xs font-semibold py-3 px-4 rounded-xl transition-all cursor-pointer disabled:opacity-40'
          >
            No, Cancel
          </button>

          <button
            type='button'
            onClick={onConfirm}
            disabled={isLoading}
            className='w-full bg-red-500 text-white font-poppins text-xs font-semibold py-3 px-4 rounded-xl hover:bg-red-600 active:scale-98 transition-all cursor-pointer shadow-lg shadow-red-500/10 flex items-center justify-center'
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
