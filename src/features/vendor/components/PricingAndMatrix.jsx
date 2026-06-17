import { DollarSign, MapPin, Users } from "lucide-react";
import CreateServiceFormHeaders from "./CreateServiceFormHeaders";

function PricingAndMetrics({ form }) {
  const priceTypes = ["fixed", "per_guest", "hourly"];

  return (
    <div className='bg-white/5 backdrop-blur-md border border-stone-400 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col gap-5'>
      <CreateServiceFormHeaders number={2} text='Pricing and Matrix' />

      {/* Base Price Input */}
      <div className='flex flex-col gap-2'>
        <label className='font-poppins text-xs font-medium text-stone-400 uppercase tracking-wider'>
          Base Price
        </label>
        <div className='relative flex items-center'>
          <DollarSign className='absolute left-4 w-4 h-4 text-stone-400' />
          <input
            type='text'
            value={form.price}
            onChange={(e) => form.setPrice(e.target.value)}
            disabled={form.loading}
            placeholder='2500'
            className='w-full bg-neutral-900/50 border border-stone-400 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-stone-400 font-semibold focus:outline-none focus:border-border-gold transition-colors duration-200 font-poppins'
            required
          />
        </div>
      </div>

      {/* Price Type Switcher Grid */}
      <div className='flex flex-col gap-2'>
        <label className='font-poppins text-xs font-medium text-stone-400 uppercase tracking-wider'>
          Price Type
        </label>
        <div className='grid grid-cols-3 gap-3'>
          {priceTypes.map((type) => {
            const isActive = form.priceType === type;
            return (
              <button
                key={type}
                type='button'
                onClick={() => form.setPriceType(type)}
                disabled={form.loading}
                className={`py-3 px-4 rounded-xl border font-poppins text-xs uppercase tracking-wider font-semibold cursor-pointer transition-all duration-200 ${
                  isActive
                    ? "bg-glass-gold border-border-gold text-white shadow-gold-glow"
                    : "bg-neutral-900/40 border-stone-500 text-stone-400 hover:text-white"
                }`}
              >
                {type.replace("_", " ")}
              </button>
            );
          })}
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
            value={form.location}
            onChange={(e) => form.setLocation(e.target.value)}
            disabled={form.loading}
            placeholder='e.g., Gulberg, Lahore'
            className='w-full bg-neutral-900/50 border border-stone-400 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-border-gold transition-colors duration-200 font-poppins'
            required
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
            value={form.capacity}
            onChange={(e) => form.setCapacity(e.target.value)}
            disabled={form.loading}
            placeholder='Max guest count'
            className='w-full bg-neutral-900/50 border border-stone-400 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-border-gold transition-colors duration-200 font-poppins'
          />
        </div>
      </div>
    </div>
  );
}

export default PricingAndMetrics;
