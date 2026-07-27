import { useState } from "react";
import { Star, Send } from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { apiUrl } from "../../../config/api";
import { showToast } from "../../../shared_components/toastStore";

// 1. Destructure the new props passed down from the parent component
export function Reviews({
  reviews = [],
  serviceId: serviceIdProp,
  vendorId: vendorIdProp,
  onReviewSubmitted,
}) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const serviceId = serviceIdProp || params.serviceId || params.id;
  const vendorId = vendorIdProp || params.vendorId;

  const formatDate = (dateString) => {
    if (!dateString) return "Recent Review";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Recent Review";
    }
  };

  // 2. Submit handler interacting with the backend API
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    // Form validation check blocks
    if (rating === 0) {
      showToast({
        type: "error",
        message: "Please select a rating between 1 and 5 stars.",
      });
      return;
    }
    if (!comment.trim()) {
      showToast({
        type: "error",
        message: "Review commentary text body cannot be empty.",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");

      if (!token) {
        showToast({
          type: "error",
          message: "Please sign in to rate this service.",
        });
        navigate("/auth/login");
        return;
      }

      if (!serviceId || !vendorId) {
        showToast({
          type: "error",
          message: "Unable to identify this service or vendor.",
        });
        return;
      }

      const response = await axios.post(
        apiUrl("/api/reviews"),
        { vendorId, serviceId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (response.data.success) {
        showToast({
          type: "success",
          message: "Your experience review was posted successfully!",
        });
        setComment("");
        setRating(0);

        // 3. Fire the pipeline callback to dynamically refresh parent data stream instantly
        if (onReviewSubmitted) {
          onReviewSubmitted();
        }
      }
    } catch (err) {
      showToast({
        type: "error",
        message: err.response?.data?.message || "Failed to submit your review.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='space-y-10'>
      {/* ==========================================
          ADD REVIEW FORM INTERACTIVE BLOCK
         ========================================== */}
      <div className='bg-neutral-900 border border-amber-500/10 rounded-2xl p-6 space-y-4 shadow-xl backdrop-blur-sm'>
        <h4 className='font-montserrat font-bold text-sm uppercase tracking-wider text-stone-200'>
          Write a Review
        </h4>

        <form onSubmit={handleSubmitReview} className='space-y-4'>
          {/* Interactive Rating Core Selector */}
          <div className='flex items-center gap-3'>
            <span className='text-xs font-medium text-stone-400 font-poppins'>
              Your Rating:
            </span>
            <div className='flex gap-1'>
              {[1, 2, 3, 4, 5].map((starValue) => (
                <button
                  type='button'
                  key={starValue}
                  onClick={() => setRating(starValue)}
                  onMouseEnter={() => setHoveredRating(starValue)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className='p-0.5 cursor-pointer hover:scale-110 active:scale-95 transition-transform'
                >
                  <Star
                    className={`w-5 h-5 transition-colors duration-150 ${
                      starValue <= (hoveredRating || rating)
                        ? "text-amber-400 fill-amber-400"
                        : "text-neutral-800"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment Commentary Textarea Input Field */}
          <div className='relative'>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Share your direct transaction experience dealing with this service listing provider...'
              rows={4}
              className='w-full bg-neutral-950 border border-white/10 text-stone-200 placeholder-stone-600 rounded-xl p-4 font-poppins text-xs leading-relaxed focus:outline-none focus:border-amber-400/50 transition-colors resize-none'
            />
          </div>

          {/* Action Trigger Button */}
          <button
            type='submit'
            disabled={isSubmitting}
            className='bg-amber-400 hover:bg-amber-500 text-black font-poppins text-xs font-bold py-2.5 px-5 rounded-xl flex items-center gap-2 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-wider ml-auto'
          >
            {isSubmitting ? "Posting..." : "Post Review"}
            <Send className='w-3.5 h-3.5' />
          </button>
        </form>
      </div>

      {/* ==========================================
          REVIEWS FEED LIST STREAM DISPLAY
         ========================================== */}
      <div>
        <h3 className='font-montserrat font-extrabold text-lg uppercase tracking-wider text-white mb-6'>
          Reviews & Experiences
        </h3>

        {reviews.length === 0 ? (
          <div className='text-stone-400 text-sm py-8 bg-neutral-900/20 text-center rounded-xl border border-white/5'>
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
    </div>
  );
}
