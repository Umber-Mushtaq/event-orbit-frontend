import { Link } from "react-router";
import { CalendarDays, Clock3, UserRound } from "lucide-react";
import { formatBlogDate } from "../../../hooks/admin-hook/blog/useAdminBlogs";
import { getBlogSummary } from "../blogListingUtils";

function BlogArchiveCard({ blog }) {
  const summary = getBlogSummary(blog);

  return (
    <article className='group flex h-full overflow-hidden rounded-[2rem] border border-border-gold/15 bg-[#141414]/90 shadow-[0_14px_40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-border-gold/30 hover:shadow-gold-glow-hover'>
      <Link to={`/blog/${blog.slug}`} className='flex h-full w-full flex-col'>
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
      </Link>
    </article>
  );
}

export default BlogArchiveCard;
