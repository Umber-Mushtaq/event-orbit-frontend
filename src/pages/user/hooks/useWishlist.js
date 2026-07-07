import { useState, useEffect } from "react";
import axios from "axios";

export function useWishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:5000/api";

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      const response = await axios.get(`${API_BASE_URL}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data?.success) {
        setWishlist(response.data.wishlistList);
      }
    } catch (err) {
      console.error("Error fetching wishlist items:", err);
      setError(
        err.response?.data?.message || "Failed to load wishlist entries.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Return fetchWishlist so components can manually call it
  return {
    wishlist,
    loading,
    error,
    setWishlist,
    fetchWishlist, // <-- Added this line
  };
}
