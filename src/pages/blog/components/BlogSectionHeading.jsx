function BlogSectionHeading({ title, description }) {
  return (
    <div className='max-w-2xl'>
      <p className='text-xs font-semibold uppercase tracking-[0.24em] text-border-gold-hover/80'>
        {description}
      </p>
      <h2 className='mt-3 text-2xl font-black text-white md:text-3xl'>
        {title}
      </h2>
    </div>
  );
}

export default BlogSectionHeading;
