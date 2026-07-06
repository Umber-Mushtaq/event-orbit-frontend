import { X, AlertTriangle } from "lucide-react";

export function LogoutConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 w-full h-full bg-white/10 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in'>
      <div className='w-full max-w-md bg-neutral-900 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative flex flex-col items-center text-center animate-scale-fade'>
        {/* Close Button */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-stone-500 hover:text-white transition-colors cursor-pointer'
        >
          <X className='w-5 h-5' />
        </button>

        {/* Warning Icon Banner */}
        <div className='w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 mb-5 shadow-[0_0_15px_rgba(239,68,68,0.1)]'>
          <AlertTriangle className='w-6 h-6' />
        </div>

        <h2 className='font-montserrat font-bold text-xl text-white tracking-tight'>
          Confirm Log Out
        </h2>
        <p className='font-poppins font-light text-xs text-stone-400 mt-2 leading-relaxed max-w-xs'>
          Are you sure you want to log out of your session? You will need to
          re-authenticate to access your vendor wedding dashboard planner again.
        </p>

        {/* Interactive Actions Grid */}
        <div className='grid grid-cols-2 gap-4 w-full mt-8'>
          <button
            type='button'
            onClick={onClose}
            className='w-full bg-neutral-950 hover:bg-neutral-700 border border-white/5 text-stone-300 font-poppins text-xs font-semibold py-3 px-4 rounded-xl transition-all cursor-pointer'
          >
            No, Stay
          </button>

          <button
            type='button'
            onClick={onConfirm}
            className='w-full bg-red-500 text-white font-poppins text-xs font-semibold py-3 px-4 rounded-xl hover:bg-red-600 active:scale-98 transition-all cursor-pointer shadow-lg shadow-red-500/10'
          >
            Yes, Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
