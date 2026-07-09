import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { iconMap } from "./adminIconMap";

function StatCard({ item }) {
  const Icon = iconMap[item.icon] || ArrowUpRight;
  const TrendIcon = item.trend === "down" ? ArrowDownRight : ArrowUpRight;

  return (
    <article className='group relative overflow-hidden rounded-3xl border border-border-gold/20 bg-admin-input p-5 shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-border-gold/40 hover:bg-admin-surface-3'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.14),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
      <div className='relative flex items-start justify-between gap-4'>
        <div className='space-y-3'>
          <div className='inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border-gold/25 bg-glass-gold text-border-gold shadow-gold-glow'>
            <Icon className='h-5 w-5' />
          </div>
          <div>
            <p className='text-xs font-medium uppercase tracking-[0.22em] text-admin-muted'>
              {item.label}
            </p>
            <h3 className='mt-2 text-2xl font-black tracking-tight text-admin-foreground'>
              {item.value}
            </h3>
          </div>
        </div>
        <div className='inline-flex items-center gap-1 rounded-full border border-border-gold/20 bg-admin-input px-2.5 py-1 text-[11px] font-semibold text-admin-foreground'>
          <TrendIcon className='h-3.5 w-3.5 text-border-gold-hover' />
          {item.growth}
        </div>
      </div>
    </article>
  );
}

export default StatCard;
