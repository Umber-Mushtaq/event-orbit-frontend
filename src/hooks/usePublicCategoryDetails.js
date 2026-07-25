import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../config/api";

export function usePublicCategoryDetails(categoryId) {
  const [category, setCategory] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchCategoryDetails = async () => {
      if (!categoryId) {
        setLoading(false);
        setError("Missing category identifier.");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          apiUrl(`/api/categories/categoryDetail/${categoryId}`),
          { signal: controller.signal },
        );

        if (!response.data?.success) {
          throw new Error("Failed to load category details.");
        }

        const payload = response.data.data || {};
        setCategory({
          id: payload._id,
          name: payload.name,
          description: payload.description,
          image: payload.image,
          icon: payload.icon,
          status: payload.status,
          vendors: payload.vendors,
          bookings: payload.bookings,
          revenue: payload.revenue,
          listings: payload.listings,
        });
        setVendors(Array.isArray(payload.relatedVendors) ? payload.relatedVendors : []);
      } catch (requestError) {
        if (axios.isCancel(requestError)) return;
        setError(
          requestError.response?.data?.message ||
            requestError.message ||
            "Failed to load category details.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryDetails();

    return () => {
      controller.abort();
    };
  }, [categoryId]);

  return {
    category,
    vendors,
    loading,
    error,
  };
}
