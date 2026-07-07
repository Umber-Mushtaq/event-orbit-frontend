import { useState, useEffect } from "react";
import axios from "axios";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories/",
        );

        if (response.data?.success) {
          setCategories(response.data.data);
        } else {
          setError("Failed to resolve category list data payload structure.");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(err.response?.data?.message || "Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  return { categories, loading, error };
}
