import { useState } from "react";

export function useFilters(initialFilters, onSubmit) {
  const [category, setCategory] = useState(initialFilters?.category || "all");
  const [search, setSearch] = useState(initialFilters?.search || "");
  const [location, setLocation] = useState(initialFilters?.location || "");
  const [date, setDate] = useState(initialFilters?.date || "");
  const [maxPrice, setMaxPrice] = useState(initialFilters?.maxPrice || "");

  const handleSubmit = () => {
    if (typeof onSubmit === "function") {
      onSubmit({
        category,
        search: search.trim(),
        location: location.trim(),
        date,
        maxPrice,
      });
    }
  };

  return {
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
  };
}
