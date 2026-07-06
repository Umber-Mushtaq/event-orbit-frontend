import React from "react";
import { SlidersHorizontal, Calendar, DollarSign, Trash2 } from "lucide-react";
import { useMyBookings } from "../hooks/useMyBookings";

// Component Structural Imports
import ConfirmationModal from "../../../shared_components/ConfirmationModal";
import StatusIndecator from "../../../shared_components/StatusIndecator";

export default function MyBookings() {
  const {
    bookings,
    filter,
    setFilter,
    loading,
    error,
    modalProps,
    openCancelModal,
  } = useMyBookings();

  return (
    <div className='w-full max-w-full mx-auto flex flex-col z-10 relative text-white font-poppins px-5'>
      {/* 1. Header Filter Actions Row Context */}
      <div className='w-full flex items-center justify-between gap-3 py-3'>
        <h1 className='font-normal text-2xl md:text-4xl tracking-tight self-start pb-10'>
          My Bookings
        </h1>

        <div className='relative flex items-center mb-10'>
          <SlidersHorizontal className='absolute left-3 w-3.5 h-3.5 text-stone-400' />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='bg-neutral-900 border border-white/5 rounded-xl py-2 pl-9 pr-8 text-xs font-poppins text-stone-300 focus:outline-none focus:border-border-gold appearance-none cursor-pointer'
          >
            <option value='all'>All Bookings</option>
            <option value='confirmed'>Confirmed</option>
            <option value='pending'>Pending</option>
            <option value='completed'>Completed</option>
          </select>
        </div>
      </div>

      {/* --- GLOBAL APP ENGINE STATUS FEEDBACK INDICATOR CONTAINER --- */}
      {error && (
        <div className='max-w-7xl mx-auto w-full mb-6'>
          <StatusIndecator error={error} />
        </div>
      )}

      {/* 2. Loading Lifecycle Status Screens */}
      {loading && (
        <div className='text-center py-12 text-sm text-stone-400'>
          Loading secure system configurations...
        </div>
      )}

      {/* Empty Fallback Block */}
      {!loading && !error && bookings.length === 0 && (
        <div className='text-center py-16 text-xs uppercase tracking-widest text-stone-500 bg-white/5 border border-white/5 rounded-2xl'>
          No dashboard entries found matching your selected criteria.
        </div>
      )}

      {/* 3. Core Operational Interface Grid */}
      {!loading && !error && bookings.length > 0 && (
        <div className='w-full max-w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-10 relative'>
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancelClick={openCancelModal}
            />
          ))}
        </div>
      )}

      {/* 4. Declarative Custom Confirmation Modal Portal Integration */}
      <ConfirmationModal
        {...modalProps}
        title='Cancel Booking Request'
        description='Are you completely sure you want to request a cancellation for this event service registration slot? This action updates system transaction states.'
      />
    </div>
  );
}

function BookingCard({ booking, onCancelClick }) {
  const statusColors = {
    pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    confirmed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    completed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col justify-between min-h-[220px] transition-all duration-300 relative group hover:border-amber-400 hover:shadow-2xl'>
      {/* CARD ROW 1: Status Badging & Trash Action Pin */}
      <div className='flex items-center justify-between w-full mb-4'>
        <span
          className={`font-poppins text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border ${statusColors[booking.status] || ""}`}
        >
          {booking.status}
        </span>

        {booking.status !== "cancelled" && booking.status !== "completed" && (
          <button
            onClick={() => onCancelClick(booking.id)}
            className='w-7 h-7 rounded-lg bg-neutral-900 border border-white/5 text-stone-400 hover:text-red-400 hover:bg-red-500/10 flex items-center justify-center transition-all cursor-pointer'
            title='Cancel Request'
          >
            <Trash2 className='w-3.5 h-3.5' />
          </button>
        )}
      </div>

      {/* CARD ROW 2: Header Identity Block */}
      <div className='mb-5'>
        <h3 className='font-montserrat font-black text-lg text-white tracking-wide group-hover:text-amber-400 transition-colors duration-200 line-clamp-1'>
          {booking.serviceName}
        </h3>
        <span className='font-poppins text-xs uppercase font-semibold text-stone-400 tracking-wider block mt-1'>
          Event Registration Schedule
        </span>
      </div>

      {/* CARD ROW 3: Lower Balance and Scheduling Specifications Meta Grid */}
      <div className='border-t border-white/5 pt-4 flex flex-col gap-2'>
        <div className='flex items-center gap-2 text-stone-400 font-poppins text-xs'>
          <Calendar className='w-3.5 h-3.5 text-amber-400 shrink-0' />
          <span>{booking.date}</span>
        </div>

        <div className='flex items-center justify-between gap-4 text-stone-400 font-poppins text-xs mt-0.5'>
          <div className='flex items-center gap-2'>
            <DollarSign className='w-3.5 h-3.5 text-amber-400 shrink-0' />
            <span>Amount Paid</span>
          </div>
          <strong className='text-white font-bold text-sm tracking-wide'>
            Rs. {booking.amount?.toLocaleString()}
          </strong>
        </div>
      </div>
    </div>
  );
}
