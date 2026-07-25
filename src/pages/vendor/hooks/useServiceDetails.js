import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { apiUrl } from "../../../config/api";

export const useServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllDetails = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError("");

        const [serviceRes, reviewsRes] = await Promise.all([
          axios.get(apiUrl(`/api/services/serviceDetail/${id}`)),
          axios.get(apiUrl(`/api/reviews/service/${id}`)),
        ]);

        setService(serviceRes.data.service);
        setReviews(reviewsRes.data.reviews || []);
      } catch (err) {
        setError(err.response?.data?.message || "Nothing to show yet.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllDetails();
  }, [id]);

  return { service, reviews, loading, error };
};
