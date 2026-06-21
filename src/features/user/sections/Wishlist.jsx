import { useState } from "react";
import { Link } from "react-router";
import { Star, MapPin, Trash2, Heart, ArrowRight } from "lucide-react";
import { WISHLIST_DATA as initialWishlist } from "../dummyData";

function Wishlist() {
  const [wishlist, setWishlist] = useState(initialWishlist);

  // Instant local state filter removal trick for responsive user UX feedback loop
  const handleRemoveItem = (id) => {
    setServices((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section className='w-full flex flex-col items-center'>
      <h1 className='font-normal text-2xl md:text-4xl text-white tracking-tight self-start pb-10'>
        My Wishlist
      </h1>
      {wishlist.length > 0 ? (
        /* DYNAMIC RESPONSE CARD GRID ROWS MATRIX */
        <div className='w-full max-w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-10 relative px-1'>
          {wishlist.map((item) => (
            <div
              key={item.id}
              className='bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-lg overflow-hidden group flex flex-col transition-all duration-300 ease-out hover:border-border-gold/40 hover:shadow-2xl relative'
            >
              {/* CARD COVER MEDIA ELEMENT THUMBNAIL */}
              <div className='relative h-48 w-full overflow-hidden'>
                <img
                  src={item.image}
                  alt={item.name}
                  className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
                {/* Soft dark overlay matrix filter */}
                <div className='absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-black/20' />

                {/* FLOATING ACTIVE REMOVE HEART ICON BADGE */}
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  title='Remove from Wishlist'
                  className='absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 text-red-500 shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer'
                >
                  <Heart className='w-4 h-4 fill-red-500 text-red-500' />
                </button>
              </div>

              {/* CARD LOWER DESCRIPTIVE WORKING INFO LAYOUT */}
              <div className='p-5 flex flex-col flex-grow relative'>
                {/* Header Categorization Tag Title details */}
                <div className='mb-2'>
                  <span className='font-poppins text-[10px] font-semibold tracking-wider uppercase text-stone-500 block'>
                    {item.category}
                  </span>
                  <h3 className='font-montserrat font-bold text-base md:text-lg text-white tracking-wide mt-0.5 line-clamp-1 group-hover:text-border-gold-hover transition-colors duration-200'>
                    {item.name}
                  </h3>
                </div>

                {/* Star Ratings Row Generator metrics */}
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

                {/* Geographic parameters label section row link */}
                <div className='flex items-center gap-1.5 text-stone-400 font-poppins text-xs mb-5 min-w-0'>
                  <MapPin className='w-4 h-4 text-border-gold shrink-0' />
                  <span className='truncate'>{item.location}</span>
                </div>

                {/* BOTTOM METRIC MATRIX TRAY ACTION LINKS ROW */}
                <div className='mt-auto border-t border-white/5 pt-4 flex items-center justify-between gap-4'>
                  <div className='flex flex-col font-poppins'>
                    <span className='text-[9px] text-stone-500 uppercase tracking-widest'>
                      Base Rate
                    </span>
                    <strong className='text-white font-bold text-sm tracking-wide mt-0.5'>
                      ${item.price}
                    </strong>
                  </div>

                  {/* Direct Link Anchor pushing directly down to item detail workspace views */}
                  <Link
                    to={`#`} // Adjust to your explicit service route path
                    className='bg-glass-gold hover:bg-glass-gold-hover border border-border-gold/40 text-white font-poppins text-[10px] font-bold py-2 px-3 rounded-xl flex items-center gap-1.5 transition-all duration-200 shadow-gold-glow cursor-pointer uppercase tracking-wider whitespace-nowrap'
                  >
                    View Info
                    <ArrowRight className='w-3 h-3 text-border-gold-hover' />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* FALLBACK CONDITIONAL EMPTY STATE VIEW BLOCK */
        <div className='w-full max-w-md mx-auto flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-white/5 rounded-3xl bg-neutral-900/10 z-10 relative'>
          <div className='w-14 h-14 rounded-full bg-glass-gold border border-border-gold/20 text-border-gold flex items-center justify-center mb-4 shadow-gold-glow'>
            <Heart className='w-6 h-6 text-border-gold-hover opacity-40 animate-pulse' />
          </div>
          <h3 className='font-montserrat font-bold text-lg text-white tracking-tight'>
            Your Wishlist is Empty
          </h3>
          <p className='font-poppins font-light text-xs text-stone-500 mt-2 leading-relaxed max-w-xs px-4'>
            Browse through our premium verified wedding vendor listings to save
            your favorites here.
          </p>
          <Link
            to='/customer/dashboard/explore' // Direct links out to service discovery page parameters
            className='mt-6 bg-glass-gold hover:bg-glass-gold-hover text-white border border-border-gold shadow-gold-glow font-poppins text-xs font-semibold py-2.5 px-5 rounded-xl transition-all duration-200'
          >
            Explore Services
          </Link>
        </div>
      )}
    </section>
  );
}

export default Wishlist;
