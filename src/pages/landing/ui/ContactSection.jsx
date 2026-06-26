import { ArrowRight } from "lucide-react";
import contactBG from "../../../assets/hero_bg.jpg";
import { Link } from "react-router";
function ContactSection() {
  return (
    <div className='flex items-center justify-center py-20'>
      <section
        className='relative w-full md:w-5xl h-[70vh] md:rounded-2xl overflow-hidden flex items-center justify-center text-center bg-cover bg-no-repeat bg-center'
        style={{
          backgroundImage: `url(${contactBG})`,
        }}
      >
        <div className='absolute inset-0 bg-black/60'></div>

        <div className='relative z-10 max-w-3xl px-6 flex flex-col items-center gap-6'>
          <h1 className='text-3xl md:text-4xl font-bold text-white leading-snug'>
            Begin with a single conversation.
          </h1>
          <p className='text-stone-300 text-sm md:text-base max-w-xl'>
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
