import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { apiUrl } from "../../../config/api";

export const useEditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [priceType, setPriceType] = useState("fixed");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");
  const [images, setImages] = useState([]);

  const [categories, setCategories] = useState([]);

  const [fetchingData, setFetchingData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const initializeData = async () => {
      try {
        setFetchingData(true);
        const token = localStorage.getItem("token");

        const catRes = await axios.get(apiUrl("/api/categories"));
        setCategories(catRes.data.categories || catRes.data);

        if (id) {
          const serviceRes = await axios.get(apiUrl(`/api/vendor/services/${id}`), {
            headers: { Authorization: `Bearer ${token}` },
          });

          const service = serviceRes.data.services || serviceRes.data;

          setTitle(service.title);
          setDescription(service.description);
          setPrice(service.price);
          setPriceType(service.priceType);
          setLocation(service.location);
          setCapacity(service.capacity || "");
          setImages(service.images || []);

          if (service.categoryId) {
            const verifiedId =
              typeof service.categoryId === "object"
                ? service.categoryId._id
                : service.categoryId;
            setCategoryId(verifiedId || "");
          } else {
            setCategoryId("");
          }
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load service setup data.",
        );
      } finally {
        setFetchingData(false);
      }
    };

    initializeData();
  }, [id]);

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("categoryId", categoryId);
    formData.append("description", description);
    formData.append("price", price.toString().replace(/[^0-9.]/g, ""));
    formData.append("priceType", priceType);
    formData.append("location", location);
    if (capacity) formData.append("capacity", capacity);

    images.forEach((file) => {
      if (file instanceof File) {
        formData.append("images", file);
      }
    });

    // Keep original Cloudinary string asset links for backend reference
    const currentUrls = images.filter((img) => typeof img === "string");
    formData.append("existingImages", JSON.stringify(currentUrls));

    try {
      const token = localStorage.getItem("token");

      await axios.put(apiUrl(`/api/vendor/services/${id}`), formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Service package updated successfully!");
      setTimeout(() => navigate("/vendor/dashboard/categories"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while updating the package.",
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
    images,
    setImages,
    categories,
    fetchingData,
    loading,
    error,
    success,
    handleServiceSubmit,
    isEditMode: true,
  };
};
