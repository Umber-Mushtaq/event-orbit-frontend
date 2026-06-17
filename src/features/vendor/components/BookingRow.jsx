function BookingRow({ booking }) {
  // Parse dynamic dates safely
  const formattedEventDate = new Date(booking.eventDate).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  // Evaluate dynamic badges
  const isConfirmed = booking.bookingStatus === "confirmed";
  const statusClass = isConfirmed
    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 drop-shadow-[0_2px_8px_rgba(52,211,153,0.1)]"
    : "bg-amber-500/10 text-amber-400 border-amber-500/20 drop-shadow-[0_2px_8px_rgba(251,191,36,0.1)]";

  return (
    <div className='flex flex-col gap-2 sm:grid sm:grid-cols-3 items-start sm:items-center bg-neutral-900/40 border border-white/5 rounded-xl p-4 sm:p-3 sm:px-4 transition-colors hover:border-white/10'>
      {/* Title Column */}
      <div className='flex flex-col min-w-0 w-full'>
        <span className='font-poppins text-xs font-medium sm:font-normal text-stone-200 sm:text-stone-400 truncate max-w-full sm:max-w-[150px]'>
          {booking.serviceId?.title || "Deleted Service"}
        </span>
      </div>

      {/* Date Parameters Column */}
      <div className='flex flex-col font-poppins text-xs text-stone-400 sm:text-stone-300'>
        <span>{formattedEventDate}</span>
      </div>

      {/* Status Badge Column */}
      <div className='flex sm:justify-end w-full sm:w-auto mt-1 sm:mt-0'>
        <span
          className={`border text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full tracking-wider ${statusClass}`}
        >
          {booking.bookingStatus}
        </span>
      </div>
    </div>
  );
}

export default BookingRow;
