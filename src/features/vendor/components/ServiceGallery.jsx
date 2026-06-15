import MainWedding from "../../../assets/service1.jpg";
import Thumb1 from "../../../assets/service2.jpg";
import Thumb2 from "../../../assets/service3.jpg";

export default function ServiceGallery() {
  const thumbnails = [Thumb1, Thumb2, Thumb1, Thumb2];

  return (
    <div className='w-full flex flex-col gap-4 z-10 relative'>
      {/* Primary Display Showcase Image */}
      <div className='w-full h-[45vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl'>
        <img
          src={MainWedding}
          alt='Main Service Showcase'
          className='w-full h-full object-cover object-center'
        />
      </div>

      {/* Horizontal Thumbnail Slider Row */}
      <div className='grid grid-cols-5 gap-3 w-full'>
        {thumbnails.map((img, idx) => (
          <div
            key={idx}
            className='aspect-`aspect-4/3`rounded-xl overflow-hidden border border-white/5 hover:border-border-gold/50 cursor-pointer transition-all'
          >
            <img
              src={img}
              alt='Thumbnail preview'
              className='w-full h-full object-cover'
            />
          </div>
        ))}
        {/* "+More" Album Utility Slot */}
        <div className='aspect-`aspect-4/3` rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center text-xs font-poppins font-semibold text-stone-400 hover:text-border-gold-hover hover:border-border-gold/20 cursor-pointer transition-all'>
          +24 More
        </div>
      </div>
    </div>
  );
}
