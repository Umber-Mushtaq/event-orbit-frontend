import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../config/api";

export function usePublicServiceDetails(serviceId) {
  const [data, setData] = useState({
    service: null,
    vendor: null,
    reviews: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServiceDetails = useCallback(async () => {
    if (!serviceId) {
      setLoading(false);
      setError("Missing service identifier.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        apiUrl(`/api/services/serviceDetail/${serviceId}`),
      );

      if (response.data?.success) {
        const payload = response.data.data;

        setData({
          service: {
            id: payload._id,
            title: payload.title,
            description: payload.description,
            price: payload.price,
            priceType: payload.priceType,
            location: payload.location,
            images: payload.images || [],
            highlights: payload.highlights || [],
            averageRating: payload.averageRating,
          },
          vendor: payload.vendor
            ? {
                _id: payload.vendor._id,
                fullName: payload.vendor.fullName,
                businessName: payload.vendor.businessName,
                businessDescription: payload.vendor.businessDescription,
                vendorBio: payload.vendor.vendorBio,
                email: payload.vendor.email,
                phoneNumber: payload.vendor.phoneNumber,
                whatsappNumber: payload.vendor.whatsappNumber,
                profileImage: payload.vendor.profileImage,
                createdAt: payload.vendor.createdAt,
                website: payload.vendor.website,
                linkedin: payload.vendor.linkedin,
                instagram: payload.vendor.instagram,
                facebook: payload.vendor.facebook,
              }
            : null,
          reviews:
            payload.reviews?.map((rev) => ({
              id: rev._id,
              authorName: rev.authorName,
              profileImage: rev.profileImage,
              rating: rev.rating,
              comment: rev.comment,
              createdAt: rev.createdAt,
              date: new Date(rev.createdAt).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              }),
            })) || [],
        });
      } else {
        setError("Failed to resolve application response payload syntax.");
      }
    } catch (err) {
      console.error("Axios network cluster error:", err);
      setError(err.response?.data?.message || "Network request failure.");
    } finally {
      setLoading(false);
    }
  }, [serviceId]);

  useEffect(() => {
    fetchServiceDetails();
  }, [fetchServiceDetails]);

  return {
    service: data.service,
    vendor: data.vendor,
    reviews: data.reviews,
    loading,
    error,
    refetch: fetchServiceDetails,
  };
}
