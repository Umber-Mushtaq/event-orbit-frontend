import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // hooks/useLogin.js
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        {
          email,
          password,
        },
      );

      const { token, user } = response.data;
      if (user.role === "vendor" && !user.isApproved) {
        setError("Your vendor account is pending admin approval.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setSuccess("Welcome back! Redirecting...");

      setTimeout(() => {
        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else if (user.role === "vendor") {
          navigate("/vendor/dashboard");
        } else if (location.state?.from) {
          navigate(location.state.from);
        } else {
          navigate("/customer/dashboard");
        }
      }, 1500);
    } catch (err) {
      const backendMessage =
        err.response?.data?.message || "Invalid email or password.";
      setError(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    success,
    loading,
    handleLoginSubmit,
  };
};
