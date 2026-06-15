import { Upload } from "lucide-react";
import CreateServiceFormHeaders from "./CreateServiceFormHeaders";

function GalleryUploadSection() {
  return (
    <div className='bg-white/5 backdrop-blur-md border border-stone-400  rounded-3xl p-6 md:p-8 shadow-xl flex flex-col gap-5'>
      <CreateServiceFormHeaders number={3} text='Gallery Upload Section' />
      <div className='border-2 border-dashed border-stone-400  rounded-2xl p-8 flex flex-col items-center justify-center text-center group hover:border-border-gold transition-colors duration-300 cursor-pointer bg-neutral-900/20'>
        <div className='w-12 h-12 rounded-full bg-white/5 border border-stone-400  flex items-center justify-center text-stone-400 group-hover:text-border-gold-hover group-hover:border-border-gold/30 transition-all duration-300 mb-4'>
          <Upload className='w-5 h-5' />
        </div>
        <p className='font-poppins font-medium text-sm text-stone-400 mb-1'>
          Upload Image
        </p>
        <p className='font-poppins font-light text-xs text-stone-400'>
          Showcase your best work
        </p>
      </div>

      {/* 6-Grid Matrix Rows */}
      <div className='grid grid-cols-3 gap-3 mt-2'>
        {[...Array(6)].map((_, idx) => (
          <div
            key={idx}
            className='aspect-square bg-neutral-900/40 border border-stone-400 rounded-xl flex items-center justify-center text-light-text hover:border-border-gold  transition-colors duration-200 cursor-pointer'
          >
            <Upload className='w-5 h-5 opacity-30' />
          </div>
        ))}
      </div>
    </div>
  );
}

export default GalleryUploadSection;
