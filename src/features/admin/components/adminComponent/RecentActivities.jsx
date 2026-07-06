import { iconMap } from "./adminIconMap";

const toneStyles = {
  gold: "border-border-gold/20 bg-glass-gold text-border-gold-hover",
  neutral: "border-white/10 bg-white/5 text-stone-300",
  emerald: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
};

function RecentActivities({ items = [] }) {
  return (
    <section className='rounded-3xl border border-border-gold/15 bg-[#141414]/90 p-5 shadow-[0_14px_40px_rgba(0,0,0,0.35)]'>
      <div className='mb-5 flex items-center justify-between'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.24em] text-border-gold-hover/80'>
            Recent Activity
          </p>
          <h3 className='mt-2 text-lg font-bold text-white'>Operational pulse</h3>
        </div>
      </div>
      <div className='space-y-3'>
        {items.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <article
              key={item.title}
              className='flex items-start gap-4 rounded-2xl border border-white/8 bg-black/20 p-4'
            >
              <div className={`rounded-2xl border p-3 ${toneStyles[item.tone]}`}>
                <Icon className='h-4 w-4' />
              </div>
              <div className='min-w-0 flex-1'>
                <div className='flex items-center justify-between gap-3'>
                  <h4 className='font-semibold text-white'>{item.title}</h4>
                  <span className='shrink-0 text-[11px] text-stone-500'>
                    {item.time}
                  </span>
                </div>
                <p className='mt-1 text-sm leading-relaxed text-stone-400'>
                  {item.description}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default RecentActivities;
