import { MapPin } from "lucide-react";
import ServiceCalendar from "../sections/ServiceCalender"; // Reuses your fixed calendar script

export default function ServiceLogistics() {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start'>
      {/* Left Box: Location map block (Takes 6/12 width) */}
      <div className='lg:col-span-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col gap-4 h-full'>
        <h3 className='font-montserrat font-bold text-lg text-white tracking-wide border-b border-white/5 pb-3'>
          Location
        </h3>
        <div className='flex items-center gap-2 text-stone-400 text-xs font-poppins'>
          <MapPin className='w-4 h-4 text-border-gold shrink-0' />
          <span>Section 4, Downtown Grand Plaza</span>
        </div>
        {/* Placeholder Simulated Satellite Map Card Canvas */}
        <div className='w-full grow min-h-`min-h-55` bg-neutral-900 border border-white/5 rounded-2xl relative flex items-center justify-center overflow-hidden'>
          <div className='absolute inset-0 bg-neutral-950/20 z-10 pointer-events-none' />
          <div className='w-10 h-10 rounded-full bg-amber-500/10 border border-border-gold text-border-gold flex items-center justify-center shadow-gold-glow animate-bounce z-20'>
            <MapPin className='w-5 h-5 fill-current' />
          </div>
          <span className='text-[10px] font-poppins font-semibold text-stone-600 uppercase absolute bottom-3 tracking-widest z-20'>
            Satellite map preview
          </span>
        </div>
      </div>

      {/* Right Box: Calendar Availability widget (Takes 6/12 width) */}
      <div className='lg:col-span-6 flex justify-center lg:justify-end h-full'>
        <ServiceCalendar />
      </div>
    </div>
  );
}
