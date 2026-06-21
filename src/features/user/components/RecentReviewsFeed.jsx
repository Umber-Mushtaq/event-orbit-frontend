import { Star } from "lucide-react";
import { REVIEWS_LIST } from "../dummyData";

export function RecentReviewsFeed() {
  const heroReview = REVIEWS_LIST[0]; // Takes profile display baseline info from data card mapping

  return (
    <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 md:p-6 shadow-xl flex flex-col w-full'>
      {/* Top Main Account Profile Header Card Element */}
      <div className='flex items-center gap-4 border-b border-white/5 pb-5 mb-5'>
        <div className='w-14 h-14 rounded-full overflow-hidden border-2 border-border-gold shadow-gold-glow shrink-0'>
          <img
            src={heroReview.avatar}
            alt='Profile Card User'
            className='w-full h-full object-cover'
          />
        </div>
        <div className='font-poppins min-w-0'>
          <h3 className='font-montserrat font-black text-base text-white truncate'>
            {heroReview.userName}
          </h3>
          <span className='text-xs text-stone-400 block mt-0.5 uppercase tracking-wide truncate'>
            {heroReview.profile}
          </span>
          <span className='text-xs text-stone-400 block truncate'>
            {heroReview.subProfile}
          </span>
        </div>
      </div>

      {/* Reviews Comments Header Row */}
      <span className='font-montserrat font-bold text-xs uppercase tracking-wider text-stone-400 mb-4 block'>
        My Reviews
      </span>

      {/* Vertical Feed Box Row Items List Layout */}
      <div className='flex flex-col gap-5 max-h-[340px] overflow-y-auto pr-1 custom-scrollbar'>
        {REVIEWS_LIST.map((review) => (
          <div
            key={review.id}
            className='flex gap-3 items-start border-b border-white/5 pb-4 last:border-0 last:pb-0'
          >
            <div className='w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0'>
              <img
                src={review.avatar}
                alt='reviewer profile'
                className='w-full h-full object-cover'
              />
            </div>
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
