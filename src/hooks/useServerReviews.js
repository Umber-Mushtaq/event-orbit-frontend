import { useState, useEffect } from "react";
import axios from "axios";

export function useServiceReviews() {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    fiveStars: 0,
    fourStars: 0,
    threeStarsOrLess: 0,
  });
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchReviewsData = async () => {
      try {
        setLoading(true);
        setError(""); // Reset error state on new filter request
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:5000/api/reviews/vendor-dashboard?ratingFilter=${filter}`,
          {
            headers: { Authorization: `Bearer ${token}` },
            signal: controller.signal,
          },
        );

        if (response.data.success) {
          setReviews(response.data.reviews);
          setStats(response.data.stats);
        }
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(
            err.response?.data?.message || "Failed to load review records.",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReviewsData();

    // Abort flight if user switches filters mid-request
    return () => controller.abort();
  }, [filter]);

  return {
    reviews,
    stats,
    filter,
    setFilter,
    loading,
    error,
  };
}
