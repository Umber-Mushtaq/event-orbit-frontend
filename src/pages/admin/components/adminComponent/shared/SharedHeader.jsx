function SharedHeader({ title, description, actionLabel, onAction, actionIcon: ActionIcon }) {
  return (
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
          {ActionIcon ? <ActionIcon className='h-4 w-4' /> : null}
          {actionLabel}
        </button>
      ) : null}
    </section>
  );
}

export default SharedHeader;
