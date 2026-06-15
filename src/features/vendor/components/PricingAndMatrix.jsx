import { DollarSign, MapPin, Users } from "lucide-react";
import CreateServiceFormHeaders from "./CreateServiceFormHeaders";

function PricingAndMetrics() {
  return (
    <div className='bg-white/5 backdrop-blur-md border border-border-gold0 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col gap-5'>
      <CreateServiceFormHeaders number={3} text='Pricing and Matrix' />
      {/* Base Price Input */}
      <div className='flex flex-col gap-2'>
        <label className='font-poppins text-xs font-medium text-stone-400 uppercase tracking-wider'>
          Base Price
        </label>
        <div className='relative flex items-center'>
          <DollarSign className='absolute left-4 w-4 h-4 text-stone-400' />
          <input
            type='text'
            placeholder='$2,500'
            className='w-full bg-neutral-900/50 border border-stone-400 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-stone-400 font-semibold focus:outline-none focus:border-border-gold transition-colors duration-200 font-poppins'
          />
        </div>
      </div>

      {/* Price Type Grid Switcher */}
      <div className='flex flex-col gap-2'>
        <label className='font-poppins text-xs font-medium text-stone-400 uppercase tracking-wider'>
          Price Type
        </label>
        <div className='grid grid-cols-3 gap-3'>
          <button
            type='button'
            className='py-3 px-4 rounded-xl border bg-glass-gold border-border-gold text-white shadow-gold-glow font-poppins text-xs uppercase tracking-wider font-semibold cursor-pointer'
          >
            Fixed
          </button>
          <button
            type='button'
            className='py-3 px-4 rounded-xl border bg-neutral-900/40 border-border-gold text-stone-400 hover:border-border-gold0 hover:text-white font-poppins text-xs uppercase tracking-wider font-semibold cursor-pointer'
          >
            Per Guest
          </button>
          <button
            type='button'
            className='py-3 px-4 rounded-xl border bg-neutral-900/40 border-border-gold text-stone-400 hover:border-border-gold0 hover:text-white font-poppins text-xs uppercase tracking-wider font-semibold cursor-pointer'
          >
            Hourly
          </button>
        </div>
      </div>

      {/* Location Input */}
      <div className='flex flex-col gap-2'>
        <label className='font-poppins text-xs font-medium text-stone-400 uppercase tracking-wider'>
          Location
        </label>
        <div className='relative flex items-center'>
          <MapPin className='absolute left-4 w-4 h-4 text-stone-400' />
          <input
            type='text'
            placeholder='Location'
            className='w-full bg-neutral-900/50 border border-stone-400 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-border-gold transition-colors duration-200 font-poppins'
          />
        </div>
      </div>

      {/* Capacity Input */}
      <div className='flex flex-col gap-2'>
        <label className='font-poppins text-xs font-medium text-stone-400 uppercase tracking-wider'>
          Capacity
        </label>
        <div className='relative flex items-center'>
          <Users className='absolute left-4 w-4 h-4 text-stone-400' />
          <input
            type='number'
            placeholder='capacity'
            className='w-full bg-neutral-900/50 border border-stone-400 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-border-gold transition-colors duration-200 font-poppins'
          />
        </div>
      </div>
    </div>
  );
}

export default PricingAndMetrics;
