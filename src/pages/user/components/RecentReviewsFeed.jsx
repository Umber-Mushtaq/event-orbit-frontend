import { Star } from "lucide-react";

export function RecentReviewsFeed({ reviews }) {
  // 🌟 High-quality, hosted fallback profile image that always loads reliably
  const defaultProfileAvatar =
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";

  if (!reviews || reviews.length === 0) {
    return (
      <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 text-stone-500 font-poppins text-sm text-center'>
        You haven't written any reviews yet.
      </div>
    );
  }

  // Hero calculations extracted dynamically from real primary array index
  const heroReview = reviews[0];

  return (
    <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 md:p-6 shadow-xl flex flex-col w-full'>
      {/* Top Main Account Profile Header Card Element */}
      <div className='flex items-center gap-4 border-b border-white/5 pb-5 mb-5'>
        <div className='w-14 h-14 rounded-full overflow-hidden border-2 border-amber-500/40 shrink-0 shadow-lg bg-neutral-800'>
          <img
            src={heroReview.avatar || defaultProfileAvatar}
            className='w-full h-full object-cover'
            alt='Profile Card User'
            onError={(e) => {
              e.target.src = defaultProfileAvatar;
            }} // Intercept broken DB paths
          />
        </div>
        <div className='font-poppins min-w-0'>
          <h3 className='font-montserrat font-black text-base text-white truncate'>
            {heroReview.userName || "EventOrbit Customer"}
          </h3>
          <span className='text-xs text-stone-400 block mt-0.5 uppercase tracking-wide truncate capitalize'>
            {heroReview.profile || "Customer"}
          </span>
          <span className='text-xs text-stone-400 block truncate'>
            {heroReview.subProfile || "Verified User"}
          </span>
        </div>
      </div>

      {/* Reviews Section Header */}
      <span className='font-montserrat font-bold text-xs uppercase tracking-wider text-stone-400 mb-4 block'>
        My Reviews
      </span>

      {/* Vertical Feed Box Row Items List Layout */}
      <div className='flex flex-col gap-5 max-h-[340px] overflow-y-auto pr-1 custom-scrollbar'>
        {reviews.map((review) => (
          <div
            key={review.id || review._id}
            className='flex gap-3 items-start border-b border-white/5 pb-4 last:border-0 last:pb-0'
          >
            {/* Small Reviewer Badge */}
            <div className='w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0 bg-neutral-800'>
              <img
                src={review.avatar || defaultProfileAvatar}
                className='w-full h-full object-cover'
                alt='reviewer profile'
                onError={(e) => {
                  e.target.src = defaultProfileAvatar;
                }} // Intercept broken DB paths in the map
              />
            </div>

            {/* Review Payload details */}
            <div className='font-poppins flex flex-col min-w-0'>
              {/* Gold Stars Metric Indicator row layout */}
              <div className='flex gap-0.5 mb-1.5'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-2.5 h-2.5 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-stone-700"}`}
                  />
                ))}
              </div>
              <p className='font-poppins font-light text-xs text-stone-400 leading-relaxed text-pretty'>
                {review.comment}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
