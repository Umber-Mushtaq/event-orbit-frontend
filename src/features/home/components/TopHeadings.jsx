function TopHeadings({ badge, heading }) {
  return (
    <div className='text-center max-w-2xl flex flex-col gap-3 mb-16 z-10'>
      <span className='font-poppins font-semibold text-sm tracking-widest text-border-gold uppercase drop-shadow-[0_2px_8px_rgba(251,191,36,0.2)]'>
        {badge}
      </span>
      <h2 className='font-montserrat font-black text-4xl md:text-5xl text-white leading-tight tracking-tight'>
        {heading}
      </h2>
    </div>
  );
}

export default TopHeadings;
