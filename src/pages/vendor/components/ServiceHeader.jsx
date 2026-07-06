import AvatarPlaceholder from "../../../assets/avarar1.jpg";
import { Star } from "lucide-react";

export default function ServiceHeader({ service, reviews = [] }) {
  const vendor = service.vendorId || {};

  // Calculate average rating dynamically
  const totalReviews = reviews.length;
  const avgRating =
    totalReviews > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(
          1,
        )
      : "0.0";

  return (
    <div className='w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row justify-between items-stretch md:items-center gap-5 sm:gap-6 overflow-hidden'>
      {/* Left Block: Avatar & Core Text Branding Meta */}
      <div className='flex items-center gap-4 min-w-0 w-full md:flex-1'>
        <div className='w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-border-gold shadow-md shrink-0'>
          <img
            src={vendor.profileImage || AvatarPlaceholder}
            alt='Vendor Profile'
            className='w-full h-full object-cover'
          />
        </div>

        {/* min-w-0 combined with truncate fixes the text escaping bugs */}
        <div className='min-w-0 flex-1 font-poppins'>
          <h1 className='font-montserrat font-semibold text-lg sm:text-xl md:text-2xl text-white tracking-tight truncate w-full block'>
            {service.title}
          </h1>
          <span className='text-[10px] sm:text-xs font-bold text-border-gold-hover tracking-wider uppercase block mt-1 truncate w-full'>
            Managed by{" "}
            {vendor.companyName || `${vendor.firstName} ${vendor.lastName}`}
          </span>
        </div>
      </div>

      {/* Right Block: Base Pricing Details & Review Aggregate Metrics */}
      {/* On mobile (below md), this section now creates a clean split layout with a top line separator */}
      <div className='flex items-center gap-4 sm:gap-8 font-poppins justify-between md:justify-end border-t md:border-t-0 border-white/5 pt-4 md:pt-0 w-full md:w-auto shrink-0'>
        {/* Price Section */}
        <div className='text-left md:text-right flex flex-col justify-center min-w-0'>
          <span className='text-[10px] text-stone-400 font-medium uppercase tracking-widest block leading-none truncate'>
            Base Rate ({service.priceType || "Fixed"})
          </span>
          <span className='text-lg sm:text-2xl font-black text-white tracking-tight mt-1.5 block leading-none whitespace-nowrap'>
            Rs. {service.price?.toLocaleString()}
          </span>
        </div>

        {/* Reviews Section */}
        <div className='text-right flex flex-col justify-center items-end shrink-0'>
          <span className='text-[10px] text-stone-400 font-medium uppercase tracking-widest block leading-none'>
            Reviews
          </span>
          <div className='flex items-center gap-1 mt-1.5 h-5 sm:h-7'>
            <Star className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400 shrink-0' />
            <span className='text-xs sm:text-sm font-bold text-stone-200 whitespace-nowrap'>
              {avgRating}{" "}
              <span className='text-stone-400 font-normal'>
                ({totalReviews})
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
