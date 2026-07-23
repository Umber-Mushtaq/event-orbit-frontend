import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  ChevronDown,
  Home,
  KeyRound,
  Search,
  Settings,
  Sparkles,
  UserCircle2,
  LogOut,
} from "lucide-react";
import { adminAuthApi, adminProfileApi } from "../../../../services/adminApi";
import ThemeToggle from "../../../../shared_components/ThemeToggle";

function Menu({ trigger, children, align = "right" }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={menuRef} className="relative">
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setOpen((value) => !value);
          }
        }}
        className="cursor-pointer"
      >
        {trigger}
      </div>
      {open ? (
        <div
          className={`absolute top-[calc(100%+10px)] z-50 w-80 rounded-3xl border border-border bg-popover p-3 text-popover-foreground shadow-[0_20px_70px_rgba(0,0,0,0.18)] ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {children({ close: () => setOpen(false) })}
        </div>
      ) : null}
    </div>
  );
}

function AdminTopbar({ toggleMobileOpen, globalSearch, setGlobalSearch }) {
  const [profile, setProfile] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const loadTopbarData = async () => {
      try {
        const profileRes = await adminProfileApi.get();
        if (!active) return;
        setProfile(profileRes.data?.data || profileRes.data?.admin || null);
      } catch {
        if (!active) return;
      }
    };

    loadTopbarData();

    return () => {
      active = false;
    };
  }, []);

  const profileName =
    `${profile?.firstName || profile?.name?.split(" ")?.[0] || "Admin"} ${
      profile?.lastName || profile?.name?.split(" ")?.slice(1).join(" ") || ""
    }`.trim();
  const profileRole = profile?.role || "Admin";

  const handleLogout = async () => {
    try {
      await adminAuthApi.logout();
    } catch {
      // Keep logout resilient even if the API is unavailable.
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/auth/login");
    }
  };

  const menuItems = useMemo(
    () => [
      { label: "Home", icon: Home, to: "/" },
      { label: "Profile", icon: UserCircle2, to: "/admin/profile" },
      { label: "Account Settings", icon: Settings, to: "/admin/settings" },
      {
        label: "Change Password",
        icon: KeyRound,
        to: "/admin/change-password",
      },
    ],
    [],
  );

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 px-4 py-4 backdrop-blur-xl md:px-6 lg:px-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleMobileOpen}
            className="inline-flex rounded-2xl border border-border bg-card p-3 text-foreground transition hover:border-primary/30 lg:hidden"
            aria-label="Open sidebar"
          >
            <Sparkles className="h-4 w-4" />
          </button>
          <div className="relative w-full max-w-2xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={globalSearch}
              onChange={(event) => setGlobalSearch(event.target.value)}
              placeholder="Global search for events, vendors, users..."
              className="w-full rounded-2xl border border-border bg-background py-3.5 pl-11 pr-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary/40"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <ThemeToggle />
          <Menu
            trigger={
              <button className="inline-flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-2.5 text-sm text-foreground transition hover:border-primary/30">
                <div className="h-9 w-9 overflow-hidden rounded-2xl border border-primary/20 bg-muted/70">
                  <UserCircle2 className="h-full w-full p-1.5 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-foreground">
                    {profileName}
                  </p>
                  <p className="text-[11px] text-muted-foreground">{profileRole}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
            }
          >
            {({ close }) => (
              <div className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.to === "/"
                      ? location.pathname === "/"
                      : location.pathname === item.to ||
                        location.pathname.startsWith(`${item.to}/`);

                  return (
                    <button
                      key={item.to}
                      type="button"
                      onClick={() => {
                        close();
                        navigate(item.to);
                      }}
                      className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left text-sm transition ${
                        isActive
                          ? "border-primary/30 bg-primary/10 text-foreground"
                          : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      {item.label}
                    </button>
                  );
                })}
                <button
                  type="button"
                  onClick={async () => {
                    close();
                    await handleLogout();
                  }}
                  className="flex w-full items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-left text-sm font-semibold text-muted-foreground transition hover:border-red-400/30 hover:text-foreground"
                >
                  <LogOut className="h-4 w-4 text-primary" />
                  Logout
                </button>
              </div>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default AdminTopbar;
