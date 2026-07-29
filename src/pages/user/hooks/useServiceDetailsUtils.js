import { useState } from "react";
import { useLocation, useParams } from "react-router";
import { usePublicServiceDetails } from "../../../hooks/usePublicServiceDetails";

export function useServiceDetailsUtils() {
  const location = useLocation();
  const { serviceId, id, vendorId: routeVendorId } = useParams();
  const resolvedServiceId = serviceId || id || null;

  // 1. Destructure the refetch or refetchReviewData function if your base hook provides one!
  const { service, reviews, loading, error, refetch } =
    usePublicServiceDetails(resolvedServiceId);
  const [isFavorite, setIsFavorite] = useState(false);
  const token = localStorage.getItem("token");

  const isDashboardView = location.pathname.startsWith("/customer/dashboard");
  const fallbackExplorePath = isDashboardView
    ? "/customer/dashboard/services"
    : "/services";

  const vendorId =
    service?.vendor?._id || service?.vendor?.id || routeVendorId || null;

  // Build the unified safe redirect target path string
  const checkoutBookingPath = !token
    ? "/auth/register"
    : isDashboardView
      ? `/customer/dashboard/booking/${resolvedServiceId}/vendor/${vendorId}`
      : `/booking/${resolvedServiceId}/vendor/${vendorId}`;

  return {
    loading,
    error,
    service,
    reviews: reviews || [],
    vendor: service?.vendor,
    isFavorite,
    setIsFavorite,
    fallbackExplorePath,
    checkoutBookingPath,
    refetchReviewData: refetch, // 3. Expose it here to power the live UI refresh pipeline!
  };
}
