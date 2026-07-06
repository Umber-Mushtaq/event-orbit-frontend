import { CalendarDays } from "lucide-react";

function EventsStatCard({ label, value, growth, trend }) {
  return (
    <article className='relative overflow-hidden rounded-3xl border border-white/8 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.12),transparent_38%),linear-gradient(180deg,rgba(16,16,16,0.96),rgba(7,7,7,0.96))] p-5 shadow-[0_14px_40px_rgba(0,0,0,0.35)]'>
      <div className='absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-border-gold/25 bg-black/25 text-border-gold-hover'>
        <CalendarDays className='h-4 w-4' />
      </div>
      <p className='text-xs font-medium uppercase tracking-[0.22em] text-stone-400'>{label}</p>
      <h2 className='mt-6 text-4xl font-black tracking-tight text-white'>{value}</h2>
      {growth ? (
        <div className='mt-4 flex items-center gap-2 text-xs text-stone-400'>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 font-semibold ${
              trend === "up"
                ? "bg-emerald-500/15 text-emerald-300"
                : "bg-white/8 text-stone-300"
            }`}
          >
            {growth}
          </span>
          <span>vs last month</span>
        </div>
      ) : null}
    </article>
  );
}

function EventsStatsGrid({ items = [] }) {
  return (
    <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
      {items.map((item) => (
        <EventsStatCard key={item.label} {...item} />
      ))}
    </section>
  );
}

export default EventsStatsGrid;
