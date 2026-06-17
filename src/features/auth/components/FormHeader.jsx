function FormHeader({ heading, para }) {
  return (
    <div className='text-center mb-8'>
      <h2 className='font-montserrat font-black text-2xl md:text-3xl text-white tracking-tight'>
        {heading}
      </h2>
      <p className='font-poppins font-light text-xs text-light-text mt-2'>
        {para}
      </p>
    </div>
  );
}

export default FormHeader;
