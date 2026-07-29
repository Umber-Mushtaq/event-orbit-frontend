import { CalendarDays, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import {
  formatBlogDate,
  stripBlogHtml,
} from "../../../../../hooks/admin-hook/blog/useAdminBlogs";
import BlogActionMenu from "./BlogActionMenu";


function BlogCard({ blog, onEdit, onDelete }) {
  const summary = blog.excerpt || stripBlogHtml(blog.content);
  const blogPath = blog.slug || blog.id;

  return (
    <article className='group relative overflow-hidden rounded-[2rem] border border-border-gold/15 bg-[#141414]/90 shadow-[0_14px_40px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-border-gold/30'>
      <Link to={`/admin/blog/${blogPath}`} className='block'>
        <div className='relative aspect-[16/10] overflow-hidden'>
          <img
            src={blog.featureImage}
            alt={blog.title}
            className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent' />
          <div className='absolute left-4 top-4 rounded-full border border-border-gold/20 bg-glass-gold px-3 py-1 text-[11px] font-semibold text-border-gold-hover'>
            {blog.status}
          </div>
        </div>

        <div className='p-5'>
          <div className='flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-stone-500'>
            <span>{blog.category}</span>
            <span className='h-1 w-1 rounded-full bg-stone-600' />
            <span className='inline-flex items-center gap-1'>
              <CalendarDays className='h-3.5 w-3.5' />
              {formatBlogDate(blog.updatedAt)}
            </span>
          </div>

          <h3 className='mt-3 text-xl font-black text-white transition-colors duration-300 group-hover:text-border-gold-hover'>
            {blog.title}
          </h3>
          <p className='mt-3 line-clamp-3 text-sm leading-relaxed text-stone-400'>
            {summary}
          </p>

          <div className='mt-5 inline-flex items-center gap-2 text-sm font-semibold text-border-gold-hover'>
            Open blog
            <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1' />
          </div>
        </div>
      </Link>

      <div className='absolute right-4 top-4 z-10'>
        <BlogActionMenu onEdit={() => onEdit?.(blog)} onDelete={() => onDelete?.(blog)} />
      </div>
    </article>
  );
}

export default BlogCard;
