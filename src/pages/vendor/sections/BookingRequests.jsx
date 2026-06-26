import { useState } from "react";
import { Check, X, Loader2, AlertCircle } from "lucide-react";
import { useBookingRequests } from "../hooks/useBookingRequests";
import ConfirmationModal from "../components/ConfirmationModal";

function BookingRequests() {
  const { bookings, loading, error, handleStatusAction } = useBookingRequests();

  // Modal Configuration Tracking States
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    bookingId: null,
    targetStatus: null, // "confirmed" | "cancelled"
    title: "",
    message: "",
    variant: "gold",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openConfirmation = (booking, action) => {
    const isConfirming = action === "confirmed";
    setModalConfig({
      isOpen: true,
      bookingId: booking._id,
      targetStatus: action,
      title: isConfirming
        ? "Confirm Booking Reservation"
        : "Decline Event Request",
      message: isConfirming
        ? `Are you sure you want to approve the booking reservation for ${booking.customerName} on ${new Date(booking.requestedDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}? This will finalize their lock allocation slots.`
        : `Are you sure you want to decline this reservation request from ${booking.customerName}? The customer will be informed, and schedule availability limits will release.`,
      variant: isConfirming ? "gold" : "danger",
    });
  };

  const closeConfirmation = () => {
    setModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  const executeStatusChange = async () => {
    try {
      setIsSubmitting(true);
      await handleStatusAction(modalConfig.bookingId, modalConfig.targetStatus);
      closeConfirmation();
    } catch (err) {
      console.error("Modal operation execution pipeline crash:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className='w-full min-h-screen flex items-center justify-center bg-neutral-950'>
        <Loader2 className='w-10 h-10 animate-spin text-border-gold' />
      </div>
    );
  }

  return (
    <section className='min-h-screen w-full bg-white/5 border border-white/30 rounded-lg text-white py-12 px-6 md:px-10 relative overflow-hidden'>
      <div className='absolute -top-12 -right-12 w-48 h-48 bg-amber-500/5 blur-3xl rounded-full pointer-events-none' />

      {/* HEADER BAR */}
      <div className='w-full max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-stone-400 z-10 relative'>
        <div className='flex flex-col gap-2'>
          <h1 className='font-normal text-3xl text-white tracking-tight'>
            Booking Requests
          </h1>
          <p className='font-poppins font-light text-sm text-stone-400 mt-1'>
            Review incoming vendor applications, track schedules, and authorize
            reservations.
          </p>
        </div>
      </div>

      {error && (
        <div className='w-full max-w-5xl mx-auto mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl flex items-center gap-2'>
          <AlertCircle className='w-5 h-5' />
          <span className='text-sm font-poppins'>{error}</span>
        </div>
      )}

      {/* DYNAMIC CARD RENDERING */}
      <div className='w-full max-w-5xl mx-auto flex flex-col gap-6 z-10 relative'>
        {bookings.length === 0 ? (
          <div className='text-center py-16 font-poppins text-stone-500 border border-dashed border-white/10 rounded-2xl'>
            No incoming booking requests found.
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking._id}
              className='bg-neutral-900/50 backdrop-blur-md border border-stone-400 rounded-2xl p-6 flex flex-col gap-6 transition-all duration-300 hover:border-border-gold hover:shadow-2xl'
            >
              <div className='grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 items-start'>
                {/* Customer */}
                <div className='flex flex-col gap-2'>
                  <span className='font-poppins font-semibold text-[10px] tracking-wider uppercase text-stone-400'>
                    Customer Name
                  </span>
                  <span className='font-montserrat font-bold text-sm text-white truncate'>
                    {booking.customerName}
                  </span>
                </div>

                {/* Date */}
                <div className='flex flex-col gap-2'>
                  <span className='font-poppins font-semibold text-[10px] tracking-wider uppercase text-stone-400'>
                    Requested Date
                  </span>
                  <span className='font-poppins text-xs font-medium text-stone-300'>
                    {new Date(booking.requestedDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </span>
                </div>

                {/* Service */}
                <div className='flex flex-col gap-2 col-span-1 md:col-span-1'>
                  <span className='font-poppins font-semibold text-[10px] tracking-wider uppercase text-stone-400'>
                    Service Name
                  </span>
                  <span className='font-poppins text-xs font-semibold text-white truncate'>
                    {booking.serviceName}
                  </span>
                </div>

                {/* Price Amount */}
                <div className='flex flex-col gap-2'>
                  <span className='font-poppins font-semibold text-[10px] tracking-wider uppercase text-stone-400'>
                    Amount
                  </span>
                  <span className='font-poppins text-xs font-bold text-border-gold-hover'>
                    ${booking.amount.toLocaleString()}
                  </span>
                </div>

                {/* Status Badges Container */}
                <div className='flex flex-col gap-2 col-span-2 md:col-span-1 items-start md:items-end'>
                  <span className='font-poppins font-semibold text-[10px] tracking-wider uppercase text-stone-400 hidden md:block mb-1'>
                    Status
                  </span>
                  <span
                    className={`font-poppins text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border ${
                      booking.status === "pending"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/30 drop-shadow-[0_2px_8px_rgba(251,191,36,0.15)]"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 drop-shadow-[0_2px_8px_rgba(16,185,129,0.15)]"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              {booking.status === "pending" && (
                <div className='flex items-center gap-3 pt-4 border-t border-white/5 w-full justify-start'>
                  <button
                    onClick={() => openConfirmation(booking, "confirmed")}
                    className='bg-glass-gold hover:bg-glass-gold-hover border border-border-gold text-white font-poppins text-[11px] font-semibold py-2 px-4 rounded-xl flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow-gold-glow'
                  >
                    <Check className='w-3.5 h-3.5 text-border-gold-hover' />
                    Confirm
                  </button>
                  <button
                    onClick={() => openConfirmation(booking, "cancelled")}
                    className='bg-red-500/10 hover:bg-red-500/20 border border-red-500/40 text-red-400 font-poppins text-[11px] font-semibold py-2 px-4 rounded-xl flex items-center gap-1.5 transition-all duration-200 cursor-pointer'
                  >
                    <X className='w-3.5 h-3.5' />
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* PERSISTENT CONFIRMATION MODAL OVERLAY PORTAL */}
      <ConfirmationModal
        isOpen={modalConfig.isOpen}
        onClose={closeConfirmation}
        onConfirm={executeStatusChange}
        title={modalConfig.title}
        message={modalConfig.message}
        variant={modalConfig.variant}
        isProcessing={isSubmitting}
      />
    </section>
  );
}

export default BookingRequests;
