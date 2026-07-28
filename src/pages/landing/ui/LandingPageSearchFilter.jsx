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
        className='flex flex-col md:flex-row bg-neutral-900 border border-border-gold rounded-md shadow-gold-glow overflow-hidden'
      >
        {/* WHAT */}
        <div className='flex-1 border-b md:border-b-0 md:border-r border-border-gold px-4 py-3'>
          <label className='block text-left text-sm text-stone-400 mb-1'>
            WHAT
          </label>
          <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search services...'
            className='w-full bg-transparent text-stone-300 focus:outline-none placeholder-stone-500'
          />
        </div>

        {/* CATEGORY */}
        <div className='flex-1 border-b md:border-b-0 md:border-r border-border-gold px-4 py-3'>
          <label className='block text-left text-sm text-stone-400 mb-1'>
            CATEGORY
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={categoriesLoading}
            className='w-full rounded-md bg-neutral-900 text-stone-300  focus:outline-none disabled:opacity-50'
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
        <div className='flex-1 border-b md:border-b-0 md:border-r border-border-gold px-4 py-3'>
          <label className='block text-left text-sm text-stone-400 mb-1'>
            WHERE
          </label>
          <input
            type='text'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder='Lahore, Karachi, Islamabad...'
            className='w-full bg-transparent text-stone-300 focus:outline-none placeholder-stone-500'
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
