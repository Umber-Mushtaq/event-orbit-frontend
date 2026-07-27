import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import SharedCards from "../../components/adminComponent/shared/SharedCards";
import SharedHeader from "../../components/adminComponent/shared/SharedHeader";
import SharedTable from "../../components/adminComponent/shared/SharedTable";
import BookingFormModal from "../../components/adminComponent/bookings/BookingFormModal";
import {
  bookingPaymentStyles,
  emptyBookingForm,
} from "../../data/admin-data/bookingManagementData";
import { adminBookingsApi, getAdminErrorMessage } from "../../../../services/adminApi";
import {
  formatAdminCurrency,
  mapAdminBooking,
} from "../../../../utils/adminTransformers";
import CustomLoading from "../../../../shared_components/CustomLoading";

function BookingManagementPage() {
  const [bookings, setBookings] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBookings = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await adminBookingsApi.list({ limit: 100 });
      setBookings((response.data?.data?.items || []).map(mapAdminBooking));
    } catch (requestError) {
      setError(getAdminErrorMessage(requestError, "Failed to load bookings."));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const rows = useMemo(() => bookings, [bookings]);

  const stats = useMemo(() => {
    const total = bookings.length;
    const confirmed = bookings.filter(
      (booking) => booking.status === "Confirmed",
    ).length;
    const pending = bookings.filter(
      (booking) => booking.status === "Pending",
    ).length;
    const cancelled = bookings.filter(
      (booking) => booking.status === "Cancelled",
    ).length;

    return [
      { label: "Total Bookings", value: String(total), icon: "credit-card" },
      { label: "Confirmed", value: String(confirmed), icon: "badge-check" },
      { label: "Pending", value: String(pending), icon: "clock-3" },
      { label: "Cancelled", value: String(cancelled), icon: "circle-x" },
    ];
  }, [bookings]);

  if (loading) {
    return <CustomLoading msg='Loading bookings...' />;
  }

  const handleSave = async (payload) => {
    if (!payload.event.trim() || !payload.amount.trim()) return;

    try {
      await adminBookingsApi.create(payload);
      await loadBookings();
      setFormOpen(false);
      setEditingBooking(null);
    } catch (requestError) {
      setError(getAdminErrorMessage(requestError, "Failed to save booking."));
    }
  };

  return (
    <div className="space-y-6">
      <SharedHeader
        title="Bookings"
        description="Track every booking from confirmation to completion."
        actionLabel="New Booking"
        actionIcon={Plus}
        onAction={() => {
          setEditingBooking(null);
          setFormOpen(true);
        }}
      />

      <SharedCards items={stats} />

      {error ? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}
      <SharedTable
        rows={rows}
        columns={[
          {
            key: "id",
            label: "Booking",
            render: (item) => (
              <div className="font-semibold text-white">
                <p>{item.id}</p>
              </div>
            ),
          },
          {
            key: "event",
            label: "Event",
            render: (item) => (
              <span className="text-stone-300">{item.event}</span>
            ),
          },
          {
            key: "paymentStatus",
            label: "Payment",
            render: (item) => (
              <span
                className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                  bookingPaymentStyles[item.paymentStatus] ||
                  bookingPaymentStyles.Pending
                }`}
              >
                {item.paymentStatus}
              </span>
            ),
          },
          {
            key: "amount",
            label: "Amount",
            render: (item) => (
              <span className="font-semibold text-white">
                {typeof item.amount === "number"
                  ? formatAdminCurrency(item.amount, item.currency || "USD")
                  : item.amount}
              </span>
            ),
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
        submitError={error}
      />
    </div>
  );
}

export default BookingManagementPage;
