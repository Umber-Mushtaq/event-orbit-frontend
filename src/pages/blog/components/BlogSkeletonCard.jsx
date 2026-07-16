function BlogSkeletonCard() {
  return (
    <div className='overflow-hidden rounded-[2rem] border border-white/8 bg-[#141414]/90 shadow-[0_14px_40px_rgba(0,0,0,0.35)]'>
      <div className='aspect-[16/10] animate-pulse bg-neutral-800/80' />
      <div className='flex flex-col gap-4 p-5'>
        <div className='h-3 w-40 rounded-full bg-neutral-800 animate-pulse' />
        <div className='h-6 w-full rounded-full bg-neutral-800 animate-pulse' />
        <div className='h-6 w-5/6 rounded-full bg-neutral-800 animate-pulse' />
        <div className='space-y-2'>
          <div className='h-3 w-full rounded-full bg-neutral-800 animate-pulse' />
          <div className='h-3 w-11/12 rounded-full bg-neutral-800 animate-pulse' />
          <div className='h-3 w-4/5 rounded-full bg-neutral-800 animate-pulse' />
        </div>
        <div className='h-10 w-32 rounded-full bg-neutral-800 animate-pulse' />
      </div>
    </div>
  );
}

export default BlogSkeletonCard;
