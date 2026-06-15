function Subtitle({ content }) {
  return (
    <p className='font-poppins font-light text-base md:text-lg text-stone-300/90 leading-relaxed max-w-xl text-pretty tracking-wide'>
      {content ||
        "Your dream day deserves a seamless journey. Discover top-rated venues, premium vendors, and intelligent planning tools tailored exclusively to your love story."}
    </p>
  );
}

export default Subtitle;
