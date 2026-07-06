import { User, Mail, Phone, MapPin } from "lucide-react";

export function PersonalInfoCard({ formStates, loading }) {
  return (
    <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col gap-5 shadow-xl'>
      <div className='flex items-center gap-2 border-b border-white/5 pb-3 mb-1'>
        <User className='w-4 h-4 text-border-gold' />
        <h2 className='font-montserrat font-bold text-sm uppercase tracking-wider text-white'>
          Personal Information
        </h2>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div className='flex flex-col gap-1.5'>
          <label className='font-poppins text-sm font-semibold uppercase tracking-wider text-stone-400'>
            First Name
          </label>
          <div className='relative flex items-center'>
            <User className='absolute left-4 w-4 h-4 text-stone-400' />
            <input
              type='text'
              value={formStates.firstName}
              onChange={(e) => formStates.setFirstName(e.target.value)}
              disabled={loading}
              placeholder='First Name'
              className='w-full bg-neutral-900/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-border-gold font-poppins'
            />
          </div>
        </div>
        <div className='flex flex-col gap-1.5'>
          <label className='font-poppins text-sm font-semibold uppercase tracking-wider text-stone-400'>
            Last Name
          </label>
          <div className='relative flex items-center'>
            <User className='absolute left-4 w-4 h-4 text-stone-400' />
            <input
              type='text'
              value={formStates.lastName}
              onChange={(e) => formStates.setLastName(e.target.value)}
              disabled={loading}
              placeholder='Last Name'
              className='w-full bg-neutral-900/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-border-gold font-poppins'
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-1.5'>
        <label className='font-poppins text-sm font-semibold uppercase tracking-wider text-stone-400'>
          Email Address (Locked)
        </label>
        <div className='relative flex items-center opacity-60'>
          <Mail className='absolute left-4 w-4 h-4 text-stone-400' />
          <input
            type='email'
            value={formStates.email}
            disabled
            className='w-full bg-neutral-950 border border-white/5 rounded-xl py-3 pl-11 pr-4 text-xs text-stone-400 font-poppins cursor-not-allowed'
          />
        </div>
      </div>

      <div className='flex flex-col gap-1.5'>
        <label className='font-poppins text-sm font-semibold uppercase tracking-wider text-stone-400'>
          Phone Number
        </label>
        <div className='relative flex items-center'>
          <Phone className='absolute left-4 w-4 h-4 text-stone-400' />
          <input
            type='tel'
            value={formStates.phone}
            onChange={(e) => formStates.setPhone(e.target.value)}
            disabled={loading}
            placeholder='+92 300 1234567'
            className='w-full bg-neutral-900/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-border-gold font-poppins'
          />
        </div>
      </div>

      <div className='flex flex-col gap-1.5'>
        <label className='font-poppins text-sm font-semibold uppercase tracking-wider text-stone-400'>
          Corporate Office Address
        </label>
        <div className='relative flex items-center'>
          <MapPin className='absolute left-4 w-4 h-4 text-stone-400' />
          <input
            type='text'
            value={formStates.address}
            onChange={(e) => formStates.setAddress(e.target.value)}
            disabled={loading}
            placeholder='e.g., Suit 4, Downtown Business Hub'
            className='w-full bg-neutral-900/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-border-gold font-poppins'
          />
        </div>
      </div>
    </div>
  );
}
