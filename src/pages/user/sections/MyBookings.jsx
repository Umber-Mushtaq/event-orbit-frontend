import {
  SlidersHorizontal,
  Calendar,
  DollarSign,
  MapPin,
  Trash2,
} from "lucide-react";
import { MY_BOOKINGS_DATA } from "../dummyData";

function MyBookings() {
  return (
    <div className='w-full max-w-full mx-auto flex flex-col z-10 relative'>
      <div className='w-full flex items-center justify-between gap-3 py-3 px-5 '>
        <h1 className='font-normal text-2xl md:text-4xl text-white tracking-tight self-start pb-10'>
          My Bookings
        </h1>
        <div className='relative flex items-center'>
          <SlidersHorizontal className='absolute left-3 w-3.5 h-3.5 text-stone-400' />
          <select className='bg-neutral-900 border border-white/5 rounded-xl py-2 pl-9 pr-8 text-xs font-poppins text-stone-300 focus:outline-none focus:border-border-gold appearance-none cursor-pointer'>
            <option value='all'>All Bookings</option>
            <option value='confirmed'>Confirmed</option>
            <option value='pending'>Pending</option>
            <option value='completed'>Completed</option>
          </select>
        </div>
      </div>

      <div className='w-full max-w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-10 relative px-1'>
        {MY_BOOKINGS_DATA.map((booking) => (
          <div
            key={booking.id}
            className='bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col justify-between min-h-[220px] transition-all duration-300 relative group hover:border-border-gold hover:shadow-2xl'
          >
            {/* 1. TOP CARD ROW: Status Badge & Cancel Action */}
            <div className='flex items-center justify-between w-full mb-4'>
              <span
                className={`font-poppins text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border ${
                  booking.status === "pending"
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    : booking.status === "confirmed"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      : "bg-blue-500/10 text-blue-400 border-blue-500/20 "
                }`}
              >
                {booking.status}
              </span>

              {/* Clean minimalist cancel interaction icon wrapper */}
              <button
                onClick={() => triggerCancelPrompt(booking.id)}
                className='w-7 h-7 rounded-lg bg-neutral-900 border border-white/5 text-stone-400 hover:text-red-400 hover:bg-red-500/10 flex items-center justify-center transition-all cursor-pointer'
                title='Cancel Request'
              >
                <Trash2 className='w-3.5 h-3.5' />
              </button>
            </div>

            {/* 2. CENTER CARD ROW: Main Service Title Typography */}
            <div className='mb-5'>
              <h3 className='font-montserrat font-black text-lg text-white tracking-wide group-hover:text-border-gold-hover transition-colors duration-200'>
                {booking.serviceName}
              </h3>
              <span className='font-poppins text-xs uppercase font-semibold text-stone-400 tracking-wider block mt-1'>
                Confirmed Booking
              </span>
            </div>

            {/* 3. BOTTOM CARD ROW: Meta Information Indicators Grid */}
            <div className='border-t border-white/5 pt-4 flex flex-col gap-2'>
              {/* Date Indicator Block */}
              <div className='flex items-center gap-2 text-stone-400 font-poppins text-xs'>
                <Calendar className='w-3.5 h-3.5 text-border-gold shrink-0' />
                <span>{booking.date}</span>
              </div>

              {/* Price Indicator Block */}
              <div className='flex items-center justify-between gap-4 text-stone-400 font-poppins text-xs mt-0.5'>
                <div className='flex items-center gap-2'>
                  <DollarSign className='w-3.5 h-3.5 text-border-gold shrink-0' />
                  <span>Amount Paid</span>
                </div>
                <strong className='text-white font-bold text-sm tracking-wide'>
                  ${booking.amount}
                </strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;
