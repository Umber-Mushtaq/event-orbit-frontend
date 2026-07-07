import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

export const useResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password },
      );

      setSuccess(response.data.message || "Password updated successfully!");

      setTimeout(() => {
        navigate("/auth/login");
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    success,
    loading,
    handleResetSubmit,
  };
};
