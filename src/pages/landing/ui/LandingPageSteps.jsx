import CustomHeader from "../../../shared_components/CustomHeader";
import { Search, Scale, ShieldCheck } from "lucide-react";

function LandingSteps() {
  const STEPS_DATA = [
    {
      id: 1,
      stepNumber: "1",
      title: "Browse Categories",
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
    <section className='relative flex w-full flex-col items-center overflow-hidden bg-white px-5 py-20 dark:bg-neutral-950'>
      <div className='w-full max-w-7xl mx-auto'>
        <CustomHeader
          badge='How It Works'
          title='Book Your Wedding in 3 simple steps.'
        />
      </div>

      <div className=' flex flex-col lg:flex-row gap-8 lg:gap-6 items-center justify-between w-full max-w-7xl mx-auto z-10 '>
        {STEPS_DATA.map((step, index) => {
          const IconComponent = step.Icon;
          return (
            <div
              key={step.id}
              className=' flex flex-col lg:flex-row mt-10 items-center w-full lg:w-auto flex-grow'
            >
              <div className='group flex min-h-[320px] w-full flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center shadow-[0_14px_35px_rgba(15,23,42,0.1)] backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-amber-300 hover:shadow-[0_20px_45px_rgba(15,23,42,0.16)] lg:max-w-xs xl:max-w-sm dark:border-border-gold dark:bg-neutral-900/70 dark:shadow-lg dark:hover:border-border-gold/50 dark:hover:shadow-gold-glow-hover'>
                <div className='w-20 h-20 rounded-full bg-glass-gold text-border-gold flex items-center justify-center mb-6 border border-border-gold/30 shadow-gold-glow transition-all duration-300 group-hover:bg-amber-500/20 group-hover:border-border-gold-hover group-hover:scale-105'>
                  <IconComponent className='w-9 h-9 transition-transform duration-300 group-hover:rotate-6' />
                </div>

                <h3 className='font-montserrat mb-3 text-xl font-bold text-slate-950 transition-colors duration-200 group-hover:text-border-gold-hover dark:text-white'>
                  {step.stepNumber}. {step.title}
                </h3>

                <p className='font-poppins max-w-xs text-sm font-light leading-relaxed text-slate-600 dark:text-light-text'>
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
