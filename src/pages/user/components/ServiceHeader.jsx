import { SlidersHorizontal, ChevronDown, Check, Sparkles } from "lucide-react";

export function ServiceHeader({
  isFilterDropdownOpen,
  setIsFilterDropdownOpen,
  selectedPriceSort,
  setSelectedPriceSort,
}) {
  return (
    <div className='w-full flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-white/5 pb-8 z-20 relative'>
      <div>
        <div className='flex items-center gap-2 text-amber-500/80 font-poppins text-xs font-bold tracking-widest uppercase mb-2'>
          <Sparkles className='w-3.5 h-3.5' /> Spotlight Categories
        </div>
        <h1 className='font-montserrat font-black text-3xl md:text-5xl text-white tracking-wide uppercase'>
          Explore Listings
        </h1>
      </div>
      <div className='relative self-start md:self-auto'>
        <button
          onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
          className='flex items-center gap-2 bg-neutral-900 border border-white/10 px-4 py-2.5 rounded-xl text-xs font-poppins text-stone-300 font-medium hover:bg-white/5 hover:text-white hover:border-amber-500/30 transition-all cursor-pointer'
        >
          <SlidersHorizontal className='w-4 h-4 text-amber-500' />
          <span>Sort Pricing</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-300 ${isFilterDropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isFilterDropdownOpen && (
          <div className='absolute right-0 mt-2 w-56 rounded-xl bg-neutral-900/90 border border-white/10 p-2 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200'>
            <div className='text-[10px] uppercase font-bold tracking-wider text-stone-500 px-3 py-1.5 font-poppins'>
              Price Matrix
            </div>

            {[
              { id: "default", label: "Default Sort" },
              { id: "asc", label: "Price: Low to High" },
              { id: "desc", label: "Price: High to Low" },
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setSelectedPriceSort(option.id);
                  setIsFilterDropdownOpen(false);
                }}
                className='w-full flex items-center justify-between text-left text-xs font-poppins px-3 py-2 rounded-lg text-stone-300 hover:bg-white/5 transition-all'
              >
                <span>{option.label}</span>
                {selectedPriceSort === option.id && (
                  <Check className='w-3.5 h-3.5 text-amber-500' />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
