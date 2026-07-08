import { useEffect, useMemo, useRef, useState } from "react";
import { UploadCloud, Loader2, UserCircle2 } from "lucide-react";
import { adminProfileApi, getAdminErrorMessage } from "../../../../services/adminApi";

const MAX_AVATAR_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"];

function AdminProfilePage() {
  const fileInputRef = useRef(null);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarFileName, setAvatarFileName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      try {
        const response = await adminProfileApi.get();
        if (!active) return;

        const nextProfile = response.data?.data || response.data?.admin || null;
        setProfile(nextProfile);
        setForm({
          firstName: nextProfile?.firstName || "",
          lastName: nextProfile?.lastName || "",
          email: nextProfile?.email || "",
          phone: nextProfile?.phone || nextProfile?.phoneNumber || "",
        });
        setAvatarPreview(
          nextProfile?.avatarUrl || nextProfile?.avatar || nextProfile?.profileImage || "",
        );
      } catch (requestError) {
        if (!active) return;
        setError(getAdminErrorMessage(requestError, "Failed to load profile."));
      } finally {
        if (active) setLoading(false);
      }
    };

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!avatarFile) return undefined;

    const objectUrl = URL.createObjectURL(avatarFile);
    setAvatarPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [avatarFile]);

  useEffect(() => {
    if (!success) return undefined;
    const timer = window.setTimeout(() => setSuccess(""), 3000);
    return () => window.clearTimeout(timer);
  }, [success]);

  const currentAvatar =
    avatarPreview || profile?.avatarUrl || profile?.avatar || profile?.profileImage || "";
  const initials = useMemo(() => {
    const first = form.firstName || profile?.firstName || "A";
    const last = form.lastName || profile?.lastName || "";
    return `${first?.[0] || "A"}${last?.[0] || ""}`.toUpperCase();
  }, [form.firstName, form.lastName, profile]);

  const validateFile = (file) => {
    if (!file) return false;
    const validType =
      ACCEPTED_AVATAR_TYPES.includes(file.type) ||
      /\.(jpg|jpeg|png|webp)$/i.test(file.name || "");
    if (!validType) {
      setError("Please upload a JPG, JPEG, PNG, or WEBP image.");
      return false;
    }
    if (file.size > MAX_AVATAR_FILE_SIZE) {
      setError("Image size must be 5MB or smaller.");
      return false;
    }
    return true;
  };

  const handleFileChange = (event) => {
    const selected = event.target.files?.[0];
    if (!selected) return;
    if (!validateFile(selected)) {
      event.target.value = "";
      return;
    }
    setError("");
    setAvatarFile(selected);
    setAvatarFileName(selected.name);
    event.target.value = "";
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      if (avatarFile) formData.append("avatar", avatarFile);

      const response = await adminProfileApi.update(formData);
      const nextProfile = response.data?.admin || response.data?.data || profile;

      setProfile(nextProfile);
      setAvatarFile(null);
      setAvatarFileName("");
      setAvatarPreview(
        nextProfile?.avatarUrl || nextProfile?.avatar || nextProfile?.profileImage || "",
      );
      localStorage.setItem("user", JSON.stringify(nextProfile));
      setSuccess("Profile updated successfully.");
    } catch (requestError) {
      setError(getAdminErrorMessage(requestError, "Failed to update profile."));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-xs text-stone-500">Loading profile...</p>;
  }

  return (
    <section className="mx-auto max-w-4xl rounded-[2rem] border border-admin-border bg-[linear-gradient(180deg,var(--admin-surface-2),var(--admin-surface))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
      <div className="flex flex-col gap-2 border-b border-white/5 pb-6">
        <h2 className="text-3xl font-black tracking-tight text-white">Profile settings</h2>
        <p className="text-sm text-stone-400">
          Update your name, contact details, and profile image.
        </p>
      </div>

      {error ? (
        <p className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      ) : null}
      {success ? (
        <p className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {success}
        </p>
      ) : null}

      <form onSubmit={handleSave} className="mt-6 grid gap-4 md:grid-cols-2">
        {[
          ["First name", "firstName"],
          ["Last name", "lastName"],
          ["Email", "email"],
          ["Phone", "phone"],
        ].map(([label, field]) => (
          <label key={field} className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
              {label}
            </span>
            <input
              value={form[field]}
              onChange={(event) =>
                setForm((current) => ({ ...current, [field]: event.target.value }))
              }
              className="w-full rounded-2xl border border-admin-border bg-admin-input px-4 py-3 text-sm text-white outline-none focus:border-border-gold/40"
            />
          </label>
        ))}

        <div className="md:col-span-2">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
            Avatar Image
          </span>
          <div className="rounded-[1.5rem] border border-admin-border bg-[#0f0f0f] p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border-gold/20 bg-gradient-to-br from-[#251c09] to-[#111111] ring-1 ring-border-gold/20">
                {currentAvatar ? (
                  <img src={currentAvatar} alt="Avatar preview" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-xl font-extrabold tracking-[0.08em] text-[#ffd36c]">
                    {initials}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">Upload a profile image</p>
                <p className="mt-1 text-xs text-stone-400">
                  JPG, JPEG, PNG, or WEBP. Maximum file size is 5MB.
                </p>
                <p className="mt-2 text-xs text-stone-300">
                  {avatarFileName || "No new file selected"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border-gold/25 bg-glass-gold px-4 py-3 text-sm font-semibold text-border-gold-hover transition hover:border-border-gold/40 hover:bg-glass-gold-hover"
              >
                <UploadCloud className="h-4 w-4" />
                {avatarFileName ? "Replace Image" : "Choose Image"}
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-2xl border border-border-gold/25 bg-glass-gold px-5 py-3 text-sm font-semibold text-border-gold-hover shadow-gold-glow transition hover:border-border-gold/40 hover:bg-glass-gold-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </span>
            ) : (
              "Save Profile"
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AdminProfilePage;
