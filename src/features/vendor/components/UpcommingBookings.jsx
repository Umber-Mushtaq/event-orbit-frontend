import { Loader2 } from "lucide-react";
import { useVendorDashboard } from "../hooks/useVendorDashboard.js";
import BookingRow from "./BookingRow.jsx";

export function UpcomingBookings() {
  const { bookings, loading, error } = useVendorDashboard();

  if (loading) {
    return (
      <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl flex justify-center items-center w-full h-80'>
        <Loader2 className='w-8 h-8 animate-spin text-border-gold' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl flex justify-center items-center w-full text-red-400 font-poppins text-xs'>
        {error}
      </div>
    );
  }

  return (
    <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col w-full h-full'>
      <h2 className='font-montserrat font-bold text-lg text-white mb-6 border-b border-white/20 pb-3'>
        Upcoming Bookings
      </h2>

      <div className='flex flex-col gap-4 overflow-x-auto'>
        <div className='grid grid-cols-3 text-left font-poppins text-xs tracking-wider uppercase text-stone-400 font-semibold mb-1 px-2'>
          <span>Title</span>
          <span>Date Parameters</span>
          <span className='text-right'>Status</span>
        </div>

        {bookings.length === 0 ? (
          <div className='text-center font-poppins text-xs text-stone-500 py-10'>
            No upcoming bookings found.
          </div>
        ) : (
          bookings.map((booking) => (
            <BookingRow key={booking._id} booking={booking} />
          ))
        )}
      </div>
    </div>
  );
}
