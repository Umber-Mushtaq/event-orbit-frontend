import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../config/api";

export const useCreateService = () => {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [priceType, setPriceType] = useState("fixed");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [imageFiles, setImageFiles] = useState([]);

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          apiUrl("/api/categories"),
        );
        setCategories(response.data.categories || response.data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (imageFiles.length === 0) {
      setError("Please select at least one layout thumbnail file to upload.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", title);
      formData.append("categoryId", categoryId);
      formData.append("description", description);
      formData.append("price", price.toString().replace(/[^0-9.]/g, ""));
      formData.append("priceType", priceType);
      formData.append("location", location);
      if (capacity) formData.append("capacity", capacity);

      imageFiles.forEach((file) => {
        formData.append("images", file);
      });

      await axios.post(apiUrl("/api/vendor/services"), formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Service package listed successfully!");

      setTitle("");
      setCategoryId("");
      setDescription("");
      setPrice("");
      setLocation("");
      setCapacity("");
      setImageFiles([]);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create service listing.",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    title,
    setTitle,
    categoryId,
    setCategoryId,
    description,
    setDescription,
    price,
    setPrice,
    priceType,
    setPriceType,
    location,
    setLocation,
    capacity,
    setCapacity,
    imageFiles,
    setImageFiles,
    categories,
    loading,
    error,
    success,
    handleServiceSubmit,
  };
};
