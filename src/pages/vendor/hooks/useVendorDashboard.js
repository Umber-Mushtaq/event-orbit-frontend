import { useState, useEffect } from "react";
import axios from "axios";

export const useVendorDashboard = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
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
          axios.get(`${API_BASE_URL}/api/vendor/dashboard-overview`, config),
          axios.get(`${API_BASE_URL}/api/vendor/upcoming-bookings`, config),
          axios.get(`${API_BASE_URL}/api/vendor/recent-reviews`, config),
        ]);

        setMetrics(metricsRes.data.metrics);
        setBookings(bookingsRes.data.bookings);
        setReviews(reviewsRes.data.reviews);
        console.log("upcomming bookings", bookingsRes.data.bookings);
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
