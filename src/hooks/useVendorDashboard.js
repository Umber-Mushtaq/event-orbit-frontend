import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../config/api";

export const useVendorDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [metricsRes, bookingsRes, reviewsRes] = await Promise.all([
          axios.get(apiUrl("/api/vendor/dashboard-overview"), config),
          axios.get(apiUrl("/api/vendor/upcoming-bookings"), config),
          axios.get(apiUrl("/api/vendor/recent-reviews"), config),
        ]);

        setMetrics(metricsRes.data.metrics);
        setBookings(bookingsRes.data.bookings);
        setReviews(reviewsRes.data.reviews);
      } catch (err) {
        setError(err.response?.data?.message || "Noting to show yet.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { metrics, bookings, reviews, loading, error };
};
