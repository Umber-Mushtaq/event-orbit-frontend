import { useState } from "react";
import {
  AlertCircle,
  Check,
  Edit3,
  Loader2,
  Save,
  X,
} from "lucide-react";
import { useBookingRequests } from "../hooks/useBookingRequests";
import ConfirmationModal from "../components/ConfirmationModal";

const bookingStatusOptions = ["pending", "confirmed", "completed", "cancelled"];
const paymentStatusOptions = ["pending", "paid", "refunded"];

const formatDisplayDate = (dateValue) => {
  if (!dateValue) return "Not set";

  return new Date(dateValue).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatInputDate = (dateValue) => {
  if (!dateValue) return "";

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return "";

  return date.toISOString().slice(0, 10);
};

const statusClasses = {
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  confirmed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  completed: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/30",
};

function BookingRequests() {
  const {
    bookings,
    loading,
    error,
    handleStatusAction,
    handleBookingUpdate,
  } = useBookingRequests();

  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({});
  const [savingId, setSavingId] = useState(null);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    bookingId: null,
    targetStatus: null,
    title: "",
    message: "",
    variant: "gold",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const startEditing = (booking) => {
    setEditingId(booking._id);
    setDraft({
      eventDate: formatInputDate(booking.requestedDate),
      guestsCount: booking.guestsCount || 1,
      totalAmount: booking.amount || 0,
      bookingStatus: booking.status || "pending",
      paymentStatus: booking.paymentStatus || "pending",
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setDraft({});
  };

  const updateDraft = (field, value) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const saveBooking = async (bookingId) => {
    try {
      setSavingId(bookingId);
      await handleBookingUpdate(bookingId, {
        eventDate: draft.eventDate,
        guestsCount: Number(draft.guestsCount),
        totalAmount: Number(draft.totalAmount),
        bookingStatus: draft.bookingStatus,
        paymentStatus: draft.paymentStatus,
      });
      cancelEditing();
    } finally {
      setSavingId(null);
    }
  };

  const openConfirmation = (booking, action) => {
    const isConfirming = action === "confirmed";
    setModalConfig({
      isOpen: true,
      bookingId: booking._id,
      targetStatus: action,
      title: isConfirming ? "Confirm Booking" : "Decline Booking",
      message: isConfirming
        ? `Approve ${booking.customerName || "this customer"}'s booking for ${formatDisplayDate(booking.requestedDate)}?`
        : `Decline ${booking.customerName || "this customer"}'s booking request?`,
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
    <section className='min-h-screen w-full bg-white/5 border border-white/30 rounded-lg text-white py-12 px-4 md:px-8 relative overflow-hidden'>
      <div className='absolute -top-12 -right-12 w-48 h-48 bg-amber-500/5 blur-3xl rounded-full pointer-events-none' />

      <div className='w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-stone-400 z-10 relative'>
        <div className='flex flex-col gap-2'>
          <h1 className='font-normal text-3xl text-white tracking-tight'>
            Vendor Bookings
          </h1>
          <p className='font-poppins font-light text-sm text-stone-400 mt-1'>
            View every booking and edit schedule, payment, amount, and status.
          </p>
        </div>
      </div>

      {error && (
        <div className='w-full max-w-7xl mx-auto mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl flex items-center gap-2'>
          <AlertCircle className='w-5 h-5 shrink-0' />
          <span className='text-sm font-poppins'>{error}</span>
        </div>
      )}

      <div className='w-full max-w-7xl mx-auto z-10 relative'>
        {bookings.length === 0 ? (
          <div className='text-center py-16 font-poppins text-stone-500 border border-dashed border-white/10 rounded-2xl'>
            No bookings found.
          </div>
        ) : (
          <div className='overflow-x-auto rounded-xl border border-white/10 bg-neutral-950/40'>
            <table className='w-full min-w-[980px] border-collapse text-left font-poppins'>
              <thead className='bg-white/5 text-[11px] uppercase tracking-widest text-stone-400'>
                <tr>
                  <th className='px-4 py-4 font-semibold'>Customer</th>
                  <th className='px-4 py-4 font-semibold'>Service</th>
                  <th className='px-4 py-4 font-semibold'>Event Date</th>
                  <th className='px-4 py-4 font-semibold'>Guests</th>
                  <th className='px-4 py-4 font-semibold'>Amount</th>
                  <th className='px-4 py-4 font-semibold'>Booking</th>
                  <th className='px-4 py-4 font-semibold'>Payment</th>
                  <th className='px-4 py-4 font-semibold text-right'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-white/10'>
                {bookings.map((booking) => {
                  const isEditing = editingId === booking._id;
                  const isSaving = savingId === booking._id;

                  return (
                    <tr
                      key={booking._id}
                      className='text-sm text-stone-200 transition-colors hover:bg-white/[0.03]'
                    >
                      <td className='px-4 py-4 align-middle'>
                        <span className='block max-w-[160px] truncate font-semibold text-white'>
                          {booking.customerName || "Unknown Customer"}
                        </span>
                      </td>
                      <td className='px-4 py-4 align-middle'>
                        <span className='block max-w-[180px] truncate'>
                          {booking.serviceName}
                        </span>
                      </td>
                      <td className='px-4 py-4 align-middle'>
                        {isEditing ? (
                          <input
                            type='date'
                            value={draft.eventDate}
                            onChange={(event) =>
                              updateDraft("eventDate", event.target.value)
                            }
                            className='w-36 rounded-lg border border-white/10 bg-neutral-900 px-3 py-2 text-xs text-white outline-none focus:border-border-gold'
                          />
                        ) : (
                          formatDisplayDate(booking.requestedDate)
                        )}
                      </td>
                      <td className='px-4 py-4 align-middle'>
                        {isEditing ? (
                          <input
                            type='number'
                            min='1'
                            value={draft.guestsCount}
                            onChange={(event) =>
                              updateDraft("guestsCount", event.target.value)
                            }
                            className='w-24 rounded-lg border border-white/10 bg-neutral-900 px-3 py-2 text-xs text-white outline-none focus:border-border-gold'
                          />
                        ) : (
                          booking.guestsCount?.toLocaleString() || "-"
                        )}
                      </td>
                      <td className='px-4 py-4 align-middle'>
                        {isEditing ? (
                          <input
                            type='number'
                            min='0'
                            value={draft.totalAmount}
                            onChange={(event) =>
                              updateDraft("totalAmount", event.target.value)
                            }
                            className='w-28 rounded-lg border border-white/10 bg-neutral-900 px-3 py-2 text-xs text-white outline-none focus:border-border-gold'
                          />
                        ) : (
                          <span className='font-semibold text-border-gold-hover'>
                            Rs. {booking.amount?.toLocaleString() || 0}
                          </span>
                        )}
                      </td>
                      <td className='px-4 py-4 align-middle'>
                        {isEditing ? (
                          <select
                            value={draft.bookingStatus}
                            onChange={(event) =>
                              updateDraft("bookingStatus", event.target.value)
                            }
                            className='w-32 rounded-lg border border-white/10 bg-neutral-900 px-3 py-2 text-xs text-white outline-none focus:border-border-gold'
                          >
                            {bookingStatusOptions.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <StatusBadge status={booking.status} />
                        )}
                      </td>
                      <td className='px-4 py-4 align-middle'>
                        {isEditing ? (
                          <select
                            value={draft.paymentStatus}
                            onChange={(event) =>
                              updateDraft("paymentStatus", event.target.value)
                            }
                            className='w-28 rounded-lg border border-white/10 bg-neutral-900 px-3 py-2 text-xs text-white outline-none focus:border-border-gold'
                          >
                            {paymentStatusOptions.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <StatusBadge status={booking.paymentStatus} />
                        )}
                      </td>
                      <td className='px-4 py-4 align-middle'>
                        <div className='flex items-center justify-end gap-2'>
                          {isEditing ? (
                            <>
                              <button
                                type='button'
                                onClick={() => saveBooking(booking._id)}
                                disabled={isSaving}
                                className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border-gold bg-glass-gold text-white transition-colors hover:bg-glass-gold-hover disabled:cursor-not-allowed disabled:opacity-60'
                                title='Save changes'
                              >
                                {isSaving ? (
                                  <Loader2 className='h-4 w-4 animate-spin' />
                                ) : (
                                  <Save className='h-4 w-4' />
                                )}
                              </button>
                              <button
                                type='button'
                                onClick={cancelEditing}
                                className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-neutral-900 text-stone-300 transition-colors hover:border-white/20 hover:text-white'
                                title='Cancel editing'
                              >
                                <X className='h-4 w-4' />
                              </button>
                            </>
                          ) : (
                            <>
                              {booking.status === "pending" && (
                                <>
                                  <button
                                    type='button'
                                    onClick={() =>
                                      openConfirmation(booking, "confirmed")
                                    }
                                    className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 transition-colors hover:bg-emerald-500/20'
                                    title='Confirm booking'
                                  >
                                    <Check className='h-4 w-4' />
                                  </button>
                                  <button
                                    type='button'
                                    onClick={() =>
                                      openConfirmation(booking, "cancelled")
                                    }
                                    className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 transition-colors hover:bg-red-500/20'
                                    title='Decline booking'
                                  >
                                    <X className='h-4 w-4' />
                                  </button>
                                </>
                              )}
                              <button
                                type='button'
                                onClick={() => startEditing(booking)}
                                className='inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-neutral-900 text-stone-300 transition-colors hover:border-border-gold hover:text-border-gold-hover'
                                title='Edit booking'
                              >
                                <Edit3 className='h-4 w-4' />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

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

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
        statusClasses[status] ||
        "bg-white/5 text-stone-300 border-white/10"
      }`}
    >
      {status || "unknown"}
    </span>
  );
}

export default BookingRequests;
