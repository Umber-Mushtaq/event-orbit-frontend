import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../config/api";

export function usePublicVendorProfile(vendorId) {
  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        setProfile(null);
        setReviews([]);

        const res = await axios.get(apiUrl(`/api/vendor/Profile/${vendorId}`), {
          signal: controller.signal,
        });
        if (res.data?.success) {
          setProfile(res.data.profile);
          setReviews(res.data.reviews || []);
        } else {
          setError("Failed to load vendor profile.");
        }
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError(
          err.response?.data?.message || "Error fetching vendor profile.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    if (vendorId) {
      fetchProfile();
    }

    return () => {
      controller.abort();
    };
  }, [vendorId]);

  return { profile, reviews, loading, error };
}
