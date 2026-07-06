import { useCallback, useEffect, useMemo, useState } from "react";
import { adminBlogsApi, getAdminErrorMessage } from "../../../api/adminApi";

export function slugifyBlogTitle(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function stripBlogHtml(html) {
  return String(html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function formatBlogDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

const normalizeBlog = (blog) => ({
  id: blog.id || blog._id,
  title: blog.title || "",
  slug: blog.slug || "",
  category: blog.category || "",
  status: blog.status || "Draft",
  excerpt: blog.excerpt || "",
  content: blog.content || "",
  featureImage: blog.featureImage || "",
  updatedAt: blog.updatedAt || blog.createdAt || new Date().toISOString(),
});

export function useAdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshBlogs = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await adminBlogsApi.list({ limit: 100 });
      setBlogs((response.data?.data?.items || []).map(normalizeBlog));
    } catch (requestError) {
      setError(getAdminErrorMessage(requestError, "Failed to load blogs."));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshBlogs();
  }, [refreshBlogs]);

  const stats = useMemo(() => {
    const published = blogs.filter(
      (blog) => blog.status === "Published",
    ).length;
    const drafts = blogs.filter((blog) => blog.status === "Draft").length;

    return {
      total: blogs.length,
      published,
      drafts,
    };
  }, [blogs]);

  const getBlogById = useCallback(
    (blogId) => blogs.find((blog) => String(blog.id) === String(blogId)),
    [blogs],
  );

  const createBlog = useCallback(async (payload) => {
    const response = await adminBlogsApi.create(payload);
    const blog = normalizeBlog(
      response.data?.blog || response.data?.data?.blog || {},
    );
    setBlogs((current) => [
      blog,
      ...current.filter((item) => String(item.id) !== String(blog.id)),
    ]);
    return blog;
  }, []);

  const updateBlog = useCallback(async (blogId, payload) => {
    const response = await adminBlogsApi.update(blogId, payload);
    const blog = normalizeBlog(
      response.data?.blog || response.data?.data?.blog || {},
    );
    setBlogs((current) =>
      current.map((item) =>
        String(item.id) === String(blog.id) ? blog : item,
      ),
    );
    return blog;
  }, []);

  const deleteBlog = useCallback(async (blogId) => {
    await adminBlogsApi.remove(blogId);
    setBlogs((current) =>
      current.filter((item) => String(item.id) !== String(blogId)),
    );
  }, []);

  return {
    blogs,
    stats,
    loading,
    error,
    refreshBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
  };
}
