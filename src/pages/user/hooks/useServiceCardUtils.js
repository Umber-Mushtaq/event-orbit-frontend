import { useLocation } from "react-router";

export function useServiceCardUtils(service) {
  const location = useLocation();
  const isDashboardView = location.pathname.startsWith("/customer/dashboard");
  const formatPriceType = (type) => {
    switch (type) {
      case "per_guest":
        return "/ guest";
      case "hourly":
        return "/ hour";
      default:
        return " fixed";
    }
  };

  const serviceId = service?.id || service?._id;
  const vendorId = service?.vendor?.id || service?.vendor?._id;

  const navigationTarget = isDashboardView
    ? `/customer/dashboard/service/${serviceId}/vendor/${vendorId}`
    : `/service/${serviceId}/vendor/${vendorId}`;

  const fallbackAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    service?.vendor?.businessName || "Vendor",
  )}&backgroundType=solid&backgroundColor=1c1917`;

  const defaultHeroImage =
    "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600";

  return {
    navigationTarget,
    formattedPriceType: formatPriceType(service?.priceType),
    fallbackAvatar,
    heroImage: service?.images?.[0] || defaultHeroImage,
    displayRating: Number(service?.averageRating || 0).toFixed(1),
    totalReviewsCount: service?.totalReviews || 0,
  };
}
