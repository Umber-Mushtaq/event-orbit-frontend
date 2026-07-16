import { Link } from "react-router";
import { ArrowRight, CalendarDays, Clock3, RefreshCcw, UserRound } from "lucide-react";
import BlogSectionHeading from "../components/BlogSectionHeading";
import { formatBlogDate } from "../../../hooks/admin-hook/blog/useAdminBlogs";
import { getBlogSummary } from "../blogListingUtils";

function FeaturedBlogCard({ blog }) {
  const summary = getBlogSummary(blog, 220);

  return (
    <article className='overflow-hidden rounded-[2rem] border border-border-gold/15 bg-[#141414]/90 shadow-[0_18px_60px_rgba(0,0,0,0.42)]'>
      <div className='grid lg:grid-cols-2'>
        <div className='relative min-h-[280px] overflow-hidden lg:min-h-[420px]'>
          <img
            src={blog.featureImage}
            alt={blog.title}
            loading='lazy'
            decoding='async'
            className='h-full w-full object-cover transition-transform duration-500 hover:scale-105'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent lg:bg-gradient-to-r lg:from-black/55 lg:via-black/15 lg:to-transparent' />
          <div className='absolute left-5 top-5 rounded-full border border-border-gold/20 bg-glass-gold px-3 py-1 text-[11px] font-semibold text-border-gold-hover shadow-gold-glow'>
            Featured
          </div>
        </div>

        <div className='flex flex-col justify-center p-6 md:p-8 lg:p-10'>
          <div className='flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-stone-500'>
            <span className='inline-flex items-center gap-1.5'>
              <CalendarDays className='h-3.5 w-3.5' />
              {formatBlogDate(blog.publishedAt)}
            </span>
            {blog.authorName ? (
              <span className='inline-flex items-center gap-1.5'>
                <UserRound className='h-3.5 w-3.5' />
                {blog.authorName}
              </span>
            ) : null}
            {blog.readTime ? (
              <span className='inline-flex items-center gap-1.5'>
                <Clock3 className='h-3.5 w-3.5' />
                {blog.readTime}
              </span>
            ) : null}
          </div>

          <h2 className='mt-4 text-3xl font-black leading-tight text-white md:text-5xl'>
            {blog.title}
          </h2>
          <p className='mt-5 max-w-2xl text-sm leading-relaxed text-stone-400 md:text-base'>
            {summary}
          </p>

          <div className='mt-8'>
            <Link
              to={`/blog/${blog.slug}`}
              className='inline-flex items-center gap-2 rounded-full border border-border-gold/20 bg-glass-gold px-5 py-3 text-sm font-semibold text-border-gold-hover shadow-gold-glow transition hover:-translate-y-0.5 hover:border-border-gold/35 hover:bg-glass-gold-hover'
            >
              Read More
              <ArrowRight className='h-4 w-4' />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function BlogFeaturedSection({ blog, isLoading, error, onRetry }) {
  return (
    <section aria-labelledby='blog-featured' className='space-y-6'>
      <BlogSectionHeading
        description='Featured Article'
        title='The latest insight from our editors.'
      />

      {isLoading ? (
        <div className='overflow-hidden rounded-[2rem] border border-white/8 bg-[#141414]/90'>
          <div className='grid lg:grid-cols-2'>
            <div className='min-h-[320px] animate-pulse bg-neutral-800/80 lg:min-h-[420px]' />
            <div className='flex flex-col gap-4 p-6 md:p-8 lg:p-10'>
              <div className='h-3 w-32 rounded-full bg-neutral-800 animate-pulse' />
              <div className='h-10 w-5/6 rounded-full bg-neutral-800 animate-pulse' />
              <div className='h-10 w-full rounded-full bg-neutral-800 animate-pulse' />
              <div className='h-10 w-4/5 rounded-full bg-neutral-800 animate-pulse' />
              <div className='h-24 w-full rounded-2xl bg-neutral-800 animate-pulse' />
              <div className='h-11 w-36 rounded-full bg-neutral-800 animate-pulse' />
            </div>
          </div>
        </div>
      ) : error ? (
        <div className='rounded-[2rem] border border-red-500/20 bg-red-500/10 p-8 text-center text-red-100'>
          <p className='text-sm leading-relaxed'>
            {error || "Failed to load blog posts."}
          </p>
          <button
            type='button'
            onClick={onRetry}
            className='mt-5 inline-flex items-center gap-2 rounded-full border border-red-300/30 bg-red-500/15 px-4 py-2 text-sm font-semibold text-red-50 transition hover:bg-red-500/25'
          >
            <RefreshCcw className='h-4 w-4' />
            Retry
          </button>
        </div>
      ) : blog ? (
        <FeaturedBlogCard blog={blog} />
      ) : (
        <div className='rounded-[2rem] border border-white/8 bg-[#141414]/90 p-8 text-center text-stone-400'>
          No featured post available.
        </div>
      )}
    </section>
  );
}

export default BlogFeaturedSection;
