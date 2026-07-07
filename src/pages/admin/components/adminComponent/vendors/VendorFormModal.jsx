import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { emptyVendorForm } from "../../../data/admin-data/vendorManagementData";
import ModalShell from "../shared/ModalShell";

function VendorFormModal({ open, mode = "create", initialValue, onClose, onSave, submitError = "" }) {
  const [form, setForm] = useState(emptyVendorForm);

  useEffect(() => {
    if (open) setForm(initialValue || emptyVendorForm);
  }, [initialValue, open]);

  if (!open) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.category.trim() || !form.location.trim()) return;
    onSave(form);
  };

  return (
    <ModalShell open={open} innerClassName='max-w-2xl'>
      <div className='rounded-[2rem] border border-border-gold/15 bg-[#111111] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.6)] max-h-[calc(100vh-4rem)] overflow-y-auto'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.24em] text-border-gold-hover/80'>
              {mode === "edit" ? "Edit Vendor" : "Add Vendor"}
            </p>
            <h3 className='mt-2 text-2xl font-black text-white'>
              {mode === "edit" ? "Update vendor details" : "Create a vendor profile"}
            </h3>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-stone-200 transition hover:border-border-gold/30 hover:text-white'
            aria-label='Close vendor form'
          >
            <X className='h-4 w-4' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='mt-6 grid gap-4 md:grid-cols-2'>
          {submitError ? (
            <p className='md:col-span-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200'>
              {submitError}
            </p>
          ) : null}
          {[
            ["Vendor Name", "name", "text", "Enter vendor name"],
            ["Category", "category", "text", "Enter category"],
            ["Location", "location", "text", "City or venue area"],
            ["Rating", "rating", "number", "4.8"],
            ["Bookings", "bookings", "number", "142"],
            ["Revenue", "revenue", "text", "$184,000"],
          ].map(([label, field, type, placeholder]) => (
            <label key={field} className='block'>
              <span className='mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400'>
                {label}
              </span>
              <input
                type={type}
                value={form[field]}
                onChange={(event) =>
                  setForm((current) => ({ ...current, [field]: event.target.value }))
                }
                placeholder={placeholder}
                className='w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-stone-500 focus:border-border-gold/40'
              />
            </label>
          ))}

          <label className='block md:col-span-2'>
            <span className='mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400'>
              Status
            </span>
            <select
              value={form.status}
              onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
              className='w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-border-gold/40'
            >
              {["Approved", "Pending", "Rejected", "Suspended"].map((status) => (
                <option key={status} value={status} className='bg-[#111111]'>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <div className='md:col-span-2 flex justify-end gap-3'>
            <button
              type='button'
              onClick={onClose}
              className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-stone-200 transition hover:border-border-gold/30 hover:text-white'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='rounded-2xl border border-border-gold/25 bg-glass-gold px-5 py-3 text-sm font-semibold text-border-gold-hover shadow-gold-glow transition hover:border-border-gold/40 hover:bg-glass-gold-hover'
            >
              {mode === "edit" ? "Update Vendor" : "Save Vendor"}
            </button>
          </div>
        </form>
      </div>
    </ModalShell>
  );
}

export default VendorFormModal;
