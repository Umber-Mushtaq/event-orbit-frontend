import React from "react";
import { MessageSquare, Globe, Users2, Link2 } from "lucide-react";

export function SocialFootprintCard({ formStates, loading }) {
  return (
    <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col gap-5 shadow-xl'>
      <div className='flex items-center gap-2 border-b border-white/5 pb-3 mb-1'>
        <MessageSquare className='w-4 h-4 text-border-gold' />
        <h2 className='font-montserrat font-bold text-sm uppercase tracking-wider text-white'>
          Social Footprint
        </h2>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        <div className='flex flex-col gap-1.5'>
          <label className='font-poppins text-sm font-semibold uppercase tracking-wider text-stone-400'>
            Website URL
          </label>
          <div className='relative flex items-center'>
            <Globe className='absolute left-4 w-4 h-4 text-stone-400' />
            <input
              type='url'
              value={formStates.website}
              onChange={(e) => formStates.setWebsite(e.target.value)}
              disabled={loading}
              placeholder='https://yourbrand.com'
              className='w-full bg-neutral-900/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-border-gold font-poppins'
            />
          </div>
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='font-poppins text-sm font-semibold uppercase tracking-wider text-stone-400'>
            Instagram Profile
          </label>
          <div className='relative flex items-center'>
            <Users2 className='absolute left-4 w-4 h-4 text-stone-400' />
            <input
              type='url'
              value={formStates.instagram}
              onChange={(e) => formStates.setInstagram(e.target.value)}
              disabled={loading}
              placeholder='https://instagram.com/brand'
              className='w-full bg-neutral-900/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-border-gold font-poppins'
            />
          </div>
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='font-poppins text-sm font-semibold uppercase tracking-wider text-stone-400'>
            LinkedIn Business
          </label>
          <div className='relative flex items-center'>
            <Globe className='absolute left-4 w-4 h-4 text-stone-400' />
            <input
              type='url'
              value={formStates.linkedin}
              onChange={(e) => formStates.setLinkedin(e.target.value)}
              disabled={loading}
              placeholder='https://linkedin.com/company/brand'
              className='w-full bg-neutral-900/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-border-gold font-poppins'
            />
          </div>
        </div>

        <div className='flex flex-col gap-1.5'>
          <label className='font-poppins text-sm font-semibold uppercase tracking-wider text-stone-400'>
            Facebook Page
          </label>
          <div className='relative flex items-center'>
            <Link2 className='absolute left-4 w-4 h-4 text-stone-400' />
            <input
              type='url'
              value={formStates.facebook}
              onChange={(e) => formStates.setFacebook(e.target.value)}
              disabled={loading}
              placeholder='https://facebook.com/brand'
              className='w-full bg-neutral-900/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-border-gold font-poppins'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
