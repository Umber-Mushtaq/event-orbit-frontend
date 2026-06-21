import { STATS_DATA } from "../dummyData";
import { useEffect, useState } from "react";
import AnimatedCounter from "../components/AnimatedCounter";

function LandingStatistics() {
  return (
    <section className='py-12 px-6 md:px-16 lg:px-24 w-full flex flex-col items-center relative overflow-hidden bg-transparent'>
      <div className='w-full max-w-5xl bg-gradient-to-b from-neutral-900/40 to-neutral-950/60 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-border-gold shadow-2xl flex flex-col items-center relative z-10 overflow-hidden group hover:border-yellow-500/20 transition-all duration-500'>
        <span className='font-poppins font-semibold text-xs tracking-widest text-yellow-500 uppercase mb-10 z-10'>
          Statistics Section
        </span>

        <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 w-full z-10'>
          {STATS_DATA.map((stat) => (
            <div
              key={stat.id}
              className='flex flex-col items-center text-center group/item transition-all duration-300 hover:scale-105'
            >
              <span className='font-montserrat font-black text-4xl md:text-5xl text-white tracking-tight bg-gradient-to-b from-white via-slate-200 to-slate-400 bg-clip-text text-transparent group-hover/item:from-white group-hover/item:to-yellow-500 transition-all duration-300'>
                <AnimatedCounter value={stat.value} duration={2500} />
              </span>

              <p className='font-poppins font-medium text-xs md:text-sm text-stone-400 tracking-wide mt-2 max-w-[140px] leading-relaxed group-hover/item:text-stone-200 transition-colors duration-200'>
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
