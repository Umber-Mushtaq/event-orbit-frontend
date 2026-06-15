import { useState } from "react";
import axios from "axios";

export const useForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        {
          email,
        },
      );

      // Show the success message returned from your backend ("Reset email sent successfully")
      setSuccess(response.data.message || "Reset link sent! Check your inbox.");
      setEmail(""); // Clear the input field upon success
    } catch (err) {
      // Pull exact backend message, otherwise fallback gracefully
      setError(
        err.response?.data?.message ||
          "Failed to process password reset request.",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    error,
    success,
    loading,
    handleForgotPasswordSubmit,
  };
};
