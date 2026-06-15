import { Plus } from "lucide-react";

function CreateServiceHeader() {
  return (
    <div className='w-full max-w-full mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-stone-400 z-10 relative'>
      <div className='flex flex-col gap-4'>
        <h1 className='font-normal text-4xl md:text-5xl text-white tracking-wide '>
          Create Service
        </h1>
        <p className='font-poppins font-light text-sm text-light-text mt-1'>
          Create, and showcase your services.
        </p>
      </div>

      <button className='bg-glass-gold text-white border border-border-gold shadow-gold-glow font-poppins text-xs font-semibold py-3 px-5 rounded-xl backdrop-blur-md hover:bg-glass-gold-hover hover:border-border-gold-hover hover:shadow-gold-glow-hover transition-all duration-300 flex items-center gap-2 cursor-pointer'>
        <Plus className='w-4 h-4 text-border-gold-hover' />
        Add
      </button>
    </div>
  );
}

export default CreateServiceHeader;
