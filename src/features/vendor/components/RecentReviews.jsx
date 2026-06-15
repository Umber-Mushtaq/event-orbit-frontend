import { Star, ChevronRight } from "lucide-react";
import Avatar1 from "../../../assets/avarar1.jpg";
import Avatar2 from "../../../assets/avatar2.jpg";

const REVIEWS_DATA = [
  { name: "Livery Wedding", user: "Sam Muir", rating: 5, img: Avatar1 },
  { name: "Livery Mania", user: "Sara Muir", rating: 5, img: Avatar2 },
  { name: "Livery Wedding", user: "Sam Muir", rating: 5, img: Avatar1 },
  { name: "Livery Mania", user: "Sara Muir", rating: 5, img: Avatar2 },
  { name: "Livery Wedding", user: "Sam Muir", rating: 5, img: Avatar1 },
  { name: "Livery Mania", user: "Sara Muir", rating: 5, img: Avatar2 },
];

export function RecentReviews() {
  return (
    <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col w-full max-h-`max-h-120` overflow-y-auto'>
      <h2 className='font-montserrat font-bold text-lg text-white mb-6 border-b border-white/5 pb-3'>
        Recent Reviews
      </h2>

      <div className='flex flex-col gap-4'>
        {REVIEWS_DATA.map((review, idx) => (
          <div
            key={idx}
            className='flex items-center justify-between bg-neutral-900/40 border border-white/5 rounded-xl p-4 transition-all duration-300 hover:border-border-gold/20 group cursor-pointer'
          >
            <div className='flex items-center gap-4'>
              <div className='w-11 h-11 rounded-full overflow-hidden border border-white/10 shrink-0'>
                <img
                  src={review.img}
                  alt='user avatar'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='font-poppins flex flex-col'>
                <h3 className='font-montserrat font-bold text-sm text-white group-hover:text-border-gold-hover transition-colors'>
                  {review.name}
                </h3>
                <div className='flex gap-0.5 mt-1'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className='w-3 h-3 text-amber-400 fill-amber-400'
                    />
                  ))}
                </div>
                <span className='text-xs text-stone-400 mt-1'>
                  {review.user}
                </span>
              </div>
            </div>
            <ChevronRight className='w-4 h-4 text-stone-400 group-hover:text-border-gold-hover group-hover:translate-x-0.5 transition-all' />
          </div>
        ))}
      </div>
    </div>
  );
}
