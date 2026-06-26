export function CategoryFilter({
  categories,
  activeCategory,
  setActiveCategory,
}) {
  const baseChipStyles =
    "py-3.5 px-5 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all duration-300 cursor-pointer";
  const activeStyles =
    "bg-gradient-to-b from-amber-500/20 to-yellow-600/10 border-amber-500/50 text-white shadow-[0_4px_20px_rgba(245,158,11,0.15)] scale-[1.03]";
  const inactiveStyles =
    "bg-neutral-900/60 backdrop-blur-sm border-white/5 text-stone-400 hover:bg-neutral-900 hover:text-white";

  return (
    <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-16 z-10 relative'>
      <button
        onClick={() => setActiveCategory("all")}
        className={`${baseChipStyles} ${activeCategory === "all" ? activeStyles : inactiveStyles}`}
      >
        <span className='font-poppins text-xs font-bold tracking-wider uppercase'>
          All Services
        </span>
      </button>

      {categories.map((cat) => {
        const IconComponent = cat.Icon;
        const isSelected = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`${baseChipStyles} ${isSelected ? activeStyles : inactiveStyles}`}
          >
            <IconComponent
              className={`w-5 h-5 ${isSelected ? "text-amber-400" : "text-stone-400"}`}
            />
            <span className='font-poppins text-xs font-bold tracking-wider uppercase'>
              {cat.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
