import { Camera } from "lucide-react";

export function AccountPictureCard({ avatar, loading }) {
  return (
    <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center shadow-xl relative group'>
      <span className='font-poppins font-semibold text-sm tracking-widest uppercase text-stone-400 mb-6 block border-b border-white/5 pb-2 w-full'>
        Account Picture
      </span>

      <label className='w-24 h-24 rounded-full border-2 border-border-gold shadow-gold-glow overflow-hidden relative group/avatar cursor-pointer'>
        <input
          type='file'
          accept='image/*'
          className='hidden'
          onChange={avatar.onChange}
          disabled={loading}
        />
        <img
          src={avatar.preview}
          alt='Vendor Profile Avatar'
          className='w-full h-full object-cover transition-transform duration-300 group-hover/avatar:scale-105'
        />
        <div className='absolute inset-0 bg-black/60 flex items-center justify-center text-border-gold opacity-0 group-hover/avatar:opacity-100 transition-opacity'>
          <Camera className='w-5 h-5' />
        </div>
      </label>
      <h3 className='font-montserrat font-bold text-base text-white mt-4 tracking-wide'>
        Upload Avatar
      </h3>
      <p className='font-poppins font-light text-sm text-stone-400 mt-1'>
        Accepts PNG, JPG format tiles below 2MB
      </p>
    </div>
  );
}
