import { useState } from "react";
import axios from "axios";

export const useRegister = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isVendor, setIsVendor] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setIsVendor(e.target.checked);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Determine the string role based on the checkbox state
    const targetRole = isVendor ? "vendor" : "customer";

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          ...formData,
          role: targetRole,
        },
      );

      // Handle raw response message string or fallback directly
      setSuccess(
        response.data.message || "Registration completed successfully!",
      );

      // If customer registers, save token immediately to storage
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      // Clear layout fields on successful submission
      setFormData({ firstName: "", lastName: "", email: "", password: "" });
      setIsVendor(false);
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
