import { useMemo, useState } from "react";
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
import SEO from "../../seo/SEO";
import { breadcrumbSchema, buildAbsoluteUrl } from "../../seo/schema";

function BlogListingPageContent() {
  const { blogs, isLoading, error } = useLatestBlogs(100);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [email, setEmail] = useState("");
  const description =
    "Explore the latest event planning, venue, photography, and bridal inspiration from the Event Orbit editorial team.";

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

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const paginatedBlogs = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredBlogs.slice(start, start + PAGE_SIZE);
  }, [filteredBlogs, safePage]);

  const isEmpty = !isLoading && !error && filteredBlogs.length === 0;
  const heroImage = filteredBlogs[0]?.featureImage || blogs[0]?.featureImage;

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setPage(1);
  };

  const blogSchema = useMemo(() => {
    const baseUrl =
      typeof window !== "undefined" ? window.location.origin : buildAbsoluteUrl("/");
    return {
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
  }, [filteredBlogs]);

  return (
    <main className='bg-neutral-950 text-white'>
      <SEO
        title='Our Blog'
        description={description}
        keywords={["event planning blog", "wedding inspiration", "vendor tips"]}
        canonical='/blog'
        type='website'
        schema={[
          blogSchema,
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
          ]),
        ]}
      />
      <BlogHeroSection image={heroImage} />

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
