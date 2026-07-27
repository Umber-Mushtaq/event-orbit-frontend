import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../../config/api";
import { showToast } from "../../../shared_components/toastStore";

export const useManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchVendorServices = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(apiUrl("/api/vendor/services"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(response.data.services || response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Noting to show yet.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendorServices();
  }, []);

  const openDeleteModal = (id) => {
    setSelectedServiceId(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    if (deleteLoading) return;
    setIsModalOpen(false);
    setSelectedServiceId(null);
  };

  const confirmDelete = async () => {
    if (!selectedServiceId) return;

    try {
      setDeleteLoading(true);
      const token = localStorage.getItem("token");

      await axios.delete(apiUrl(`/api/vendor/services/${selectedServiceId}`), {
        headers: { Authorization: `Bearer ${token}` },
      });

      setServices((prev) =>
        prev.filter((item) => item._id !== selectedServiceId),
      );
      setIsModalOpen(false);
      setSelectedServiceId(null);
    } catch (err) {
      showToast({
        type: "error",
        message:
          err.response?.data?.message || "Could not complete deletion request.",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  return {
    services,
    loading,
    error,
    isModalOpen,
    deleteLoading,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  };
};
