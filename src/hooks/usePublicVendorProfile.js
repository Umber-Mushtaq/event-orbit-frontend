import { useEffect, useState } from "react";
import axios from "axios";

export function usePublicVendorProfile(vendorId) {
  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/vendor/Profile/${vendorId}`,
        );
        if (res.data?.success) {
          setProfile(res.data.profile);
          setReviews(res.data.reviews || []);
        } else {
          setError("Failed to load vendor profile.");
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "Error fetching vendor profile.",
        );
      } finally {
        setLoading(false);
      }
    };
    if (vendorId) fetchProfile();
  }, [vendorId]);

  return { profile, reviews, loading, error };
}
