import { Link } from "react-router";
import { Sparkles } from "lucide-react";
import HeroBg from "../../../assets/hero_bg.jpg";

function BlogHeroSection() {
  return (
    <section
      className='relative overflow-hidden bg-cover bg-center bg-no-repeat px-5 py-20 text-white'
      style={{ backgroundImage: `url(${HeroBg})` }}
    >
      <div className='absolute inset-0 bg-gradient-to-br from-black/80 via-black/65 to-neutral-950/95' />
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_28%)]' />
      <div className='relative mx-auto flex w-full max-w-7xl flex-col gap-6'>
        <nav aria-label='Breadcrumb' className='text-sm text-stone-300/90'>
          <ol className='flex flex-wrap items-center gap-2'>
            <li>
              <Link to='/' className='transition hover:text-amber-400'>
                Home
              </Link>
            </li>
            <li aria-hidden='true' className='text-stone-500'>
              /
            </li>
            <li aria-current='page' className='text-amber-400'>
              Blog
            </li>
          </ol>
        </nav>

        <div className='max-w-3xl'>
          <p className='mb-4 inline-flex items-center gap-2 rounded-full border border-border-gold/20 bg-glass-gold px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-border-gold-hover shadow-gold-glow'>
            <Sparkles className='h-3.5 w-3.5' />
            Our Blog
          </p>
          <h1 className='font-montserrat text-4xl font-black leading-tight text-white md:text-6xl'>
            Fresh ideas for planning unforgettable celebrations.
          </h1>
          <p className='mt-5 max-w-2xl text-sm leading-relaxed text-stone-300 md:text-lg'>
            Explore our latest articles on venues, styling, vendor selection,
            timelines, and practical planning advice for every kind of event.
          </p>
        </div>
      </div>
    </section>
  );
}

export default BlogHeroSection;
