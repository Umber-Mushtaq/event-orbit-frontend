import { Building2, FileText, Briefcase } from "lucide-react";

export function BusinessInfoCard({ formStates, loading }) {
  return (
    <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col gap-5 shadow-xl'>
      <div className='flex items-center gap-2 border-b border-white/5 pb-3 mb-1'>
        <Building2 className='w-4 h-4 text-border-gold' />
        <h2 className='font-montserrat font-bold text-sm uppercase tracking-wider text-white'>
          Business Info
        </h2>
      </div>

      <div className='flex flex-col gap-1.5'>
        <label className='font-poppins text-sm font-semibold uppercase tracking-wider text-stone-400'>
          Business Name
        </label>
        <div className='relative flex items-center'>
          <Building2 className='absolute left-4 w-4 h-4 text-stone-400' />
          <input
            type='text'
            value={formStates.businessName}
            onChange={(e) => formStates.setBusinessName(e.target.value)}
            disabled={loading}
            placeholder='e.g., Grand Banquet Planners'
            className='w-full bg-neutral-900/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-border-gold font-poppins'
          />
        </div>
      </div>

      <div className='flex flex-col gap-1.5'>
        <label className='font-poppins text-sm font-semibold uppercase tracking-wider text-stone-400'>
          Business Description
        </label>
        <div className='relative flex items-start'>
          <FileText className='absolute left-4 top-3.5 w-4 h-4 text-stone-400' />
          <textarea
            rows={8}
            value={formStates.businessDescription}
            onChange={(e) => formStates.setBusinessDescription(e.target.value)}
            disabled={loading}
            placeholder='Describe your corporate event operations packages...'
            className='w-full bg-neutral-900/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-border-gold font-poppins resize-none scrollbar-none'
          />
        </div>
      </div>

      <div className='flex flex-col gap-1.5'>
        <label className='font-poppins text-sm font-semibold uppercase tracking-wider text-stone-400'>
          Vendor Short Bio
        </label>
        <div className='relative flex items-start'>
          <Briefcase className='absolute left-4 top-3.5 w-4 h-4 text-stone-400' />
          <textarea
            rows={8}
            value={formStates.vendorBio}
            onChange={(e) => formStates.setVendorBio(e.target.value)}
            disabled={loading}
            placeholder='Provide a summary bio background details narrative...'
            className='w-full bg-neutral-900/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-border-gold font-poppins resize-none scrollbar-none'
          />
        </div>
      </div>
    </div>
  );
}
