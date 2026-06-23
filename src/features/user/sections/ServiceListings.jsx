import {
  RefreshCw,
  UtensilsCrossed,
  Camera,
  Flower2,
  Music,
} from "lucide-react";
import { useServiceListings } from "../hooks/useServiceListings";
import { ServiceHeader } from "../components/ServiceHeader";
import { CategoryFilter } from "../components/CategoryFilter";
import { ServiceCard } from "../components/ServiceCard";

const CATEGORIES = [
  { id: "catering", label: "Catering", Icon: UtensilsCrossed },
  { id: "photography", label: "Photography", Icon: Camera },
  { id: "decor", label: "Decor", Icon: Flower2 },
  { id: "music", label: "Music", Icon: Music },
];

function ServiceListings() {
  const {
    services,
    activeCategory,
    setActiveCategory,
    favorites,
    loading,
    isFilterDropdownOpen,
    setIsFilterDropdownOpen,
    selectedPriceSort,
    setSelectedPriceSort,
    toggleFavorite,
  } = useServiceListings();

  return (
    <section className='min-h-screen w-full bg-white/5 border border-white/30 rounded-lg text-white py-12 px-6 md:px-12 flex flex-col items-center relative overflow-hidden'>
      <ServiceHeader
        isFilterDropdownOpen={isFilterDropdownOpen}
        setIsFilterDropdownOpen={setIsFilterDropdownOpen}
        selectedPriceSort={selectedPriceSort}
        setSelectedPriceSort={setSelectedPriceSort}
      />

      <CategoryFilter
        categories={CATEGORIES}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {loading ? (
        <div className='w-full flex flex-col items-center justify-center py-32 text-stone-500 font-poppins text-sm gap-3'>
          <RefreshCw className='w-5 h-5 animate-spin text-amber-500' />
          <span>Synchronizing dynamic entries...</span>
        </div>
      ) : services.length === 0 ? (
        <div className='w-full text-center py-24 bg-neutral-900/40 border border-white/5 rounded-2xl p-6 text-stone-500 font-poppins text-sm max-w-xl shadow-inner'>
          <p className='text-stone-400 font-medium mb-1'>
            No Listings Available
          </p>
          <span className='text-stone-500 text-xs'>
            No entries match the category identifier code system criteria. Try
            checking your cluster database seed records.
          </span>
        </div>
      ) : (
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 z-10 relative'>
          {services.map((item) => (
            <ServiceCard
              key={item.id}
              item={item}
              isFavorite={!!favorites[item.id]}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ServiceListings;
