import { Star, SlidersHorizontal, AlertCircle } from "lucide-react";
import { useServiceReviews } from "../hooks/useServerReviews";
import CustomLoading from "../../../shared_components/CustomLoading";

function ServiceReviews() {
  const { reviews, stats, filter, setFilter, loading, error } =
    useServiceReviews();

  if (loading && reviews.length === 0) {
    return <CustomLoading msg='Loading service reviews...' />;
  }

  return (
    <section className='min-h-screen w-full bg-white/5 border border-white/30 rounded-lg text-white py-12 px-6 md:px-10 relative overflow-hidden'>
      <div className='absolute -top-12 -right-12 w-48 h-48 bg-amber-500/5 blur-3xl rounded-full pointer-events-none' />

      {/* PAGE MAIN TOP HEADER */}
      <div className='w-full max-w-6xl mx-auto pb-6 border-b border-white/5 mb-6 z-10 relative'>
        <h1 className='font-normal text-3xl text-white tracking-tight'>
          Service Reviews
        </h1>
        <p className='font-poppins font-light text-sm text-stone-400 mt-1'>
          Monitor your customer satisfaction score and browse through incoming
          feedback ratings.
        </p>
      </div>

      {error && (
        <div className='w-full max-w-6xl mx-auto mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl flex items-center gap-2'>
          <AlertCircle className='w-5 h-5' />
          <span className='text-sm font-poppins'>{error}</span>
        </div>
      )}

      {/* 1. FILTER BAR PLACED EXPLICITLY ON TOP */}
      <div className='w-full max-w-6xl mx-auto flex items-center justify-end gap-3 mb-6 z-10 relative'>
        <span className='font-poppins font-medium text-sm text-stone-400'>
          Filter:
        </span>
        <div className='relative flex items-center'>
          <SlidersHorizontal className='absolute left-3 w-3.5 h-3.5 text-stone-500' />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='border border-stone-400 bg-neutral-900/40 rounded-xl py-2 pl-9 pr-8 text-xs font-poppins text-stone-300 focus:outline-none focus:border-border-gold appearance-none cursor-pointer'
          >
            <option value='all'>Star rating (All)</option>
            <option value='5'>5 Stars</option>
            <option value='4'>4 Stars</option>
            <option value='3_less'>3 Stars or less</option>
          </select>
        </div>
      </div>

      {/* WORKSPACE GRID */}
      <div className='w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start z-10 relative'>
        {/* 2. LEFT SIDE: CUSTOMER FEEDBACK LIST (Now occupies col-span-9 first) */}
        <div className='lg:col-span-9 flex flex-col gap-5 w-full'>
          {reviews.length === 0 ? (
            <div className='text-center py-16 font-poppins text-stone-500 border border-dashed border-white/10 rounded-2xl bg-neutral-900/10'>
              No reviews found matching this filter criteria.
            </div>
          ) : (
            reviews.map((review) => (
              <div
                key={review._id}
                className='bg-neutral-900/40 backdrop-blur-md border border-stone-400 rounded-2xl p-6 flex items-start gap-5 transition-all duration-300 hover:border-border-gold hover:shadow-xl'
              >
                {/* User Avatar */}
                <div className='w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-md bg-neutral-800 flex items-center justify-center text-white font-bold text-xs uppercase border border-white/10'>
                  {review.avatar ? (
                    <img
                      src={review.avatar}
                      alt={review.userName}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    review.userName?.substring(0, 2)
                  )}
                </div>

                {/* Review Text Block */}
                <div className='grow font-poppins relative'>
                  <div className='flex items-center justify-between gap-4 mb-1'>
                    <div className='flex gap-0.5'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < review.rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-stone-700"
                          }`}
                        />
                      ))}
                    </div>
                    <span className='text-xs text-stone-500 tracking-wide'>
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className='flex flex-col gap-0.5 mb-2'>
                    <span className='text-xs font-semibold text-stone-300'>
                      {review.userName}
                    </span>
                    <h3 className='font-montserrat font-bold text-sm text-border-gold-hover tracking-wide'>
                      {review.serviceName}
                    </h3>
                  </div>

                  <p className='font-poppins font-light text-sm text-stone-400 leading-relaxed text-pretty'>
                    {review.comment}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 3. RIGHT SIDE: RATINGS BREAKDOWN SIDEBAR (Now occupies col-span-3 last) */}
        <div className='lg:col-span-3 flex flex-col gap-6 w-full lg:sticky lg:top-6'>
          {/* VENDOR OVERALL RATING BADGE */}
          <div className='bg-neutral-900/40 backdrop-blur-md border border-border-gold rounded-2xl p-6 flex flex-col items-center text-center shadow-gold-glow'>
            <span className='font-poppins font-semibold text-xs tracking-wider uppercase text-stone-400'>
              Vendor Rating
            </span>
            <span className='font-montserrat font-black text-4xl text-white tracking-tight mt-1'>
              {stats.averageRating || "0.0"}
            </span>
            <div className='flex gap-1 mt-2'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(stats.averageRating)
                      ? "text-amber-400 fill-amber-400"
                      : "text-stone-600"
                  }`}
                />
              ))}
            </div>
            <span className='text-[11px] font-poppins text-stone-500 mt-2 block'>
              Based on {stats.totalReviews} total ratings
            </span>
          </div>

          {/* HISTORICAL RATING DISTRIBUTION ROWS */}
          <div className='bg-neutral-900/40 backdrop-blur-md border border-stone-400 rounded-2xl p-5 flex flex-col gap-4'>
            <span className='font-poppins font-semibold text-xs tracking-wider uppercase text-stone-400 block border-b border-white/5 pb-2'>
              Distribution
            </span>

            {/* 5 Star Matrix Row */}
            <div className='flex items-center justify-between text-xs font-poppins text-stone-400'>
              <div className='flex items-center gap-1'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className='w-3.5 h-3.5 text-amber-400 fill-amber-400'
                  />
                ))}
              </div>
              <span className='font-bold text-stone-300'>
                {stats.fiveStars}
              </span>
            </div>

            {/* 4 Star Matrix Row */}
            <div className='flex items-center justify-between text-xs font-poppins text-stone-400'>
              <div className='flex items-center gap-1'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < 4 ? "text-amber-400 fill-amber-400" : "text-stone-700"}`}
                  />
                ))}
              </div>
              <span className='font-bold text-stone-300'>
                {stats.fourStars}
              </span>
            </div>

            {/* 3 Star Matrix Row */}
            <div className='flex items-center justify-between text-xs font-poppins text-stone-400'>
              <div className='flex items-center gap-1'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < 3 ? "text-amber-400 fill-amber-400" : "text-stone-700"}`}
                  />
                ))}
              </div>
              <span className='font-bold text-stone-300'>
                {stats.threeStarsOrLess}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceReviews;
