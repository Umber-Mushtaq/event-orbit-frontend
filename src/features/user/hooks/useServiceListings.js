import { useState, useEffect } from "react";
import axios from "axios";

export function useServiceListings() {
  const [services, setServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(true);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [selectedPriceSort, setSelectedPriceSort] = useState("default");

  useEffect(() => {
    const fetchMarketplaceServices = async () => {
      try {
        setLoading(true);
        const url =
          activeCategory === "all"
            ? "http://localhost:5000/api/services/getAllServices"
            : `http://localhost:5000/api/services/getAllServices?category=${activeCategory}`;

        const response = await axios.get(url);
        let fetchedData = response.data.data || [];
        console.log(response.data.data);
        if (selectedPriceSort === "asc") {
          fetchedData.sort((a, b) => a.price - b.price);
        } else if (selectedPriceSort === "desc") {
          fetchedData.sort((a, b) => b.price - a.price);
        }

        setServices(fetchedData);
      } catch (err) {
        console.error("Failed to sync marketplace entries", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMarketplaceServices();
  }, [activeCategory, selectedPriceSort]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return {
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
  };
}
