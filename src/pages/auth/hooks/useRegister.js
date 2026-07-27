import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export const useRegister = () => {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    businessName: "",
    businessDescription: "",
    profileImage: "",
  });
  const [isVendor, setIsVendor] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleCheckboxChange = (e) => {
    setIsVendor(e.target.checked);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const targetRole = isVendor ? "vendor" : "customer";

    try {
      const dataToSend = new FormData();

      dataToSend.append("firstName", formData.firstName);
      dataToSend.append("lastName", formData.lastName);
      dataToSend.append("email", formData.email);
      dataToSend.append("password", formData.password);
      dataToSend.append("role", targetRole);

      if (isVendor) {
        dataToSend.append("businessName", formData.businessName);
        dataToSend.append("businessDescription", formData.businessDescription);

        if (formData.profileImage) {
          dataToSend.append("profileImage", formData.profileImage);
        }
      }

      const response = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        dataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setSuccess(response.data.message || "Registration completed successfully!");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        businessName: "",
        businessDescription: "",
        profileImage: "",
      });
      setIsVendor(false);

      setTimeout(() => {
        navigate("/auth/login");
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong during registration.",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    isVendor,
    error,
    success,
    loading,
    handleInputChange,
    handleCheckboxChange,
    handleRegisterSubmit,
  };
};
