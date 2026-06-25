import { useEffect } from "react";
import { X } from "lucide-react";

function EventsDetailModal({ open, event, onClose }) {
  useEffect(() => {
    const handleEscape = (eventKey) => {
      if (eventKey.key === "Escape") onClose();
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open || !event) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm'>
      <div className='w-full max-w-2xl rounded-[2rem] border border-border-gold/15 bg-[#111111] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.55)]'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.24em] text-border-gold-hover/80'>
              Event Details
            </p>
            <h2 className='mt-2 text-2xl font-black text-white'>{event.name}</h2>
            <p className='mt-1 text-sm text-stone-400'>{event.id}</p>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-stone-200 transition hover:border-border-gold/30 hover:text-white'
            aria-label='Close details'
          >
            <X className='h-4 w-4' />
          </button>
        </div>

        <div className='mt-5 grid gap-3 sm:grid-cols-2'>
          {[
            ["Category", event.category],
            ["Date", event.date],
            ["Venue", event.venue],
            ["Status", event.status],
            ["Attendees", event.attendees],
            ["Revenue", event.revenue],
          ].map(([label, value]) => (
            <div key={label} className='rounded-2xl border border-white/8 bg-white/5 p-4'>
              <p className='text-[11px] uppercase tracking-[0.22em] text-stone-500'>{label}</p>
              <p className='mt-2 text-sm font-semibold text-white'>{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventsDetailModal;
