import { Search, Check, Eye, X } from "lucide-react";
import { BOOKINGS_DATA } from "../dummyData";

function BookingRequests() {
  return (
    <section className='min-h-screen w-full bg-white/5 border border-white/30 rounded-lg text-white py-12 px-6 md:px-10 relative overflow-hidden'>
      {/* 1. TOP TITLE CONTROL HEADER */}
      <div className='w-full max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-stone-400 z-10 relative'>
        <div className='flex flex-col gap-4'>
          <h1 className='font-normal text-3xl text-white tracking-tight'>
            Booking Requests
          </h1>
          <p className='font-poppins font-light text-sm text-stone-400 mt-1'>
            Review incoming vendor applications, track schedules, and authorize
            reservations.
          </p>
        </div>
      </div>

      {/* 3. DYNAMIC METRIC ROWS STACK CONTAINER */}
      <div className='w-full max-w-5xl mx-auto flex flex-col gap-6 z-10 relative'>
        {BOOKINGS_DATA.map((booking) => (
          <div
            key={booking.id}
            className='bg-neutral-900/50 backdrop-blur-md border border-stone-400 rounded-2xl p-6 flex flex-col gap-6 transition-all duration-300 hover:border-border-gold hover:shadow-2xl'
          >
            {/* UPPER LAYOUT DATA GRID: Headers + Values mapped matching your image grid style */}
            <div className='grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 items-start'>
              {/* Column 1: Customer */}
              <div className='flex flex-col gap-4'>
                <span className='font-poppins font-semibold text-[10px] tracking-wider uppercase text-stone-400'>
                  Customer Name
                </span>
                <span className='font-montserrat font-bold text-sm text-white truncate'>
                  {booking.customerName}
                </span>
              </div>

              {/* Column 2: Date */}
              <div className='flex flex-col gap-4'>
                <span className='font-poppins font-semibold text-[10px] tracking-wider uppercase text-stone-400'>
                  Requested Date
                </span>
                <span className='font-poppins text-xs font-medium text-stone-300'>
                  {booking.requestedDate}
                </span>
              </div>

              {/* Column 3: Service */}
              <div className='flex flex-col gap-4 col-span-1 md:col-span-1'>
                <span className='font-poppins font-semibold text-[10px] tracking-wider uppercase text-stone-400'>
                  Service Name
                </span>
                <span className='font-poppins text-xs font-semibold text-white truncate'>
                  {booking.serviceName}
                </span>
              </div>

              {/* Column 4: Price Amount */}
              <div className='flex flex-col gap-4'>
                <span className='font-poppins font-semibold text-[10px] tracking-wider uppercase text-stone-400'>
                  Amount
                </span>
                <span className='font-poppins text-xs font-bold text-border-gold-hover'>
                  ${booking.amount}
                </span>
              </div>

              {/* Column 5: Status Badges Container */}
              <div className='flex flex-col gap-4 col-span-2 md:col-span-1 items-start md:items-end'>
                <span className='font-poppins font-semibold text-[10px] tracking-wider uppercase text-stone-400 hidden md:block mb-1'>
                  Status
                </span>
                <span
                  className={`font-poppins text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border ${
                    booking.status === "pending"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/30 drop-shadow-[0_2px_8px_rgba(251,191,36,0.15)]"
                      : "bg-blue-500/10 text-blue-400 border-blue-500/30 drop-shadow-[0_2px_8px_rgba(59,130,246,0.15)]"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            </div>

            {/* LOWER ACTIONS BUTTON ROW */}
            <div className='flex items-center gap-3 pt-4 border-t border-white/5 w-full justify-start'>
              <button className='bg-glass-gold hover:bg-glass-gold-hover border border-border-gold text-white font-poppins text-[11px] font-semibold py-2 px-4 rounded-xl flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow-gold-glow'>
                <Check className='w-3.5 h-3.5 text-border-gold-hover' />
                Confirm
              </button>
              <button className='bg-red-500/10 hover:bg-red-500/20 border border-red-500/40 text-red-400 font-poppins text-[11px] font-semibold py-2 px-4 rounded-xl flex items-center gap-1.5 transition-all duration-200 cursor-pointer'>
                <X className='w-3.5 h-3.5' />
                Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BookingRequests;
