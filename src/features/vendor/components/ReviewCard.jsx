import { Star, ChevronRight, User } from "lucide-react";

function ReviewCard({ review }) {
  const customer = review.userId;
  const customerName = customer
    ? `${customer.firstName} ${customer.lastName}`
    : "Anonymous Client";
  const serviceTitle = review.serviceId?.title || "Deleted Service";

  return (
    <div className='flex items-center justify-between bg-neutral-900/40 border border-white/5 rounded-xl p-4 transition-all duration-300 hover:border-border-gold/20 group cursor-pointer w-full gap-3'>
      <div className='flex items-center gap-3 sm:gap-4 min-w-0 flex-1'>
        {/* Customer Avatar Layer */}
        <div className='w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-white/10 shrink-0 bg-neutral-800 flex items-center justify-center'>
          {customer?.profileImage ? (
            <img
              src={customer.profileImage}
              alt={`${customerName}'s avatar`}
              className='w-full h-full object-cover'
            />
          ) : (
            <User className='w-5 h-5 text-stone-500' />
          )}
        </div>

        {/* Info Meta Layer */}
        <div className='font-poppins flex flex-col min-w-0 flex-1'>
          <h3 className='font-montserrat font-bold text-xs sm:text-sm text-white group-hover:text-border-gold-hover transition-colors truncate max-w-full sm:max-w-[180px]'>
            {serviceTitle}
          </h3>

          {/* Dynamic 5-Star Indicator Row */}
          <div className='flex gap-0.5 mt-1'>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < review.rating
                    ? "text-amber-400 fill-amber-400"
                    : "text-stone-600 fill-stone-600"
                }`}
              />
            ))}
          </div>

          <span className='text-[11px] sm:text-xs text-stone-400 mt-1 truncate'>
            {customerName}
          </span>
        </div>
      </div>

      {/* Persistent action chevron marker */}
      <ChevronRight className='w-4 h-4 text-stone-400 group-hover:text-border-gold-hover group-hover:translate-x-0.5 transition-all shrink-0' />
    </div>
  );
}

export default ReviewCard;
