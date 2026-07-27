import { useSyncExternalStore } from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";
import {
  dismissToast,
  getToastSnapshot,
  subscribeToToasts,
} from "./toastStore";

const toastStyles = {
  success: {
    icon: CheckCircle2,
    className: "border-emerald-400/25 bg-emerald-500/15 text-emerald-100",
    iconClassName: "text-emerald-300",
  },
  error: {
    icon: AlertCircle,
    className: "border-red-400/25 bg-red-500/15 text-red-100",
    iconClassName: "text-red-300",
  },
  info: {
    icon: Info,
    className: "border-border-gold/30 bg-neutral-950/90 text-stone-100",
    iconClassName: "text-border-gold-hover",
  },
};

function ToastViewport() {
  const activeToasts = useSyncExternalStore(
    subscribeToToasts,
    getToastSnapshot,
    getToastSnapshot,
  );

  if (!activeToasts.length) return null;

  return (
    <div
      className='fixed right-4 top-4 z-[120] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-5 sm:top-5'
      aria-live='polite'
      aria-atomic='true'
    >
      {activeToasts.map((toast) => {
        const config = toastStyles[toast.type] || toastStyles.info;
        const Icon = config.icon;

        return (
          <div
            key={toast.id}
            role={toast.type === "error" ? "alert" : "status"}
            className={`flex items-start gap-3 rounded-lg border px-4 py-3 font-poppins shadow-2xl backdrop-blur-xl ${config.className}`}
          >
            <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${config.iconClassName}`} />
            <span className='min-w-0 flex-1 text-sm font-semibold leading-relaxed'>
              {toast.message}
            </span>
            <button
              type='button'
              onClick={() => dismissToast(toast.id)}
              className='inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-current/70 transition hover:bg-white/10 hover:text-current'
              aria-label='Dismiss notification'
            >
              <X className='h-4 w-4' />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ToastViewport;
