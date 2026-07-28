import { Search } from "lucide-react";
import { useCategories } from "../../../hooks/useGetAllCategories";
import { useFilters } from "../../../hooks/useFilters";

function SearchFilters({ onApplyFilters, initialFilters }) {
  const {
    category,
    setCategory,
    search,
    setSearch,
    location,
    setLocation,
    date,
    setDate,
    maxPrice,
    setMaxPrice,
    handleSubmit,
  } = useFilters(initialFilters, onApplyFilters);

  const { categories, loading: categoriesLoading } = useCategories();

  return (
    <div className='py-10 px-6 space-y-6'>
      {/* Category dropdown */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={categoriesLoading}
        className='w-full px-3 py-2 rounded-md bg-neutral-900 text-stone-300 border border-border-gold'
      >
        <option value='all'>All Categories</option>
        {!categoriesLoading &&
          categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
      </select>

      {/* Search */}
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
        }}
        placeholder='Search services'
        className='w-full px-3 py-2 rounded-md bg-neutral-900 text-stone-300 border border-border-gold'
      />

      {/* Location */}
      <input
        type='text'
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder='Paris, New York, Lahore...'
        className='w-full px-3 py-2 rounded-md bg-neutral-900 text-stone-300 border border-border-gold'
      />

      {/* Date */}
      <input
        type='date'
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className='w-full px-3 py-2 rounded-md bg-neutral-900 text-stone-300 border border-border-gold'
      />

      {/* Max Price */}
      <input
        type='number'
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder='Max budget'
        className='w-full px-3 py-2 rounded-md bg-neutral-900 text-stone-300 border border-border-gold'
      />

      <button
        onClick={handleSubmit}
        className='w-full flex items-center justify-center px-4 py-2 bg-amber-400 text-neutral-950 font-semibold rounded-md'
      >
        <Search className='w-5 h-5 mr-2' />
        Apply Filters
      </button>
    </div>
  );
}

export default SearchFilters;
