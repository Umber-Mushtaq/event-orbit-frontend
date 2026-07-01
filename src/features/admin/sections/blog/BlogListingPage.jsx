import { Plus } from "lucide-react";
import { Link } from "react-router";
import BlogCard from "../../components/blog/BlogCard";
import { useAdminBlogs } from "../../hooks/blog/useAdminBlogs";

function BlogListingPage() {
  const { blogs, loading, error } = useAdminBlogs();

  return (
    <section className='space-y-6'>
      <div className='rounded-[2rem] border border-border-gold/15 bg-[linear-gradient(135deg,rgba(20,20,20,0.98),rgba(10,10,10,0.92))] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.4)]'>
        <div className='flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.24em] text-border-gold-hover/80'>
              Blog Library
            </p>
            <h2 className='mt-3 text-2xl font-black text-white md:text-3xl'>
              Browse all blog posts
            </h2>
            <p className='mt-2 max-w-3xl text-sm leading-relaxed text-stone-400'>
              Open any card to review details, or create a new post from the
              add page.
            </p>
          </div>
          <Link
            to='/admin/blog/add'
            className='inline-flex items-center justify-center gap-2 rounded-2xl border border-border-gold/25 bg-glass-gold px-5 py-3 text-sm font-semibold text-border-gold-hover shadow-gold-glow transition hover:border-border-gold/40 hover:bg-glass-gold-hover'
          >
            <Plus className='h-4 w-4' />
            Add Blog
          </Link>
        </div>
      </div>

      {error ? (
        <div className='rounded-[2rem] border border-red-500/20 bg-red-500/10 p-8 text-center text-red-200 shadow-[0_14px_40px_rgba(0,0,0,0.35)]'>
          {error}
        </div>
      ) : loading ? (
        <div className='rounded-[2rem] border border-white/8 bg-[#141414]/90 p-8 text-center text-stone-400 shadow-[0_14px_40px_rgba(0,0,0,0.35)]'>
          Loading blog posts...
        </div>
      ) : blogs.length ? (
        <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-3'>
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className='rounded-[2rem] border border-white/8 bg-[#141414]/90 p-8 text-center text-stone-400 shadow-[0_14px_40px_rgba(0,0,0,0.35)]'>
          No blog posts yet. Use Add Blog to create the first post.
        </div>
      )}
    </section>
  );
}

export default BlogListingPage;
