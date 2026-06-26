import { Loader2 } from "lucide-react";
import { useVendorDashboard } from "../hooks/useVendorDashboard.js";
import ReviewCard from "./ReviewCard";

export function RecentReviews() {
  const { reviews, loading, error } = useVendorDashboard();

  if (loading) {
    return (
      <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl flex justify-center items-center w-full h-80'>
        <Loader2 className='w-8 h-8 animate-spin text-border-gold' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl flex justify-center items-center w-full text-red-400 font-poppins text-xs'>
        {error}
      </div>
    );
  }

  return (
    <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col w-full max-h-120 overflow-y-auto'>
      <h2 className='font-montserrat font-bold text-lg text-white mb-6 border-b border-white/5 pb-3'>
        Recent Reviews
      </h2>

      <div className='flex flex-col gap-4'>
        {reviews.length === 0 ? (
          <div className='text-center font-poppins text-xs text-stone-500 py-10'>
            No customer reviews posted yet.
          </div>
        ) : (
          reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))
        )}
      </div>
    </div>
  );
}
