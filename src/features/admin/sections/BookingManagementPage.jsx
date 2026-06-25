import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import SharedCards from "../components/shared/SharedCards";
import SharedHeader from "../components/shared/SharedHeader";
import SharedTable from "../components/shared/SharedTable";
import BookingFormModal from "../components/bookings/BookingFormModal";
import {
  bookingPaymentStyles,
  bookingStats,
  emptyBookingForm,
  initialBookings,
} from "../data/bookingManagementData";

function BookingManagementPage() {
  const [bookings, setBookings] = useState(initialBookings);
  const [formOpen, setFormOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);

  const rows = useMemo(() => bookings, [bookings]);

  const handleSave = (payload) => {
    if (!payload.event.trim() || !payload.amount.trim()) return;

    if (editingBooking) {
      setBookings((current) =>
        current.map((item) =>
          item.id === editingBooking.id
            ? {
                ...item,
                event: payload.event,
                paymentStatus: payload.paymentStatus,
                amount: payload.amount,
              }
            : item,
        ),
      );
    } else {
      setBookings((current) => [
        {
          id: payload.id || `BK-${Date.now().toString().slice(-4)}`,
          event: payload.event,
          paymentStatus: payload.paymentStatus,
          amount: payload.amount,
        },
        ...current,
      ]);
    }

    setFormOpen(false);
    setEditingBooking(null);
  };

  return (
    <div className='space-y-6'>
      <SharedHeader
        title='Bookings'
        description='Track every booking from confirmation to completion.'
        actionLabel='New Booking'
        actionIcon={Plus}
        onAction={() => {
          setEditingBooking(null);
          setFormOpen(true);
        }}
      />

      <SharedCards items={bookingStats} />

      <SharedTable
        rows={rows}
        columns={[
          {
            key: "id",
            label: "Booking",
            render: (item) => (
              <div className='font-semibold text-white'>
                <p>{item.id}</p>
              </div>
            ),
          },
          {
            key: "event",
            label: "Event",
            render: (item) => <span className='text-stone-300'>{item.event}</span>,
          },
          {
            key: "paymentStatus",
            label: "Payment",
            render: (item) => (
              <span
                className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                  bookingPaymentStyles[item.paymentStatus] || bookingPaymentStyles.Pending
                }`}
              >
                $ {item.paymentStatus}
              </span>
            ),
          },
          {
            key: "amount",
            label: "Amount",
            render: (item) => <span className='font-semibold text-white'>{item.amount}</span>,
          },
        ]}
        showSearch={false}
        showFilters={false}
        showSort={false}
        showActions={false}
        emptyMessage='No bookings found.'
      />

      <BookingFormModal
        open={formOpen}
        mode={editingBooking ? "edit" : "create"}
        initialValue={editingBooking || emptyBookingForm}
        onClose={() => {
          setFormOpen(false);
          setEditingBooking(null);
        }}
        onSave={handleSave}
      />
    </div>
  );
}

export default BookingManagementPage;
