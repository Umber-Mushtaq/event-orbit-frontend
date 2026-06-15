const BOOKINGS_ROWS = [
  {
    id: "Jun65025",
    title: "Consistent",
    date: "Jun 14, 2026",
    subDate: "03/20/2026",
    status: "Pending",
  },
  {
    id: "Jun05025",
    title: "Photography",
    date: "Jun 14, 2026",
    subDate: "03/25/2026",
    status: "Pending",
  },
  {
    id: "Jun20024",
    title: "Direction Accent",
    date: "Jun 18, 2026",
    subDate: "05/13/2026",
    status: "Pending",
  },
];

export function UpcomingBookings() {
  return (
    <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col w-full h-full'>
      <h2 className='font-montserrat font-bold text-lg text-white mb-6 border-b border-white/20 pb-3'>
        Upcoming Bookings
      </h2>

      <div className='flex flex-col gap-4 overflow-x-auto'>
        <div className='grid grid-cols-3 text-left font-poppins text-xs tracking-wider uppercase text-stone-400 font-semibold mb-1 px-2'>
          <span>Service ID / Title</span>
          <span>Date Parameters</span>
          <span className='text-right'>Status</span>
        </div>

        {BOOKINGS_ROWS.map((row, idx) => (
          <div
            key={idx}
            className='grid grid-cols-3 items-center bg-neutral-900/40 border border-white/5 rounded-xl p-3 px-4 transition-colors hover:border-white/10'
          >
            <div className='flex flex-col'>
              <span className='font-poppins text-xs font-bold text-white'>
                {row.id}
              </span>
              <span className='font-poppins text-xs text-stone-400 mt-0.5 truncate'>
                {row.title}
              </span>
            </div>

            <div className='flex flex-col font-poppins text-xs text-stone-300'>
              <span>{row.date}</span>
              <span className='text-[10px] text-stone-400 mt-0.5'>
                {row.subDate}
              </span>
            </div>

            <div className='flex justify-end'>
              <span className='bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full tracking-wider drop-shadow-[0_2px_8px_rgba(251,191,36,0.1)]'>
                {row.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
