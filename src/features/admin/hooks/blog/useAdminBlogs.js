import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "event-orbit-admin-blog-posts";

const seedBlogs = [
  {
    id: "post-1",
    title: "How to plan a luxury wedding timeline",
    slug: "luxury-wedding-timeline",
    category: "Planning",
    status: "Published",
    excerpt:
      "A practical guide to keep premium weddings calm, elegant, and on schedule.",
    content:
      "<p>A luxury timeline should feel effortless for guests while giving every vendor clear direction.</p><h2>Start with the ceremony</h2><p>Work backward from the main moment and protect time for setup, photography, and guest arrival.</p>",
    featureImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    updatedAt: "2026-06-12T10:15:00.000Z",
  },
  {
    id: "post-2",
    title: "Choosing the right venue lighting palette",
    slug: "venue-lighting-palette",
    category: "Design",
    status: "Draft",
    excerpt:
      "Use warm lighting layers to elevate floral details, tablescapes, and entrances.",
    content:
      "<p>Lighting changes the entire mood of an event, especially in indoor venues with dark finishes.</p><blockquote>Always test the room at the same time of day the event will happen.</blockquote>",
    featureImage:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80",
    updatedAt: "2026-06-16T08:30:00.000Z",
  },
];

export function slugifyBlogTitle(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function stripBlogHtml(html) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function formatBlogDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function useAdminBlogs() {
  const ready = true;
  const [blogs, setBlogs] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return seedBlogs;

      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) && parsed.length ? parsed : seedBlogs;
    } catch {
      return seedBlogs;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
  }, [blogs]);

  const stats = useMemo(() => {
    const published = blogs.filter((blog) => blog.status === "Published").length;
    const drafts = blogs.filter((blog) => blog.status === "Draft").length;

    return {
      total: blogs.length,
      published,
      drafts,
    };
  }, [blogs]);

  const getBlogById = useCallback(
    (blogId) => blogs.find((blog) => blog.id === blogId),
    [blogs],
  );

  const createBlog = useCallback((blog) => {
    setBlogs((current) => [
      {
        ...blog,
        id: blog.id || `post-${Date.now()}`,
        updatedAt: blog.updatedAt || new Date().toISOString(),
      },
      ...current,
    ]);
  }, []);

  const updateBlog = useCallback((blogId, blog) => {
    setBlogs((current) =>
      current.map((item) =>
        item.id === blogId
          ? {
              ...item,
              ...blog,
              id: blogId,
              updatedAt: new Date().toISOString(),
            }
          : item,
      ),
    );
  }, []);

  const deleteBlog = useCallback((blogId) => {
    setBlogs((current) => current.filter((item) => item.id !== blogId));
  }, []);

  return {
    blogs,
    stats,
    ready,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
  };
}
