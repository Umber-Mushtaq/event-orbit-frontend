import { CalendarDays, LayoutGrid, Plus, Table2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import BlogActionMenu from "../../../components/adminComponent/blog/BlogActionMenu";
import BlogCard from "../../../components/adminComponent/blog/BlogCard";
import BlogDeleteModal from "../../../components/adminComponent/blog/BlogDeleteModal";
import {
  formatBlogDate,
  stripBlogHtml,
  useAdminBlogs,
} from "../../../../../hooks/admin-hook/blog/useAdminBlogs";
import { getAdminErrorMessage } from "../../../../../services/adminApi";
import CustomLoading from "../../../../../shared_components/CustomLoading";

function BlogListingPage() {
  const navigate = useNavigate();
  const { blogs, loading, error, deleteBlog } = useAdminBlogs();
  const [viewMode, setViewMode] = useState("table");
  const [deletingBlog, setDeletingBlog] = useState(null);
  const [actionError, setActionError] = useState("");

  const handleEdit = (blog) => {
    navigate(`/admin/blog/${blog.slug || blog.id}/edit`);
  };

  const handleDelete = async () => {
    if (!deletingBlog) return;

    try {
      setActionError("");
      await deleteBlog(deletingBlog.id);
      setDeletingBlog(null);
    } catch (requestError) {
      setActionError(getAdminErrorMessage(requestError, "Failed to delete blog post."));
    }
  };

  return (
    <>
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
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
              <div className='inline-flex rounded-2xl border border-white/10 bg-white/5 p-1'>
                {[
                  { value: "table", label: "Table", Icon: Table2 },
                  { value: "grid", label: "Grid", Icon: LayoutGrid },
                ].map(({ value, label, Icon }) => {
                  const active = viewMode === value;

                  return (
                    <button
                      key={value}
                      type='button'
                      onClick={() => setViewMode(value)}
                      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                        active
                          ? "bg-glass-gold text-border-gold-hover shadow-gold-glow"
                          : "text-stone-300 hover:text-border-gold-hover"
                      }`}
                      aria-pressed={active}
                    >
                      <Icon className='h-4 w-4' />
                      {label}
                    </button>
                  );
                })}
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
        </div>

        {actionError ? (
          <div className='rounded-[2rem] border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200 shadow-[0_14px_40px_rgba(0,0,0,0.35)]'>
            {actionError}
          </div>
        ) : null}

        {error ? (
          <div className='rounded-[2rem] border border-red-500/20 bg-red-500/10 p-8 text-center text-red-200 shadow-[0_14px_40px_rgba(0,0,0,0.35)]'>
            {error}
          </div>
        ) : loading ? (
          <CustomLoading msg='Loading blog posts...' />
        ) : blogs.length ? (
          <>
            {viewMode === "grid" ? (
              <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-3'>
                {blogs.map((blog) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    onEdit={handleEdit}
                    onDelete={setDeletingBlog}
                  />
                ))}
              </div>
            ) : (
              <section className='rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(12,12,12,0.98),rgba(7,7,7,0.98))] p-4 shadow-[0_14px_40px_rgba(0,0,0,0.35)] md:p-5'>
              <div className='mb-4'>
                <p className='text-xs font-semibold uppercase tracking-[0.24em] text-border-gold-hover/80'>
                  Blog Table
                </p>
                <p className='mt-2 text-sm text-stone-400'>
                  Manage blog posts in table form.
                </p>
              </div>

              <div className='overflow-hidden rounded-2xl border border-white/8'>
                <div className='overflow-x-auto'>
                  <table className='min-w-full text-left text-sm'>
                    <thead className='bg-white/5 text-[11px] uppercase tracking-[0.22em] text-stone-400'>
                      <tr>
                        {["Blog", "Category", "Status", "Updated", "Summary", "Actions"].map(
                          (label) => (
                            <th key={label} className='px-4 py-4 font-semibold'>
                              {label}
                            </th>
                          ),
                        )}
                      </tr>
                    </thead>

                    <tbody className='divide-y divide-white/8'>
                      {blogs.map((blog) => {
                        const summary = stripBlogHtml(blog.content);
                        const blogPath = blog.slug || blog.id;

                        return (
                          <tr key={blog.id} className='bg-black/10 transition-colors hover:bg-white/3'>
                            <td className='min-w-72 px-4 py-4'>
                              <Link
                                to={`/admin/blog/${blogPath}`}
                                className='flex items-center gap-3'
                              >
                                <img
                                  src={blog.featureImage}
                                  alt={blog.title}
                                  className='h-14 w-20 rounded-2xl object-cover ring-1 ring-white/10'
                                />
                                <div className='min-w-0'>
                                  <p className='line-clamp-1 font-semibold text-white transition hover:text-border-gold-hover'>
                                    {blog.title}
                                  </p>
                                  <p className='mt-1 truncate text-xs text-stone-500'>
                                    {blog.slug || blog.id}
                                  </p>
                                </div>
                              </Link>
                            </td>
                            <td className='px-4 py-4 text-stone-300'>{blog.category}</td>
                            <td className='px-4 py-4'>
                              <span className='inline-flex rounded-full border border-border-gold/20 bg-glass-gold px-2.5 py-1 text-[11px] font-semibold text-border-gold-hover'>
                                {blog.status}
                              </span>
                            </td>
                            <td className='px-4 py-4 text-stone-300'>
                              <span className='inline-flex items-center gap-1.5'>
                                <CalendarDays className='h-3.5 w-3.5 text-stone-500' />
                                {formatBlogDate(blog.updatedAt)}
                              </span>
                            </td>
                            <td className='max-w-sm px-4 py-4'>
                              <p className='line-clamp-3 text-stone-400'>{summary}</p>
                            </td>
                            <td className='px-4 py-4'>
                              <BlogActionMenu
                                onEdit={() => handleEdit(blog)}
                                onDelete={() => setDeletingBlog(blog)}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              </section>
            )}
          </>
        ) : (
          <div className='rounded-[2rem] border border-white/8 bg-[#141414]/90 p-8 text-center text-stone-400 shadow-[0_14px_40px_rgba(0,0,0,0.35)]'>
            No blog posts yet. Use Add Blog to create the first post.
          </div>
        )}
      </section>

      <BlogDeleteModal
        open={Boolean(deletingBlog)}
        title={deletingBlog?.title || ""}
        onCancel={() => {
          setActionError("");
          setDeletingBlog(null);
        }}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default BlogListingPage;
