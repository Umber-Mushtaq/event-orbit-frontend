import VendorCard from "./ui/VendorCard";
import CustomHeader from "../../shared_components/CustomHeader";
import CustomLoading from "../../shared_components/CustomLoading";
import CustomError from "../../shared_components/CustomError";
import { useVerifiedVendors } from "../../hooks/useVerifiedVendors";
function VendorsPage() {
  const { vendors, loading, error } = useVerifiedVendors();

  if (loading) return <CustomLoading msg='Loading Categories...' />;
  if (error) return <CustomError msg={error} />;

  return (
    <div className='px-5 py-10 md:px-10 bg-neutral-950'>
      <CustomHeader badge='Our Vendors' title='Explore Our Vendors' />
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10'>
        {vendors.length === 0 ? (
          <NothingFound msg='No Vendor Found' />
        ) : (
          vendors.map((v) => <VendorCard key={v._id} vendor={v} />)
        )}
      </div>
    </div>
  );
}

export default VendorsPage;
