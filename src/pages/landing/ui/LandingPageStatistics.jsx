import AnimatedCounter from "../ui/AnimatedCounter";
import CustomHeader from "../../../shared_components/CustomHeader";

function LandingPageStatistics() {
  const STATS_DATA = [
    { id: 1, value: "100+", label: "Weddings Planned" },
    { id: 2, value: "50", label: "Verified Vendors" },
    { id: 3, value: "98%", label: "Customer Satisfaction" },
    { id: 4, value: "50+", label: "Cities Covered" },
  ];
  return (
    <section className='py-10 max-w-7xl mx-auto px-5 flex flex-col  relative overflow-hidden bg-transparent'>
      <CustomHeader badge='Statistics' title='Statistics Section' />
      <div className='group relative z-10 mt-10 flex w-full max-w-full self-center overflow-hidden rounded-3xl border border-slate-200 bg-white py-8 shadow-[0_18px_50px_rgba(15,23,42,0.1)] backdrop-blur-md transition-all duration-500 hover:border-amber-300 md:py-20 dark:border-border-gold dark:bg-neutral-950 dark:shadow-2xl dark:hover:border-yellow-500/20'>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 w-full z-10'>
          {STATS_DATA.map((stat) => (
            <div
              key={stat.id}
              className='flex flex-col items-center text-center group/item transition-all duration-300 hover:scale-105'
            >
              <span className='font-montserrat bg-gradient-to-b from-slate-950 via-slate-800 to-slate-600 bg-clip-text text-4xl font-black tracking-tight text-transparent transition-all duration-300 group-hover/item:from-slate-950 group-hover/item:to-amber-600 md:text-5xl dark:from-white dark:via-slate-200 dark:to-slate-400 dark:group-hover/item:from-white dark:group-hover/item:to-yellow-500'>
                <AnimatedCounter value={stat.value} duration={2500} />
              </span>

              <p className='font-poppins mt-2 max-w-[140px] text-xs font-medium leading-relaxed tracking-wide text-slate-500 transition-colors duration-200 group-hover/item:text-slate-700 md:text-sm dark:text-stone-400 dark:group-hover/item:text-stone-200'>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LandingPageStatistics;
