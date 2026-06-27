import React from "react";
import { Star, MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { useServiceCardUtils } from "../../user/hooks/useServiceCardUtils";

export function ServiceCard({ service }) {
  const {
    navigationTarget,
    formattedPriceType,
    fallbackAvatar,
    heroImage,
    displayRating,
    totalReviewsCount,
  } = useServiceCardUtils(service);

  return (
    <Link
      to={navigationTarget}
      className='group border-2 border-border-gold rounded-2xl overflow-hidden shadow-lg backdrop-blur-md transition-all duration-300 flex flex-col h-full'
    >
      <div className='relative aspect-[16/10] overflow-hidden bg-neutral-900'>
        <img
          src={heroImage}
          alt={service.title}
          className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
          loading='lazy'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/60 to-transparent' />

        <div className='absolute inset-0 flex flex-col justify-between p-4 text-white'>
          <div className='flex justify-end'>
            <div className='flex items-center gap-1 bg-neutral-950/80 border border-white/10 px-2.5 py-1 rounded-full text-[11px] font-bold text-amber-400 backdrop-blur-md'>
              <Star className='w-3 h-3 fill-amber-400 text-amber-400' />
              <span>{displayRating}</span>
              <span className='text-stone-400'>({totalReviewsCount})</span>
            </div>
          </div>

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

      <div className='p-4 flex flex-col space-y-3 flex-1'>
        <p className='text-sm text-stone-300 leading-relaxed line-clamp-2'>
          {service.description}
        </p>

        <div className='flex items-center justify-between border-t border-amber-400 pt-3 mt-auto'>
          <div className='w-7 h-7 rounded-full overflow-hidden ring-1 ring-amber-500/30 shrink-0'>
            <img
              src={service.vendor?.profileImage || fallbackAvatar}
              alt={service.vendor?.businessName || "Vendor profile"}
              className='w-full h-full object-cover'
            />
          </div>

          <div className='flex items-center gap-3 shrink-0 text-amber-400'>
            <div className='text-right'>
              <div className='flex items-baseline justify-end font-black text-base tracking-tight'>
                <span className='text-xs font-bold mr-0.5'>$</span>
                {service.price}
                <span className='text-[10px] text-stone-300 font-semibold font-light lowercase tracking-normal ml-0.5'>
                  {formattedPriceType}
                </span>
              </div>
            </div>
            <div className='p-2 rounded-full bg-amber-400 text-neutral-900 group-hover:bg-amber-500 group-hover:scale-105 transition duration-300'>
              <ArrowUpRight className='w-4 h-4' />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
