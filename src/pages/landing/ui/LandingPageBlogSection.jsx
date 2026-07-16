import { Link } from "react-router";
import { CalendarDays, Clock3, RefreshCcw, UserRound } from "lucide-react";
import { Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import CustomHeader from "../../../shared_components/CustomHeader";
import BlogQueryProvider from "../../blog/BlogQueryProvider";
import { useLatestBlogs } from "../../../hooks/blog/usePublicBlogs";
import {
  formatBlogDate,
  stripBlogHtml,
} from "../../../hooks/admin-hook/blog/useAdminBlogs";

const clampExcerpt = (value) => stripBlogHtml(value).slice(0, 180).trim();

function BlogSectionCard({ blog }) {
  const summary = blog.excerpt || clampExcerpt(blog.content);

  return (
    <Link
      to={`/blog/${blog.slug}`}
      className='group flex h-full overflow-hidden rounded-[2rem] border border-border-gold/15 bg-[#141414]/90 shadow-[0_14px_40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-border-gold/30 hover:shadow-gold-glow-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950'
      aria-label={`Open blog post: ${blog.title}`}
    >
      <article className='flex h-full flex-col'>
        <div className='relative aspect-[16/10] overflow-hidden'>
          <img
            src={blog.featureImage}
            alt={blog.title}
            loading='lazy'
            decoding='async'
            className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent' />
          <div className='absolute left-4 top-4 rounded-full border border-border-gold/20 bg-glass-gold px-3 py-1 text-[11px] font-semibold text-border-gold-hover shadow-gold-glow'>
            {blog.category || "Blog"}
          </div>
        </div>

        <div className='flex flex-1 flex-col p-5'>
          <div className='flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-stone-500'>
            <span className='inline-flex items-center gap-1.5'>
              <CalendarDays className='h-3.5 w-3.5' />
              Published {formatBlogDate(blog.publishedAt)}
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

          <h3 className='mt-3 line-clamp-2 text-xl font-black leading-snug text-white transition-colors duration-300 group-hover:text-border-gold-hover'>
            {blog.title}
          </h3>

          <p className='mt-3 line-clamp-3 text-sm leading-relaxed text-stone-400'>
            {summary}
          </p>

          <div className='mt-auto pt-5'>
            <span className='inline-flex items-center text-sm font-semibold text-border-gold-hover transition-transform duration-300 group-hover:translate-x-1'>
              Read More
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function BlogSectionSkeleton() {
  return (
    <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className='overflow-hidden rounded-[2rem] border border-white/8 bg-[#141414]/90 shadow-[0_14px_40px_rgba(0,0,0,0.35)]'
        >
          <div className='aspect-[16/10] animate-pulse bg-neutral-800/80' />
          <div className='flex flex-col gap-4 p-5'>
            <div className='h-3 w-40 rounded-full bg-neutral-800 animate-pulse' />
            <div className='h-6 w-full rounded-full bg-neutral-800 animate-pulse' />
            <div className='h-6 w-5/6 rounded-full bg-neutral-800 animate-pulse' />
            <div className='space-y-2'>
              <div className='h-3 w-full rounded-full bg-neutral-800 animate-pulse' />
              <div className='h-3 w-11/12 rounded-full bg-neutral-800 animate-pulse' />
              <div className='h-3 w-4/5 rounded-full bg-neutral-800 animate-pulse' />
            </div>
            <div className='h-10 w-32 rounded-full bg-neutral-800 animate-pulse' />
          </div>
        </div>
      ))}
    </div>
  );
}

function BlogSectionEmpty() {
  return (
    <div className='rounded-[2rem] border border-white/8 bg-[#141414]/90 p-8 text-center text-stone-400 shadow-[0_14px_40px_rgba(0,0,0,0.35)]'>
      We're still curating fresh articles. Check back soon for the latest
      planning advice and event inspiration.
    </div>
  );
}

function BlogSectionError({ message, onRetry }) {
  return (
    <div className='rounded-[2rem] border border-red-500/20 bg-red-500/10 p-8 text-center text-red-100 shadow-[0_14px_40px_rgba(0,0,0,0.35)]'>
      <p className='text-sm leading-relaxed'>{message}</p>
      <button
        type='button'
        onClick={onRetry}
        className='mt-5 inline-flex items-center gap-2 rounded-full border border-red-300/30 bg-red-500/15 px-4 py-2 text-sm font-semibold text-red-50 transition hover:bg-red-500/25'
      >
        <RefreshCcw className='h-4 w-4' />
        Try Again
      </button>
    </div>
  );
}

function BlogSectionContent() {
  const { blogs, isLoading, error, refetch } = useLatestBlogs(6);
  const canLoop = blogs.length > 1;

  return (
    <section
      id='blog-section'
      className='w-full overflow-hidden bg-neutral-950 px-5 py-20 text-white'
    >
      <div className='mx-auto flex w-full max-w-7xl flex-col gap-10'>
        <div className='flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
          <div className='max-w-3xl'>
            <CustomHeader
              badge='From the Blog'
              title='Fresh ideas for every celebration.'
            />
            <p className='mt-5 max-w-2xl text-sm leading-relaxed text-stone-400 md:text-base'>
              Browse the latest planning advice, inspiration, and practical
              guidance from our editorial team.
            </p>
          </div>
        </div>

        {isLoading ? (
          <BlogSectionSkeleton />
        ) : error ? (
          <BlogSectionError message={error} onRetry={refetch} />
        ) : blogs.length === 0 ? (
          <BlogSectionEmpty />
        ) : (
          <div className='relative'>
            <Swiper
              modules={[Autoplay, Keyboard, Pagination,Navigation]}
              loop={canLoop}
              grabCursor
              watchOverflow
              slidesPerView={1}
              spaceBetween={24}
              Navigation={true}
              keyboard={{ enabled: true, onlyInViewport: true }}
              autoplay={
                canLoop
                  ? {
                      delay: 300,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
                  : false
              }
              pagination={{ clickable: true, el: ".blog-pagination" }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                1280: {
                  slidesPerView: 3,
                },
              }}
              className='blog-swiper'
            >
              {blogs.map((blog) => (
                <SwiperSlide key={blog.id} className='h-auto'>
                  <BlogSectionCard blog={blog} />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className='mt-8 flex items-center justify-center'>
              <div className='blog-pagination flex items-center justify-center gap-2 [&_.swiper-pagination-bullet]:!h-2 [&_.swiper-pagination-bullet]:!w-2 [&_.swiper-pagination-bullet]:!bg-stone-600 [&_.swiper-pagination-bullet]:!opacity-100 [&_.swiper-pagination-bullet-active]:!bg-amber-400' />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function LandingPageBlogSection() {
  return (
    <BlogQueryProvider>
      <BlogSectionContent />
    </BlogQueryProvider>
  );
}

export default LandingPageBlogSection;
