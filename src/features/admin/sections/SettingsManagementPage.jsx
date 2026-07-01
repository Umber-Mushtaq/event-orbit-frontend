import { useEffect, useMemo, useState } from "react";
import { iconMap } from "../components/adminIconMap";
import { adminSettingsApi, getAdminErrorMessage } from "../api/adminApi";

function SettingsManagementPage() {
  const [settings, setSettings] = useState(null);
  const [form, setForm] = useState({
    currency: "USD",
    timezone: "UTC",
    autoApproveCategories: false,
    themeModes: ["Light", "Dark"],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadSettings = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await adminSettingsApi.get();
        if (!active) return;
        const nextSettings = response.data?.data || {};
        setSettings(nextSettings);
        setForm({
          currency: nextSettings.platform?.currency || "USD",
          timezone: nextSettings.platform?.timezone || "UTC",
          autoApproveCategories: Boolean(nextSettings.categories?.autoApprove),
          themeModes: nextSettings.platform?.themeModes || ["Light", "Dark"],
        });
      } catch (requestError) {
        if (!active) return;
        setError(getAdminErrorMessage(requestError, "Failed to load settings."));
      } finally {
        if (active) setLoading(false);
      }
    };

    loadSettings();

    return () => {
      active = false;
    };
  }, []);

  const settingsCards = useMemo(() => {
    const roles = settings?.roles || ["Super Admin", "Admin", "Vendor", "User", "Viewer"];
    const team = settings?.team || {};
    const categories = settings?.categories || {};
    const platform = settings?.platform || {};

    return [
      {
        title: "Roles & Permissions",
        description: "Role-based access control for admins, vendors and users.",
        icon: "shield-alert",
        chips: roles,
      },
      {
        title: "Team",
        description: "Manage internal team members and their access levels.",
        icon: "users",
        chips: [
          `${team.totalMembers ?? 0} members`,
          `${team.admins ?? 0} admins`,
          `${team.staff ?? 0} staff`,
        ],
      },
      {
        title: "Category Settings",
        description: "Default fields, taxonomy and visibility for service categories.",
        icon: "sparkles",
        chips: [
          `${categories.total ?? 0} categories`,
          `${categories.hidden ?? 0} hidden`,
          `Auto-approve: ${categories.autoApprove ? "on" : "off"}`,
        ],
      },
      {
        title: "Platform Configuration",
        description: "Currency, timezone, branding and notification defaults.",
        icon: "settings",
        chips: [
          platform.currency || "USD",
          platform.timezone || "UTC",
          (platform.themeModes || ["Light", "Dark"]).join(" & "),
        ],
      },
    ];
  }, [settings]);

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await adminSettingsApi.update({
        currency: form.currency,
        timezone: form.timezone,
        autoApproveCategories: form.autoApproveCategories,
        themeModes: form.themeModes,
      });
      setSettings(response.data?.data || {});
    } catch (requestError) {
      setError(getAdminErrorMessage(requestError, "Failed to update settings."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className='space-y-6'>
      <section>
        <h1 className='text-3xl font-black tracking-tight text-white md:text-4xl'>Settings</h1>
        <p className='mt-2 text-sm text-stone-400'>
          Configure roles, permissions, and platform-wide defaults.
        </p>
      </section>

      {error ? (
        <div className='rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200'>
          {error}
        </div>
      ) : null}

      <section className='grid gap-4 lg:grid-cols-2'>
        {settingsCards.map((card) => {
          const Icon = iconMap[card.icon] || iconMap.settings;

          return (
            <article
              key={card.title}
              className='rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(12,12,12,0.98),rgba(7,7,7,0.98))] p-5 shadow-[0_14px_40px_rgba(0,0,0,0.35)]'
            >
              <div className='flex items-start gap-4'>
                <div className='inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-border-gold/25 bg-black/25 text-border-gold-hover'>
                  <Icon className='h-5 w-5' />
                </div>
                <div className='min-w-0'>
                  <h2 className='text-xl font-black tracking-tight text-white'>{card.title}</h2>
                  <p className='mt-1 text-sm text-stone-400'>{card.description}</p>
                </div>
              </div>

              <div className='mt-5 flex flex-wrap gap-2'>
                {card.chips.map((chip) => (
                  <span
                    key={chip}
                    className='rounded-full border border-white/8 bg-white/5 px-3 py-1 text-xs font-semibold text-stone-300'
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </section>

      <form
        onSubmit={handleSave}
        className='rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(12,12,12,0.98),rgba(7,7,7,0.98))] p-5 shadow-[0_14px_40px_rgba(0,0,0,0.35)]'
      >
        <div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
          <div>
            <h2 className='text-xl font-black tracking-tight text-white'>Platform Configuration</h2>
            <p className='mt-1 text-sm text-stone-400'>Update the live backend settings values.</p>
          </div>
          <button
            type='submit'
            disabled={saving}
            className='rounded-2xl border border-border-gold/25 bg-glass-gold px-5 py-3 text-sm font-semibold text-border-gold-hover shadow-gold-glow transition hover:border-border-gold/40 hover:bg-glass-gold-hover disabled:cursor-not-allowed disabled:opacity-60'
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>

        <div className='mt-5 grid gap-4 md:grid-cols-2'>
          <label className='block'>
            <span className='mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400'>
              Currency
            </span>
            <input
              value={form.currency}
              onChange={(event) => setForm((current) => ({ ...current, currency: event.target.value }))}
              className='w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-border-gold/40'
            />
          </label>
          <label className='block'>
            <span className='mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400'>
              Timezone
            </span>
            <input
              value={form.timezone}
              onChange={(event) => setForm((current) => ({ ...current, timezone: event.target.value }))}
              className='w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-border-gold/40'
            />
          </label>
          <label className='flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 md:col-span-2'>
            <input
              type='checkbox'
              checked={form.autoApproveCategories}
              onChange={(event) =>
                setForm((current) => ({ ...current, autoApproveCategories: event.target.checked }))
              }
              className='h-4 w-4 accent-[#d69d2f]'
            />
            <span className='text-sm text-stone-200'>Auto-approve categories</span>
          </label>
        </div>
      </form>

      {loading ? <p className='text-xs text-stone-500'>Loading settings...</p> : null}
    </div>
  );
}

export default SettingsManagementPage;
