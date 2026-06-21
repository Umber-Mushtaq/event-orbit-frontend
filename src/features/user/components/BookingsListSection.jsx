import { BOOKINGS_LIST } from "../dummyData";

export function BookingsListSection() {
  return (
    <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 md:p-6 shadow-xl flex flex-col w-full min-w-0'>
      <div className='flex items-center gap-2 mb-6 border-b border-white/5 pb-3'>
        <h2 className='font-montserrat font-black text-base md:text-lg text-white tracking-wide uppercase'>
          Bookings List
        </h2>
      </div>
      <div className='flex flex-col gap-4 overflow-x-auto custom-scrollbar'>
        <div className='grid grid-cols-12 text-left font-poppins text-xs tracking-wider uppercase text-stone-400 font-semibold mb-1 min-w-[500px] px-2'>
          <div className='col-span-4'>Vendor</div>
          <div className='col-span-5'>Event Name / Time</div>
          <div className='col-span-3 text-right'>Status</div>
        </div>

        {/* Dynamic Items Mapping */}
        {BOOKINGS_LIST.map((booking) => (
          <div
            key={booking.id}
            className='grid grid-cols-12 items-center bg-neutral-900/30 border border-white/5 rounded-xl p-3 min-w-[500px] hover:border-white/10 transition-colors'
          >
            {/* Column 1: Vendor Profile Chip */}
            <div className='col-span-4 flex items-center gap-3'>
              <div className='w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0'>
                <img
                  src={booking.avatar}
                  alt='vendor avatar'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='font-poppins flex flex-col min-w-0'>
                <span className='text-xs font-bold text-white truncate'>
                  {booking.vendorName}
                </span>
                <span className='text-xs text-stone-400 truncate'>
                  {booking.category}
                </span>
              </div>
            </div>

            {/* Column 2: Event Details & Thumbnail */}
            <div className='col-span-5 flex items-center gap-3'>
              <div className='w-10 h-7 rounded-lg overflow-hidden border border-white/5 shrink-0 hidden sm:block'>
                <img
                  src={booking.thumbnail}
                  alt='event preview'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='font-poppins text-xs text-stone-300'>
                <span className='font-semibold text-white block'>
                  {booking.eventName}
                </span>
                <span className='text-xs text-stone-400 block mt-0.5'>
                  Time — {booking.time}
                </span>
              </div>
            </div>

            {/* Column 3: Status Action Badge */}
            <div className='col-span-3 flex justify-end'>
              {booking.status === "View Details" ? (
                <button className='bg-glass-gold hover:bg-glass-gold-hover border border-border-gold/40 text-white font-poppins text-[10px] font-bold py-1 px-3 rounded-lg transition-all shadow-gold-glow cursor-pointer whitespace-nowrap'>
                  View Details
                </button>
              ) : (
                <span
                  className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full border tracking-wider whitespace-nowrap ${
                    booking.status === "Pending"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/20 drop-shadow-[0_2px_6px_rgba(251,191,36,0.1)]"
                      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 drop-shadow-[0_2px_6px_rgba(52,211,153,0.1)]"
                  }`}
                >
                  {booking.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
