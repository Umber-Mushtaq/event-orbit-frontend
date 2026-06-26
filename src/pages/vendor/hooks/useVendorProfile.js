import { useState, useEffect } from "react";
import axios from "axios";
import AvatarPlaceholder from "../../../assets/avatar3.jpg"; // Adjust path if needed

export const useVendorProfile = () => {
  // 1. INPUT FORM STATES
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [vendorBio, setVendorBio] = useState("");

  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [facebook, setFacebook] = useState("");

  // 2. FILE MANAGEMENT STATES
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(AvatarPlaceholder);

  // 3. INTERFACE LOADING & ERROR STATES
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Helper function to dynamically construct authorization header config matching your dashboard pattern
  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // 4. GET INITIAL DATA ON MOUNT
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const config = getAuthConfig();

        const response = await axios.get(
          "http://localhost:5000/api/vendor/profile",
          config,
        );

        // Match the backend payload: looks for response.data.profile first
        const vendor =
          response.data.profile || response.data.vendor || response.data;

        if (vendor) {
          setFirstName(vendor.firstName || "");
          setLastName(vendor.lastName || "");
          setEmail(vendor.email || "");
          setPhone(vendor.phone || "");
          setAddress(vendor.address || "");
          setBusinessName(vendor.businessName || "");
          setBusinessDescription(vendor.businessDescription || "");
          setVendorBio(vendor.vendorBio || "");

          // Fallback check matching both schema properties: 'profileImage' (from your Cloudinary code) or 'avatar'
          if (vendor.profileImage || vendor.avatar) {
            setAvatarPreview(vendor.profileImage || vendor.avatar);
          }

          if (vendor.socialLinks) {
            const socials =
              typeof vendor.socialLinks === "string"
                ? JSON.parse(vendor.socialLinks)
                : vendor.socialLinks;

            setWebsite(socials.website || "");
            setInstagram(socials.instagram || "");
            setLinkedin(socials.linkedin || "");
            setFacebook(socials.facebook || "");
          }
        }
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load profile details.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // 5. UPDATE IMAGE EVENT HANDLER
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("File size exceeds 2MB limit.");
        return;
      }
      setError("");
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  // 6. UPDATE SUBMIT HANDLER
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("businessName", businessName);
      formData.append("businessDescription", businessDescription);
      formData.append("vendorBio", vendorBio);

      formData.append(
        "socialLinks",
        JSON.stringify({
          website,
          instagram,
          linkedin,
          facebook,
        }),
      );

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      // Generate identical headers config mapping, adding standard multipart type boundary rules
      const config = getAuthConfig();
      config.headers["Content-Type"] = "multipart/form-data";

      const response = await axios.put(
        "http://localhost:5000/api/vendor/profile",
        formData,
        config,
      );

      if (response.data.success || response.status === 200) {
        setSuccess(
          response.data.message || "Profile settings updated successfully!",
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update profile configurations.",
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    formStates: {
      firstName,
      setFirstName,
      lastName,
      setLastName,
      email,
      setEmail,
      phone,
      setPhone,
      address,
      setAddress,
      businessName,
      setBusinessName,
      businessDescription,
      setBusinessDescription,
      vendorBio,
      setVendorBio,
      website,
      setWebsite,
      instagram,
      setInstagram,
      linkedin,
      setLinkedin,
      facebook,
      setFacebook,
    },
    avatar: {
      file: avatarFile,
      preview: avatarPreview,
      onChange: handleAvatarChange,
    },
    status: {
      loading,
      error,
      success,
    },
    handleSubmit: handleProfileSubmit,
  };
};
