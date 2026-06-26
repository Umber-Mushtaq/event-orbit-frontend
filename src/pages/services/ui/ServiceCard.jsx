import React from "react";
import { Star, MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
export function ServiceCard({ service }) {
  const formatPriceType = (type) => {
    switch (type) {
      case "per_guest":
        return "/ guest";
      case "hourly":
        return "/ hour";
      default:
        return " fixed";
    }
  };

  const fallbackAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    service.vendor?.businessName || "Vendor",
  )}&backgroundType=solid&backgroundColor=1c1917`;

  return (
    <Link
      to={`/service/${service.id}`}
      className='group border-2 border-border-gold rounded-2xl overflow-hidden shadow-lg backdrop-blur-md transition-all duration-300 flex flex-col h-full'
    >
      {/* Image with overlay */}
      <div className='relative aspect-[16/10] overflow-hidden bg-neutral-950'>
        <img
          src={
            service.images?.[0] ||
            "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600"
          }
          alt={service.title}
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/60 to-transparent' />

        {/* Overlay content */}
        <div className='absolute inset-0 flex flex-col justify-between p-4 text-white'>
          {/* Rating top-right */}
          <div className='flex justify-end'>
            <div className='flex items-center gap-1 bg-neutral-950/80 border border-white/10 px-2.5 py-1 rounded-full text-[11px] font-bold text-amber-400 backdrop-blur-md'>
              <Star className='w-3 h-3 fill-amber-400 text-amber-400' />
              <span>{Number(service.averageRating).toFixed(1)}</span>
              <span className='text-stone-400'>({service.totalReviews})</span>
            </div>
          </div>

          {/* Title + Location */}
          <div className='space-y-1'>
            <h4 className='font-montserrat font-bold text-lg uppercase tracking-wide line-clamp-1 group-hover:text-amber-400 transition-colors'>
              {service.title}
            </h4>
            <div className='flex items-center gap-1.5 text-xs text-stone-300'>
              <MapPin className='w-3.5 h-3.5 text-amber-400 shrink-0' />
              <span className='truncate'>{service.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body below image */}
      <div className='p-4 flex flex-col space-y-3 flex-1'>
        {/* Description */}
        <p className='text-sm text-neutral-900 leading-relaxed line-clamp-2'>
          {service.description}
        </p>

        {/* Footer */}
        <div className='flex items-center justify-between border-t border-amber-400 pt-3'>
          <div className='w-7 h-7 rounded-full overflow-hidden ring-1 ring-amber-500/30 shrink-0'>
            <img
              src={service.vendor?.profileImage || fallbackAvatar}
              alt={service.vendor?.businessName}
              className='w-full h-full object-cover'
            />
          </div>

          {/* Pricing + Link */}
          <div className='flex items-center gap-3 shrink-0 text-amber-400'>
            <div className='text-right'>
              <div className='flex items-baseline justify-end font-black text-base tracking-tight'>
                <span className='text-xs font-bold mr-0.5'>$</span>
                {service.price}
                <span className='text-[10px] text-neutral-900 font-semibold font-light lowercase tracking-normal ml-0.5'>
                  {formatPriceType(service.priceType)}
                </span>
              </div>
            </div>
            {/* Link icon */}
            <a
              href={service.link || "#"}
              target='_blank'
              rel='noopener noreferrer'
              className='p-2 rounded-full bg-amber-400 text-neutral-900 hover:bg-amber-400 hover:text-neutral-950 transition'
            >
              <ArrowUpRight className='w-4 h-4' />
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
}
