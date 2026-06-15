import { Star, Filter, SlidersHorizontal } from "lucide-react";
import { REVIEWS_DATA } from "../dummyData";

function ServiceReviews() {
  return (
    <section className='min-h-screen w-full bg-white/5 border border-white/30 rounded-lg text-white py-12 px-6 md:px-10 relative overflow-hidden'>
      {/* PAGE MAIN TOP HEADER */}
      <div className='w-full max-w-6xl mx-auto pb-6 border-b border-white/5 mb-10 z-10 relative'>
        <h1 className='font-normal text-3xl text-white tracking-tight'>
          Service Reviews
        </h1>
        <p className='font-poppins font-light text-sm text-stone-400 mt-1'>
          Monitor your customer satisfaction score and browse through incoming
          feedback ratings.
        </p>
      </div>

      {/* TWO-COLUMN SIDEBAR WORKSPACE GRID */}
      <div className='w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start z-10 relative'>
        {/* LEFT COLUMN: RATINGS BREAKDOWN SIDEBAR (Takes 3/12 Columns) */}
        <div className='lg:col-span-3 flex flex-col gap-6'>
          {/* VENDOR OVERALL RATING BADGE */}
          <div className='bg-neutral-900/40 backdrop-blur-md border border-border-gold rounded-2xl p-6 flex flex-col items-center text-center shadow-gold-glow'>
            <span className='font-poppins font-semibold text-xs tracking-wider uppercase text-stone-400'>
              Vendor Rating
            </span>
            <span className='font-montserrat font-black text-4xl text-white tracking-tight mt-1'>
              4.5
            </span>
            <div className='flex gap-1 mt-2'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < 4 ? "text-amber-400 fill-amber-400" : "text-stone-600"}`}
                />
              ))}
            </div>
          </div>

          {/* HISTORICAL RATING DISTRIBUTION ROWS */}
          <div className='bg-neutral-900/40 backdrop-blur-md border border-stone-400 rounded-2xl p-5 flex flex-col gap-4'>
            <span className='font-poppins font-semibold text-xs tracking-wider uppercase text-stone-400 block border-b border-white/5 pb-2'>
              User rating
            </span>

            {/* 5 Star Matrix Row */}
            <div className='flex items-center gap-1'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className='w-3.5 h-3.5 text-amber-400 fill-amber-400'
                />
              ))}
            </div>

            {/* 4 Star Matrix Row */}
            <div className='flex items-center gap-1'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${i < 4 ? "text-amber-400 fill-amber-400" : "text-stone-700"}`}
                />
              ))}
            </div>

            {/* 3 Star Matrix Row */}
            <div className='flex items-center gap-1'>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${i < 3 ? "text-amber-400 fill-amber-400" : "text-stone-700"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: FILTER TOPBAR + CUSTOMER FEEDBACK LIST (Takes 9/12 Columns) */}
        <div className='lg:col-span-9 flex flex-col gap-6'>
          {/* FILTERING OPTIONS ROW DROP-DOWN BAR */}
          <div className='w-full flex items-center justify-end gap-3 backdrop-blur-md '>
            <span className='font-poppins font-medium text-sm text-stone-400'>
              Filter:
            </span>
            <div className='relative flex items-center'>
              <SlidersHorizontal className='absolute left-3 w-3.5 h-3.5 text-stone-500' />
              <select className='border border-stone-400 bg-neutral-900/40 rounded-xl py-2 pl-9 pr-8 text-xs font-poppins text-stone-300 focus:outline-none focus:border-border-gold appearance-none cursor-pointer'>
                <option value='all'>Star rating (All)</option>
                <option value='5'>5 Stars</option>
                <option value='4'>4 Stars</option>
                <option value='3'>3 Stars or less</option>
              </select>
            </div>
          </div>

          {/* DYNAMIC FEEDBACK TEXT CARDS STACK */}
          <div className='flex flex-col gap-5'>
            {REVIEWS_DATA.map((review) => (
              <div
                key={review.id}
                className='bg-neutral-900/40 backdrop-blur-md border border-stone-400 rounded-2xl p-6 flex items-start gap-5 transition-all duration-300 hover:border-border-gold hover:shadow-xl'
              >
                {/* User Avatar Circle Frame Asset */}
                <div className='w-12 h-12 rounded-full overflow-hidden shrink-0 shadow-md'>
                  <img
                    src={review.avatar}
                    alt={review.userName}
                    className='w-full h-full object-cover'
                  />
                </div>

                {/* Review Text Info Block */}
                <div className='grow font-poppins relative'>
                  {/* Top line: Stars Row & Date Anchor */}
                  <div className='flex items-center justify-between gap-4 mb-1'>
                    <div className='flex gap-0.5'>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-stone-400"}`}
                        />
                      ))}
                    </div>
                    <span className='text-xs text-stone-400 tracking-wide'>
                      {review.date}
                    </span>
                  </div>

                  {/* Service Classification Title */}
                  <h3 className='font-montserrat font-bold text-sm text-white tracking-wide mb-3'>
                    {review.serviceName}
                  </h3>

                  {/* Customer Body Comment Paragraph */}
                  <p className='font-poppins font-light text-sm text-stone-400 leading-relaxed text-pretty'>
                    {review.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceReviews;
