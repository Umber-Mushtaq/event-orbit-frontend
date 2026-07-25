import { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../../config/api";

export function useToggleWishlist(initialState = false) {
  const [isWishlisted, setIsWishlisted] = useState(initialState);
  const [isToggling, setIsToggling] = useState(false);
  const [toggleError, setToggleError] = useState(null);

  const toggleWishlist = async (serviceId) => {
    if (isToggling) return;

    try {
      setIsToggling(true);
      setToggleError(null);
      const token = localStorage.getItem("token");

      setIsWishlisted((prev) => !prev);

      const response = await axios.post(
        apiUrl("/api/wishlist/toggle"),
        { serviceId },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data?.success) {
        setIsWishlisted(response.data.isWishlisted);
      }
    } catch (err) {
      console.error("Error toggling item status:", err);

      setIsWishlisted((prev) => !prev);
      setToggleError(
        err.response?.data?.message || "Could not update bookmark state.",
      );
    } finally {
      setIsToggling(false);
    }
  };

  return {
    isWishlisted,
    setIsWishlisted,
    isToggling,
    toggleError,
    toggleWishlist,
  };
}
