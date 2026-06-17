import { Edit2, Eye, Trash2 } from "lucide-react";
import { Link } from "react-router";

function ServiceCard({ service, onDeleteClick }) {
  const hasImages = service.images?.length > 0;
  const categoryLabel =
    service.categoryId?.name || service.category || "General Wedding Package";

  const isApproved = service.status === "approved";
  const statusBadgeClass = isApproved
    ? "text-emerald-400 drop-shadow-[0_2px_8px_rgba(52,211,153,0.15)]"
    : "text-amber-400 drop-shadow-[0_2px_8px_rgba(251,191,36,0.15)]";

  return (
    <div className='bg-neutral-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 md:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 transition-all duration-300 hover:border-border-gold/30 hover:shadow-lg'>
      {/* Left Column: Media Preview & core descriptive text */}
      <div className='flex items-center gap-4 w-full lg:w-auto min-w-0 flex-1'>
        <div className='w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-24 rounded-xl overflow-hidden shrink-0 border border-white/5 shadow-md bg-neutral-800 flex items-center justify-center'>
          {hasImages ? (
            <img
              src={service.images[0]}
              alt={service.title}
              className='w-full h-full object-cover'
            />
          ) : (
            <span className='text-[10px] text-stone-600 font-poppins'>
              No Preview
            </span>
          )}
        </div>

        <div className='font-poppins flex flex-col min-w-0 flex-1'>
          <h3 className='font-montserrat font-bold text-sm sm:text-base md:text-lg text-white tracking-wide truncate'>
            {service.title}
          </h3>
          <span className='text-[11px] sm:text-xs text-stone-400 mt-0.5 truncate'>
            {categoryLabel}
          </span>
          <span className='text-xs sm:text-sm font-bold text-border-gold-hover tracking-wide mt-1.5'>
            ${service.price?.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Right Column: Approval Tag & Control Action Panel */}
      <div className='flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-between lg:justify-center gap-4 w-full lg:w-auto border-t lg:border-t-0 border-white/5 pt-4 lg:pt-0'>
        <span
          className={`font-poppins text-[10px] sm:text-xs font-semibold tracking-wider uppercase whitespace-nowrap lg:mb-1 ${statusBadgeClass}`}
        >
          ● {service.status || "pending"}
        </span>

        {/* Action Controls Button Links */}
        <div className='grid grid-cols-3 sm:flex items-center gap-2 w-full sm:w-auto'>
          <Link
            to={`/vendor/dashboard/edit/${service._id}`}
            className='bg-glass-gold hover:bg-glass-gold-hover border border-border-gold text-white font-poppins text-[10px] sm:text-[11px] font-semibold py-2.5 sm:py-2 px-2 sm:px-3.5 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-gold-glow whitespace-nowrap'
          >
            <Edit2 className='w-3 h-3 text-border-gold-hover' />
            <span>Edit</span>
          </Link>

          <Link
            to={`/vendor/dashboard/service/details/${service._id}`}
            className='bg-teal-950/40 hover:bg-teal-900/50 border border-teal-500/50 text-teal-200 font-poppins text-[10px] sm:text-[11px] font-semibold py-2.5 sm:py-2 px-2 sm:px-3.5 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.5)] whitespace-nowrap'
          >
            <Eye className='w-3 h-3 text-teal-400/80' />
            <span>View</span>
          </Link>

          <button
            onClick={() => onDeleteClick(service._id)}
            className='bg-red-500/10 hover:bg-red-500/20 border border-red-500/40 text-red-400 font-poppins text-[10px] sm:text-[11px] font-semibold py-2.5 sm:py-2 px-2 sm:px-3.5 rounded-lg flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer whitespace-nowrap'
          >
            <Trash2 className='w-3 h-3' />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
