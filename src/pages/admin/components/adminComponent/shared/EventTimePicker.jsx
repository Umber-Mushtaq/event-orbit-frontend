import { Clock3 } from "lucide-react";

function EventTimePicker({ label = "Event Time", value = "", onChange, required = true }) {
  const inputClassName =
    "w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-border-gold/40 admin-time-input";

  return (
    <label className='block'>
      <span className='mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-400'>
        <span>{label}</span>
        {required ? (
          <span className='rounded-full border border-red-500/20 bg-red-500/10 px-2 py-0.5 text-[10px] font-bold tracking-[0.18em] text-red-200'>
            Required
          </span>
        ) : null}
      </span>
      <div className='relative'>
        <Clock3 className='pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-border-gold-hover' />
        <input
          type='time'
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          className={inputClassName}
          required={required}
        />
      </div>
    </label>
  );
}

export default EventTimePicker;
