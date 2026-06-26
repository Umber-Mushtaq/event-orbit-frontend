import { Star, MapPin, Heart } from "lucide-react";
import { Link } from "react-router";

export function ServiceCard({ item, isFavorite, onToggleFavorite, to }) {
  const backupBanner =
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80";
  const backupAvatar =
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80";

  return (
    <div className='bg-neutral-900/40 backdrop-blur-md rounded-2xl border border-white/5 shadow-xl overflow-hidden group flex flex-col transition-all duration-500 ease-out hover:-translate-y-2 hover:border-amber-500/30'>
      <div className='relative h-60 w-full overflow-hidden bg-neutral-950'>
        <Link to={to} className='block w-full h-full cursor-pointer'>
          <img
            src={item.images?.[0] || backupBanner}
            alt={item.title}
            className='w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-95'
            onError={(e) => {
              e.target.src = backupBanner;
            }}
          />
          <div className='absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/30 opacity-80 group-hover:opacity-90 transition-opacity' />
        </Link>

        <div className='absolute top-4 left-4 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1 rounded-md pointer-events-none'>
          <span className='text-[10px] font-poppins font-extrabold text-amber-400 tracking-widest uppercase'>
            Verified Premium
          </span>
        </div>

        <button
          onClick={() => onToggleFavorite(item.id)}
          className='absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 text-white hover:bg-neutral-900 active:scale-90 transition-all cursor-pointer'
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-300 ${isFavorite ? "fill-red-500 text-red-500 scale-110" : "text-white"}`}
          />
        </button>
      </div>

      <Link
        to={`/services/${item.id}`}
        className='p-6 pt-8 relative flex flex-col flex-grow bg-gradient-to-b from-neutral-950 to-neutral-900/20 text-left cursor-pointer'
      >
        <div className='absolute top-0 left-6 -translate-y-1/2 w-12 h-12 rounded-full ring-2 ring-amber-500/60 shadow-xl overflow-hidden bg-neutral-900 z-10'>
          <img
            src={item.vendor?.avatar || backupAvatar}
            alt='vendor avatar'
            className='w-full h-full object-cover'
            onError={(e) => {
              e.target.src = backupAvatar;
            }}
          />
        </div>

        <div className='mb-3 mt-1'>
          <span className='font-poppins text-[10px] font-bold tracking-widest text-amber-500/90 block uppercase mb-1'>
            {item.vendor?.businessName || "EventOrbit Verified Pro"}
          </span>
          <h3 className='font-montserrat font-black text-base md:text-lg text-white line-clamp-1 group-hover:text-amber-400 transition-colors duration-300 tracking-wide uppercase'>
            {item.title}
          </h3>
        </div>

        <div className='flex items-center gap-2 mb-6'>
          <div className='flex gap-0.5'>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.round(item.averageRating || 5) ? "text-amber-400 fill-amber-400" : "text-stone-800"}`}
              />
            ))}
          </div>
          <span className='text-[11px] font-poppins font-medium text-stone-400'>
            ({item.totalReviews || 0} reviews)
          </span>
        </div>
        <div className='mt-auto border-t border-white/5 pt-4 flex items-center justify-between gap-4 text-xs font-poppins text-stone-400'>
          <div className='flex items-center gap-1.5 min-w-0'>
            <MapPin className='w-4 h-4 text-amber-500/80 shrink-0' />
            <span className='truncate text-stone-300 font-light text-[11px]'>
              {item.location}
            </span>
          </div>
          <div className='text-right shrink-0'>
            <span className='text-[10px] text-stone-500 block uppercase tracking-wider font-semibold'>
              Starting Base
            </span>
            <span className='text-white font-montserrat font-black text-sm tracking-tight'>
              Rs. {item.price?.toLocaleString() || "0"}
            </span>
            <span className='text-[9px] text-stone-400 block font-light capitalize'>
              /{item.priceType || "fixed"}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
