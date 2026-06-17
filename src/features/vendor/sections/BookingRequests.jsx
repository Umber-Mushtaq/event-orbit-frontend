import { useState, useEffect } from "react";
import axios from "axios";
import { Search, Check, Eye, X, Loader2, AlertCircle } from "lucide-react";

function BookingRequests() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 1. Fetch Request Stream
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/bookings/requests",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.data.success) {
        setBookings(response.data.bookings);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load booking actions.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // 2. Action Update Engine (Confirm / Decline Handlers)
  const handleStatusAction = async (id, actionStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:5000/api/bookings/requests/${id}`,
        { status: actionStatus },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data.success) {
        // Optimistically filter or update item layout states natively without page refresh
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: actionStatus } : b)),
        );
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Could not complete status transaction update.",
      );
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

              {/* ACTION BUTTONS (Only render if booking is currently pending) */}
              {booking.status === "pending" && (
                <div className='flex items-center gap-3 pt-4 border-t border-white/5 w-full justify-start'>
                  <button
                    onClick={() => handleStatusAction(booking._id, "confirmed")}
                    className='bg-glass-gold hover:bg-glass-gold-hover border border-border-gold text-white font-poppins text-[11px] font-semibold py-2 px-4 rounded-xl flex items-center gap-1.5 transition-all duration-200 cursor-pointer shadow-gold-glow'
                  >
                    <Check className='w-3.5 h-3.5 text-border-gold-hover' />
                    Confirm
                  </button>
                  <button
                    onClick={() => handleStatusAction(booking._id, "cancelled")}
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
    </section>
  );
}

export default BookingRequests;
