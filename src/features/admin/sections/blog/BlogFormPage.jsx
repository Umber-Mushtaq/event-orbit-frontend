import { useEffect, useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import BlogEditorToolbar from "../../components/blog/BlogEditorToolbar";
import BlogFormFooter from "../../components/blog/BlogFormFooter";
import { useAdminBlogs, slugifyBlogTitle } from "../../hooks/blog/useAdminBlogs";

const emptyForm = {
  title: "",
  slug: "",
  category: "Planning",
  status: "Draft",
  excerpt: "",
  content: "",
  featureImage: "",
};

function BlogFormPage({ mode = "create" }) {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const { getBlogById, createBlog, updateBlog } = useAdminBlogs();
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [form, setForm] = useState(emptyForm);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (mode === "edit" && blogId) {
      const blog = getBlogById(blogId);
      if (blog) {
        setForm({
          title: blog.title,
          slug: blog.slug,
          category: blog.category,
          status: blog.status,
          excerpt: blog.excerpt,
          content: blog.content,
          featureImage: blog.featureImage,
        });
        if (editorRef.current) editorRef.current.innerHTML = blog.content;
      }
    }
    setLoaded(true);
  }, [blogId, getBlogById, mode]);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== form.content) {
      editorRef.current.innerHTML = form.content;
    }
  }, [form.content]);

  const handleFieldChange = (field) => (event) => {
    const { value } = event.target;
    setForm((current) => ({
      ...current,
      [field]: value,
      ...(field === "title" && !current.slug ? { slug: slugifyBlogTitle(value) } : null),
    }));
  };

  const handleEditorInput = () => {
    setForm((current) => ({
      ...current,
      content: editorRef.current?.innerHTML || "",
    }));
  };

  const runEditorCommand = (command, value) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(command, false, value);
    setForm((current) => ({
      ...current,
      content: editorRef.current?.innerHTML || current.content,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({ ...current, featureImage: String(reader.result || "") }));
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setForm(emptyForm);
    if (editorRef.current) editorRef.current.innerHTML = "";
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      title: form.title.trim(),
      slug: form.slug.trim() || slugifyBlogTitle(form.title),
      category: form.category.trim() || "Planning",
      status: form.status,
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      featureImage: form.featureImage,
    };

    if (mode === "edit" && blogId) {
      updateBlog(blogId, payload);
      navigate(`/admin/blog/${blogId}`);
      return;
    }

    const nextId = `post-${Date.now()}`;
    createBlog({ id: nextId, ...payload });
    navigate(`/admin/blog/${nextId}`);
  };

  if (mode === "edit" && loaded && blogId && !getBlogById(blogId)) {
    return (
      <section className='rounded-[2rem] border border-border-gold/15 bg-[#141414]/90 p-6 shadow-[0_14px_40px_rgba(0,0,0,0.35)]'>
        <p className='text-sm text-stone-300'>Blog post not found.</p>
      </section>
    );
  }

  return (
    <section className='rounded-[2rem] border border-border-gold/15 bg-[#141414]/90 p-5 shadow-[0_14px_40px_rgba(0,0,0,0.35)]'>
      <div className='mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.24em] text-border-gold-hover/80'>
            {mode === "edit" ? "Edit Blog" : "Add Blog"}
          </p>
          <h3 className='mt-2 text-xl font-black text-white'>
            {mode === "edit" ? "Update blog content" : "Create a new blog post"}
          </h3>
        </div>
        <div className='flex flex-wrap gap-2'>
          <button
            type='button'
            onClick={() => navigate("/admin/blog")}
            className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-stone-200 transition hover:border-border-gold/30 hover:text-white'
          >
            Back to Blogs
          </button>
        </div>
      </div>

      <form className='space-y-5' onSubmit={handleSubmit}>
        <div className='grid gap-4 md:grid-cols-2'>
          <label className='block'>
            <span className='mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400'>
              Title
            </span>
            <input
              value={form.title}
              onChange={handleFieldChange("title")}
              className='w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-stone-500 focus:border-border-gold/40'
              placeholder='Write a blog title'
            />
          </label>
          <label className='block'>
            <span className='mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400'>
              Slug
            </span>
            <div className='flex gap-2'>
              <input
                value={form.slug}
                onChange={handleFieldChange("slug")}
                className='w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-stone-500 focus:border-border-gold/40'
                placeholder='blog-slug'
              />
              <button
                type='button'
                onClick={() =>
                  setForm((current) => ({
                    ...current,
                    slug: slugifyBlogTitle(current.title),
                  }))
                }
                className='shrink-0 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold text-stone-200 transition hover:border-border-gold/30 hover:text-white'
              >
                Auto
              </button>
            </div>
          </label>
        </div>

        <div className='grid gap-4 md:grid-cols-3'>
          <label className='block'>
            <span className='mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400'>
              Category
            </span>
            <input
              value={form.category}
              onChange={handleFieldChange("category")}
              className='w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-stone-500 focus:border-border-gold/40'
              placeholder='Planning'
            />
          </label>
          <label className='block'>
            <span className='mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400'>
              Status
            </span>
            <select
              value={form.status}
              onChange={handleFieldChange("status")}
              className='w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-border-gold/40'
            >
              <option>Draft</option>
              <option>Published</option>
            </select>
          </label>
          <label className='block'>
            <span className='mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400'>
              Featured Image
            </span>
            <button
              type='button'
              onClick={() => fileInputRef.current?.click()}
              className='flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border-gold/25 bg-glass-gold px-4 py-3 text-sm font-semibold text-border-gold-hover transition hover:border-border-gold/40 hover:bg-glass-gold-hover'
            >
              <ImagePlus className='h-4 w-4' />
              Upload Image
            </button>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              className='hidden'
            />
          </label>
        </div>

        <label className='block'>
          <span className='mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400'>
            Excerpt
          </span>
          <textarea
            value={form.excerpt}
            onChange={handleFieldChange("excerpt")}
            rows='3'
            className='w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-stone-500 focus:border-border-gold/40'
            placeholder='Short summary for cards and previews'
          />
        </label>

        <div className='rounded-[1.75rem] border border-white/8 bg-black/20 p-4'>
          <BlogEditorToolbar onCommand={runEditorCommand} />
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={handleEditorInput}
            className='min-h-[240px] rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-4 text-sm leading-7 text-stone-200 outline-none [&_h2]:mt-4 [&_h2]:text-xl [&_h2]:font-black [&_blockquote]:mt-4 [&_blockquote]:border-l-2 [&_blockquote]:border-border-gold/40 [&_blockquote]:pl-4 [&_ul]:ml-5 [&_ol]:ml-5'
          />
        </div>

        <BlogFormFooter form={form} mode={mode} onReset={resetForm} />
      </form>
    </section>
  );
}

export default BlogFormPage;
