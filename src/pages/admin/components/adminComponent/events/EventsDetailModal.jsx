import { useEffect } from "react";
import { X } from "lucide-react";
import ModalShell from "../shared/ModalShell";

function EventsDetailModal({ open, event, onClose, onDelete }) {
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
    <ModalShell open={open} innerClassName="max-w-2xl">
      <div className="rounded-[2rem] border border-border-gold/15 bg-[#111111] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.55)] max-h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-border-gold-hover/80">
              Event Details
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              {event.name || event.title || event.eventName}
            </h2>
            <p className="mt-1 text-sm text-stone-400">{event.id}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-stone-200 transition hover:border-border-gold/30 hover:text-white"
            aria-label="Close details"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            ["Category", event.category],
            ["Date", event.eventDateLabel || event.date],
            ["Time", event.eventTimeLabel || event.eventTime],
            ["Venue", event.venue],
            ["Status", event.status],
            ["Attendees", event.attendees],
            ["Revenue", event.revenue],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-2xl border border-white/8 bg-white/5 p-4"
            >
              <p className="text-[11px] uppercase tracking-[0.22em] text-stone-500">
                {label}
              </p>
              <p className="mt-2 text-sm font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>

        {typeof onDelete === "function" ? (
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-stone-200 transition hover:border-border-gold/30 hover:text-white"
            >
              Close
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200 transition hover:border-red-400/30 hover:text-red-100"
            >
              Delete Event
            </button>
          </div>
        ) : null}
      </div>
    </ModalShell>
  );
}

export default EventsDetailModal;
