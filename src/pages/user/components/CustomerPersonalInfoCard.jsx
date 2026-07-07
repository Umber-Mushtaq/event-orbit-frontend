import React from "react";

export function CustomerPersonalInfoCard({ formStates, loading }) {
  return (
    <div className='bg-neutral-900 border border-white/10 rounded-2xl p-6 space-y-6'>
      <h3 className='font-montserrat font-bold text-xs uppercase tracking-wider text-stone-300'>
        Personal Account Metrics
      </h3>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='flex flex-col gap-2'>
          <label className='text-[11px] font-medium text-stone-400 uppercase tracking-wider'>
            First Name
          </label>
          <input
            type='text'
            disabled={loading}
            value={formStates.firstName}
            placeholder='Enter First Name'
            onChange={(e) => formStates.firstName.setter(e.target.value)}
            className='bg-neutral-950 border border-white/10 text-stone-200 placeholder-stone-500 rounded-xl p-3 font-poppins text-xs focus:outline-none focus:border-amber-400/40 transition-colors'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='text-[11px] font-medium text-stone-400 uppercase tracking-wider'>
            Last Name
          </label>
          <input
            type='text'
            disabled={loading}
            placeholder='Enter Last Name'
            value={formStates.lastName}
            onChange={(e) => formStates.lastName.setter(e.target.value)}
            className='bg-neutral-950 border border-white/10 text-stone-200 placeholder-stone-500 rounded-xl p-3 font-poppins text-xs focus:outline-none focus:border-amber-400/40 transition-colors'
          />
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <label className='text-[11px] font-medium text-stone-400 uppercase tracking-wider'>
          Email Address (Locked)
        </label>
        <input
          type='email'
          placeholder={formStates.email}
          readOnly
          value={formStates.email.value}
          className='bg-neutral-900 border border-white/5 text-stone-500 rounded-xl p-3 font-poppins text-xs cursor-not-allowed select-none'
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label className='text-[11px] font-medium text-stone-400 uppercase tracking-wider'>
          Contact Phone Line
        </label>
        <input
          type='tel'
          disabled={loading}
          placeholder='+923000000000'
          value={formStates.phoneNumber}
          onChange={(e) => formStates.phoneNumber.setter(e.target.value)}
          className='bg-neutral-950 border border-white/10 text-stone-200 placeholder-stone-500 rounded-xl p-3 font-poppins text-xs focus:outline-none focus:border-amber-400/40 transition-colors'
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label className='text-[11px] font-medium text-stone-400 uppercase tracking-wider'>
          Residential Home Address
        </label>
        <textarea
          rows={3}
          disabled={loading}
          placeholder='Provide complete default home billing physical address configurations...'
          value={formStates.address}
          onChange={(e) => formStates.address.setter(e.target.value)}
          className='bg-neutral-950 border border-white/10 text-stone-200 placeholder-stone-500 rounded-xl p-3 font-poppins text-xs focus:outline-none focus:border-amber-400/40 transition-colors resize-none leading-relaxed'
        />
      </div>
    </div>
  );
}
