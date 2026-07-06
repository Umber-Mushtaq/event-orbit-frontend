import React from "react";
import { Star, MapPin, Award } from "lucide-react";

export function ServiceTitleSection({ service, reviewsCount }) {
  return (
    <div className='bg-neutral-900/50 p-6 rounded-2xl'>
      <div className='inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-md text-[10px] uppercase tracking-widest font-bold text-amber-400 mb-4 shadow-sm backdrop-blur-md'>
        <Award className='w-3.5 h-3.5 animate-pulse' /> Verified Premium
        Platform Service
      </div>

      <h1 className='font-montserrat font-black text-3xl md:text-5xl tracking-wide uppercase leading-tight bg-gradient-to-r from-white via-white to-stone-400 bg-clip-text text-transparent'>
        {service.title}
      </h1>

      <div className='flex flex-wrap items-center gap-6 mt-6 pt-4 border-t border-white/30 text-xs text-stone-400'>
        <div className='flex items-center gap-3 py-1.5 rounded-full'>
          <MapPin className='w-4 h-4 text-amber-500' />
          <span className='text-stone-200 font-medium'>{service.location}</span>
        </div>

        <div className='flex items-center gap-2 px-3 py-1.5 rounded-full'>
          <div className='flex gap-0.5'>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.round(service.averageRating || 5) ? "text-amber-400 fill-amber-400" : "text-stone-400"}`}
              />
            ))}
          </div>
          <span className='text-stone-300 font-bold font-mono text-xs tracking-wide'>
            ({reviewsCount} VERIFIED REVIEWS)
          </span>
        </div>
      </div>
    </div>
  );
}
