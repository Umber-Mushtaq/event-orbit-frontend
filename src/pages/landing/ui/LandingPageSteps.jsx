import CustomHeader from "../../../shared_components/CustomHeader";
import { Search, Scale, ShieldCheck } from "lucide-react";

function LandingSteps() {
  const STEPS_DATA = [
    {
      id: 1,
      stepNumber: "1",
      title: "Browse Services",
      desc: "Explore top-rated venues, catering, photography, and decor options tailored to your vision.",
      Icon: Search,
    },
    {
      id: 2,
      stepNumber: "2",
      title: "Compare Vendors",
      desc: "Review portfolio assets, pricing matrices, and real couple feedback to select the perfect match.",
      Icon: Scale,
    },
    {
      id: 3,
      stepNumber: "3",
      title: "Book with Confidence",
      desc: "Secure your wedding date through our integrated platform with end-to-end payment security.",
      Icon: ShieldCheck,
    },
  ];
  return (
    <section
      id='how-it-works'
      className=' py-20 px-6 md:px-16 lg:px-24 w-full flex flex-col items-center relative overflow-hidden bg-neutral-950'
    >
      <CustomHeader
        badge='How It Works'
        title='Book Your Wedding in 3 simple steps.'
      />

      <div className=' flex flex-col lg:flex-row gap-8 lg:gap-6 items-center justify-between w-full max-w-6xl z-10 '>
        {STEPS_DATA.map((step, index) => {
          const IconComponent = step.Icon;
          return (
            <div
              key={step.id}
              className=' flex flex-col lg:flex-row mt-10 items-center w-full lg:w-auto flex-grow'
            >
              <div className='bg-neutral-900/70 backdrop-blur-md rounded-2xl p-8 border  border-border-gold shadow-lg flex flex-col items-center text-center group w-full lg:max-w-xs xl:max-w-sm min-h-[320px] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-border-gold/50 hover:shadow-gold-glow-hover'>
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
