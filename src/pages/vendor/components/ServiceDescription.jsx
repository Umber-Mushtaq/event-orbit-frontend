export default function ServiceDescription({ description }) {
  return (
    <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col gap-4 w-full'>
      <h3 className='font-montserrat font-bold text-lg text-white tracking-wide border-b border-white/5 pb-3'>
        Description
      </h3>
      <p className='font-poppins font-light text-sm text-stone-400 leading-relaxed text-pretty'>
        {description ||
          "No full summary description details listed for this item entry package."}
      </p>
    </div>
  );
}
