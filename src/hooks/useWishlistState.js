import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { apiUrl } from "../config/api";

export function useWishlistState() {
  const [wishlistServiceIds, setWishlistServiceIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingServiceId, setUpdatingServiceId] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const wishlistSet = useMemo(
    () => new Set(wishlistServiceIds.map((id) => String(id))),
    [wishlistServiceIds],
  );

  const fetchWishlist = useCallback(async () => {
    if (!token) {
      setWishlistServiceIds([]);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.get(apiUrl("/api/wishlist"), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data?.success) {
        const ids = (response.data.wishlistList || [])
          .map((item) => item.serviceId)
          .filter(Boolean);
        setWishlistServiceIds(ids);
      }
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Failed to load your wishlist.",
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const isWishlisted = useCallback(
    (serviceId) => wishlistSet.has(String(serviceId)),
    [wishlistSet],
  );

  const toggleWishlist = useCallback(
    async (serviceId) => {
      if (!serviceId || updatingServiceId) return false;

      if (!token) {
        setError("Please login to add items to your wishlist.");
        return false;
      }

      const normalizedServiceId = String(serviceId);
      const wasWishlisted = wishlistSet.has(normalizedServiceId);

      try {
        setUpdatingServiceId(normalizedServiceId);
        setError("");
        setWishlistServiceIds((current) =>
          wasWishlisted
            ? current.filter((id) => String(id) !== normalizedServiceId)
            : [...current, normalizedServiceId],
        );

        const response = await axios.post(
          apiUrl("/api/wishlist/toggle"),
          { serviceId },
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (response.data?.success) {
          setWishlistServiceIds((current) => {
            const withoutTarget = current.filter(
              (id) => String(id) !== normalizedServiceId,
            );
            return response.data.isWishlisted
              ? [...withoutTarget, normalizedServiceId]
              : withoutTarget;
          });
          return true;
        }

        throw new Error("Wishlist update failed.");
      } catch (requestError) {
        setWishlistServiceIds((current) =>
          wasWishlisted
            ? [...current, normalizedServiceId]
            : current.filter((id) => String(id) !== normalizedServiceId),
        );
        setError(
          requestError.response?.data?.message ||
            requestError.message ||
            "Could not update wishlist.",
        );
        return false;
      } finally {
        setUpdatingServiceId("");
      }
    },
    [token, updatingServiceId, wishlistSet],
  );

  return {
    wishlistServiceIds,
    loading,
    error,
    updatingServiceId,
    isWishlisted,
    toggleWishlist,
    fetchWishlist,
  };
}
