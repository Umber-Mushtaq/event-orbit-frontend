function Headline() {
  return (
    <h1 className='font-playfair font-black text-5xl md:text-6xl tracking-wide leading-tight max-w-2xl text-balance'>
      <span className='animate-shimmer bg-gradient-to-r from-white via-amber-200 to-white bg-[length:200%_auto] bg-clip-text text-transparent'>
        {" "}
        Plan Your Wedding
      </span>
      <br />
      <span className='text-border-gold drop-shadow-[0_2px_10px_rgba(251,191,36,0.3)]'>
        In One Place
      </span>
    </h1>
  );
}

export default Headline;
