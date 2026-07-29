import { Search } from "lucide-react";
import { useState } from "react";
import { useCategories } from "../../../hooks/useGetAllCategories";
import { useNavigate } from "react-router";

function LandingPageSearchFilter() {
  const navigate = useNavigate();
  const { categories, loading: categoriesLoading } = useCategories();

  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
 

  const handleSearch = (event) => {
    event?.preventDefault();

    const params = new URLSearchParams();

    if (category && category !== "all") {
      params.set("category", category);
    }
    if (search.trim()) {
      params.set("search", search.trim());
    }
    if (location.trim()) {
      params.set("location", location.trim());
    }

    navigate(`/services${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <div className='w-full max-w-6xl mx-auto mb-6'>
      <form
        onSubmit={handleSearch}
        className='flex flex-col overflow-hidden rounded-xl border border-white/70 bg-white/92 shadow-[0_18px_50px_rgba(15,23,42,0.18)] backdrop-blur-md md:flex-row dark:border-border-gold dark:bg-neutral-900 dark:shadow-gold-glow'
      >
        {/* WHAT */}
        <div className='flex-1 border-b border-slate-200 px-4 py-3 md:border-b-0 md:border-r dark:border-border-gold'>
          <label className='mb-1 block text-left text-xs font-bold tracking-wide text-slate-500 dark:text-stone-400'>
            WHAT
          </label>
          <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search services...'
            className='w-full bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none dark:text-stone-300 dark:placeholder-stone-500'
          />
        </div>

        {/* CATEGORY */}
        <div className='flex-1 border-b border-slate-200 px-4 py-3 md:border-b-0 md:border-r dark:border-border-gold'>
          <label className='mb-1 block text-left text-xs font-bold tracking-wide text-slate-500 dark:text-stone-400'>
            CATEGORY
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={categoriesLoading}
            className='w-full rounded-md bg-transparent text-slate-900 focus:outline-none disabled:opacity-50 dark:bg-neutral-900 dark:text-stone-300'
          >
            <option value='all'>All Categories</option>
            {!categoriesLoading &&
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>

        {/* WHERE */}
        <div className='flex-1 border-b border-slate-200 px-4 py-3 md:border-b-0 md:border-r dark:border-border-gold'>
          <label className='mb-1 block text-left text-xs font-bold tracking-wide text-slate-500 dark:text-stone-400'>
            WHERE
          </label>
          <input
            type='text'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder='Lahore, Karachi, Islamabad...'
            className='w-full bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none dark:text-stone-300 dark:placeholder-stone-500'
          />
        </div>

        {/* WHEN */}
      

        {/* Search button */}
        <button
          type='submit'
          className='flex items-center justify-center px-6 py-3 bg-amber-400 text-neutral-950 font-semibold cursor-pointer hover:bg-amber-300 transition'
        >
          <Search className='w-5 h-5 mr-2' />
          Search
        </button>
      </form>
    </div>
  );
}

export default LandingPageSearchFilter;
