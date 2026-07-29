import { Navigate, useParams } from "react-router";
import { usePublicVendorProfile } from "../../../hooks/usePublicVendorProfile";
import CustomError from "../../../shared_components/CustomError";
import CustomLoading from "../../../shared_components/CustomLoading";

export default function VendorCheckoutRedirect() {
  const { vendorId } = useParams();
  const {
    profile,
    services,
    loading,
    error,
  } = usePublicVendorProfile(vendorId);

  if (loading) {
    return <CustomLoading msg='Loading booking...' />;
  }

  if (error) {
    return <CustomError msg={error} />;
  }

  const resolvedVendorId = profile?._id || vendorId;
  const primaryService = services[0];
  const serviceId = primaryService?.id || primaryService?._id;

  if (!serviceId || !resolvedVendorId) {
    return <CustomError msg='No booking package is available for this vendor yet.' />;
  }

  return (
    <Navigate
      to={`/booking/${serviceId}/vendor/${resolvedVendorId}`}
      replace
    />
  );
}
