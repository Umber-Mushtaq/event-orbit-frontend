import VendorCard from "../../public_vendor/ui/VendorCard";
import CustomHeader from "../../../shared_components/CustomHeader";
import CustomLoading from "../../../shared_components/CustomLoading";
import CustomError from "../../../shared_components/CustomError";
import { useVerifiedVendors } from "../../../hooks/useVerifiedVendors";
import { Link } from "react-router";

function LandingPageVerifiedVendors() {
  const { vendors, loading, error } = useVerifiedVendors();

  console.log("vendors-----", vendors);

  if (loading) return <CustomLoading msg='Loading vendors...' />;
  if (error) return <CustomError msg={error} />;

  return (
    <div className='py-20 px-6 bg-neutral-950 flex flex-col items-center w-full'>
      <div className='w-full max-w-7xl mx-auto'>
        <CustomHeader badge='Verified Vendors' title='Our Featured Vendors' />
      </div>

      <div className='flex flex-col w-full max-w-7xl mx-auto items-center'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 mb-12 w-full'>
          {vendors.slice(0, 3).map((vendor) => (
            <VendorCard key={vendor._id} vendor={vendor} />
          ))}
        </div>

        <Link
          to='/vendors'
          className='bg-amber-400 px-5 py-2.5 rounded-md font-semibold w-fit transition hover:bg-amber-300 shadow-gold-glow'
        >
          Browse All Vendors
        </Link>
      </div>
    </div>
  );
}

export default LandingPageVerifiedVendors;
