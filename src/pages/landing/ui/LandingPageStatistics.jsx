import { useEffect, useState } from "react";
import AnimatedCounter from "../ui/AnimatedCounter";
import CustomHeader from "../../../shared_components/CustomHeader";

function LandingPageStatistics() {
  const STATS_DATA = [
    { id: 1, value: "5000+", label: "Weddings Planned" },
    { id: 2, value: "1000+", label: "Verified Vendors" },
    { id: 3, value: "98%", label: "Customer Satisfaction" },
    { id: 4, value: "50+", label: "Cities Covered" },
  ];
  return (
    <section className='py-12 px-6 md:px-16 lg:px-24 w-full flex flex-col  relative overflow-hidden bg-transparent'>
      <CustomHeader badge='Statistics' title='Statistics Section' />
      <div className='w-full mt-10 self-center max-w-full bg-neutral-950 backdrop-blur-md rounded-3xl p-8 md:p-20 border border-border-gold shadow-2xl flex flex-col items-center relative z-10 overflow-hidden group hover:border-yellow-500/20 transition-all duration-500'>
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

export default LandingPageStatistics;
