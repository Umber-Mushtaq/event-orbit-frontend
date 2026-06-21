import { useState } from "react";
import { Star, MapPin, Heart } from "lucide-react";
import { CATEGORIES, VENDORS_LIST } from "../dummyData";

function ServiceListings() {
  const [activeCategory, setActiveCategory] = useState("venue");
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className='min-h-screen w-full bg-neutral-800 text-white py-5 px-6 md:px-10 flex flex-col items-center relative overflow-hidden'>
      <h1 className='font-normal text-2xl md:text-4xl text-white tracking-tight self-start pb-10'>
        Service Lisings
      </h1>
      <div className='w-full max-w-full mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-12 z-10 relative'>
        {CATEGORIES.map((cat) => {
          const IconComponent = cat.Icon;
          const isSelected = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`py-4 px-5 rounded-2xl border flex flex-col items-center gap-2 transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "bg-glass-gold border-border-gold text-white shadow-gold-glow scale-105"
                  : "bg-neutral-950 border-white/10 text-stone-400 hover:bg-white/10 hover:text-white hover:border-white/20"
              }`}
            >
              <IconComponent
                className={`w-6 h-6 ${isSelected ? "text-border-gold-hover" : "text-stone-400"}`}
              />
              <span className='font-poppins text-xs font-semibold tracking-wider uppercase'>
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. CORE SERVICE LISTINGS CARD GRID */}
      <div className='w-full max-w-full mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 z-10 relative'>
        {VENDORS_LIST.map((vendor) => (
          <div
            key={vendor.id}
            className='bg-neutral-950 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg overflow-hidden group flex flex-col transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-border-gold hover:shadow-2xl'
          >
            {/* CARD THUMBNAIL COVER */}
            <div className='relative h-56 w-full overflow-hidden'>
              <img
                src={vendor.image}
                alt={vendor.name}
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
              />
              {/* Soft Dark Vignette Overlay */}
              <div className='absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-black/20' />

              {/* FLOATING RED HEART FAVORITE TRIGGER */}
              <button
                onClick={() => toggleFavorite(vendor.id)}
                className='absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 text-white hover:scale-110 active:scale-95 transition-all cursor-pointer'
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    favorites[vendor.id]
                      ? "fill-red-500 text-red-500"
                      : "text-white"
                  }`}
                />
              </button>
            </div>

            {/* LOWER PORTRAIT CONTENT DETAILS */}
            <div className='p-5 pt-10 relative flex flex-col flex-grow'>
              {/* OVERLAPPING AVATAR BADGE */}
              <div className='absolute top-0 left-5 -translate-y-1/2 w-14 h-14 rounded-full border-2 border-border-gold shadow-md overflow-hidden bg-neutral-900 z-10'>
                <img
                  src={vendor.avatar}
                  alt='vendor avatar profile'
                  className='w-full h-full object-cover'
                />
              </div>

              {/* Title & Service Identity Group */}
              <div className='mb-3'>
                <h3 className='font-montserrat font-bold text-lg text-white line-clamp-1 group-hover:text-border-gold-hover transition-colors duration-200'>
                  {vendor.name}
                </h3>
                <span className='font-poppins text-xs font-medium tracking-wide text-stone-400 block mt-0.5 capitalize'>
                  {vendor.category}
                </span>
              </div>

              {/* STAR RATING GENERATOR METRICS */}
              <div className='flex gap-0.5 mb-5'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < vendor.rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-stone-700"
                    }`}
                  />
                ))}
              </div>

              {/* GEOGRAPHIC & PRICING BOTTOM MATRIX ROW */}
              <div className='mt-auto border-t text-border-gold pt-4 flex items-center justify-between gap-4 text-[11px] font-poppins text-stone-400'>
                <div className='flex items-center gap-1 min-w-0'>
                  <MapPin className='w-3.5 h-3.5 text-border-gold shrink-0' />
                  <span className='truncate max-w-[120px]'>
                    {vendor.location}
                  </span>
                </div>
                <div className='whitespace-nowrap'>
                  Starting at{" "}
                  <strong className='text-white font-bold text-xs ml-1'>
                    ${vendor.price}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ServiceListings;
