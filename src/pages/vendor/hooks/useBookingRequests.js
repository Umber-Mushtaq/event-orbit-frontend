import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../../config/api";
import { showToast } from "../../../shared_components/toastStore";

export function useBookingRequests() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 1. Fetch Request Stream
  useEffect(() => {
    const controller = new AbortController();

    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");

        const response = await axios.get(apiUrl("/api/bookings/requests"), {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });

        if (response.data.success) {
          setBookings(response.data.bookings);
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(
            err.response?.data?.message || "Failed to load booking actions.",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();

    return () => controller.abort();
  }, []);

  // 2. Action Update Engine (Confirm / Decline Handlers)
  const handleStatusAction = async (id, actionStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        apiUrl(`/api/bookings/requests/${id}`),
        { status: actionStatus },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data.success) {
        // Optimistically update states natively without page refresh
        setBookings((prev) =>
          prev.map((b) =>
            b._id === id
              ? response.data.formattedBooking || { ...b, status: actionStatus }
              : b,
          ),
        );
        showToast({
          type: "success",
          message: response.data.message || "Booking updated successfully.",
        });
      }
    } catch (err) {
      showToast({
        type: "error",
        message:
          err.response?.data?.message ||
          "Could not complete status transaction update.",
      });
    }
  };

  const handleBookingUpdate = async (id, updates) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        apiUrl(`/api/bookings/requests/${id}`),
        updates,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data.success) {
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === id
              ? response.data.formattedBooking || { ...booking, ...updates }
              : booking,
          ),
        );
        showToast({
          type: "success",
          message: response.data.message || "Booking updated successfully.",
        });
        return response.data.formattedBooking;
      }

      return null;
    } catch (err) {
      showToast({
        type: "error",
        message:
          err.response?.data?.message || "Could not save booking changes.",
      });
      throw err;
    }
  };

  return {
    bookings,
    loading,
    error,
    handleStatusAction,
    handleBookingUpdate,
  };
}
