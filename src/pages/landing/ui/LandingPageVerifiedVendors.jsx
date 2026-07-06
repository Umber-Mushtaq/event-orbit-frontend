import VendorCard from "../../public_vendor/ui/VendorCard";
import CustomHeader from "../../../shared_components/CustomHeader";
import CustomLoading from "../../../shared_components/CustomLoading";
import CustomError from "../../../shared_components/CustomError";
import { useVerifiedVendors } from "../../../hooks/useVerifiedVendors";
import { Link } from "react-router";

function LandingPageVerifiedVendors() {
  const { vendors, loading, error } = useVerifiedVendors();

  if (loading) return <CustomLoading msg='Loading Categories...' />;
  if (error) return <CustomError msg={error} />;

  return (
    <div className='py-20 px-10 bg-neutral-950'>
      <CustomHeader badge='Verified Vendors' title='Our Featured Vendors' />
      <div className='flex flex-col items-center justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-10'>
          {vendors.slice(0, 3).map((vendor) => (
            <VendorCard key={vendor._id} vendor={vendor} />
          ))}
        </div>
        <Link
          to='/vendors'
          className='bg-amber-400 px-4 py-2 rounded-md font-semibold'
        >
          Browse All Vendors
        </Link>
      </div>
    </div>
  );
}

export default LandingPageVerifiedVendors;
