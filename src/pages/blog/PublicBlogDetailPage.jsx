import { ArrowLeft, CalendarDays, Clock3, UserRound } from "lucide-react";
import { Link, useParams } from "react-router";
import BlogQueryProvider from "./BlogQueryProvider";
import { usePublicBlog } from "../../hooks/blog/usePublicBlogs";
import { formatBlogDate, stripBlogHtml } from "../../hooks/admin-hook/blog/useAdminBlogs";
import { sanitizeHtml } from "../../utils/sanitizeHtml";

function PublicBlogDetailContent() {
  const { slug } = useParams();
  const { blog, isLoading, error, errorStatus, refetch } = usePublicBlog(slug);

  if (isLoading) {
    return (
      <section className='bg-neutral-950 px-5 py-12 text-white'>
        <div className='mx-auto max-w-4xl'>
          <div className='mb-8 h-10 w-40 rounded-full bg-neutral-800/80 animate-pulse' />
          <div className='aspect-[16/9] rounded-[2rem] bg-neutral-800/80 animate-pulse' />
          <div className='mt-8 space-y-4'>
            <div className='h-4 w-32 rounded-full bg-neutral-800/80 animate-pulse' />
            <div className='h-10 w-5/6 rounded-full bg-neutral-800/80 animate-pulse' />
            <div className='h-10 w-full rounded-full bg-neutral-800/80 animate-pulse' />
            <div className='h-10 w-4/5 rounded-full bg-neutral-800/80 animate-pulse' />
          </div>
        </div>
      </section>
    );
  }

  if (errorStatus === 404) {
    return (
      <section className='bg-neutral-950 px-5 py-12 text-white'>
        <div className='mx-auto max-w-4xl rounded-[2rem] border border-white/8 bg-[#141414]/90 p-8 text-center text-stone-400'>
          Blog post not found.
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className='bg-neutral-950 px-5 py-12 text-white'>
        <div className='mx-auto max-w-4xl rounded-[2rem] border border-red-500/20 bg-red-500/10 p-8 text-center text-red-100'>
          <p className='text-sm leading-relaxed'>{error}</p>
          <button
            type='button'
            onClick={refetch}
            className='mt-5 inline-flex items-center gap-2 rounded-full border border-red-300/30 bg-red-500/15 px-4 py-2 text-sm font-semibold text-red-50 transition hover:bg-red-500/25'
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (!blog) {
    return (
      <section className='bg-neutral-950 px-5 py-12 text-white'>
        <div className='mx-auto max-w-4xl rounded-[2rem] border border-white/8 bg-[#141414]/90 p-8 text-center text-stone-400'>
          Blog post not found.
        </div>
      </section>
    );
  }

  return (
    <section className='bg-neutral-950 px-5 py-12 text-white'>
      <div className='mx-auto flex max-w-4xl flex-col gap-8'>
        <Link
          to='/'
          className='inline-flex items-center gap-2 self-start rounded-full border border-border-gold/20 bg-glass-gold px-4 py-2 text-sm font-semibold text-border-gold-hover shadow-gold-glow transition hover:border-border-gold/35 hover:bg-glass-gold-hover'
        >
          <ArrowLeft className='h-4 w-4' />
          Back to Home
        </Link>

        <article className='overflow-hidden rounded-[2rem] border border-border-gold/15 bg-[#141414]/90 shadow-[0_14px_40px_rgba(0,0,0,0.35)]'>
          <div className='relative aspect-[16/9] overflow-hidden'>
            <img
              src={blog.featureImage}
              alt={blog.title}
              loading='lazy'
              decoding='async'
              className='h-full w-full object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent' />
            <div className='absolute left-5 top-5 rounded-full border border-border-gold/20 bg-glass-gold px-3 py-1 text-[11px] font-semibold text-border-gold-hover shadow-gold-glow'>
              {blog.category || "Blog"}
            </div>
          </div>

          <div className='space-y-6 p-6 md:p-8'>
            <div className='flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.2em] text-stone-500'>
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

            <div className='space-y-4'>
              <h1 className='text-3xl font-black leading-tight text-white md:text-5xl'>
                {blog.title}
              </h1>
              {blog.excerpt ? (
                <p className='max-w-3xl text-base leading-relaxed text-stone-400 md:text-lg'>
                  {blog.excerpt}
                </p>
              ) : null}
            </div>

            <div
              className='space-y-4 text-stone-300 [&_a]:text-amber-400 [&_a]:underline [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_p]:leading-relaxed [&_p]:text-stone-300 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_strong]:text-white'
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(blog.content || stripBlogHtml(blog.content)),
              }}
            />
          </div>
        </article>
      </div>
    </section>
  );
}

function PublicBlogDetailPage() {
  return (
    <BlogQueryProvider>
      <PublicBlogDetailContent />
    </BlogQueryProvider>
  );
}

export default PublicBlogDetailPage;
