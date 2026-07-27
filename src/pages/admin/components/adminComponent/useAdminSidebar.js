import { useEffect, useMemo, useRef, useState } from "react";
import {
  adminAuthApi,
  adminProfileApi,
  getAdminErrorMessage,
} from "../../../../services/adminApi";
import { showToast } from "../../../../shared_components/toastStore";

const MAX_AVATAR_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"];

function useAdminSidebar(navigate) {
  const fileInputRef = useRef(null);
  const avatarObjectUrlRef = useRef("");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profileEditorOpen, setProfileEditorOpen] = useState(false);
  const [preferencesEditorOpen, setPreferencesEditorOpen] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPreferences, setSavingPreferences] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [preferencesError, setPreferencesError] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarFileName, setAvatarFileName] = useState("");
  const [avatarDragging, setAvatarDragging] = useState(false);
  const [profile, setProfile] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });
  const [profileForm, setProfileForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [preferencesForm, setPreferencesForm] = useState({
    sidebarCollapsed: false,
    language: "en",
    notificationsEnabled: true,
  });

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const response = await adminProfileApi.get();
        if (!active) return;
        const nextProfile = response.data?.data || response.data?.admin || null;
        setProfile(nextProfile);
        if (nextProfile) {
          setProfileForm({
            firstName: nextProfile.firstName || "",
            lastName: nextProfile.lastName || "",
            email: nextProfile.email || "",
            phone: nextProfile.phone || nextProfile.phoneNumber || "",
          });
          setPreferencesForm({
            sidebarCollapsed: Boolean(nextProfile.preferences?.sidebarCollapsed),
            language: nextProfile.preferences?.language || "en",
            notificationsEnabled: nextProfile.preferences?.notificationsEnabled !== false,
          });
        }
      } catch {
        if (!active) return;
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  useEffect(
    () => () => {
      if (avatarObjectUrlRef.current) URL.revokeObjectURL(avatarObjectUrlRef.current);
    },
    [],
  );

  const profileAvatar = profile?.avatarUrl || profile?.avatar || profile?.profileImage || "";
  const avatarDisplay = avatarPreview || profileAvatar;
  const profileName = `${profile?.firstName || profile?.name?.split(" ")?.[0] || "Admin"} ${
    profile?.lastName || profile?.name?.split(" ")?.slice(1).join(" ") || ""
  }`.trim();
  const profileRole = profile?.role || "Admin";
  const profileInitials = useMemo(() => {
    const first = profile?.firstName || profile?.name?.split(" ")?.[0] || "A";
    const last = profile?.lastName || profile?.name?.split(" ")?.slice(1).join(" ") || "";
    return `${first?.[0] || "A"}${last?.[0] || ""}`.toUpperCase();
  }, [profile]);

  const setUploadToast = (type, message) => showToast({ type, message });
  const openAvatarPicker = () => fileInputRef.current?.click();
  const resetAvatarState = () => {
    setProfileError("");
    if (avatarObjectUrlRef.current) {
      URL.revokeObjectURL(avatarObjectUrlRef.current);
      avatarObjectUrlRef.current = "";
    }
    setAvatarFile(null);
    setAvatarFileName("");
    setAvatarDragging(false);
    setAvatarPreview(profileAvatar);
  };

  const openProfileEditor = () => {
    resetAvatarState();
    setProfileMenuOpen(false);
    setProfileEditorOpen(true);
  };

  const openPreferencesEditor = () => {
    setPreferencesError("");
    setProfileMenuOpen(false);
    setPreferencesEditorOpen(true);
  };

  const handleAvatarSelected = (file) => {
    if (!file) return;
    const validType =
      ACCEPTED_AVATAR_TYPES.includes(file.type) || /\.(jpg|jpeg|png|webp)$/i.test(file.name || "");
    if (!validType) {
      const message = "Please upload a JPG, JPEG, PNG, or WEBP image.";
      setProfileError(message);
      setUploadToast("error", message);
      return;
    }
    if (file.size > MAX_AVATAR_FILE_SIZE) {
      const message = "Image size must be 5MB or smaller.";
      setProfileError(message);
      setUploadToast("error", message);
      return;
    }
    setProfileError("");
    if (avatarObjectUrlRef.current) URL.revokeObjectURL(avatarObjectUrlRef.current);
    const objectUrl = URL.createObjectURL(file);
    avatarObjectUrlRef.current = objectUrl;
    setAvatarPreview(objectUrl);
    setAvatarFile(file);
    setAvatarFileName(file.name);
  };

  const handleAvatarInputChange = (event) => {
    handleAvatarSelected(event.target.files?.[0]);
    event.target.value = "";
  };

  const handleAvatarDrop = (event) => {
    event.preventDefault();
    setAvatarDragging(false);
    handleAvatarSelected(event.dataTransfer.files?.[0]);
  };

  const handleProfileSave = async () => {
    setSavingProfile(true);
    setProfileError("");
    try {
      const formData = new FormData();
      formData.append("firstName", profileForm.firstName);
      formData.append("lastName", profileForm.lastName);
      formData.append("email", profileForm.email);
      formData.append("phone", profileForm.phone);
      if (avatarFile) formData.append("avatar", avatarFile);
      const response = await adminProfileApi.update(formData);
      const nextProfile = response.data?.admin || response.data?.data || profile;
      setProfile(nextProfile);
      localStorage.setItem("user", JSON.stringify(nextProfile));
      if (avatarObjectUrlRef.current) {
        URL.revokeObjectURL(avatarObjectUrlRef.current);
        avatarObjectUrlRef.current = "";
      }
      setAvatarFile(null);
      setAvatarFileName("");
      setAvatarPreview(nextProfile?.avatarUrl || nextProfile?.avatar || nextProfile?.profileImage || "");
      setProfileEditorOpen(false);
      setUploadToast("success", "Profile updated successfully.");
    } catch (error) {
      const message = getAdminErrorMessage(error, "Failed to update profile.");
      setProfileError(message);
      setUploadToast("error", message);
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePreferencesSave = async () => {
    setSavingPreferences(true);
    setPreferencesError("");
    try {
      const response = await adminProfileApi.updatePreferences(preferencesForm);
      const nextPreferences = response.data?.data || preferencesForm;
      setProfile((current) => ({ ...current, preferences: nextPreferences }));
      setPreferencesEditorOpen(false);
    } catch (error) {
      setPreferencesError(getAdminErrorMessage(error, "Failed to update preferences."));
    } finally {
      setSavingPreferences(false);
    }
  };

  const handleLogout = async () => {
    try {
      await adminAuthApi.logout();
    } catch (error) {
      console.error(getAdminErrorMessage(error, "Logout failed."));
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/auth/login");
    }
  };

  return {
    fileInputRef,
    profileMenuOpen,
    setProfileMenuOpen,
    profileEditorOpen,
    setProfileEditorOpen,
    preferencesEditorOpen,
    setPreferencesEditorOpen,
    savingProfile,
    savingPreferences,
    profileError,
    preferencesError,
    avatarFileName,
    avatarDragging,
    setAvatarDragging,
    profile,
    setProfile,
    profileForm,
    setProfileForm,
    preferencesForm,
    setPreferencesForm,
    profileAvatar,
    avatarDisplay,
    profileName,
    profileRole,
    profileInitials,
    openAvatarPicker,
    openProfileEditor,
    openPreferencesEditor,
    handleAvatarInputChange,
    handleAvatarDrop,
    handleProfileSave,
    handlePreferencesSave,
    handleLogout,
  };
}

export default useAdminSidebar;
