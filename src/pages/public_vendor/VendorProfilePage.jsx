import { useParams } from "react-router";
import { usePublicVendorProfile } from "../../hooks/usePublicVendorProfile";
import { useServiceListings } from "../../hooks/useServiceListings";
import { useMemo } from "react";
import CustomLoading from "../../shared_components/CustomLoading";
import CustomError from "../../shared_components/CustomError";
import NothingFound from "../../shared_components/NotingFound";
import VendorProfile from "./ui/VendorProfile";
import SEO from "../../seo/SEO";
import { breadcrumbSchema, localBusinessSchema } from "../../seo/schema";
import { getVendorSlug } from "../../utils/slug";

function VendorProfilePage() {
  const params = useParams();
  const vendorId = params.vendorId || params.id;
  const { profile, reviews, loading, error } = usePublicVendorProfile(vendorId);
  const resolvedVendorId = profile?._id || vendorId;
  const {
    services,
    loading: servicesLoading,
    error: servicesError,
  } = useServiceListings({});

  const vendorServices = useMemo(
    () =>
      services.filter((service) => {
        const serviceVendorId = service?.vendor?.id || service?.vendor?._id;
        return String(serviceVendorId) === String(resolvedVendorId);
      }),
    [services, resolvedVendorId],
  );

  const bookingTarget = useMemo(() => {
    const primaryService = vendorServices[0];
    const serviceId = primaryService?.id || primaryService?._id;

    if (!serviceId || !resolvedVendorId) return "";

    return `/checkout/${serviceId}/vendor/${resolvedVendorId}`;
  }, [vendorServices, resolvedVendorId]);

  if (loading || servicesLoading) {
    return <CustomLoading msg='Loading vendor profile...' />;
  }
  if (error) return <CustomError msg={error} />;
  if (!profile) return <NothingFound msg='No Vendor Found' />;

  const vendorName =
    profile.businessName ||
    [profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
    "Vendor";
  const vendorLocation =
    profile.location || profile.city || profile.country || "Event Orbit marketplace";
  const vendorSlug = getVendorSlug(profile) || vendorId;

  return (
    <>
      <SEO
        title={`${vendorName} - Trusted Vendor in ${vendorLocation}`}
        description={
          profile.businessDescription ||
          profile.vendorBio ||
          `View ${vendorName}, a trusted Event Orbit vendor in ${vendorLocation}.`
        }
        keywords={[vendorName, vendorLocation, "trusted vendor", "event vendor"]}
        canonical={`/vendor/${vendorSlug}`}
        image={profile.profileImage}
        type='profile'
        schema={[
          localBusinessSchema({
            name: vendorName,
            description: profile.businessDescription || profile.vendorBio,
            image: profile.profileImage,
            url: `/vendor/${vendorSlug}`,
            telephone: profile.phoneNumber || profile.whatsappNumber,
            address: profile.address || vendorLocation,
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Vendors", url: "/vendors" },
            { name: vendorName, url: `/vendor/${vendorSlug}` },
          ]),
        ]}
      />
      <VendorProfile
        profile={profile}
        reviews={reviews}
        services={vendorServices}
        allServices={services}
        servicesError={servicesError}
        bookingTarget={bookingTarget}
      />
    </>
  );
}

export default VendorProfilePage;
