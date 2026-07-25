import { useState, useEffect } from "react";
import axios from "axios";

export function useBookingRequests() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
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

        const response = await axios.get(
          `${API_BASE_URL}/api/bookings/requests`,
          {
            headers: { Authorization: `Bearer ${token}` },
            signal: controller.signal,
          },
        );

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
        `${API_BASE_URL}/api/bookings/requests/${id}`,
        { status: actionStatus },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data.success) {
        // Optimistically update states natively without page refresh
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

  return {
    bookings,
    loading,
    error,
    handleStatusAction,
  };
}
