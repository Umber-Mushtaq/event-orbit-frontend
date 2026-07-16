import { useEffect, useMemo, useState } from "react";
import BlogQueryProvider from "./BlogQueryProvider";
import { useLatestBlogs } from "../../hooks/blog/usePublicBlogs";
import BlogHeroSection from "./sections/BlogHeroSection";
import BlogPostsSection from "./sections/BlogPostsSection";
import BlogNewsletterSection from "./sections/BlogNewsletterSection";
import {
  PAGE_SIZE,
  normalizeText,
  blogSearchText,
  buildBlogPostingSchema,
} from "./blogListingUtils";

function updateSeo({ title, description, canonicalUrl, structuredData }) {
  const setMeta = (selector, attribute, value) => {
    let tag = document.head.querySelector(selector);
    if (!tag) {
      tag = document.createElement("meta");
    }
    if (attribute === "name") {
      const name = selector.match(/name="([^"]+)"/)?.[1];
      if (name) tag.setAttribute("name", name);
    } else if (attribute === "property") {
      const property = selector.match(/property="([^"]+)"/)?.[1];
      if (property) tag.setAttribute("property", property);
    }
    tag.setAttribute("content", value);
    tag.setAttribute("data-blog-archive-seo", "true");
    if (!tag.parentNode) document.head.appendChild(tag);
    return tag;
  };

  document.title = title;

  setMeta('meta[name="description"]', "name", description);
  setMeta('meta[property="og:title"]', "property", title);
  setMeta('meta[property="og:description"]', "property", description);
  setMeta('meta[property="og:type"]', "property", "website");
  setMeta('meta[property="og:url"]', "property", canonicalUrl);
  setMeta('meta[name="twitter:card"]', "name", "summary_large_image");
  setMeta('meta[name="twitter:title"]', "name", title);
  setMeta('meta[name="twitter:description"]', "name", description);

  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    canonical.setAttribute("data-blog-archive-seo", "true");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", canonicalUrl);

  let script = document.head.querySelector(
    'script[data-blog-archive-seo="true"]',
  );
  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-blog-archive-seo", "true");
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(structuredData);

  return () => {
    document.head
      .querySelectorAll('[data-blog-archive-seo="true"]')
      .forEach((node) => node.remove());
  };
}

function BlogListingPageContent() {
  const { blogs, isLoading, error } = useLatestBlogs(100);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("");

  const filteredBlogs = useMemo(() => {
    const query = normalizeText(search);

    return blogs.filter((blog) => {
      const matchesCategory =
        category === "All" || normalizeText(blog.category) === normalizeText(category);
      if (!matchesCategory) return false;
      if (!query) return true;
      return blogSearchText(blog).includes(query);
    });
  }, [blogs, search, category]);

  const remainingBlogs = filteredBlogs.slice(1);
  const totalPages = Math.max(1, Math.ceil(remainingBlogs.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const paginatedBlogs = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return remainingBlogs.slice(start, start + PAGE_SIZE);
  }, [remainingBlogs, safePage]);

  const isEmpty = !isLoading && !error && filteredBlogs.length === 0;

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setPage(1);
  };

  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    const description =
      "Explore the latest event planning, venue, photography, and bridal inspiration from the Event Orbit editorial team.";

    const baseUrl = window.location.origin;
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Blog",
          name: "Our Blog",
          description,
          url: `${baseUrl}/blog`,
          blogPost: filteredBlogs.slice(0, 8).map((blog) =>
            buildBlogPostingSchema(blog, baseUrl),
          ),
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: `${baseUrl}/`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blog",
              item: `${baseUrl}/blog`,
            },
          ],
        },
      ],
    };

    return updateSeo({
      title: "Our Blog | Event Orbit",
      description,
      canonicalUrl: `${baseUrl}/blog`,
      structuredData,
    });
  }, [filteredBlogs]);

  return (
    <main className='bg-neutral-950 text-white'>
      <BlogHeroSection />

      <section className='px-5 py-16'>
        <div className='mx-auto flex w-full max-w-7xl flex-col gap-10'>
          <BlogPostsSection
            blogs={paginatedBlogs}
            isLoading={isLoading}
            isEmpty={isEmpty}
            onClearFilters={clearFilters}
            page={safePage}
            totalPages={totalPages}
            onPreviousPage={() => setPage((current) => Math.max(1, current - 1))}
            onNextPage={() =>
              setPage((current) => Math.min(totalPages, current + 1))
            }
            onPageSelect={setPage}
          />

          <BlogNewsletterSection
            email={email}
            onEmailChange={(event) => setEmail(event.target.value)}
          />
        </div>
      </section>
    </main>
  );
}

function BlogListingPage() {
  return (
    <BlogQueryProvider>
      <BlogListingPageContent />
    </BlogQueryProvider>
  );
}

export default BlogListingPage;
