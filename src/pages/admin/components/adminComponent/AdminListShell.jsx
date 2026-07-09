import { ArrowRight, Plus } from "lucide-react";
import { iconMap } from "./adminIconMap";

function StatTile({ item }) {
  const Icon = iconMap[item.icon] || ArrowRight;
  return (
    <article className='relative overflow-hidden rounded-3xl border border-white/8 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.12),transparent_38%),linear-gradient(180deg,rgba(16,16,16,0.96),rgba(7,7,7,0.96))] p-5 shadow-[0_14px_40px_rgba(0,0,0,0.35)]'>
      <div className='absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-border-gold/25 bg-black/25 text-border-gold-hover'>
        <Icon className='h-4 w-4' />
      </div>
      <p className='text-xs font-medium uppercase tracking-[0.22em] text-stone-400'>
        {item.label}
      </p>
      <h2 className='mt-6 text-4xl font-black tracking-tight text-white'>{item.value}</h2>
      {item.growth ? (
        <div className='mt-4 flex items-center gap-2 text-xs text-stone-400'>
          <span className='inline-flex items-center rounded-full bg-emerald-500/15 px-2.5 py-1 font-semibold text-emerald-300'>
            {item.growth}
          </span>
          <span>vs last month</span>
        </div>
      ) : null}
    </article>
  );
}

function AdminListShell({
  title,
  description,
  actionLabel,
  onAction,
  actionIcon = Plus,
  stats = [],
  children,
}) {
  const ActionIcon = actionIcon;

  return (
    <div className='space-y-6'>
      <section className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
        <div>
          <h1 className='text-3xl font-black tracking-tight text-white md:text-4xl'>
            {title}
          </h1>
          <p className='mt-2 text-sm text-stone-400'>{description}</p>
        </div>
        {actionLabel ? (
          <button
            type='button'
            onClick={onAction}
            className='inline-flex items-center gap-2 rounded-2xl border border-border-gold/25 bg-[linear-gradient(180deg,#f3c85c,#d69d2f)] px-4 py-3 text-sm font-semibold text-black shadow-[0_12px_30px_rgba(212,175,55,0.2)] transition hover:brightness-105'
          >
            <ActionIcon className='h-4 w-4' />
            {actionLabel}
          </button>
        ) : null}
      </section>

      {stats.length ? (
        <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
          {stats.map((item) => (
            <StatTile key={item.label} item={item} />
          ))}
        </section>
      ) : null}

      {children}
    </div>
  );
}

export default AdminListShell;
