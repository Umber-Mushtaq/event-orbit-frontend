function ChartCard({ title, subtitle, children, className = "" }) {
  return (
    <section
      className={`rounded-3xl border border-border-gold/15 bg-[#141414]/90 p-5 shadow-[0_14px_40px_rgba(0,0,0,0.35)] backdrop-blur-md ${className}`}
    >
      <div className='mb-4 flex items-start justify-between gap-4'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.24em] text-border-gold-hover/80'>
            {title}
          </p>
          {subtitle ? (
            <p className='mt-2 max-w-xl text-sm leading-relaxed text-stone-400'>
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
      {children}
    </section>
  );
}

export default ChartCard;
