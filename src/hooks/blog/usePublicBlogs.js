import { useQuery } from "@tanstack/react-query";
import { formatBlogDate, stripBlogHtml } from "../admin-hook/blog/useAdminBlogs";
import { publicBlogsApi, getPublicBlogErrorMessage } from "../../services/publicBlogApi";

const normalizePublicBlog = (blog = {}) => ({
  id: blog.id || blog._id || blog.displayId || "",
  title: blog.title || "",
  slug: blog.slug || "",
  category: blog.category || "",
  tags: Array.isArray(blog.tags)
    ? blog.tags.filter(Boolean)
    : blog.tags
      ? [String(blog.tags)]
      : [],
  excerpt: blog.excerpt || stripBlogHtml(blog.content).slice(0, 180).trim(),
  content: blog.content || "",
  featureImage: blog.featureImage || "",
  authorName: blog.authorName || "",
  authorAvatar: blog.authorAvatar || "",
  readTime: blog.readTime || "",
  publishedAt: blog.publishedAt || blog.createdAt || blog.updatedAt || new Date().toISOString(),
  updatedAt: blog.updatedAt || blog.createdAt || new Date().toISOString(),
  createdAt: blog.createdAt || new Date().toISOString(),
});

const resolveItems = (response) =>
  (response.data?.data?.items || response.data?.items || []).map(normalizePublicBlog);

export function useLatestBlogs(limit = 6) {
  const query = useQuery({
    queryKey: ["public-blogs", limit],
    queryFn: async ({ signal }) => {
      const response = await publicBlogsApi.list(
        {
          limit,
          sortOrder: "desc",
        },
        { signal },
      );
      return resolveItems(response);
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    blogs: query.data || [],
    isLoading: query.isPending || query.isLoading,
    error: query.error ? getPublicBlogErrorMessage(query.error, "Failed to load blogs.") : "",
    errorStatus: query.error?.response?.status || 0,
    refetch: query.refetch,
    formatBlogDate,
  };
}

export function usePublicBlog(slug) {
  const query = useQuery({
    queryKey: ["public-blog", slug],
    enabled: Boolean(slug),
    queryFn: async ({ signal }) => {
      const response = await publicBlogsApi.getBySlug(slug, { signal });
      return normalizePublicBlog(response.data?.blog || response.data?.data?.blog || {});
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    blog: query.data || null,
    isLoading: query.isPending || query.isLoading,
    error: query.error ? getPublicBlogErrorMessage(query.error, "Failed to load blog.") : "",
    errorStatus: query.error?.response?.status || 0,
    refetch: query.refetch,
    formatBlogDate,
  };
}
