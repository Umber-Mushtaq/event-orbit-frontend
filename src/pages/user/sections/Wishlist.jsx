import { Link } from "react-router";
import { Heart } from "lucide-react";
import { useWishlist } from "../hooks/useWishlist";
import WishlistCard from "../components/WishlistCard";
import StatusIndecator from "../../../shared_components/StatusIndecator";

function Wishlist() {
  const { wishlist, loading, error, fetchWishlist } = useWishlist();

  return (
    <section className='w-full flex flex-col items-center px-4'>
      <h1 className='font-normal text-2xl md:text-4xl text-white tracking-tight self-start pb-10'>
        My Wishlist
      </h1>

      {error && (
        <div className='w-full max-w-full mb-6'>
          <StatusIndecator error={error} />
        </div>
      )}

      {loading && (
        <div className='text-center py-20 text-sm text-stone-400 font-poppins'>
          Retrieving your premium bookmarked collections...
        </div>
      )}

      {/* Dynamic Data Content Presenter */}
      {!loading && wishlist.length > 0 && (
        <div className='w-full max-w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-10 relative px-1'>
          {wishlist.map((item) => (
            <WishlistCard
              key={item.id}
              item={item}
              onWishlistChanged={fetchWishlist} // <-- Directly passing the database refetcher
            />
          ))}
        </div>
      )}

      {/* FALLBACK EMPTY STATE VIEW */}
      {!loading && wishlist.length === 0 && (
        <div className='w-full max-w-md mx-auto flex flex-col items-center justify-center py-20 text-center border border-white/5 rounded-3xl bg-neutral-900 z-10 relative'>
          <div className='w-14 h-14 rounded-full bg-neutral-950 border border-white/5 text-amber-400 flex items-center justify-center mb-4'>
            <Heart className='w-6 h-6 text-amber-400 opacity-40 animate-pulse' />
          </div>
          <h3 className='font-montserrat font-bold text-lg text-white tracking-tight'>
            Your Wishlist is Empty
          </h3>
          <p className='font-poppins font-light text-xs text-stone-500 mt-2 leading-relaxed max-w-xs px-4'>
            Browse through our premium verified vendor listings to save your
            favorites here.
          </p>
          <Link
            to='/customer/dashboard/categories'
            className='mt-6 bg-amber-400 hover:bg-amber-500 text-black font-poppins text-xs font-semibold py-2.5 px-5 rounded-xl transition-all duration-200'
          >
            Explore Categories
          </Link>
        </div>
      )}
    </section>
  );
}

export default Wishlist;
