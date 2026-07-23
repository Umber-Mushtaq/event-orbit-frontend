function CustomLoading({ msg }) {
  return (
    <div className='flex min-h-screen items-center justify-center rounded-lg border border-border bg-card font-poppins text-primary'>
      <div className='flex flex-col items-center gap-3'>
        <div className='h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent' />
        <div className='animate-pulse text-xs font-bold uppercase tracking-widest text-muted-foreground'>
          {msg}
        </div>
      </div>
    </div>
  );
}

export default CustomLoading;
