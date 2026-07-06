import { useEffect, useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import BlogEditorToolbar from "../../../components/adminComponent/blog/BlogEditorToolbar";
import BlogFormFooter from "../../../components/adminComponent/blog/BlogFormFooter";
import {
  useAdminBlogs,
  slugifyBlogTitle,
} from "../../../hooks/admin-hook/blog/useAdminBlogs";
import { getAdminErrorMessage } from "../../../api/adminApi";

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
  const { getBlogById, createBlog, updateBlog, loading } = useAdminBlogs();
  const editorRef = useRef(null);
  const savedSelectionRef = useRef(null);
  const fileInputRef = useRef(null);
  const [form, setForm] = useState(emptyForm);
  const [loaded, setLoaded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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

  const saveEditorSelection = () => {
    if (typeof window === "undefined") return;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    if (!editorRef.current?.contains(range.commonAncestorContainer)) return;

    savedSelectionRef.current = range;
  };

  const restoreEditorSelection = () => {
    if (typeof window === "undefined") return false;
    const selection = window.getSelection();
    const range = savedSelectionRef.current;

    if (!selection || !range || !editorRef.current) return false;

    selection.removeAllRanges();
    selection.addRange(range);
    editorRef.current.focus();
    return true;
  };

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const insertCodeBlock = () => {
    if (!editorRef.current) return;

    restoreEditorSelection();

    const selection = window.getSelection();
    const selectedText = selection && selection.rangeCount > 0 ? selection.toString() : "";

    const codeText =
      selectedText ||
      `// Script example\nfunction initBlogSection() {\n  console.log("Write your script here");\n}\n\ninitBlogSection();`;

    document.execCommand(
      "insertHTML",
      false,
      `<pre><code>${escapeHtml(codeText)}</code></pre>`,
    );

    setForm((current) => ({
      ...current,
      content: editorRef.current?.innerHTML || current.content,
    }));
  };

  const runEditorCommand = (command, value) => {
    if (!editorRef.current) return;

    restoreEditorSelection();
    if (command === "codeBlock") {
      insertCodeBlock();
      return;
    }
    const nextValue =
      command === "formatBlock" && typeof value === "string" ? value.toUpperCase() : value;
    document.execCommand(command, false, nextValue);
    saveEditorSelection();
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

    const submit = async () => {
      setSubmitting(true);
      setError("");

      try {
        if (mode === "edit" && blogId) {
          const updated = await updateBlog(blogId, payload);
          navigate(`/admin/blog/${updated.id || blogId}`);
          return;
        }

        const created = await createBlog(payload);
        navigate(`/admin/blog/${created.id}`);
      } catch (requestError) {
        setError(getAdminErrorMessage(requestError, "Failed to save blog post."));
      } finally {
        setSubmitting(false);
      }
    };

    submit();
  };

  if (mode === "edit" && !loading && loaded && blogId && !getBlogById(blogId)) {
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

      {error ? (
        <div className='mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200'>
          {error}
        </div>
      ) : null}

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
            onFocus={saveEditorSelection}
            onKeyUp={saveEditorSelection}
            onMouseUp={saveEditorSelection}
            className='min-h-[240px] rounded-2xl border border-white/10 bg-[#0f0f0f] px-4 py-4 text-sm leading-7 text-stone-200 outline-none [&_h1]:mt-5 [&_h1]:text-3xl [&_h1]:font-black [&_h1]:leading-tight [&_h2]:mt-4 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:leading-tight [&_h3]:mt-4 [&_h3]:text-xl [&_h3]:font-bold [&_h4]:mt-3 [&_h4]:text-lg [&_h4]:font-bold [&_h5]:mt-3 [&_h5]:text-base [&_h5]:font-bold [&_h6]:mt-3 [&_h6]:text-sm [&_h6]:font-bold [&_blockquote]:mt-4 [&_blockquote]:border-l-2 [&_blockquote]:border-border-gold/40 [&_blockquote]:pl-4 [&_pre]:mt-4 [&_pre]:overflow-x-auto [&_pre]:rounded-2xl [&_pre]:border [&_pre]:border-white/10 [&_pre]:bg-black/40 [&_pre]:px-4 [&_pre]:py-3 [&_pre]:font-mono [&_pre]:text-[13px] [&_pre_code]:whitespace-pre-wrap [&_pre_code]:break-words [&_pre_code]:text-stone-100 [&_code]:rounded-lg [&_code]:bg-black/30 [&_code]:px-1.5 [&_code]:py-0.5 [&_ul]:ml-5 [&_ul]:list-disc [&_ol]:ml-5 [&_ol]:list-decimal [&_li]:marker:text-border-gold-hover'
          />
        </div>

        <BlogFormFooter form={form} mode={mode} onReset={resetForm} submitting={submitting} />
      </form>
    </section>
  );
}

export default BlogFormPage;


