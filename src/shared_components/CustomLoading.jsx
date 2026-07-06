function CustomLoading({ msg }) {
  return (
    <div className='min-h-screen bg-white/5 border border-white/30 rounded-lg  flex items-center justify-center text-amber-500 font-poppins'>
      <div className='flex flex-col items-center gap-3'>
        <div className='w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin' />
        <div className='animate-pulse tracking-widest text-xs uppercase font-bold text-stone-400'>
          {msg}
        </div>
      </div>
    </div>
  );
}

export default CustomLoading;
