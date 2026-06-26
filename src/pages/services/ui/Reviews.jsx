import { Star } from "lucide-react";

export function Reviews({ reviews = [] }) {
  const formatDate = (dateString) => {
    if (!dateString) return "Recent Review";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    } catch (e) {
      return "Recent Review";
    }
  };

  return (
    <div>
      <h3 className='font-montserrat font-extrabold text-lg uppercase tracking-wider text-white mb-6'>
        Reviews & Experiences
      </h3>

      {reviews.length === 0 ? (
        <div className='text-stone-400 text-sm py-8 bg-neutral-900/20 text-center'>
          No review records logged for this listing configuration yet.
        </div>
      ) : (
        <div className='space-y-6'>
          {reviews.map((rev) => (
            <div
              key={rev._id || rev.id}
              className='bg-neutral-900/30 border-b border-amber-500/40 p-5 space-y-3'
            >
              <div className='flex items-center justify-between gap-4'>
                <div className='flex items-center gap-3'>
                  {rev.profileImage ? (
                    <img
                      src={rev.profileImage}
                      alt={rev.authorName || "User"}
                      className='w-8 h-8 rounded-full border border-amber-500/30 object-cover'
                    />
                  ) : (
                    <div className='w-8 h-8 rounded-full bg-neutral-800 border border-amber-500/30 flex items-center justify-center font-bold text-xs uppercase text-amber-400 font-montserrat shrink-0'>
                      {rev.authorName?.charAt(0) || "U"}
                    </div>
                  )}

                  <div>
                    <h5 className='text-sm font-bold text-stone-200'>
                      {rev.authorName || "Anonymous User"}
                    </h5>
                    <p className='text-[11px] mt-0.5 text-stone-500 font-medium'>
                      {formatDate(rev.createdAt)}
                    </p>
                  </div>
                </div>
                <div className='flex gap-0.5'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < rev.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-neutral-800"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className='text-sm text-stone-400 tracking-wide leading-relaxed font-light'>
                {rev.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
