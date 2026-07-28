import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../config/api";

export function useServiceListings(filters = {}) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchServices = async () => {
      setLoading(true);
      setError(null);
      setServices([]);
      try {
        const params = new URLSearchParams();

        // 1. Conditionally append parameters to match your controller logic
        if (filters.category && filters.category !== "all") {
          params.append("category", filters.category);
        }
        if (filters.location && filters.location.trim() !== "") {
          params.append("location", filters.location.trim());
        }
        if (filters.maxPrice && filters.maxPrice !== "") {
          params.append("maxPrice", filters.maxPrice);
        }
        if (filters.date && filters.date !== "") {
          params.append("date", filters.date);
        }
        if (filters.search && filters.search.trim() !== "") {
          params.append("search", filters.search.trim());
        }

        const response = await axios.get(
          apiUrl(`/api/services/getAllServices?${params.toString()}`),
          { signal: abortController.signal },
        );

        if (response.data?.success) {
          setServices(response.data.data);
        } else {
          setError("Failed to resolve service listings payload.");
        }
      } catch (err) {
        // Don't update state if the request was intentionally cancelled by an active re-render
        if (axios.isCancel(err)) return;

        console.error("Axios service listing error:", err);
        setError(err.response?.data?.message || "Marketplace request failure.");
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchServices();

    // Clean up function to abort the network request on component unmount or filter mutation
    return () => {
      abortController.abort();
    };
  }, [
    filters.category,
    filters.location,
    filters.maxPrice,
    filters.date,
    filters.search,
  ]); // Array listens for changes to individual filter fields to trigger a reload

  return { services, loading, error };
}
