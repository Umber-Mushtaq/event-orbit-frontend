import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
} from "lucide-react";
import AppLogo from "../../../../shared_components/AppLogo";
import { adminNavigation } from "../../data/admin-data/adminNavigationData";
import { iconMap } from "./adminIconMap";
import {
  adminAuthApi,
  adminProfileApi,
  getAdminErrorMessage,
} from "../../../../services/adminApi";
import ModalShell from "./shared/ModalShell";

function AdminSidebar({
  isCollapsed,
  isMobileOpen,
  closeMobileOpen,
  toggleCollapsed,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profileEditorOpen, setProfileEditorOpen] = useState(false);
  const [preferencesEditorOpen, setPreferencesEditorOpen] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPreferences, setSavingPreferences] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [preferencesError, setPreferencesError] = useState("");
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
    avatar: "",
  });
  const [preferencesForm, setPreferencesForm] = useState({
    theme: "Dark",
    sidebarCollapsed: false,
    language: "en",
    notificationsEnabled: true,
  });

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
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
            avatar: nextProfile.avatar || nextProfile.profileImage || "",
          });
          setPreferencesForm({
            theme: nextProfile.preferences?.theme || "Dark",
            sidebarCollapsed: Boolean(
              nextProfile.preferences?.sidebarCollapsed,
            ),
            language: nextProfile.preferences?.language || "en",
            notificationsEnabled:
              nextProfile.preferences?.notificationsEnabled !== false,
          });
        }
      } catch {
        if (!active) return;
      }
    };

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  const activePath = useMemo(() => location.pathname, [location.pathname]);

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

  const handleProfileSave = async () => {
    setSavingProfile(true);
    setProfileError("");

    try {
      const response = await adminProfileApi.update({
        firstName: profileForm.firstName,
        lastName: profileForm.lastName,
        email: profileForm.email,
        phone: profileForm.phone,
        avatar: profileForm.avatar,
      });
      const nextProfile =
        response.data?.admin || response.data?.data || profile;
      setProfile(nextProfile);
      setProfileEditorOpen(false);
    } catch (error) {
      setProfileError(getAdminErrorMessage(error, "Failed to update profile."));
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
      setProfile((current) => ({
        ...current,
        preferences: nextPreferences,
      }));
      setPreferencesEditorOpen(false);
    } catch (error) {
      setPreferencesError(
        getAdminErrorMessage(error, "Failed to update preferences."),
      );
    } finally {
      setSavingPreferences(false);
    }
  };

  const sidebarWidth = isCollapsed ? "lg:w-[84px]" : "lg:w-[286px]";
  const mobileClass = isMobileOpen
    ? "translate-x-0"
    : "-translate-x-full lg:translate-x-0";
  const profileName =
    `${profile?.firstName || profile?.name?.split(" ")?.[0] || "Admin"} ${
      profile?.lastName || profile?.name?.split(" ")?.slice(1).join(" ") || ""
    }`.trim();
  const profileRole = profile?.role || "Admin";
  const profileAvatar = profile?.avatar || profile?.profileImage || "";
  const profileInitials = useMemo(() => {
    const first = profile?.firstName || profile?.name?.split(" ")?.[0] || "A";
    const last =
      profile?.lastName || profile?.name?.split(" ")?.slice(1).join(" ") || "";
    return `${first?.[0] || "A"}${last?.[0] || ""}`.toUpperCase();
  }, [profile]);

  return (
    <>
      {isMobileOpen ? (
        <button
          type="button"
          onClick={closeMobileOpen}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          aria-label="Close navigation"
        />
      ) : null}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[286px] flex-col border-r border-border-gold/10 bg-[#090909]/95 px-2 py-4 backdrop-blur-xl transition-all duration-300 ${sidebarWidth} ${mobileClass}`}
      >
        <div className="mb-4 flex items-center gap-2 px-1 relative">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <AppLogo
              to="/admin/dashboard"
              className="shrink-0"
              imgClassName={isCollapsed ? "w-8" : ""}
            />
            <div
              className={`text-[11px] font-semibold uppercase tracking-[0.3em] text-border-gold-hover/80 ${
                isCollapsed ? "hidden" : ""
              }`}
            >
              Workspace
            </div>
          </div>
          <button
            type="button"
            onClick={toggleCollapsed}
            className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#111111] text-stone-300 transition hover:border-border-gold/30 hover:text-white lg:inline-flex absolute -right-6 top-1/2 -translate-y-1/2"
            aria-label="Collapse sidebar"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
          <button
            type="button"
            onClick={closeMobileOpen}
            className="inline-flex rounded-full border border-white/10 bg-white/5 p-2 text-stone-300 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {adminNavigation.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive =
              item.path === "/admin/dashboard"
                ? activePath === item.path
                : activePath.startsWith(item.path);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMobileOpen}
                className={`group relative flex items-center gap-4 rounded-2xl border px-3 py-2.5 text-[17px] font-semibold transition-all duration-300 ${
                  isActive
                    ? "border-border-gold/35 bg-[#111318] text-[#ffd778] shadow-[0_0_0_1px_rgba(212,175,55,0.16)]"
                    : "border-transparent text-stone-300 hover:bg-white/5 hover:text-white"
                } ${
                  isCollapsed
                    ? "lg:mx-auto lg:h-12 lg:w-12 lg:justify-center lg:gap-0 lg:px-0"
                    : ""
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                {isActive ? (
                  <span
                    className={`absolute bg-border-gold ${
                      isCollapsed
                        ? "left-1/2 top-1 h-1 w-6 -translate-x-1/2 rounded-full"
                        : "left-0 top-2 bottom-2 w-1 rounded-r-full"
                    }`}
                  />
                ) : null}
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/5 bg-black/20 transition-all duration-300 ${
                    isActive
                      ? "text-border-gold-hover shadow-[0_0_0_1px_rgba(212,175,55,0.18)]"
                      : "text-border-gold-hover/80 group-hover:border-border-gold/20 group-hover:bg-white/5"
                  } ${isCollapsed ? "lg:h-11 lg:w-11" : ""}`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                </span>
                <span className={isCollapsed ? "lg:sr-only" : "block"}>
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </nav>

        <div
          className={`relative mt-4 rounded-[1.6rem] border border-white/8 bg-[#111111] p-3 ${isCollapsed ? "lg:p-2" : ""}`}
        >
          <button
            type="button"
            onClick={() => setProfileMenuOpen((open) => !open)}
            className={`flex w-full items-center gap-3 text-left ${
              isCollapsed ? "lg:flex-col lg:items-center lg:gap-2" : ""
            }`}
            aria-expanded={profileMenuOpen}
            aria-haspopup="menu"
          >
            {profileAvatar ? (
              <img
                src={profileAvatar}
                alt="Admin profile"
                className={`h-12 w-12 rounded-full object-cover ring-1 ring-border-gold/20 ${
                  isCollapsed ? "lg:h-11 lg:w-11" : ""
                }`}
              />
            ) : (
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full border border-border-gold/25 bg-gradient-to-br from-[#251c09] to-[#111111] text-sm font-extrabold tracking-[0.08em] text-[#ffd36c] ring-1 ring-border-gold/20 ${
                  isCollapsed ? "lg:h-11 lg:w-11" : ""
                }`}
                aria-label="Admin profile initials"
              >
                {profileInitials}
              </div>
            )}
            <div className={isCollapsed ? "lg:hidden" : "min-w-0 flex-1"}>
              <p className="truncate text-sm font-semibold text-white">
                {profileName}
              </p>
              <p className="text-xs text-stone-400">{profileRole}</p>
            </div>
            <ChevronDown
              className={`h-4 w-4 text-stone-300 transition-transform ${
                profileMenuOpen ? "rotate-180" : ""
              } ${isCollapsed ? "lg:hidden" : ""}`}
            />
          </button>

          {profileMenuOpen ? (
            <div
              role="menu"
              className="absolute bottom-[calc(100%+10px)] left-3 right-3 z-50 rounded-2xl border border-white/10 bg-[#111111] p-2 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => {
                  setProfileMenuOpen(false);
                  setProfileEditorOpen(true);
                }}
                className="w-full rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-left text-sm text-stone-200 transition hover:border-border-gold/30 hover:text-white"
                role="menuitem"
              >
                Profile settings
              </button>
              <button
                type="button"
                onClick={() => {
                  setProfileMenuOpen(false);
                  setPreferencesEditorOpen(true);
                }}
                className="mt-2 w-full rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-left text-sm text-stone-200 transition hover:border-border-gold/30 hover:text-white"
                role="menuitem"
              >
                Workspace preferences
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 flex w-full items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-stone-200 transition hover:border-red-400/30 hover:text-white"
                role="menuitem"
              >
                <LogOut className="h-4 w-4 text-border-gold-hover/80" />
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </aside>

      {profileEditorOpen ? (
        <ModalShell
          open={profileEditorOpen}
          outerClassName="z-[70]"
          innerClassName="max-w-lg"
        >
          <div className="rounded-[2rem] border border-border-gold/15 bg-[#111111] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.6)] max-h-[calc(100vh-4rem)] overflow-y-auto">
            <h3 className="text-2xl font-black text-white">Profile settings</h3>
            {profileError ? (
              <p className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {profileError}
              </p>
            ) : null}
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {[
                ["First name", "firstName"],
                ["Last name", "lastName"],
                ["Email", "email"],
                ["Phone", "phone"],
                ["Avatar URL", "avatar"],
              ].map(([label, field]) => (
                <label
                  key={field}
                  className={field === "avatar" ? "md:col-span-2" : ""}
                >
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                    {label}
                  </span>
                  <input
                    value={profileForm[field]}
                    onChange={(event) =>
                      setProfileForm((current) => ({
                        ...current,
                        [field]: event.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-border-gold/40"
                  />
                </label>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setProfileEditorOpen(false)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-stone-200 transition hover:border-border-gold/30 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={savingProfile}
                onClick={handleProfileSave}
                className="rounded-2xl border border-border-gold/25 bg-glass-gold px-4 py-3 text-sm font-semibold text-border-gold-hover shadow-gold-glow transition hover:border-border-gold/40 hover:bg-glass-gold-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                {savingProfile ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </div>
        </ModalShell>
      ) : null}

      {preferencesEditorOpen ? (
        <ModalShell
          open={preferencesEditorOpen}
          outerClassName="z-[70]"
          innerClassName="max-w-lg"
        >
          <div className="rounded-[2rem] border border-border-gold/15 bg-[#111111] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.6)] max-h-[calc(100vh-4rem)] overflow-y-auto">
            <h3 className="text-2xl font-black text-white">
              Workspace preferences
            </h3>
            {preferencesError ? (
              <p className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {preferencesError}
              </p>
            ) : null}
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                  Theme
                </span>
                <select
                  value={preferencesForm.theme}
                  onChange={(event) =>
                    setPreferencesForm((current) => ({
                      ...current,
                      theme: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-border-gold/40"
                >
                  <option value="Dark">Dark</option>
                  <option value="Light">Light</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                  Language
                </span>
                <input
                  value={preferencesForm.language}
                  onChange={(event) =>
                    setPreferencesForm((current) => ({
                      ...current,
                      language: event.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-border-gold/40"
                />
              </label>
              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 md:col-span-2">
                <input
                  type="checkbox"
                  checked={preferencesForm.sidebarCollapsed}
                  onChange={(event) =>
                    setPreferencesForm((current) => ({
                      ...current,
                      sidebarCollapsed: event.target.checked,
                    }))
                  }
                  className="h-4 w-4 accent-[#d69d2f]"
                />
                <span className="text-sm text-stone-200">
                  Sidebar collapsed by default
                </span>
              </label>
              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 md:col-span-2">
                <input
                  type="checkbox"
                  checked={preferencesForm.notificationsEnabled}
                  onChange={(event) =>
                    setPreferencesForm((current) => ({
                      ...current,
                      notificationsEnabled: event.target.checked,
                    }))
                  }
                  className="h-4 w-4 accent-[#d69d2f]"
                />
                <span className="text-sm text-stone-200">
                  Enable notifications
                </span>
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setPreferencesEditorOpen(false)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-stone-200 transition hover:border-border-gold/30 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={savingPreferences}
                onClick={handlePreferencesSave}
                className="rounded-2xl border border-border-gold/25 bg-glass-gold px-4 py-3 text-sm font-semibold text-border-gold-hover shadow-gold-glow transition hover:border-border-gold/40 hover:bg-glass-gold-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                {savingPreferences ? "Saving..." : "Save Preferences"}
              </button>
            </div>
          </div>
        </ModalShell>
      ) : null}
    </>
  );
}

export default AdminSidebar;
