import { Type, Layers, FileText } from "lucide-react";
import CreateServiceFormHeaders from "./CreateServiceFormHeaders";

function BasicServiceInfo() {
  return (
    <div className='bg-white/5 backdrop-blur-md border border-stone-400 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col gap-5'>
      <CreateServiceFormHeaders number={1} text='Basic Info Section' />

      {/* Service Title Input */}
      <div className='flex flex-col gap-2'>
        <label className='font-poppins text-xs font-medium text-stone-400 uppercase tracking-wider'>
          Service Title
        </label>
        <div className='relative flex items-center'>
          <Type className='absolute left-4 w-4 h-4 text-stone-400' />
          <input
            type='text'
            placeholder='Wedding Photography Premium Package'
            className='w-full bg-neutral-900/50 border border-stone-400 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-border-gold transition-colors duration-200 font-poppins'
          />
        </div>
      </div>

      {/* Service Category Dropdown */}
      <div className='flex flex-col gap-2'>
        <label className='font-poppins text-xs font-medium text-stone-400 uppercase tracking-wider'>
          Service Category
        </label>
        <div className='relative flex items-center'>
          <Layers className='absolute left-4 w-4 h-4 text-stone-400' />
          <select className='w-full bg-neutral-900/50 border border-stone-400 rounded-xl py-3 pl-11 pr-4 text-sm text-stone-400 placeholder-stone-400 focus:outline-none focus:border-border-gold transition-colors duration-200 font-poppins appearance-none cursor-pointer'>
            <option value='' disabled selected>
              Service Category
            </option>
            <option value='hall'>Marriage Hall</option>
            <option value='catering'>Catering</option>
            <option value='photography'>Photography</option>
            <option value='decor'>Decoration</option>
          </select>
        </div>
      </div>

      {/* Short Description Textarea */}
      <div className='flex flex-col gap-2'>
        <label className='font-poppins text-xs font-medium text-stone-400 uppercase tracking-wider'>
          Short Description
        </label>
        <div className='relative flex items-start'>
          <FileText className='absolute left-4 top-3 w-4 h-4 text-stone-400' />
          <textarea
            rows={4}
            placeholder='Wedding Photography Premium Package'
            className='w-full bg-neutral-900/50 border border-stone-400 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-stone-400 focus:outline-none focus:border-border-gold transition-colors duration-200 font-poppins resize-none'
          />
        </div>
      </div>
    </div>
  );
}

export default BasicServiceInfo;
