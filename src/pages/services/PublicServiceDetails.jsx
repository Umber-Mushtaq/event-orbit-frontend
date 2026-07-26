import SEO from "../../shared_components/SEO";
import React from "react";
import { Link } from "react-router";
import { ArrowLeft, Sparkles, MapPin } from "lucide-react";

import { useServiceDetailsUtils } from "../user/hooks/useServiceDetailsUtils";
import { useToggleWishlist } from "../user/hooks/useToggleWishlist";

import { ServiceDetailsHeader } from "./ui/ServiceDetailsHeader";
import { ServiceTitleSection } from "./ui/ServiceTitleSection";
import { ServiceBookingCard } from "./ui/ServiceBookingCard";

import { ImageGallery } from "./ui/ImageGallery";
import { MapLocation } from "./ui/MapLocation";
import { VendorProfile } from "./ui/VendorProfile";
import { Reviews } from "./ui/Reviews"; // <-- Your updated component
import CustomLoading from "../../shared_components/CustomLoading";
import CustomError from "../../shared_components/CustomError";

export default function PublicServiceDetails() {
  const {
    loading,
    error,
    service,
    reviews,
    vendor,
    isFavorite,
    setIsFavorite,
    fallbackExplorePath,
    checkoutBookingPath,
    refetchReviewData, // <-- Extract your hook's data refetcher if available
  } = useServiceDetailsUtils();
  console.log("service details ------", service, vendor);

  const {
    isWishlisted: remoteWishlistedState,
    toggleWishlist,
    isToggling,
  } = useToggleWishlist(isFavorite);

  // Keep utility hook in sync whenever the standalone hook toggles the heart state
  React.useEffect(() => {
    setIsFavorite(remoteWishlistedState);
  }, [remoteWishlistedState, setIsFavorite]);

  if (loading) return <CustomLoading msg="Loading Data" />;

  if (error || !service) {
    return (
      <div className="min-h-screen bg-white/5 border border-white/30 rounded-lg flex flex-col items-center justify-center text-stone-400 gap-4">
        <CustomError msg="No Data Found" />
        <Link
          to={fallbackExplorePath}
          className="text-xs text-stone-300 font-poppins hover:text-amber-400 transition-colors flex items-center gap-1 bg-white/5 border border-white/10 px-4 py-2 rounded-lg"
        >
          <ArrowLeft className="w-3 h-3" /> Return to Listings
        </Link>
      </div>
    );
  }

  const handleToggleFavoriteClick = () => {
    if (isToggling) return;
    toggleWishlist(service._id || service.id);
  };

  // REFRESH DATA CALLBACK FUNCTION
  const handleReviewRefreshPipeline = () => {
    if (refetchReviewData) {
      refetchReviewData(); // Refetches service reviews instantly from your server on success
    } else {
      // Fallback if your custom utility hook doesn't have a refetch handler built yet:
      window.location.reload();
    }
  };

  return (
    <>
      <SEO
        title="Service Details | Event Orbit"
        description="View detailed information about event services, pricing, features, and availability on Event Orbit."
      />
      <main className="min-h-screen w-full bg-neutral-950 text-white font-poppins antialiased pb-24 selection:bg-amber-500 selection:text-black">
        <ServiceDetailsHeader
          explorePath={fallbackExplorePath}
          isFavorite={remoteWishlistedState}
          onToggleFavorite={handleToggleFavoriteClick}
          isToggling={isToggling}
        />

        <section className="max-w-7xl mx-auto px-3 mt-6">
          <ImageGallery images={service.images} title={service.title} />
        </section>

        {/* Split Body Framework Grid */}
        <section className="max-w-7xl mx-auto px-3 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Side: Editorial & Core Data Column */}
          <div className="lg:col-span-2 space-y-10">
            <ServiceTitleSection
              service={service}
              reviewsCount={reviews.length}
            />

            {/* Description Block */}
            <div className="transition-all duration-300 p-8 relative group">
              <div className="absolute top-0 left-6 w-12 h-[2px] bg-amber-500/50 group-hover:w-24 transition-all duration-500" />
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-amber-500/70" />
                <h3 className="font-montserrat font-extrabold text-sm uppercase tracking-widest text-stone-200">
                  Service Overview
                </h3>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed whitespace-pre-line font-normal pl-6">
                {service.description ||
                  "No description provided for this luxury listing."}
              </p>
            </div>

            {/* Map Section */}
            <div className="transition-all duration-300 rounded-2xl p-8 backdrop-blur-sm relative group">
              <div className="absolute top-0 left-6 w-12 h-[2px] bg-amber-500/50 group-hover:w-24 transition-all duration-500" />
              <div className="flex flex-col mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-500/70" />
                  <h3 className="font-montserrat font-extrabold text-sm uppercase tracking-widest text-stone-200">
                    Service Location Map
                  </h3>
                </div>
                <p className="text-sm text-stone-400 font-normal mt-1 pl-6">
                  Exclusively showing localized coordinates inside operating
                  sectors.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden p-1">
                <MapLocation
                  locationName={service?.location}
                  coordinates={service?.coordinates}
                />
              </div>
            </div>

            {/* Reviews Stream Block with tracking IDs passed to the component */}
            <div className="p-2">
              <Reviews
                reviews={reviews}
                onReviewSubmitted={handleReviewRefreshPipeline}
              />
            </div>
          </div>

          {/* Right Side: Sticky Conversion Engine Sidebars */}
          <div className="space-y-8 lg:sticky lg:top-6">
            <ServiceBookingCard
              price={service.price}
              priceType={service.priceType}
              targetCheckoutUrl={checkoutBookingPath}
            />

            <div className="transition-all duration-300 hover:scale-[1.01]">
              <VendorProfile vendor={vendor} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
