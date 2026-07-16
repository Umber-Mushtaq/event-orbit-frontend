import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import BlogSectionHeading from "../components/BlogSectionHeading";
import BlogArchiveCard from "../components/BlogArchiveCard";
import BlogSkeletonCard from "../components/BlogSkeletonCard";

function BlogPostsSection({
  blogs,
  isLoading,
  isEmpty,
  onClearFilters,
  page,
  totalPages,
  onPreviousPage,
  onNextPage,
  onPageSelect,
}) {
  return (
    <section aria-labelledby='blog-grid' className='space-y-6'>
      <BlogSectionHeading
        description='All Posts'
        title='Latest articles and planning advice.'
      />

      {isLoading ? (
        <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
          {Array.from({ length: 6 }).map((_, index) => (
            <BlogSkeletonCard key={index} />
          ))}
        </div>
      ) : isEmpty ? (
        <div className='flex flex-col items-center rounded-[2rem] border border-border-gold/15 bg-[#141414]/90 px-6 py-14 text-center shadow-[0_14px_40px_rgba(0,0,0,0.35)]'>
          <div className='mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-border-gold/20 bg-glass-gold text-border-gold-hover shadow-gold-glow'>
            <Sparkles className='h-9 w-9' />
          </div>
          <h3 className='text-2xl font-black text-white'>No matches found</h3>
          <p className='mt-3 max-w-xl text-sm leading-relaxed text-stone-400'>
            Try a different keyword or category, or clear the filters to see
            all available posts.
          </p>
          <button
            type='button'
            onClick={onClearFilters}
            className='mt-6 inline-flex items-center gap-2 rounded-full border border-border-gold/20 bg-glass-gold px-5 py-3 text-sm font-semibold text-border-gold-hover shadow-gold-glow transition hover:border-border-gold/35 hover:bg-glass-gold-hover'
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
            {blogs.map((blog) => (
              <BlogArchiveCard key={blog.id} blog={blog} />
            ))}
          </div>

          <div className='flex flex-col items-center gap-4 pt-2'>
            <div className='flex items-center gap-2'>
              <button
                type='button'
                onClick={onPreviousPage}
                disabled={page === 1}
                aria-label='Previous page'
                className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-gold/15 bg-neutral-900/70 text-stone-300 transition hover:border-border-gold/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-40'
              >
                <ChevronLeft className='h-4 w-4' />
              </button>

              {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    type='button'
                    onClick={() => onPageSelect(pageNumber)}
                    className={`inline-flex h-11 min-w-11 items-center justify-center rounded-full border px-4 text-sm font-semibold transition ${
                      page === pageNumber
                        ? "border-border-gold/40 bg-glass-gold text-border-gold-hover shadow-gold-glow"
                        : "border-border-gold/15 bg-neutral-900/70 text-stone-300 hover:border-border-gold/30 hover:text-white"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}

              <button
                type='button'
                onClick={onNextPage}
                disabled={page === totalPages}
                aria-label='Next page'
                className='inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-gold/15 bg-neutral-900/70 text-stone-300 transition hover:border-border-gold/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-40'
              >
                <ChevronRight className='h-4 w-4' />
              </button>
            </div>

            <p className='text-xs uppercase tracking-[0.22em] text-stone-500'>
              Page {page} of {totalPages}
            </p>
          </div>
        </>
      )}
    </section>
  );
}

export default BlogPostsSection;
