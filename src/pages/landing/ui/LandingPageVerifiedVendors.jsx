import VendorCard from "../../public_vendor/ui/VendorCard";
import CustomHeader from "../../../shared_components/CustomHeader";
import CustomLoading from "../../../shared_components/CustomLoading";
import CustomError from "../../../shared_components/CustomError";
import { useVerifiedVendors } from "../../../hooks/useVerifiedVendors";

function LandingPageVerifiedVendors() {
  const { vendors, loading, error } = useVerifiedVendors();

  if (loading) return <CustomLoading msg='Loading Categories...' />;
  if (error) return <CustomError msg={error} />;

  return (
    <div className='py-20 px-10 bg-neutral-950'>
      <CustomHeader badge='Verified Vendors' title='Our Featured Vendors' />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10'>
        {vendors.slice(0, 3).map((vendor) => (
          <VendorCard key={vendor._id} vendor={vendor} />
        ))}
      </div>
    </div>
  );
}

export default LandingPageVerifiedVendors;
