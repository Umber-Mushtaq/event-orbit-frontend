import { Mail } from "lucide-react";

function BlogNewsletterSection({ email, onEmailChange }) {
  return (
    <section
      aria-labelledby='blog-newsletter'
      className='overflow-hidden rounded-[2rem] border border-border-gold/15 bg-[linear-gradient(135deg,rgba(20,20,20,0.98),rgba(10,10,10,0.92))] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.4)] md:p-8'
    >
      <div className='grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.24em] text-border-gold-hover/80'>
            Newsletter
          </p>
          <h2 className='mt-3 text-2xl font-black text-white md:text-3xl'>
            Stay updated with the latest planning insights.
          </h2>
          <p className='mt-4 max-w-2xl text-sm leading-relaxed text-stone-400'>
            Get fresh ideas, venue trends, and vendor guidance delivered
            straight to your inbox.
          </p>
        </div>

        <form
          onSubmit={(event) => event.preventDefault()}
          className='flex flex-col gap-3 sm:flex-row'
        >
          <label className='relative flex-1'>
            <Mail className='absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500' />
            <input
              type='email'
              value={email}
              onChange={onEmailChange}
              placeholder='Enter your email'
              aria-label='Email address'
              className='w-full rounded-2xl border border-border-gold/15 bg-neutral-900/70 py-3 pl-11 pr-4 text-sm text-white placeholder:text-stone-500 outline-none transition focus:border-border-gold/40 focus:ring-2 focus:ring-amber-400/20'
            />
          </label>
          <button
            type='submit'
            className='inline-flex items-center justify-center gap-2 rounded-2xl border border-border-gold/20 bg-glass-gold px-5 py-3 text-sm font-semibold text-border-gold-hover shadow-gold-glow transition hover:border-border-gold/35 hover:bg-glass-gold-hover'
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

export default BlogNewsletterSection;
