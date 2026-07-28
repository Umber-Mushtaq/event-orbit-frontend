import { Link } from "react-router";
import SEO from "../seo/SEO";

function NotFoundPage() {
  return (
    <main className='min-h-[70vh] bg-neutral-950 px-5 py-20 text-center text-white'>
      <SEO
        title='Page Not Found'
        description='The requested Event Orbit page could not be found.'
        robots='noindex,follow'
        canonical='/404'
      />
      <div className='mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/5 p-8'>
        <p className='text-xs font-bold uppercase tracking-widest text-amber-400'>
          404
        </p>
        <h1 className='mt-3 font-montserrat text-3xl font-black'>
          Page Not Found
        </h1>
        <p className='mt-3 text-sm leading-7 text-stone-400'>
          The page you are looking for does not exist or has moved.
        </p>
        <Link
          to='/'
          className='mt-6 inline-flex rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-neutral-950 transition hover:bg-amber-300'
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
