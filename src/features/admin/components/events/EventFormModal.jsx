import { useEffect, useState } from "react";
import { X } from "lucide-react";

const emptyEvent = {
  name: "",
  category: "",
  venue: "",
  status: "Upcoming",
  attendees: "",
  revenue: "",
  date: "",
};

function EventFormModal({ open, mode = "create", onClose, onSave, initialValue, submitError = "" }) {
  const [form, setForm] = useState(emptyEvent);

  useEffect(() => {
    if (open) setForm(initialValue || emptyEvent);
  }, [initialValue, open]);

  if (!open) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.category.trim() || !form.venue.trim()) return;
    onSave(form);
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm'>
      <div className='w-full max-w-2xl rounded-[2rem] border border-border-gold/15 bg-[#111111] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.6)]'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.24em] text-border-gold-hover/80'>
              {mode === "edit" ? "Edit Event" : "Add Event"}
            </p>
            <h3 className='mt-2 text-2xl font-black text-white'>
              {mode === "edit" ? "Update event details" : "Create a new event"}
            </h3>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-stone-200 transition hover:border-border-gold/30 hover:text-white'
            aria-label='Close event form'
          >
            <X className='h-4 w-4' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='mt-6 grid gap-4 md:grid-cols-2'>
          {submitError ? (
            <p className='md:col-span-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200'>
              {submitError}
            </p>
          ) : null}
          {[
            ["Event Name", "name", "text"],
            ["Category", "category", "text"],
            ["Venue", "venue", "text"],
            ["Date", "date", "date"],
            ["Attendees", "attendees", "number"],
            ["Revenue", "revenue", "text"],
          ].map(([label, field, type]) => (
            <label key={field} className='block'>
              <span className='mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400'>
                {label}
              </span>
              <input
                type={type}
                value={form[field]}
                onChange={(event) => setForm((current) => ({ ...current, [field]: event.target.value }))}
                className='w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-stone-500 focus:border-border-gold/40'
              />
            </label>
          ))}

          <label className='block md:col-span-2'>
            <span className='mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400'>
              Status
            </span>
            <select
              value={form.status}
              onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
              className='w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-border-gold/40'
            >
              {["Upcoming", "Live", "Completed", "Draft", "Cancelled"].map((status) => (
                <option key={status} value={status} className='bg-[#111111]'>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <div className='md:col-span-2 flex justify-end gap-3'>
            <button
              type='button'
              onClick={onClose}
              className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-stone-200 transition hover:border-border-gold/30 hover:text-white'
            >
              Cancel
            </button>
              <button
                type='submit'
                className='rounded-2xl border border-border-gold/25 bg-glass-gold px-5 py-3 text-sm font-semibold text-border-gold-hover shadow-gold-glow transition hover:border-border-gold/40 hover:bg-glass-gold-hover'
              >
              {mode === "edit" ? "Update Event" : "Save Event"}
              </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventFormModal;
