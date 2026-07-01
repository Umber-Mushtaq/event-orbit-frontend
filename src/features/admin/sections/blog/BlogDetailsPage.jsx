import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import BlogActionMenu from "../../components/blog/BlogActionMenu";
import BlogDeleteModal from "../../components/blog/BlogDeleteModal";
import { formatBlogDate, useAdminBlogs } from "../../hooks/blog/useAdminBlogs";
import { getAdminErrorMessage } from "../../api/adminApi";

function BlogDetailsPage() {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const { getBlogById, deleteBlog, loading } = useAdminBlogs();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setBlog(blogId ? getBlogById(blogId) || null : null);
  }, [blogId, getBlogById]);

  if (loading) {
    return (
      <section className='rounded-[2rem] border border-border-gold/15 bg-[#141414]/90 p-6 shadow-[0_14px_40px_rgba(0,0,0,0.35)]'>
        <p className='text-sm text-stone-300'>Loading blog post...</p>
      </section>
    );
  }

  if (!blog) {
    return (
      <section className='rounded-[2rem] border border-border-gold/15 bg-[#141414]/90 p-6 shadow-[0_14px_40px_rgba(0,0,0,0.35)]'>
        <p className='text-sm text-stone-300'>Blog post not found.</p>
        <button
          type='button'
          onClick={() => navigate("/admin/blog")}
          className='mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-stone-200 transition hover:border-border-gold/30 hover:text-white'
        >
          Back to Blogs
        </button>
      </section>
    );
  }

  const handleDelete = async () => {
    try {
      await deleteBlog(blog.id);
      navigate("/admin/blog");
    } catch (requestError) {
      setError(getAdminErrorMessage(requestError, "Failed to delete blog post."));
    }
  };

  return (
    <>
      <section className='overflow-hidden rounded-[2rem] border border-border-gold/15 bg-[#141414]/90 shadow-[0_14px_40px_rgba(0,0,0,0.35)]'>
        {error ? (
          <div className='px-6 pt-6 md:px-8'>
            <div className='rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200'>
              {error}
            </div>
          </div>
        ) : null}
        <div className='relative'>
          <img src={blog.featureImage} alt={blog.title} className='h-80 w-full object-cover' />
          <div className='absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent' />

          {/* Blog actions stay in the top-right of the details hero. */}
          <div className='absolute right-5 top-5'>
            <BlogActionMenu
              onEdit={() => navigate(`/admin/blog/${blog.id}/edit`)}
              onDelete={() => setConfirmDelete(true)}
            />
          </div>

          <div className='absolute bottom-0 left-0 right-0 p-6 md:p-8'>
            <div className='flex flex-wrap items-center gap-2'>
              <span className='rounded-full border border-border-gold/20 bg-glass-gold px-3 py-1 text-[11px] font-semibold text-border-gold-hover'>
                {blog.status}
              </span>
              <span className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-stone-200'>
                {blog.category}
              </span>
              <span className='text-[11px] uppercase tracking-[0.2em] text-stone-400'>
                Updated {formatBlogDate(blog.updatedAt)}
              </span>
            </div>
            <h2 className='mt-4 max-w-4xl text-3xl font-black text-white md:text-4xl'>
              {blog.title}
            </h2>
          </div>
        </div>

        <div className='grid gap-8 p-6 md:p-8'>
          <div className='min-w-0'>
            <p className='text-sm leading-relaxed text-stone-300'>{blog.excerpt}</p>
            <div
              className='prose prose-invert mt-6 max-w-none text-sm leading-7 text-stone-200 prose-headings:text-white prose-strong:text-white'
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>

        <div className='px-6 pb-6 md:px-8 md:pb-8'>
          <section className='rounded-3xl border border-white/8 bg-black/20 p-5'>
            <p className='text-xs font-semibold uppercase tracking-[0.24em] text-border-gold-hover/80'>
              Blog Summary
            </p>
            <div className='mt-4 space-y-3 text-sm text-stone-300'>
              <div className='flex items-center justify-between gap-3'>
                <span>Slug</span>
                <span className='truncate text-white'>{blog.slug}</span>
              </div>
              <div className='flex items-center justify-between gap-3'>
                <span>Category</span>
                <span className='text-white'>{blog.category}</span>
              </div>
              <div className='flex items-center justify-between gap-3'>
                <span>Status</span>
                <span className='text-white'>{blog.status}</span>
              </div>
            </div>
          </section>
        </div>
      </section>

      <BlogDeleteModal
        open={confirmDelete}
        title={blog.title}
        onCancel={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default BlogDetailsPage;
