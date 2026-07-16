import { Filter, Search, X } from "lucide-react";
import BlogSectionHeading from "../components/BlogSectionHeading";

function BlogFiltersSection({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
}) {
  return (
    <section aria-labelledby='blog-controls' className='space-y-6'>
      <BlogSectionHeading
        description='Browse Articles'
        title='Search, filter, and discover more stories.'
      />

      <div className='grid gap-4 rounded-[2rem] border border-border-gold/15 bg-[#141414]/90 p-4 shadow-[0_14px_40px_rgba(0,0,0,0.35)] lg:grid-cols-[minmax(0,1.4fr)_auto]'>
        <label className='relative flex items-center'>
          <Search className='absolute left-4 h-4 w-4 text-stone-500' />
          <input
            type='search'
            value={search}
            onChange={onSearchChange}
            placeholder='Search by title, category, tags, or excerpt'
            aria-label='Search blog posts'
            className='w-full rounded-2xl border border-border-gold/15 bg-neutral-900/70 py-3 pl-11 pr-11 text-sm text-white placeholder:text-stone-500 outline-none transition focus:border-border-gold/40 focus:ring-2 focus:ring-amber-400/20'
          />
          {search ? (
            <button
              type='button'
              onClick={() => onSearchChange({ target: { value: "" } })}
              aria-label='Clear search'
              className='absolute right-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-stone-500 transition hover:bg-white/5 hover:text-white'
            >
              <X className='h-4 w-4' />
            </button>
          ) : null}
        </label>

        <div className='flex items-center justify-start gap-2 overflow-x-auto pb-1 lg:justify-end'>
          <Filter className='h-4 w-4 shrink-0 text-stone-500' />
          {categories.map((item) => {
            const active = category === item;
            return (
              <button
                key={item}
                type='button'
                onClick={() => onCategoryChange(item)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  active
                    ? "border-border-gold/40 bg-glass-gold text-border-gold-hover shadow-gold-glow"
                    : "border-border-gold/15 bg-neutral-900/70 text-stone-300 hover:border-border-gold/30 hover:text-white"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default BlogFiltersSection;
