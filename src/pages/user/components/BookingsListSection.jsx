import { BOOKINGS_LIST } from "../dummyData";
import avatar from "../../../assets/avatar2.jpg";

export function BookingsListSection({ bookings }) {
  // Use a reliable baseline placeholder image
  const defaultUserAvatar =
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80";
  const defaultServiceBanner =
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=300&q=80";

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

        {bookings.length === 0 ? (
          <div className='text-stone-500 font-poppins text-xs py-4 px-2'>
            No event reservations found.
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking.id}
              className='grid grid-cols-12 items-center bg-neutral-900/30 border border-white/5 rounded-xl p-3 min-w-[500px] hover:border-white/10 transition-colors'
            >
              {/* Column 1: Vendor Profile Chip */}
              <div className='col-span-4 flex items-center gap-3'>
                <div className='w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0 bg-neutral-800'>
                  <img
                    src={booking.avatar || defaultUserAvatar}
                    alt='vendor avatar'
                    className='w-full h-full object-cover'
                    onError={(e) => {
                      e.target.src = defaultUserAvatar;
                    }}
                  />
                </div>
                <div className='font-poppins flex flex-col min-w-0'>
                  <span className='text-xs font-bold text-white truncate'>
                    {booking.vendorName || "Premium Vendor"}
                  </span>
                  <span className='text-xs text-stone-400 truncate capitalize'>
                    {booking.category || "Event Services"}
                  </span>
                </div>
              </div>

              {/* Column 2: Event Details & Thumbnail */}
              <div className='col-span-5 flex items-center gap-3'>
                <div className='w-10 h-7 rounded-lg overflow-hidden border border-white/5 shrink-0 hidden sm:block bg-neutral-800'>
                  <img
                    src={booking.thumbnail || defaultServiceBanner}
                    alt='event preview'
                    className='w-full h-full object-cover'
                    onError={(e) => {
                      e.target.src = defaultServiceBanner;
                    }}
                  />
                </div>
                <div className='font-poppins text-xs text-stone-300 min-w-0 truncate'>
                  <span className='font-semibold text-white block truncate'>
                    {booking.eventName}
                  </span>
                  <span className='text-[11px] text-stone-400 block mt-0.5'>
                    Time — {booking.time}
                  </span>
                </div>
              </div>

              {/* Column 3: Status Badge */}
              <div className='col-span-3 flex justify-end'>
                <span
                  className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full border tracking-wider whitespace-nowrap ${
                    booking.status === "Pending"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  }`}
                >
                  {booking.status || "Pending"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
