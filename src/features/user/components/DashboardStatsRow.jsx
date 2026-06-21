import { STATS_DATA } from "../dummyData";

export function DashboardStatsRow() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8'>
      {STATS_DATA.map((stat, idx) => (
        <div
          key={idx}
          className='bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 md:p-6 flex flex-col justify-start transition-all duration-300 hover:border-border-gold/50 hover:shadow-lg'
        >
          <span className='font-poppins text-xs font-semibold uppercase tracking-wider text-stone-400'>
            {stat.label}
          </span>
          <span className='font-montserrat font-black text-3xl text-white mt-2 mb-1 tracking-tight'>
            {stat.value}
          </span>
          <span className='font-poppins text-xs text-stone-400 font-light'>
            {stat.subLabel}
          </span>
        </div>
      ))}
    </div>
  );
}
