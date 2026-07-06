import React from "react";
import { Camera } from "lucide-react";

export function CustomerPictureCard({ avatar, loading }) {
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];

      avatar.setFile(selectedFile);
      if (avatar.setPreviewUrl) {
        avatar.setPreviewUrl(URL.createObjectURL(selectedFile));
      }
    }
  };

  return (
    <div className='bg-neutral-900 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4'>
      <h3 className='font-montserrat font-bold text-xs uppercase tracking-wider text-stone-300 self-start'>
        Identity Portrait
      </h3>
      <div className='relative group w-32 h-32 rounded-full overflow-hidden border border-amber-500/30 bg-neutral-900 flex items-center justify-center'>
        {avatar.previewUrl ? (
          <img
            src={avatar.previewUrl}
            alt='Avatar Preview'
            className='w-full h-full object-cover'
          />
        ) : (
          <span className='text-3xl font-bold font-montserrat text-amber-400/40'>
            U
          </span>
        )}
        <label className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 cursor-pointer text-[10px] text-stone-300 font-poppins font-medium'>
          <Camera className='w-4 h-4 text-amber-400' />
          Upload Image
          <input
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            disabled={loading}
            className='hidden'
          />
        </label>
      </div>
      <p className='text-[11px] text-stone-400 max-w-[200px] leading-relaxed'>
        Accepts clean JPEG or PNG dimensions. Maximum file threshold footprint
        should evaluate below 2MB.
      </p>
    </div>
  );
}
