import { Search } from "lucide-react";
import React, { useState } from "react";
import { useCategories } from "../../../hooks/useGetAllCategories";
import { useNavigate } from "react-router";

function LandingPageSearchFilter() {
  const navigate = useNavigate();
  const { categories, loading: categoriesLoading } = useCategories();

  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams({
      category: category || "all",
      location: location || "",
      date: date || "",
    }).toString();

    navigate(`/services?${params}`);
  };

  return (
    <div className='w-full max-w-4xl mx-auto mb-6'>
      <div className='flex flex-col md:flex-row bg-neutral-900 border border-border-gold rounded-md shadow-gold-glow overflow-hidden'>
        {/* WHAT */}
        <div className='flex-1 border-b md:border-b-0 md:border-r border-border-gold px-4 py-3'>
          <label className='block text-left text-sm text-stone-400 mb-1'>
            WHAT
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
            placeholder='Paris, New York, Tokyo...'
            className='w-full bg-transparent text-stone-300 focus:outline-none placeholder-stone-500'
          />
        </div>

        {/* WHEN */}
        <div className='flex-1 border-b md:border-b-0 md:border-r border-border-gold px-4 py-3'>
          <label className='block text-left text-sm text-stone-400 mb-1'>
            WHEN
          </label>
          <input
            type='text'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder='Summer 2026'
            className='w-full bg-transparent text-stone-300 focus:outline-none placeholder-stone-500'
          />
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          className='flex items-center justify-center px-6 py-3 bg-amber-400 text-neutral-950 font-semibold cursor-pointer hover:bg-amber-300 transition'
        >
          <Search className='w-5 h-5 mr-2' />
          Search
        </button>
      </div>
    </div>
  );
}

export default LandingPageSearchFilter;
