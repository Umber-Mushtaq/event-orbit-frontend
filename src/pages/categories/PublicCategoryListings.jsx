import { useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { ArrowUpRight, Search, SlidersHorizontal } from "lucide-react";
import { useCategories } from "../../hooks/useGetAllCategories";
import CustomHeader from "../../shared_components/CustomHeader";
import CustomLoading from "../../shared_components/CustomLoading";
import CustomError from "../../shared_components/CustomError";
import NothingFound from "../../shared_components/NotingFound";
import bgImg from "../../assets/service1.jpg";
import { getCategorySlug } from "../../utils/slug";

function CategoryFilters({ categories = [], initialFilters, onApplyFilters }) {
  const [search, setSearch] = useState(initialFilters.search);
  const [status, setStatus] = useState(initialFilters.status);
  const [sortBy, setSortBy] = useState(initialFilters.sortBy);

  const handleSubmit = () => {
    onApplyFilters({ search, status, sortBy });
  };

  return (
    <div className='space-y-6 px-6 py-10'>
      <select
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className='w-full rounded-md border border-border-gold bg-neutral-900 px-3 py-2 text-stone-300'
      >
        <option value=''>All Categories</option>
        {categories.map((category) => (
          <option key={category.id || category._id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      <select
        value={status}
        onChange={(event) => setStatus(event.target.value)}
        className='w-full rounded-md border border-border-gold bg-neutral-900 px-3 py-2 text-stone-300'
      >
        <option value='all'>All Status</option>
        <option value='active'>Active</option>
        <option value='inactive'>Inactive</option>
      </select>

      <select
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
        className='w-full rounded-md border border-border-gold bg-neutral-900 px-3 py-2 text-stone-300'
      >
        <option value='name'>Name</option>
        <option value='listings'>Listings</option>
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

function PublicCategoryListings() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories, loading, error } = useCategories();
  const listingsRef = useRef(null);
  const searchParamsKey = searchParams.toString();

  const activeFilters = useMemo(
    () => ({
      search: searchParams.get("search") || "",
      status: searchParams.get("status") || "all",
      sortBy: searchParams.get("sortBy") || "name",
    }),
    [searchParams],
  );

  const filteredCategories = useMemo(() => {
    const searchTerm = activeFilters.search.trim().toLowerCase();

    return [...categories]
      .filter((category) => {
        const categoryStatus = String(category.status || "active").toLowerCase();
        const matchesSearch =
          !searchTerm ||
          String(category.name || "").toLowerCase().includes(searchTerm) ||
          String(category.description || "").toLowerCase().includes(searchTerm);
        const matchesStatus =
          activeFilters.status === "all" ||
          categoryStatus === activeFilters.status;

        return matchesSearch && matchesStatus;
      })
      .sort((first, second) => {
        if (activeFilters.sortBy === "listings") {
          return (
            Number(second.listings || second.totalListings || 0) -
            Number(first.listings || first.totalListings || 0)
          );
        }

        return String(first.name || "").localeCompare(String(second.name || ""));
      });
  }, [activeFilters, categories]);

  const applyFilters = (filters) => {
    const nextParams = new URLSearchParams();

    if (filters.search?.trim()) {
      nextParams.set("search", filters.search.trim());
    }
    if (filters.status && filters.status !== "all") {
      nextParams.set("status", filters.status);
    }
    if (filters.sortBy && filters.sortBy !== "name") {
      nextParams.set("sortBy", filters.sortBy);
    }

    setSearchParams(nextParams);
    setSidebarOpen(false);
  };

  const openCategory = (category) => {
    const slug = getCategorySlug(category);
    if (!slug) return;
    navigate(`/category/${slug}`);
  };

  return (
    <div className='flex min-h-screen'>
      <button
        type='button'
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className='fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-amber-400 px-4 py-3 font-bold text-neutral-900 shadow-[0_4px_20px_rgba(251,191,36,0.4)] transition-all duration-300 hover:bg-amber-300 active:scale-95 md:hidden'
        aria-expanded={sidebarOpen}
        aria-controls='category-filters-drawer'
      >
        <SlidersHorizontal className='h-4 w-4' />
        <span className='text-xs uppercase tracking-wider'>Filters</span>
      </button>

      <aside
        id='category-filters-drawer'
        className={`fixed inset-y-0 left-0 top-20 z-40 w-72 transform bg-neutral-950 transition-transform duration-300 md:static md:w-70 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className='h-screen overflow-y-auto md:sticky md:top-6'>
          <CategoryFilters
            key={searchParamsKey}
            categories={categories}
            initialFilters={activeFilters}
            onApplyFilters={applyFilters}
          />
        </div>
      </aside>

      <main className='flex flex-1 flex-col bg-neutral-950 p-6'>
        <CustomHeader badge='Categories' title='Explore Categories' />

        <div ref={listingsRef} className='mt-5 flex-1'>
          {loading ? (
            <CustomLoading msg='Loading categories...' />
          ) : error ? (
            <CustomError msg={error} />
          ) : filteredCategories.length === 0 ? (
            <NothingFound msg='No Category Found' />
          ) : (
            <div className='mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {filteredCategories.map((category) => (
                <button
                  type='button'
                  key={category.id}
                  onClick={() => openCategory(category)}
                  className='group relative h-64 w-full cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-[0_18px_45px_rgba(15,23,42,0.14)] transition-all duration-500 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_22px_55px_rgba(15,23,42,0.2)] dark:border-border-gold dark:bg-neutral-950 dark:shadow-gold-glow dark:hover:border-border-gold-hover dark:hover:shadow-gold-glow-hover'
                >
                  <div
                    className='absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105'
                    style={{
                      backgroundImage: `url(${category.image || bgImg})`,
                    }}
                  />
                  <div
                    className='absolute inset-0'
                    style={{
                      background:
                        "linear-gradient(to top, rgba(15, 23, 42, 0.78), rgba(15, 23, 42, 0.28), transparent)",
                    }}
                  />

                  <div className='absolute bottom-4 left-4 z-10'>
                    <h3 className='font-montserrat text-lg font-black uppercase tracking-wide text-[#fff] drop-shadow-md'>
                      {category.name}
                    </h3>
                    <p className='mt-1 text-xs text-[#e5e7eb]'>
                      {category.listings || category.totalListings || 0} Listings
                    </p>
                  </div>

                  <div className='absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                    <span className='flex h-12 w-12 items-center justify-center rounded-full bg-amber-400 text-neutral-950'>
                      <ArrowUpRight className='h-5 w-5' />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default PublicCategoryListings;
