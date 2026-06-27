import { Link } from "react-router";
import { Star, MapPin, Heart, ArrowRight } from "lucide-react";
import { useToggleWishlist } from "../hooks/useToggleWishlist";

function WishlistCard({ item, onWishlistChanged }) {
  const { isWishlisted, toggleWishlist, isToggling } = useToggleWishlist(true);

  const handleHeartClick = async () => {
    if (isToggling) return;

    try {
      // 1. Wait completely for the database collection change to complete on your server
      await toggleWishlist(item.serviceId);

      // 2. Refresh the parent components straight from the server instantly on success
      if (onWishlistChanged) {
        onWishlistChanged();
      }
    } catch (err) {
      console.error("Failed to sync database modifications:", err);
    }
  };

  return (
    <div className='bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-lg overflow-hidden group flex flex-col transition-all duration-300 ease-out hover:border-border-gold/40 hover:shadow-2xl relative'>
      {/* CARD COVER MEDIA ELEMENT THUMBNAIL */}
      <div className='relative h-48 w-full overflow-hidden'>
        <img
          src={item.image}
          alt={item.name}
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-black/20' />

        {/* FLOATING ACTIVE REMOVE HEART ICON BADGE */}
        <button
          onClick={handleHeartClick}
          disabled={isToggling}
          title='Remove from Wishlist'
          className='absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 text-red-500 shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer disabled:opacity-50'
        >
          <Heart
            className={`w-4 h-4 transition-all duration-200 ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-stone-400"
            }`}
          />
        </button>
      </div>

      {/* CARD LOWER DESCRIPTIVE WORKING INFO LAYOUT */}
      <div className='p-5 flex flex-col flex-grow relative'>
        <div className='mb-2'>
          <span className='font-poppins text-[10px] font-semibold tracking-wider uppercase text-stone-500 block'>
            {item.category}
          </span>
          <h3 className='font-montserrat font-bold text-base md:text-lg text-white tracking-wide mt-0.5 line-clamp-1 group-hover:text-amber-400 transition-colors duration-200'>
            {item.name}
          </h3>
        </div>

        {/* Star Ratings Row */}
        <div className='flex gap-0.5 mb-4'>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < item.rating
                  ? "text-amber-400 fill-amber-400"
                  : "text-stone-700"
              }`}
            />
          ))}
        </div>

        {/* Geographic Location Label */}
        <div className='flex items-center gap-1.5 text-stone-400 font-poppins text-xs mb-5 min-w-0'>
          <MapPin className='w-4 h-4 text-amber-400 shrink-0' />
          <span className='truncate'>{item.location}</span>
        </div>

        {/* BOTTOM METRIC TRAY ACTION LINKS ROW */}
        <div className='mt-auto border-t border-white/5 pt-4 flex items-center justify-between gap-4'>
          <div className='flex flex-col font-poppins'>
            <span className='text-[9px] text-stone-500 uppercase tracking-widest'>
              Base Rate
            </span>
            <strong className='text-white font-bold text-sm tracking-wide mt-0.5'>
              Rs. {item.price?.toLocaleString()}
            </strong>
          </div>

          <Link
            to={`/customer/dashboard/service/${item.serviceId}/vendor/${item.vendorId}`}
            className='bg-neutral-950 border border-white/10 hover:border-amber-400 text-white font-poppins text-[10px] font-bold py-2 px-3 rounded-xl flex items-center gap-1.5 transition-all duration-200 cursor-pointer uppercase tracking-wider whitespace-nowrap'
          >
            View Info
            <ArrowRight className='w-3 h-3 text-amber-400' />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WishlistCard;
