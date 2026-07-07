import { Star, Send } from "lucide-react";
import AvatarPlaceholder from "../../../assets/avatar2.jpg";

export default function ServiceReviewsList({ reviews = [], serviceId }) {
  return (
    <div className='w-full flex flex-col gap-6'>
      <div className='flex flex-col gap-4 w-full'>
        {reviews.length === 0 ? (
          <p className='text-xs font-poppins text-stone-500 italic px-2'>
            No reviews listed yet for this package.
          </p>
        ) : (
          reviews.map((review) => {
            const user = review.userId || {};
            return (
              <div
                key={review._id}
                className='bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 md:p-6 flex items-start gap-4 transition-all duration-300 hover:border-border-gold/20'
              >
                <div className='w-11 h-11 rounded-full overflow-hidden border border-white/10 shrink-0'>
                  <img
                    src={user.profileImage || AvatarPlaceholder}
                    alt='Reviewer Avatar'
                    className='w-full h-full object-cover'
                  />
                </div>
                <div className='grow font-poppins relative min-w-0'>
                  <div className='flex items-center justify-between gap-4 mb-1'>
                    <h4 className='font-montserrat font-bold text-sm text-white truncate'>
                      {user.firstName} {user.lastName}
                    </h4>
                    <span className='text-[10px] text-stone-500 tracking-wide whitespace-nowrap'>
                      {new Date(review.createdAt).toLocaleDateString(
                        undefined,
                        { month: "short", day: "numeric", year: "numeric" },
                      )}
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
                    {review.text || review.comment}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
