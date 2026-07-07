import React from "react";
import { Link } from "react-router";
import { ShieldCheck } from "lucide-react";

export function ServiceBookingCard({ price, priceType, targetCheckoutUrl }) {
  return (
    <div className='bg-neutral-900/80 border border-amber-500/20 backdrop-blur-xl rounded-2xl p-6 shadow-2xl relative overflow-hidden group'>
      <div className='absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.03] rounded-full blur-3xl pointer-events-none' />
      <div className='absolute -top-[1px] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent' />

      <span className='text-[10px] text-amber-500/70 uppercase tracking-widest font-black block mb-2 font-mono'>
        STARTING CONFIGURATION BASE
      </span>

      <div className='flex items-baseline gap-2 mb-6 border-b border-white/5 pb-4'>
        <span className='text-4xl font-montserrat font-black text-white tracking-tight'>
          Rs. {price?.toLocaleString()}
        </span>
        <span className='text-xs text-stone-400 font-medium capitalize font-mono'>
          /{priceType || "fixed"}
        </span>
      </div>

      <Link
        to={targetCheckoutUrl}
        className='block w-full text-center px-3 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-neutral-950 font-montserrat font-black text-xs uppercase tracking-widest py-4 rounded-xl shadow-[0_4px_30px_rgba(245,158,11,0.15)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer active:scale-[0.99]'
      >
        Secure Direct Booking
      </Link>

      <div className='flex items-start gap-2 mt-5 text-[11px] text-stone-400/90 leading-relaxed bg-neutral-950/40 p-3 rounded-lg border border-white/5'>
        <ShieldCheck className='w-4 h-4 text-amber-500 shrink-0 mt-0.5' />
        <span>
          Protected transactions and verified delivery guaranteed under
          EventOrbit booking policies.
        </span>
      </div>
    </div>
  );
}
