import { useState } from "react";
import { MapPin, Search, Star } from "lucide-react";
import VendorActionMenu from "./VendorActionMenu";
import {
  vendorFilters,
  vendorSortOptions,
  vendorStatusStyles,
} from "../../../data/admin-data/vendorManagementData";

const getVendorInitials = (name = "") =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "V";

function VendorAvatar({ src, name, className = "" }) {
  const [hasError, setHasError] = useState(false);
  const initials = getVendorInitials(name);

  return (
    <div className={`relative overflow-hidden rounded-2xl ring-1 ring-white/10 ${className}`}>
      {src && !hasError ? (
        <img
          src={src}
          alt={name}
          onError={() => setHasError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,rgba(243,200,92,0.2),rgba(17,17,17,0.95))] text-[11px] font-black uppercase tracking-[0.18em] text-border-gold-hover">
          {initials}
        </div>
      )}
    </div>
  );
}

function VendorsTable({
  rows = [],
  query = "",
  onQueryChange,
  activeFilter,
  onFilterChange,
  sortKey,
  onSortChange,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <section className='rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(12,12,12,0.98),rgba(7,7,7,0.98))] p-4 shadow-[0_14px_40px_rgba(0,0,0,0.35)] md:p-5'>
      <div className='mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
        <div className='relative w-full lg:max-w-[62%]'>
          <Search className='pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500' />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder='Search vendors, categories, cities...'
            className='w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-stone-500 focus:border-border-gold/40'
          />
        </div>

        <div className='flex flex-wrap items-center gap-2 rounded-2xl border border-white/8 bg-black/20 p-1.5'>
          {vendorFilters.map((filter) => {
            const active = activeFilter === filter;
            return (
              <button
                key={filter}
                type='button'
                onClick={() => onFilterChange(filter)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-[linear-gradient(180deg,#f3c85c,#d69d2f)] text-black"
                    : "text-stone-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <select
          value={sortKey}
          onChange={(event) => onSortChange(event.target.value)}
          className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-border-gold/40'
        >
          {vendorSortOptions.map((option) => (
            <option key={option.value} value={option.value} className='bg-[#111111]'>
              Sort: {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className='overflow-hidden rounded-2xl border border-white/8'>
        <div className='overflow-x-auto'>
          <table className='min-w-full text-left text-sm'>
            <thead className='bg-white/5 text-[11px] uppercase tracking-[0.22em] text-stone-400'>
              <tr>
                {["Vendor", "Category", "Location", "Rating", "Bookings", "Revenue", "Status"].map(
                  (label) => (
                    <th key={label} className='px-4 py-4 font-semibold'>
                      {label}
                    </th>
                  ),
                )}
                <th className='px-4 py-4 font-semibold'>Actions</th>
              </tr>
            </thead>

            <tbody className='divide-y divide-white/8'>
              {rows.length ? (
                rows.map((vendor) => (
                  <tr key={vendor.id} className='bg-black/10 transition-colors hover:bg-white/3'>
                    <td className='px-4 py-4'>
                      <div className='flex items-center gap-3'>
                        <VendorAvatar
                          src={vendor.avatar}
                          name={vendor.name}
                          className='h-10 w-10 shrink-0'
                        />
                        <div>
                          <p className='font-semibold text-white'>{vendor.name}</p>
                          <p className='text-xs text-stone-500'>{vendor.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className='px-4 py-4 text-stone-300'>{vendor.category}</td>
                    <td className='px-4 py-4 text-stone-300'>
                      <span className='inline-flex items-center gap-2'>
                        <MapPin className='h-3.5 w-3.5 text-border-gold-hover' />
                        {vendor.location}
                      </span>
                    </td>
                    <td className='px-4 py-4 font-semibold text-white'>
                      <span className='inline-flex items-center gap-1.5'>
                        <Star className='h-3.5 w-3.5 text-border-gold-hover' />
                        {vendor.rating}
                      </span>
                    </td>
                    <td className='px-4 py-4 font-semibold text-white'>{vendor.bookings}</td>
                    <td className='px-4 py-4 font-semibold text-white'>{vendor.revenue}</td>
                    <td className='px-4 py-4'>
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                          vendorStatusStyles[vendor.status] || vendorStatusStyles.Pending
                        }`}
                      >
                        {vendor.status}
                      </span>
                    </td>
                    <td className='px-4 py-4'>
                      <VendorActionMenu
                        onView={() => onView(vendor)}
                        onEdit={() => onEdit(vendor)}
                        onDelete={() => onDelete(vendor)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='8' className='px-6 py-12 text-center text-stone-400'>
                    No vendors match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default VendorsTable;
