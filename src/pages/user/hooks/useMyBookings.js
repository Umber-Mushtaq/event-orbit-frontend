import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../../config/api";
import { showToast } from "../../../shared_components/toastStore";

export function useMyBookings() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Modal Integration States ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      const response = await axios.get(apiUrl("/api/bookings/bookings"), {
        headers: { Authorization: `Bearer ${token}` },
        params: { status: filter },
      });

      if (response.data?.success) {
        setBookings(response.data.bookingsList);
      }
    } catch (err) {
      console.error("Error fetching collections:", err);
      setError(err.response?.data?.message || "Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  // Stage 1: User clicks the cancel trash can icon
  const openCancelModal = (bookingId) => {
    setSelectedBookingId(bookingId);
    setIsModalOpen(true);
  };

  // Stage 2: User closes modal or cancels action manually
  const closeCancelModal = () => {
    setIsModalOpen(false);
    setSelectedBookingId(null);
    setIsActionLoading(false);
  };

  const executeCancellation = async () => {
    if (!selectedBookingId) return;

    try {
      setIsActionLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        apiUrl(`/api/bookings/requests/${selectedBookingId}`),
        { status: "cancelled" },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data?.success) {
        fetchBookings();
        closeCancelModal();
      }
    } catch (err) {
      showToast({
        type: "error",
        message:
          err.response?.data?.message || "Could not execute cancellation request.",
      });
      setIsActionLoading(false);
    }
  };

  return {
    bookings,
    filter,
    setFilter,
    loading,
    error,
    // Modal-bound exposure assets
    modalProps: {
      isOpen: isModalOpen,
      isLoading: isActionLoading,
      onClose: closeCancelModal,
      onConfirm: executeCancellation,
    },
    openCancelModal,
  };
}
