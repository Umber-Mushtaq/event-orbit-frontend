import { useLocation } from "react-router";
import hallImage from "../../../assets/hall.jpeg";
import photographyImage from "../../../assets/photography.jpg";
import floralImage from "../../../assets/service1.jpg";

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

  const navigationTarget = isDashboardView
    ? `/customer/dashboard/services/${serviceId}`
    : `/services/${serviceId}`;

  const fallbackAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    service?.vendor?.businessName || "Vendor",
  )}&backgroundType=solid&backgroundColor=1c1917`;

  const defaultHeroImage =
    "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600";

  const titleText = `${service?.title || ""} ${service?.category || ""}`.toLowerCase();
  const serviceTitle = String(service?.title || "").toLowerCase();
  const isHallService =
    titleText.includes("walima") ||
    titleText.includes("wallima") ||
    titleText.includes("hall") ||
    titleText.includes("venue") ||
    titleText.includes("banquet");

  const preferredHeroImage =
    serviceTitle.includes("cinematic wedding") ||
    serviceTitle.includes("wedding film")
      ? photographyImage
      : serviceTitle.includes("fresh floral") ||
          serviceTitle.includes("fresh floor") ||
          serviceTitle.includes("floral styling")
        ? floralImage
        : "";

  const fallbackHeroImage =
    preferredHeroImage || (isHallService ? hallImage : defaultHeroImage);

  const resolveImageUrl = (image) => {
    if (!image) return "";

    if (typeof image === "string") {
      return image.trim();
    }

    return (
      image.secure_url ||
      image.url ||
      image.src ||
      image.path ||
      ""
    ).trim();
  };

  const heroImage =
    preferredHeroImage ||
    resolveImageUrl(service?.images?.[0]) ||
    resolveImageUrl(service?.image) ||
    resolveImageUrl(service?.thumbnail) ||
    fallbackHeroImage;

  return {
    navigationTarget,
    formattedPriceType: formatPriceType(service?.priceType),
    fallbackAvatar,
    defaultHeroImage: fallbackHeroImage,
    heroImage,
    displayRating: Number(service?.averageRating || 0).toFixed(1),
    totalReviewsCount: service?.totalReviews || 0,
  };
}
