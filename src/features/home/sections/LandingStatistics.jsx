import { STATS_DATA } from "../dummyData";
function LandingStatistics() {
  return (
    <section className='bg-neutral-950 py-16 px-6 md:px-16 lg:px-24 w-full flex flex-col items-center relative overflow-hidden'>
      <div className='w-full max-w-5xl bg-white/5 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/10 shadow-xl flex flex-col items-center relative z-10 overflow-hidden group hover:border-border-gold/30 transition-all duration-500'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-500/5 blur-[80px] pointer-events-none rounded-full z-0 group-hover:bg-amber-500/10 transition-colors duration-500' />
        <span className='font-poppins font-semibold text-xs tracking-widest text-border-gold uppercase mb-10 z-10 drop-shadow-[0_2px_8px_rgba(251,191,36,0.1)]'>
          Statistics Section
        </span>

        <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 w-full z-10'>
          {STATS_DATA.map((stat) => (
            <div
              key={stat.id}
              className='flex flex-col items-center text-center group/item transition-all duration-300 hover:scale-105'
            >
              <span className='font-montserrat font-black text-4xl md:text-5xl text-white tracking-tight bg-gradient-to-b from-white via-stone-100 to-stone-400 bg-clip-text text-transparent group-hover/item:from-white group-hover/item:to-border-gold-hover transition-all duration-300'>
                {stat.value}
              </span>

              <p className='font-poppins font-medium text-xs md:text-sm text-light-text tracking-wide mt-2 max-w-[140px] leading-relaxed group-hover/item:text-stone-200 transition-colors duration-200'>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LandingStatistics;
