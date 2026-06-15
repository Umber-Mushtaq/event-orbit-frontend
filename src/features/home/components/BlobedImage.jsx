function BlobedImage({ image }) {
  return (
    <div className='w-fit relative flex justify-center lg:justify-end h-[50vh] lg:h-[75vh]'>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 lg:w-[500px] lg:h-[500px] rounded-full bg-border-gold blur-xl z-0 mix-blend-screen' />

      <img
        src={image}
        alt='Hero Image'
        className='h-full w-auto object-contain relative z-10 drop-shadow-[0_15px_35px_rgba(0,0,0,0.8)]'
      />
    </div>
  );
}

export default BlobedImage;
