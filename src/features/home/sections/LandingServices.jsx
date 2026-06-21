import TopHeadings from "../components/TopHeadings";
import { CATEGORIES_DATA } from "../dummyData";
function LandingServices() {
  return (
    <section
      id='services'
      className=' text-white py-20 px-6 md:px-16 lg:px-24 w-full flex flex-col items-center relative overflow-hidden'
    >
      <TopHeadings
        badge='Service Categories'
        heading='Everything You Need for Your Special Day'
      />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl z-10'>
        {CATEGORIES_DATA.map((service) => {
          const IconComponent = service.Icon;
          return (
            <div
              key={service.id}
              className='bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-border-gold shadow-sm flex flex-col items-center text-center group cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1.5 hover:bg-glass-gold-hover hover:border-border-gold hover:shadow-gold-glow-hover'
            >
              <div className='w-20 h-20 rounded-full bg-glass-gold text-border-gold flex items-center justify-center mb-6 border border-border-gold/30 shadow-gold-glow transition-all duration-300 group-hover:bg-amber-500/20 group-hover:border-border-gold-hover group-hover:scale-105'>
                <IconComponent className='w-9 h-9 transition-transform duration-300 group-hover:scale-110' />
              </div>
              <h3 className='font-montserrat font-bold text-2xl text-white mb-3 group-hover:text-border-gold-hover transition-colors duration-200'>
                {service.title}
              </h3>

              <p className='font-poppins font-light text-sm text-light-text leading-relaxed max-w-xs transition-colors duration-200 group-hover:text-stone-300'>
                {service.desc}
              </p>
            </div>
          );
        })}
      </div>
      <div className='absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 blur-[120px] pointer-events-none rounded-full' />
    </section>
  );
}

export default LandingServices;
