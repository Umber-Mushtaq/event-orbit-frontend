import { useEffect, useState } from "react";
import { Loader2, LockKeyhole } from "lucide-react";
import { adminProfileApi, getAdminErrorMessage } from "../../../../services/adminApi";
import StatusIndicator from "../../../../shared_components/StatusIndecator";

function AdminChangePasswordPage() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!success) return undefined;
    const timer = window.setTimeout(() => setSuccess(""), 3000);
    return () => window.clearTimeout(timer);
  }, [success]);

  const handleSave = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (form.newPassword !== form.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    setSaving(true);
    try {
      await adminProfileApi.changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setSuccess("Password updated successfully.");
    } catch (requestError) {
      setError(
        getAdminErrorMessage(
          requestError,
          "Failed to update your password.",
        ),
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="mx-auto max-w-2xl rounded-[2rem] border border-admin-border bg-[linear-gradient(180deg,var(--admin-surface-2),var(--admin-surface))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
      <div className="flex items-center gap-3 border-b border-white/5 pb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border-gold/20 bg-glass-gold">
          <LockKeyhole className="h-5 w-5 text-border-gold-hover" />
        </div>
        <div>
          <h2 className="text-3xl font-black tracking-tight text-white">Change Password</h2>
          <p className="text-sm text-stone-400">Update your admin password securely.</p>
        </div>
      </div>

      <StatusIndicator error={error} success={success} />

      <form onSubmit={handleSave} className="mt-6 grid gap-4">
        {[
          ["Current password", "currentPassword"],
          ["New password", "newPassword"],
          ["Confirm new password", "confirmPassword"],
        ].map(([label, field]) => (
          <label key={field} className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
              {label}
            </span>
            <input
              type="password"
              value={form[field]}
              onChange={(event) =>
                setForm((current) => ({ ...current, [field]: event.target.value }))
              }
              className="w-full rounded-2xl border border-admin-border bg-admin-input px-4 py-3 text-sm text-white outline-none focus:border-border-gold/40"
            />
          </label>
        ))}

        <div className="flex justify-end pt-2">
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
              "Update Password"
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AdminChangePasswordPage;
