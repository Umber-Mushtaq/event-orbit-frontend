import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../../../config/api";

export function useCustomerProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  // Image upload handler states
  const [profileImage, setProfileImage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });
  const token = localStorage.getItem("token");

  // Fetch current user payload profiles on initial mount configuration
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setStatus((prev) => ({ ...prev, loading: true }));
        const res = await axios.get(apiUrl("/api/userDashboard/profile"), {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Raw API Response:", res.data);

        // ATTENTION: If your backend controller sends data wrapped as { success: true, profile: {...} }
        // we destructure from res.data.profile fallback to res.data directly
        const profileData = res.data.profile || res.data;

        if (profileData) {
          setFirstName(profileData.firstName || "");
          setLastName(profileData.lastName || "");
          setEmail(profileData.email || "");
          setAddress(profileData.address || "");
          setProfileImage(profileData.profileImage || "");

          // Double-check your schema keys: maps either 'phoneNumber' or 'phone' cleanly
          setPhoneNumber(profileData.phoneNumber || profileData.phone || "");
        }
      } catch (err) {
        setStatus((prev) => ({
          ...prev,
          error: "Failed to gather profile credentials from server.",
        }));
      } finally {
        setStatus((prev) => ({ ...prev, loading: false }));
      }
    };

    if (token) {
      fetchProfileData();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: "", success: "" });

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("phoneNumber", phoneNumber); // Pass your form state down
      formData.append("address", address);
      if (imageFile) {
        formData.append("avatar", imageFile); // Matches your backend upload.single("avatar") key!
      }

      const res = await axios.put(apiUrl("/api/userDashboard/profile"), formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedData = res.data.profile || res.data;

      if (res.data.success || res.data) {
        setStatus({
          loading: false,
          error: "",
          success: "Your profile details have been securely synchronized!",
        });
        if (updatedData?.profileImage) {
          setProfileImage(updatedData.profileImage);
        }
      }
    } catch (err) {
      setStatus({
        loading: false,
        error:
          err.response?.data?.message ||
          "Failed to commit data modifications to database entries.",
        success: "",
      });
    }
  };

  return {
    formStates: {
      firstName: firstName, // Passing raw values directly
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
      address: address,

      setFirstName: setFirstName, // Passing functions directly
      setLastName: setLastName,
      setPhoneNumber: setPhoneNumber,
      setAddress: setAddress,
    },
    avatar: {
      previewUrl: profileImage,
      setPreviewUrl: setProfileImage,
      setFile: setImageFile,
    },
    status,
    handleSubmit,
  };
}
