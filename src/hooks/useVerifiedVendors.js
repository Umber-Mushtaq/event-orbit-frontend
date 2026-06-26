import { useEffect, useState } from "react";
import axios from "axios";

export function useVerifiedVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/vendor/all",
        );
        if (response.data?.success) {
          const approved = response.data.vendors.filter((v) => v.isApproved);
          setVendors(approved);
          console.log(approved);
        } else {
          setError("Failed to load vendors.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching vendors.");
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  return { vendors, loading, error };
}
