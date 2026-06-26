import { useState, useEffect } from "react";
import DefaultPlaceholder from "../../../assets/service1.jpg";

export function ServiceDetailsImageGallery({ images = [] }) {
  // Ensure the fallback asset is array safe
  const galleryImages = images.length > 0 ? images : [DefaultPlaceholder];
  const [activeImage, setActiveImage] = useState(galleryImages[0]);

  // Sync active image if the source array shifts asynchronously
  useEffect(() => {
    if (images.length > 0) {
      setActiveImage(images[0]);
    }
  }, [images]);

  return (
    <div className='w-full flex flex-col gap-3 sm:gap-4 z-10 relative'>
      {/* Main Feature Showcase Container */}
      <div className='w-full aspect-[4/3] sm:aspect-auto sm:h-[40vh] md:h-[50vh] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl'>
        <img
          src={activeImage}
          alt='Main Service Showcase'
          className='w-full h-full object-cover object-center transition-all duration-300'
        />
      </div>

      {/* Thumbnails Matrix Grid */}
      <div className='grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 w-full'>
        {galleryImages.map((img, idx) => {
          const isActive = activeImage === img;

          return (
            <button
              key={idx}
              type='button'
              onClick={() => setActiveImage(img)}
              className={`aspect-video rounded-lg sm:rounded-xl overflow-hidden border transition-all cursor-pointer focus:outline-none ${
                isActive
                  ? "border-border-gold shadow-md scale-[1.02]"
                  : "border-white/5 hover:border-white/20"
              }`}
            >
              <img
                src={img}
                alt={`Gallery Thumbnail ${idx + 1}`}
                className='w-full h-full object-cover'
                loading='lazy'
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
