import { Star, MapPin } from "lucide-react";
import { VENDORS_DATA } from "../dummyData";
import TopHeadings from "../components/TopHeadings";

function LandingVendors() {
  return (
    <section
      id='vendors'
      className='bg-neutral-950 text-white py-20 px-6 md:px-16 lg:px-24 w-full flex flex-col items-center relative overflow-hidden'
    >
      <TopHeadings
        badge='Featured Vendors Section'
        heading='Featured Wedding Professionals'
      />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl z-10'>
        {VENDORS_DATA.map((vendor) => (
          <div
            key={vendor.id}
            className='bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg overflow-hidden group flex flex-col transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-border-gold/50 hover:shadow-gold-glow-hover'
          >
            <div className='relative h-56 w-full overflow-hidden'>
              <img
                src={vendor.image}
                alt={vendor.name}
                className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20' />
            </div>
            <div className='p-6 pt-10 relative flex flex-col flex-grow'>
              <div className='absolute top-0 left-6 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-border-gold shadow-md overflow-hidden bg-neutral-900 z-10'>
                <img
                  src={vendor.avatar}
                  alt='profile'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='mb-4'>
                <h3 className='font-montserrat font-bold text-xl text-white line-clamp-1 group-hover:text-border-gold-hover transition-colors duration-200'>
                  {vendor.name}
                </h3>
                <span className='font-poppins text-xs font-medium tracking-wide text-light-text block mt-1'>
                  {vendor.category}
                </span>
              </div>
              <div className='flex gap-1 mb-5'>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < vendor.rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-stone-600"
                    }`}
                  />
                ))}
              </div>
              <div className='mt-auto border-t border-white/10 pt-4 flex items-center justify-between gap-4'>
                <div className='flex flex-col gap-1'>
                  <div className='flex items-center gap-1.5 text-light-text text-xs'>
                    <MapPin className='w-3.5 h-3.5 text-border-gold' />
                    <span className='truncate max-w-[120px]'>
                      {vendor.location}
                    </span>
                  </div>
                </div>
                <span className='text-[11px] text-light-text font-poppins'>
                  Starting at{" "}
                  <strong className='text-white font-semibold'>
                    ${vendor.price}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default LandingVendors;
