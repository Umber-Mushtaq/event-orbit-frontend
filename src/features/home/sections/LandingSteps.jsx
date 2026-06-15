import TopHeadings from "../components/TopHeadings";
import { STEPS_DATA } from "../dummyData";

function LandingSteps() {
  return (
    <section
      id='how-it-works'
      className=' bg-neutral-950 text-white py-20 px-6 md:px-16 lg:px-24 w-full flex flex-col items-center relative overflow-hidden'
    >
      <TopHeadings
        badge='How It Works Section'
        heading='Book Your Wedding in 3 Simple Steps'
      />
      <div className='flex flex-col lg:flex-row gap-8 lg:gap-6 items-center justify-between w-full max-w-6xl z-10'>
        {STEPS_DATA.map((step, index) => {
          const IconComponent = step.Icon;
          return (
            <div
              key={step.id}
              className='flex flex-col lg:flex-row items-center w-full lg:w-auto flex-grow'
            >
              <div className='bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-lg flex flex-col items-center text-center group w-full lg:max-w-xs xl:max-w-sm min-h-[320px] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-border-gold/50 hover:shadow-gold-glow-hover'>
                <div className='w-20 h-20 rounded-full bg-glass-gold text-border-gold flex items-center justify-center mb-6 border border-border-gold/30 shadow-gold-glow transition-all duration-300 group-hover:bg-amber-500/20 group-hover:border-border-gold-hover group-hover:scale-105'>
                  <IconComponent className='w-9 h-9 transition-transform duration-300 group-hover:rotate-6' />
                </div>

                <h3 className='font-montserrat font-bold text-xl text-white mb-3 group-hover:text-border-gold-hover transition-colors duration-200'>
                  {step.stepNumber}. {step.title}
                </h3>

                <p className='font-poppins font-light text-sm text-light-text leading-relaxed max-w-xs'>
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default LandingSteps;
