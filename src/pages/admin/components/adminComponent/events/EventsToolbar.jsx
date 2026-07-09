function EventsToolbar({
  activeFilter,
  onFilterChange,
  activeView,
  onViewChange,
  filterOptions = [],
}) {
  return (
    <section className='rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(12,12,12,0.98),rgba(7,7,7,0.98))] p-4 shadow-[0_14px_40px_rgba(0,0,0,0.35)] md:p-5'>
      

      <div className='mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
        <div className='flex min-w-0 flex-1 flex-col gap-2'>
          <p className='text-xs font-semibold uppercase tracking-[0.24em] text-border-gold-hover/80'>
            Status
          </p>
          <select
            value={activeFilter}
            onChange={(event) => onFilterChange(event.target.value)}
            className='w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-border-gold/40 lg:max-w-sm'
          >
            {filterOptions.map((option) => (
              <option key={option} value={option} className='bg-[#111111]'>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className='flex items-center gap-2 rounded-2xl border border-white/8 bg-black/20 p-1.5'>
          {["List", "Grid"].map((view) => {
            const active = activeView === view;

            return (
              <button
                key={view}
                type='button'
                onClick={() => onViewChange(view)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-white text-black"
                    : "text-stone-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {view}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default EventsToolbar;
