function CreateServiceFormHeaders({ number, text }) {
  return (
    <>
      <div className='flex items-center gap-3 border-b border-stone-400 pb-4'>
        <span className='w-6 h-6 rounded-full bg-glass-gold border border-border-gold text-border-gold text-xs font-bold flex items-center justify-center font-poppins'>
          {number}
        </span>
        <h2 className='font-montserrat font-bold text-lg text-white'>{text}</h2>
      </div>
    </>
  );
}

export default CreateServiceFormHeaders;
