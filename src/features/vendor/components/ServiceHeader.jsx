import AvatarImg from "../../../assets/avarar1.jpg";
import { Star } from "lucide-react";

export default function ServiceHeader() {
  return (
    <div className='w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6'>
      {/* Vendor Profile Info Block */}
      <div className='flex items-center gap-4'>
        <div className='w-14 h-14 rounded-full overflow-hidden border-2 border-border-gold shadow-md shrink-0'>
          <img
            src={AvatarImg}
            alt='Vendor Profiler'
            className='w-full h-full object-cover'
          />
        </div>
        <div className='font-poppins'>
          <h1 className='font-montserrat font-black text-2xl text-white tracking-tight'>
            Service Details
          </h1>
          <span className='text-xs font-semibold text-border-gold-hover tracking-wider uppercase block mt-1'>
            Premium Wedding Catering
          </span>
        </div>
      </div>

      {/* Pricing and Review Meta Info Badges */}
      <div className='flex items-center gap-6 font-poppins text-right self-stretch sm:self-auto justify-between sm:justify-end border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0'>
        <div className='text-left sm:text-right'>
          <span className='text-[10px] text-stone-500 uppercase tracking-widest block'>
            Base Rate
          </span>
          <span className='text-2xl font-black text-white tracking-tight mt-0.5 block'>
            $2,500
          </span>
        </div>
        <div className='flex flex-col items-start sm:items-end'>
          <span className='text-[10px] text-stone-500 uppercase tracking-widest block'>
            Reviews
          </span>
          <div className='flex items-center gap-1.5 mt-1'>
            <Star className='w-4 h-4 text-amber-400 fill-amber-400' />
            <span className='text-sm font-bold text-stone-200'>4.9 (48)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
