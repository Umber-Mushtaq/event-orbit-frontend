import { Star, Send } from "lucide-react";
import Avatar2 from "../../../assets/avatar2.jpg";
import Avatar3 from "../../../assets/avatar3.jpg";

const FEEDBACK_LIST = [
  {
    id: 1,
    name: "Emma Watson",
    img: Avatar2,
    date: "Jul 18, 2026",
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
  {
    id: 2,
    name: "Sophia Loren",
    img: Avatar3,
    date: "May 24, 2026",
    rating: 4,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export default function ServiceReviewsList() {
  return (
    <div className='w-full flex flex-col gap-6'>
      {/* 1. COMPLETED REVIEWS COMMENT CONTAINER STACK */}
      <div className='flex flex-col gap-4 w-full'>
        {FEEDBACK_LIST.map((review) => (
          <div
            key={review.id}
            className='bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 md:p-6 flex items-start gap-4 transition-all duration-300 hover:border-border-gold/20'
          >
            <div className='w-11 h-11 rounded-full overflow-hidden border border-white/10 shrink-0'>
              <img
                src={review.img}
                alt='User avatar'
                className='w-full h-full object-cover'
              />
            </div>
            <div className='grow font-poppins relative min-w-0'>
              <div className='flex items-center justify-between gap-4 mb-1'>
                <h4 className='font-montserrat font-bold text-sm text-white truncate'>
                  {review.name}
                </h4>
                <span className='text-[10px] text-stone-500 tracking-wide whitespace-nowrap'>
                  {review.date}
                </span>
              </div>
              <div className='flex gap-0.5 mb-2'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-stone-700"}`}
                  />
                ))}
              </div>
              <p className='font-poppins font-light text-xs text-stone-400 leading-relaxed text-pretty'>
                {review.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 2. LIVE SUBMISSION FORM ACCORDING TO SCREEN WIREFRAME FOOTER */}
      <div className='bg-neutral-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 shadow-xl flex flex-col gap-5 w-full'>
        <h4 className='font-montserrat font-bold text-sm text-white tracking-wide uppercase border-b border-white/5 pb-2'>
          Add a Review
        </h4>
        <div className='flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4'>
          {/* Interactive Rating Star placeholders */}
          <div className='flex gap-1.5 text-stone-600'>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className='w-5 h-5 hover:text-amber-400 hover:fill-amber-400 cursor-pointer transition-colors duration-150'
              />
            ))}
          </div>
          {/* Text Input Block Form */}
          <div className='grow relative flex items-center max-w-xl w-full'>
            <input
              type='text'
              placeholder='Write a public vendor review response...'
              className='w-full bg-neutral-950 border border-white/10 rounded-xl py-3 pl-4 pr-32 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-border-gold transition-colors font-poppins'
            />
            <button className='absolute right-2 bg-glass-gold text-white border border-border-gold shadow-gold-glow font-poppins text-[10px] font-bold py-1.5 px-3.5 rounded-lg flex items-center gap-1.5 hover:bg-glass-gold-hover hover:border-border-gold-hover transition-all duration-300 cursor-pointer uppercase tracking-wider'>
              <Send className='w-3 h-3' /> Add Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
