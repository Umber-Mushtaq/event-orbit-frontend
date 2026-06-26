import { useState, useEffect } from "react";

export function useFilters(initialFilters, onSubmit) {
  const [category, setCategory] = useState(initialFilters?.category || "all");
  const [location, setLocation] = useState(initialFilters?.location || "");
  const [date, setDate] = useState(initialFilters?.date || "");
  const [maxPrice, setMaxPrice] = useState(initialFilters?.maxPrice || "");

  useEffect(() => {
    setCategory(initialFilters?.category || "all");
    setLocation(initialFilters?.location || "");
    setDate(initialFilters?.date || "");
    setMaxPrice(initialFilters?.maxPrice || "");
  }, [initialFilters]);

  const handleSubmit = () => {
    if (typeof onSubmit === "function") {
      onSubmit({ category, location: location.trim(), date, maxPrice });
    }
  };

  return {
    category,
    setCategory,
    location,
    setLocation,
    date,
    setDate,
    maxPrice,
    setMaxPrice,
    handleSubmit,
  };
}
