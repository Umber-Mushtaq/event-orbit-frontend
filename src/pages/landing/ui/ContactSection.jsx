import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import HeroBg from "../../../assets/hero_bg2.jpg";
function ContactSection() {
  return (
    <div className='flex items-center justify-center py-20'>
      <section
        className='relative flex h-[70vh] w-full items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat text-center md:w-7xl md:rounded-2xl border border-amber-200 shadow-[0_18px_50px_rgba(15,23,42,0.12)] dark:border-primary'
        style={{
          backgroundImage: `url(${HeroBg})`,
        }}
      >
        <div className='absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.88),rgba(255,255,255,0.72)),linear-gradient(180deg,rgba(251,191,36,0.12),rgba(15,23,42,0.1))] dark:bg-black/60'></div>

        <div className='relative z-10 max-w-3xl px-6 flex flex-col items-center gap-6'>
          <h1 className='text-3xl md:text-4xl font-bold text-slate-950 dark:text-white leading-snug'>
            Where perfect events begin.
          </h1>
          <p className='text-slate-600 dark:text-stone-300 text-sm md:text-base max-w-xl'>
            Tell us about your event. Our concierge will assemble a shortlist of
            three vendors within 48 hours.
          </p>

          <Link
            to='/contact'
            className='group bg-amber-400 text-neutral-900 border border-border-gold shadow-gold-glow font-semibold px-6 py-3 rounded-lg flex items-center gap-2 duration-200 hover:cursor-pointer'
          >
            Start the conversation
            <ArrowRight className='w-4 h-4 transition-transform group-hover:translate-x-1' />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ContactSection;
