import SearchFilters from "./ui/SearchFilters";
import  { useMemo, useState, useRef } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useServiceListings } from "../../hooks/useServiceListings";
import { ServiceCard } from "./ui/ServiceCard";
import NothingFound from "../../shared_components/NotingFound";
import CustomError from "../../shared_components/CustomError";
import CustomLoading from "../../shared_components/CustomLoading";
import CustomHeader from "../../shared_components/CustomHeader";
import { useSearchParams } from "react-router";
import { useWishlistState } from "../../hooks/useWishlistState";

function PublicServiceListings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsKey = searchParams.toString();

  const activeFilters = useMemo(
    () => ({
      category: searchParams.get("category") || "all",
      search: searchParams.get("search") || "",
      location: searchParams.get("location") || "",
      date: searchParams.get("date") || "",
      maxPrice: searchParams.get("maxPrice") || "",
    }),
    [searchParams],
  );

  const { services, loading, error } = useServiceListings(activeFilters);
  const {
    isWishlisted,
    toggleWishlist,
    updatingServiceId,
  } = useWishlistState();
  const listingsRef = useRef(null);

  const applyFilters = (filters) => {
    const nextParams = new URLSearchParams();

    if (filters.category && filters.category !== "all") {
      nextParams.set("category", filters.category);
    }
    if (filters.search?.trim()) {
      nextParams.set("search", filters.search.trim());
    }
    if (filters.location?.trim()) {
      nextParams.set("location", filters.location.trim());
    }
    if (filters.date) {
      nextParams.set("date", filters.date);
    }
    if (filters.maxPrice) {
      nextParams.set("maxPrice", filters.maxPrice);
    }

    setSearchParams(nextParams);
    setSidebarOpen(false);
  };

  return (
    <div className='min-h-screen flex'>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className='md:hidden fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-900 font-bold rounded-full shadow-[0_4px_20px_rgba(251,191,36,0.4)] transition-all duration-300 active:scale-95'
        aria-expanded={sidebarOpen}
        aria-controls='filters-drawer'
      >
        <SlidersHorizontal className='w-4 h-4' />
        <span className='text-xs uppercase tracking-wider'>Filters</span>
      </button>
      <aside
        id='filters-drawer'
        className={`fixed inset-y-0 left-0 top-20 z-40 w-72 transform transition-transform duration-300 bg-neutral-950 md:static md:translate-x-0 md:w-70
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className='h-screen md:sticky md:top-6 overflow-y-auto'>
          <SearchFilters
            key={searchParamsKey}
            onApplyFilters={applyFilters}
            initialFilters={activeFilters}
          />
        </div>
      </aside>

      <main className='flex-1 flex flex-col p-6 bg-neutral-950'>
        <CustomHeader badge='Services' title='Explore Services' />
        <div ref={listingsRef} className='flex-1 mt-5'>
          {loading ? (
            <CustomLoading msg='Loading services...' />
          ) : error ? (
            <CustomError msg='Failed to load services. Please try again.' />
          ) : services.length === 0 ? (
            <NothingFound msg='No Service Found' />
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
              {services.map((serviceItem) => (
                <ServiceCard
                  key={serviceItem.id || serviceItem._id}
                  service={serviceItem}
                  isWishlisted={isWishlisted(serviceItem.id || serviceItem._id)}
                  isWishlistUpdating={
                    String(updatingServiceId) ===
                    String(serviceItem.id || serviceItem._id)
                  }
                  onToggleWishlist={() =>
                    toggleWishlist(serviceItem.id || serviceItem._id)
                  }
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default PublicServiceListings;
