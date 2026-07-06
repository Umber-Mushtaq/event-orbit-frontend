import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  ChevronDown,
  Mail,
  MoonStar,
  Plus,
  Search,
  Sparkles,
  UserCircle2,
} from "lucide-react";
import { adminDashboardApi, adminProfileApi } from "../../api/adminApi";

function Menu({ trigger, children, align = "right" }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
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
          className={`absolute top-[calc(100%+10px)] z-50 w-80 rounded-3xl border border-border-gold/15 bg-[#111111] p-3 shadow-[0_20px_70px_rgba(0,0,0,0.5)] ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {children({ close: () => setOpen(false) })}
        </div>
      ) : null}
    </div>
  );
}

function AdminTopbar({
  toggleMobileOpen,
  globalSearch,
  setGlobalSearch,
  themeMode,
  toggleTheme,
}) {
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let active = true;

    const loadTopbarData = async () => {
      try {
        const [notificationsRes, messagesRes, profileRes] =
          await Promise.allSettled([
            adminDashboardApi.notifications(),
            adminDashboardApi.messages(),
            adminProfileApi.get(),
          ]);

        if (!active) return;

        if (notificationsRes.status === "fulfilled") {
          setNotifications(notificationsRes.value.data?.data || []);
        }
        if (messagesRes.status === "fulfilled") {
          setMessages(messagesRes.value.data?.data || []);
        }
        if (profileRes.status === "fulfilled") {
          setProfile(
            profileRes.value.data?.data || profileRes.value.data?.admin || null,
          );
        }
      } catch {
        if (!active) return;
      }
    };

    loadTopbarData();

    return () => {
      active = false;
    };
  }, []);

  const notificationCount = useMemo(
    () => notifications.length,
    [notifications.length],
  );
  const messageCount = useMemo(() => messages.length, [messages.length]);
  const profileName =
    `${profile?.firstName || profile?.name?.split(" ")?.[0] || "Admin"} ${
      profile?.lastName || profile?.name?.split(" ")?.slice(1).join(" ") || ""
    }`.trim();
  const profileRole = profile?.role || "Admin";

  return (
    <header className="sticky top-0 z-30 -mx-4 border-b border-white/5 bg-[#0b0b0b]/85 px-4 py-4 backdrop-blur-xl md:-mx-6 md:px-6 lg:-mx-8 lg:px-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleMobileOpen}
            className="inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 text-white transition hover:border-border-gold/30 lg:hidden"
            aria-label="Open sidebar"
          >
            <Sparkles className="h-4 w-4" />
          </button>
          <div className="relative w-full max-w-2xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
            <input
              value={globalSearch}
              onChange={(event) => setGlobalSearch(event.target.value)}
              placeholder="Global search for events, vendors, users..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-stone-500 focus:border-border-gold/40"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Menu
            trigger={
              <button className="relative inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 text-white transition hover:border-border-gold/30">
                <Bell className="h-4 w-4" />
                <span className="absolute -right-1 -top-1 rounded-full bg-border-gold px-1.5 py-0.5 text-[10px] font-bold text-black">
                  {notificationCount}
                </span>
              </button>
            }
          >
            {({ close }) => (
              <div className="space-y-3">
                <p className="px-1 text-xs font-semibold uppercase tracking-[0.2em] text-border-gold-hover/80">
                  Notifications
                </p>
                {notifications.map((item) => (
                  <button
                    key={item.id || item.title}
                    onClick={close}
                    className="w-full rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-left transition hover:border-border-gold/30"
                  >
                    <p className="text-sm font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-stone-400">
                      {item.description}
                    </p>
                    <p className="mt-2 text-[11px] text-stone-500">
                      {item.time}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </Menu>

          <Menu
            trigger={
              <button className="relative inline-flex rounded-2xl border border-white/10 bg-white/5 p-3 text-white transition hover:border-border-gold/30">
                <Mail className="h-4 w-4" />
                <span className="absolute -right-1 -top-1 rounded-full bg-emerald-400 px-1.5 py-0.5 text-[10px] font-bold text-black">
                  {messageCount}
                </span>
              </button>
            }
          >
            {({ close }) => (
              <div className="space-y-3">
                <p className="px-1 text-xs font-semibold uppercase tracking-[0.2em] text-border-gold-hover/80">
                  Messages
                </p>
                {messages.map((item) => (
                  <button
                    key={item.id || item.title}
                    onClick={close}
                    className="w-full rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-left transition hover:border-border-gold/30"
                  >
                    <p className="text-sm font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-stone-400">
                      {item.description}
                    </p>
                    <p className="mt-2 text-[11px] text-stone-500">
                      {item.time}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </Menu>

          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-border-gold/30"
          >
            <MoonStar className="h-4 w-4 text-border-gold-hover" />
            {themeMode === "midnight" ? "Midnight" : "Obsidian"}
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-2xl border border-border-gold/25 bg-glass-gold px-4 py-3 text-sm font-semibold text-border-gold-hover shadow-gold-glow transition hover:border-border-gold/40 hover:bg-glass-gold-hover"
          >
            <Plus className="h-4 w-4" />
            Add Event
          </button>

          <Menu
            trigger={
              <button className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white transition hover:border-border-gold/30">
                <div className="h-9 w-9 overflow-hidden rounded-2xl border border-border-gold/20 bg-black/30">
                  <UserCircle2 className="h-full w-full p-1.5 text-border-gold-hover" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">
                    {profileName}
                  </p>
                  <p className="text-[11px] text-stone-400">{profileRole}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-stone-400" />
              </button>
            }
          >
            {({ close }) => (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={close}
                  className="w-full rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-left text-sm text-stone-200 transition hover:border-border-gold/30 hover:text-white"
                >
                  Profile settings
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="w-full rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-left text-sm text-stone-200 transition hover:border-border-gold/30 hover:text-white"
                >
                  Workspace preferences
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
