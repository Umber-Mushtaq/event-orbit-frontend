import { useCallback, useEffect, useMemo, useState } from "react";
import { MapPin, Plus, Star } from "lucide-react";
import SharedHeader from "../../components/adminComponent/shared/SharedHeader";
import SharedCards from "../../components/adminComponent/shared/SharedCards";
import SharedTable from "../../components/adminComponent/shared/SharedTable";
import VendorActionMenu from "../../components/adminComponent/vendors/VendorActionMenu";
import VendorFormModal from "../../components/adminComponent/vendors/VendorFormModal";
import VendorDetailModal from "../../components/adminComponent/vendors/VendorDetailModal";
import ModalShell from "../../components/adminComponent/shared/ModalShell";
import {
  emptyVendorForm,
  vendorFilters,
  vendorSortOptions,
  vendorStatusStyles,
} from "../../data/admin-data/vendorManagementData";
import {
  adminVendorsApi,
  getAdminErrorMessage,
} from "../../../../services/adminApi";
import { mapAdminVendor } from "../../../../utils/adminTransformers";

function VendorManagementPage() {
  const [vendors, setVendors] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortKey, setSortKey] = useState("revenue");
  const [formOpen, setFormOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [viewingVendor, setViewingVendor] = useState(null);
  const [deletingVendor, setDeletingVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadVendors = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await adminVendorsApi.list({
        search: query,
        status: filter,
        sortBy: sortKey,
        limit: 100,
      });
      setVendors((response.data?.data?.items || []).map(mapAdminVendor));
    } catch (requestError) {
      setError(getAdminErrorMessage(requestError, "Failed to load vendors."));
    } finally {
      setLoading(false);
    }
  }, [filter, query, sortKey]);

  useEffect(() => {
    loadVendors();
  }, [loadVendors]);

  const rows = useMemo(() => vendors, [vendors]);

  const stats = useMemo(() => {
    const total = vendors.length;
    const approved = vendors.filter(
      (vendor) => vendor.status === "Approved",
    ).length;
    const pending = vendors.filter(
      (vendor) => vendor.status === "Pending",
    ).length;
    const suspended = vendors.filter(
      (vendor) => vendor.status === "Suspended",
    ).length;

    return [
      {
        label: "Total Vendors",
        value: String(total),
        icon: "briefcase-business",
      },
      {
        label: "Approved",
        value: String(approved),
        growth: total ? `${Math.round((approved / total) * 100)}%` : null,
        icon: "circle-check-big",
      },
      { label: "Pending", value: String(pending), icon: "clock-3" },
      { label: "Suspended", value: String(suspended), icon: "circle-x" },
    ];
  }, [vendors]);

  const columns = [
    {
      key: "vendor",
      label: "Vendor",
      render: (vendor) => (
        <div className="flex items-center gap-3">
          <img
            src={vendor.avatar}
            alt={vendor.name}
            className="h-10 w-10 rounded-2xl object-cover ring-1 ring-white/10"
          />
          <div>
            <p className="font-semibold text-white">{vendor.name}</p>
            <p className="text-xs text-stone-500">{vendor.id}</p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (vendor) => (
        <span className="text-stone-300">{vendor.category}</span>
      ),
    },
    {
      key: "location",
      label: "Location",
      render: (vendor) => (
        <span className="inline-flex items-center gap-2 text-stone-300">
          <MapPin className="h-3.5 w-3.5 text-border-gold-hover" />
          {vendor.location}
        </span>
      ),
    },
    {
      key: "rating",
      label: "Rating",
      render: (vendor) => (
        <span className="inline-flex items-center gap-1.5 font-semibold text-white">
          <Star className="h-3.5 w-3.5 text-border-gold-hover" />
          {vendor.rating}
        </span>
      ),
    },
    {
      key: "bookings",
      label: "Bookings",
      render: (vendor) => (
        <span className="font-semibold text-white">{vendor.bookings}</span>
      ),
    },
    {
      key: "revenue",
      label: "Revenue",
      render: (vendor) => (
        <span className="font-semibold text-white">{vendor.revenue}</span>
      ),
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

  const handleSave = async (payload) => {
    if (
      !payload.name.trim() ||
      !payload.category.trim() ||
      !payload.location.trim()
    )
      return;

    try {
      if (editingVendor) {
        await adminVendorsApi.update(editingVendor.id, payload);
      } else {
        await adminVendorsApi.create(payload);
      }

      await loadVendors();
      setFormOpen(false);
      setEditingVendor(null);
    } catch (requestError) {
      setError(getAdminErrorMessage(requestError, "Failed to save vendor."));
    }
  };

  const handleDelete = async () => {
    if (!deletingVendor) return;

    try {
      await adminVendorsApi.remove(deletingVendor.id);
      await loadVendors();
      setDeletingVendor(null);
    } catch (requestError) {
      setError(getAdminErrorMessage(requestError, "Failed to delete vendor."));
    }
  };

  return (
    <div className="space-y-6">
      <SharedHeader
        title="Vendor Management"
        description="Approve applications, monitor performance, and manage vendor relationships."
        actionLabel="Add Vendor"
        actionIcon={Plus}
        onAction={() => {
          setEditingVendor(null);
          setFormOpen(true);
        }}
      />

      <SharedCards items={stats} />

      {error ? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}
      {loading ? (
        <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-stone-300">
          Loading vendors...
        </div>
      ) : null}

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
        searchPlaceholder="Search vendors, categories, cities..."
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
        submitError={error}
      />

      <VendorDetailModal
        open={Boolean(viewingVendor)}
        vendor={viewingVendor}
        onClose={() => setViewingVendor(null)}
      />

      {deletingVendor ? (
        <ModalShell
          open={Boolean(deletingVendor)}
          outerClassName="z-[60]"
          innerClassName="max-w-md"
        >
          <div className="rounded-[2rem] border border-border-gold/15 bg-[#111111] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.6)] max-h-[calc(100vh-4rem)] overflow-y-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-border-gold-hover/80">
              Delete Vendor
            </p>
            <h3 className="mt-3 text-xl font-black text-white">
              Remove this vendor?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-400">
              This will permanently delete{" "}
              <span className="text-white">{deletingVendor.name}</span>.
            </p>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeletingVendor(null)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-stone-200 transition hover:border-border-gold/30 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200 transition hover:border-red-400/30 hover:text-red-100"
              >
                Delete
              </button>
            </div>
          </div>
        </ModalShell>
      ) : null}
    </div>
  );
}

export default VendorManagementPage;
