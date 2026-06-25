import { useMemo, useState } from "react";
import { MapPin, Plus, Star } from "lucide-react";
import SharedHeader from "../components/shared/SharedHeader";
import SharedCards from "../components/shared/SharedCards";
import SharedTable from "../components/shared/SharedTable";
import VendorActionMenu from "../components/vendors/VendorActionMenu";
import VendorFormModal from "../components/vendors/VendorFormModal";
import VendorDetailModal from "../components/vendors/VendorDetailModal";
import {
  emptyVendorForm,
  initialVendors,
  vendorFilters,
  vendorSortOptions,
  vendorStatusStyles,
  vendorStats,
} from "../data/vendorManagementData";

function VendorManagementPage() {
  const [vendors, setVendors] = useState(initialVendors);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortKey, setSortKey] = useState("revenue");
  const [formOpen, setFormOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [viewingVendor, setViewingVendor] = useState(null);
  const [deletingVendor, setDeletingVendor] = useState(null);

  const rows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = vendors.filter((vendor) => {
      const matchesFilter = filter === "All" || vendor.status === filter;
      const matchesQuery =
        `${vendor.name} ${vendor.category} ${vendor.location}`.toLowerCase().includes(normalized);
      return matchesFilter && matchesQuery;
    });

    return [...filtered].sort((left, right) => {
      if (sortKey === "name") return left.name.localeCompare(right.name);
      const toNumber = (value) => Number(String(value).replace(/[$,]/g, "")) || 0;
      return toNumber(right[sortKey]) - toNumber(left[sortKey]);
    });
  }, [filter, query, sortKey, vendors]);

  const columns = [
    {
      key: "vendor",
      label: "Vendor",
      render: (vendor) => (
        <div className='flex items-center gap-3'>
          <img
            src={vendor.avatar}
            alt={vendor.name}
            className='h-10 w-10 rounded-2xl object-cover ring-1 ring-white/10'
          />
          <div>
            <p className='font-semibold text-white'>{vendor.name}</p>
            <p className='text-xs text-stone-500'>{vendor.id}</p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (vendor) => <span className='text-stone-300'>{vendor.category}</span>,
    },
    {
      key: "location",
      label: "Location",
      render: (vendor) => (
        <span className='inline-flex items-center gap-2 text-stone-300'>
          <MapPin className='h-3.5 w-3.5 text-border-gold-hover' />
          {vendor.location}
        </span>
      ),
    },
    {
      key: "rating",
      label: "Rating",
      render: (vendor) => (
        <span className='inline-flex items-center gap-1.5 font-semibold text-white'>
          <Star className='h-3.5 w-3.5 text-border-gold-hover' />
          {vendor.rating}
        </span>
      ),
    },
    {
      key: "bookings",
      label: "Bookings",
      render: (vendor) => <span className='font-semibold text-white'>{vendor.bookings}</span>,
    },
    {
      key: "revenue",
      label: "Revenue",
      render: (vendor) => <span className='font-semibold text-white'>{vendor.revenue}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (vendor) => (
        <span
          className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
            vendorStatusStyles[vendor.status] || vendorStatusStyles.Pending
          }`}
        >
          {vendor.status}
        </span>
      ),
    },
  ];

  const handleSave = (payload) => {
    if (!payload.name.trim() || !payload.category.trim() || !payload.location.trim()) return;

    if (editingVendor) {
      setVendors((current) =>
        current.map((item) =>
          item.id === editingVendor.id
            ? {
                ...item,
                name: payload.name,
                category: payload.category,
                location: payload.location,
                rating: Number(payload.rating) || item.rating,
                bookings: Number(payload.bookings) || item.bookings,
                revenue: payload.revenue,
                status: payload.status,
              }
            : item,
        ),
      );
    } else {
      setVendors((current) => [
        {
          id: `VND-${Date.now().toString().slice(-3)}`,
          name: payload.name,
          category: payload.category,
          location: payload.location,
          rating: Number(payload.rating) || 4.5,
          bookings: Number(payload.bookings) || 0,
          revenue: payload.revenue || "$0",
          status: payload.status,
          avatar: current[0]?.avatar || "",
        },
        ...current,
      ]);
    }

    setFormOpen(false);
    setEditingVendor(null);
  };

  return (
    <div className='space-y-6'>
      <SharedHeader
        title='Vendor Management'
        description='Approve applications, monitor performance, and manage vendor relationships.'
        actionLabel='Add Vendor'
        actionIcon={Plus}
        onAction={() => {
          setEditingVendor(null);
          setFormOpen(true);
        }}
      />

      <SharedCards items={vendorStats} />

      <SharedTable
        rows={rows}
        query={query}
        onQueryChange={setQuery}
        activeFilter={filter}
        onFilterChange={setFilter}
        sortKey={sortKey}
        onSortChange={setSortKey}
        columns={columns}
        filters={vendorFilters}
        sortOptions={vendorSortOptions}
        searchPlaceholder='Search vendors, categories, cities...'
        showActions
        renderActions={(vendor) => (
          <VendorActionMenu
            onView={() => setViewingVendor(vendor)}
            onEdit={() => {
              setEditingVendor(vendor);
              setFormOpen(true);
            }}
            onDelete={() => setDeletingVendor(vendor)}
          />
        )}
      />

      <VendorFormModal
        open={formOpen}
        mode={editingVendor ? "edit" : "create"}
        initialValue={editingVendor || emptyVendorForm}
        onClose={() => {
          setFormOpen(false);
          setEditingVendor(null);
        }}
        onSave={handleSave}
      />

      <VendorDetailModal
        open={Boolean(viewingVendor)}
        vendor={viewingVendor}
        onClose={() => setViewingVendor(null)}
      />

      {deletingVendor ? (
        <div className='fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm'>
          <div className='w-full max-w-md rounded-[2rem] border border-border-gold/15 bg-[#111111] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.6)]'>
            <p className='text-xs font-semibold uppercase tracking-[0.24em] text-border-gold-hover/80'>
              Delete Vendor
            </p>
            <h3 className='mt-3 text-xl font-black text-white'>Remove this vendor?</h3>
            <p className='mt-3 text-sm leading-relaxed text-stone-400'>
              This will permanently delete <span className='text-white'>{deletingVendor.name}</span>.
            </p>
            <div className='mt-6 flex flex-wrap justify-end gap-3'>
              <button
                type='button'
                onClick={() => setDeletingVendor(null)}
                className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-stone-200 transition hover:border-border-gold/30 hover:text-white'
              >
                Cancel
              </button>
              <button
                type='button'
                onClick={() => {
                  setVendors((current) => current.filter((item) => item.id !== deletingVendor.id));
                  setDeletingVendor(null);
                }}
                className='rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200 transition hover:border-red-400/30 hover:text-red-100'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default VendorManagementPage;
