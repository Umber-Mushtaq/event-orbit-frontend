import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../config/api";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      setCategories([]);
      try {
        const response = await axios.get(apiUrl("/api/categories/"), {
          signal: controller.signal,
        });

        if (response.data?.success) {
          setCategories(response.data.data);
        } else {
          setError("Failed to resolve category list data payload structure.");
        }
      } catch (err) {
        if (axios.isCancel(err)) return;
        console.error("Error fetching categories:", err);
        setError(err.response?.data?.message || "Failed to load categories.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCategories();

    return () => {
      controller.abort();
    };
  }, []);
  return { categories, loading, error };
}
