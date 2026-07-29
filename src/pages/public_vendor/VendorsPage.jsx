import { useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import VendorCard from "./ui/VendorCard";
import CustomHeader from "../../shared_components/CustomHeader";
import CustomLoading from "../../shared_components/CustomLoading";
import CustomError from "../../shared_components/CustomError";
import { useVerifiedVendors } from "../../hooks/useVerifiedVendors";
import { useCategories } from "../../hooks/useGetAllCategories";
import NothingFound from "../../shared_components/NotingFound";

function VendorFilters({ categories = [], initialFilters, onApplyFilters }) {
  const [search, setSearch] = useState(initialFilters.search);
  const [location, setLocation] = useState(initialFilters.location);
  const [category, setCategory] = useState(initialFilters.category);
  const [sortBy, setSortBy] = useState(initialFilters.sortBy);

  const handleSubmit = () => {
    onApplyFilters({ search, location, category, sortBy });
  };

  return (
    <div className='space-y-6 px-6 py-10'>
      <input
        type='text'
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") handleSubmit();
        }}
        placeholder='Search vendors'
        className='w-full rounded-md border border-border-gold bg-neutral-900 px-3 py-2 text-stone-300'
      />

      <input
        type='text'
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") handleSubmit();
        }}
        placeholder='Lahore, Karachi...'
        className='w-full rounded-md border border-border-gold bg-neutral-900 px-3 py-2 text-stone-300'
      />

      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        className='w-full rounded-md border border-border-gold bg-neutral-900 px-3 py-2 text-stone-300'
      >
        <option value=''>All Categories</option>
        {categories.map((categoryItem) => (
          <option
            key={categoryItem.id || categoryItem._id}
            value={categoryItem.name}
          >
            {categoryItem.name}
          </option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
        className='w-full rounded-md border border-border-gold bg-neutral-900 px-3 py-2 text-stone-300'
      >
        <option value='name'>Name</option>
        <option value='rating'>Rating</option>
        <option value='experience'>Experience</option>
      </select>

      <button
        type='button'
        onClick={handleSubmit}
        className='flex w-full items-center justify-center rounded-md bg-amber-400 px-4 py-2 font-semibold text-neutral-950'
      >
        <Search className='mr-2 h-5 w-5' />
        Apply Filters
      </button>
    </div>
  );
}

function VendorsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { vendors, loading, error } = useVerifiedVendors();
  const { categories } = useCategories();
  const vendorsRef = useRef(null);
  const searchParamsKey = searchParams.toString();

  const activeFilters = useMemo(
    () => ({
      search: searchParams.get("search") || "",
      location: searchParams.get("location") || "",
      category: searchParams.get("category") || "",
      sortBy: searchParams.get("sortBy") || "name",
    }),
    [searchParams],
  );

  const filteredVendors = useMemo(() => {
    const searchTerm = activeFilters.search.trim().toLowerCase();
    const locationTerm = activeFilters.location.trim().toLowerCase();
    const categoryTerm = activeFilters.category.trim().toLowerCase();

    return [...vendors]
      .filter((vendor) => {
        const name = (
          vendor.businessName ||
          `${vendor.firstName || ""} ${vendor.lastName || ""}`
        ).toLowerCase();
        const description = `${vendor.businessDescription || ""} ${vendor.vendorBio || ""}`.toLowerCase();
        const vendorLocation = `${vendor.address || ""} ${vendor.location || ""} ${vendor.city || ""} ${vendor.country || ""}`.toLowerCase();
        const vendorCategory = String(vendor.vendorCategory || "").toLowerCase();

        const matchesSearch =
          !searchTerm ||
          name.includes(searchTerm) ||
          description.includes(searchTerm) ||
          vendor.email?.toLowerCase().includes(searchTerm);
        const matchesLocation =
          !locationTerm || vendorLocation.includes(locationTerm);
        const matchesCategory =
          !categoryTerm || vendorCategory.includes(categoryTerm);

        return matchesSearch && matchesLocation && matchesCategory;
      })
      .sort((first, second) => {
        if (activeFilters.sortBy === "rating") {
          return Number(second.vendorRating || 0) - Number(first.vendorRating || 0);
        }
        if (activeFilters.sortBy === "experience") {
          return (
            Number(second.yearsOfExperience || 0) -
            Number(first.yearsOfExperience || 0)
          );
        }

        const firstName =
          first.businessName || `${first.firstName || ""} ${first.lastName || ""}`;
        const secondName =
          second.businessName || `${second.firstName || ""} ${second.lastName || ""}`;
        return firstName.localeCompare(secondName);
      });
  }, [activeFilters, vendors]);

  const applyFilters = (filters) => {
    const nextParams = new URLSearchParams();

    if (filters.search?.trim()) {
      nextParams.set("search", filters.search.trim());
    }
    if (filters.location?.trim()) {
      nextParams.set("location", filters.location.trim());
    }
    if (filters.category?.trim()) {
      nextParams.set("category", filters.category.trim());
    }
    if (filters.sortBy && filters.sortBy !== "name") {
      nextParams.set("sortBy", filters.sortBy);
    }

    setSearchParams(nextParams);
    setSidebarOpen(false);
  };

  return (
    <div className='flex min-h-screen'>
      <button
        type='button'
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className='fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-amber-400 px-4 py-3 font-bold text-neutral-900 shadow-[0_4px_20px_rgba(251,191,36,0.4)] transition-all duration-300 hover:bg-amber-300 active:scale-95 md:hidden'
        aria-expanded={sidebarOpen}
        aria-controls='vendor-filters-drawer'
      >
        <SlidersHorizontal className='h-4 w-4' />
        <span className='text-xs uppercase tracking-wider'>Filters</span>
      </button>

      <aside
        id='vendor-filters-drawer'
        className={`fixed inset-y-0 left-0 top-20 z-40 w-72 transform bg-neutral-950 transition-transform duration-300 md:static md:w-70 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className='h-screen overflow-y-auto md:sticky md:top-6'>
          <VendorFilters
            key={searchParamsKey}
            categories={categories}
            initialFilters={activeFilters}
            onApplyFilters={applyFilters}
          />
        </div>
      </aside>

      <main className='flex flex-1 flex-col bg-neutral-950 p-6'>
        <CustomHeader badge='Our Vendors' title='Explore Our Vendors' />
        <div ref={vendorsRef} className='mt-5 flex-1'>
          {loading ? (
            <CustomLoading msg='Loading vendors...' />
          ) : error ? (
            <CustomError msg={error} />
          ) : filteredVendors.length === 0 ? (
            <NothingFound msg='No Vendor Found' />
          ) : (
            <div className='mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {filteredVendors.map((vendor) => (
                <VendorCard key={vendor._id} vendor={vendor} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default VendorsPage;
