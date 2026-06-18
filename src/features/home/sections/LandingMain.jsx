import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import your fully composed graphic banners here
import Banner1 from "../../../assets/banner1.png";
import Banner2 from "../../../assets/banner2.png";
import Banner3 from "../../../assets/banner3.png";
import Banner4 from "../../../assets/banner4.png";

const BANNERS = [Banner1, Banner2, Banner3, Banner4];

function LandingMain() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const triggerSlideChange = (nextIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide(nextIndex);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const handleNext = () => {
    const nextIndex = (currentSlide + 1) % BANNERS.length;
    triggerSlideChange(nextIndex);
  };

  const handlePrev = () => {
    const nextIndex = (currentSlide - 1 + BANNERS.length) % BANNERS.length;
    triggerSlideChange(nextIndex);
  };

  return (
    <div
      id='home'
      className='w-full max-w-7xl mx-auto px-4 sm:px-6 relative my-auto z-10 py-6 select-none flex flex-col gap-6'
    >
      {/* 1. SLIDER CONTAINER */}
      <div
        style={{
          boxShadow:
            "0 0 25px 2px rgba(234, 179, 8, 0.35), 0 0 65px 15px rgba(234, 179, 8, 0.15), 0 30px 60px -15px rgba(0, 0, 0, 0.9)",
        }}
        className='w-full aspect-[21/9] sm:aspect-[3/1] rounded-2xl md:rounded-3xl border border-yellow-500/40 bg-neutral-950 overflow-hidden relative group transition-all duration-500'
      >
        {/* SLIDING IMAGES CANVAS */}
        {BANNERS.map((bannerImg, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out transform ${
                isActive
                  ? "opacity-100 scale-100 z-10 pointer-events-auto"
                  : "opacity-0 scale-[1.01] z-0 pointer-events-none"
              }`}
            >
              <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 z-10 mix-blend-multiply' />
              <img
                src={bannerImg}
                alt={`EventOrbit Premium Banner ${index + 1}`}
                className='w-full h-full object-cover object-center'
                draggable={false}
              />
            </div>
          );
        })}

        {/* PURE GOLD CHEVRON BUTTONS */}
        <button
          onClick={handlePrev}
          className='absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 z-20 cursor-pointer hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(234,179,8,0.4)]'
        >
          <ChevronLeft className='w-5 h-5 stroke-[2.5]' />
        </button>

        <button
          onClick={handleNext}
          className='absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 z-20 cursor-pointer hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(234,179,8,0.4)]'
        >
          <ChevronRight className='w-5 h-5 stroke-[2.5]' />
        </button>
      </div>

      {/* 
        👉 2. EXTRACTED SLIDER DOTS WRAPPER:
        Moved out of the canvas entirely. Changed 'absolute bottom-3 left-1/2 -translate-x-1/2' 
        to 'mx-auto flex' layout positioning to drop it cleanly right below the image frame.
      */}
      <div className='mx-auto flex items-center gap-2 bg-neutral-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-yellow-500/30 opacity-90 hover:opacity-100 transition-opacity shadow-[0_4px_20px_rgba(0,0,0,0.4)]'>
        {BANNERS.map((_, index) => (
          <button
            key={index}
            onClick={() => triggerSlideChange(index)}
            className={`transition-all duration-300 cursor-pointer h-1.5 rounded-full ${
              currentSlide === index
                ? "w-6 bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.7)]"
                : "w-1.5 bg-yellow-600/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default LandingMain;
