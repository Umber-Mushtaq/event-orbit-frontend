import { X, MapPin, Star } from "lucide-react";
import { vendorStatusStyles } from "../../../data/admin-data/vendorManagementData";
import ModalShell from "../shared/ModalShell";

function VendorDetailModal({ open, vendor, onClose }) {
  if (!open || !vendor) return null;

  return (
    <ModalShell open={open} innerClassName="max-w-2xl">
      <div className="overflow-hidden rounded-[2rem] border border-border-gold/15 bg-[#111111] shadow-[0_30px_80px_rgba(0,0,0,0.6)] max-h-[calc(100vh-4rem)]">
        <div className="relative h-56 bg-[#0f0f0f]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.14),transparent_40%)]" />
          <div className="absolute right-4 top-4">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-white transition hover:border-border-gold/30"
              aria-label="Close vendor details"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-end gap-4">
              <img
                src={vendor.avatar}
                alt={vendor.name}
                className="h-20 w-20 rounded-3xl object-cover ring-1 ring-white/10"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-border-gold-hover/80">
                  Vendor Details
                </p>
                <h3 className="mt-2 text-3xl font-black text-white">
                  {vendor.name}
                </h3>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-6 md:grid-cols-2">
          {[
            ["ID", vendor.id],
            ["Category", vendor.category],
            ["Location", vendor.location],
            ["Rating", vendor.rating],
            ["Bookings", vendor.bookings],
            ["Revenue", vendor.revenue],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl border border-white/8 bg-white/5 p-4"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
                {label}
              </p>
              <p className="mt-2 text-lg font-bold text-white">{value}</p>
            </div>
          ))}
          <div className="rounded-3xl border border-white/8 bg-white/5 p-4 md:col-span-2">
            <p className="text-xs uppercase tracking-[0.22em] text-stone-500">
              Status
            </p>
            <span
              className={`mt-3 inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${vendorStatusStyles[vendor.status]}`}
            >
              {vendor.status}
            </span>
            <div className="mt-4 flex items-center gap-2 text-sm text-stone-300">
              <MapPin className="h-4 w-4 text-border-gold-hover" />
              {vendor.location}
              <Star className="ml-2 h-4 w-4 text-border-gold-hover" />
              {vendor.rating}
            </div>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

export default VendorDetailModal;
