import { stripBlogHtml } from "../../hooks/admin-hook/blog/useAdminBlogs";

export const PAGE_SIZE = 6;

export const FALLBACK_CATEGORIES = [
  "Wedding Photography",
  "Bridal Tips",
  "Wedding Planning",
  "Venues",
  "Photography Guides",
];

export const normalizeText = (value) => String(value || "").toLowerCase().trim();

export const blogSearchText = (blog) =>
  [
    blog.title,
    blog.category,
    blog.excerpt,
    blog.content,
    ...(Array.isArray(blog.tags) ? blog.tags : []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

export const getBlogSummary = (blog, length = 180) =>
  blog.excerpt || stripBlogHtml(blog.content).slice(0, length).trim();

export const buildBlogPostingSchema = (blog, baseUrl) => ({
  "@type": "BlogPosting",
  headline: blog.title,
  description: blog.excerpt || stripBlogHtml(blog.content).slice(0, 180),
  image: blog.featureImage ? [blog.featureImage] : undefined,
  author: blog.authorName
    ? {
        "@type": "Person",
        name: blog.authorName,
      }
    : undefined,
  datePublished: blog.publishedAt,
  dateModified: blog.updatedAt || blog.publishedAt,
  url: `${baseUrl}/blog/${blog.slug}`,
});
