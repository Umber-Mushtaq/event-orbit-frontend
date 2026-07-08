import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MapPin, Plus, Star } from "lucide-react";
import SharedHeader from "../../components/adminComponent/shared/SharedHeader";
import SharedCards from "../../components/adminComponent/shared/SharedCards";
import SharedTable from "../../components/adminComponent/shared/SharedTable";
import VendorActionMenu from "../../components/adminComponent/vendors/VendorActionMenu";
import VendorStatusCell from "../../components/adminComponent/vendors/VendorStatusCell";
import VendorFormModal from "../../components/adminComponent/vendors/VendorFormModal";
import VendorDetailModal from "../../components/adminComponent/vendors/VendorDetailModal";
import ModalShell from "../../components/adminComponent/shared/ModalShell";
import {
  emptyVendorForm,
  vendorFilters,
  vendorSortOptions,
} from "../../data/admin-data/vendorManagementData";
import {
  adminVendorsApi,
  getAdminErrorMessage,
} from "../../../../services/adminApi";
import { mapAdminVendor } from "../../../../utils/adminTransformers";

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
  const [statusEditorId, setStatusEditorId] = useState(null);
  const [updatingStatusId, setUpdatingStatusId] = useState(null);
  const [statusFeedback, setStatusFeedback] = useState(null);
  const feedbackTimerRef = useRef(null);

  const loadVendors = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await adminVendorsApi.list({
        search: query,
        status: filter === "All" ? undefined : filter,
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
    let mounted = true;
    // schedule loadVendors on next microtask to avoid synchronous setState inside effect
    Promise.resolve().then(() => {
      if (mounted) loadVendors();
    });
    return () => {
      mounted = false;
    };
  }, [loadVendors]);

  useEffect(
    () => () => {
      if (feedbackTimerRef.current) {
        window.clearTimeout(feedbackTimerRef.current);
      }
    },
    [],
  );

  const pushStatusFeedback = useCallback((type, message) => {
    if (feedbackTimerRef.current) {
      window.clearTimeout(feedbackTimerRef.current);
    }

    setStatusFeedback({ type, message });
    feedbackTimerRef.current = window.setTimeout(() => {
      setStatusFeedback(null);
    }, 2400);
  }, []);

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
          <VendorAvatar src={vendor.avatar} name={vendor.name} className="h-10 w-10 shrink-0" />
          <div>
            <p className="font-semibold text-admin-foreground">{vendor.name}</p>
            <p className="text-xs text-admin-muted">{vendor.id}</p>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (vendor) => (
        <span className="text-admin-foreground">{vendor.category}</span>
      ),
    },
    {
      key: "location",
      label: "Location",
      render: (vendor) => (
        <span className="inline-flex items-center gap-2 text-admin-foreground">
          <MapPin className="h-3.5 w-3.5 text-border-gold-hover" />
          {vendor.location}
        </span>
      ),
    },
    {
      key: "rating",
      label: "Rating",
      render: (vendor) => (
        <span className="inline-flex items-center gap-1.5 font-semibold text-admin-foreground">
          <Star className="h-3.5 w-3.5 text-border-gold-hover" />
          {vendor.rating}
        </span>
      ),
    },
    {
      key: "bookings",
      label: "Bookings",
      render: (vendor) => (
        <span className="font-semibold text-admin-foreground">{vendor.bookings}</span>
      ),
    },
    {
      key: "revenue",
      label: "Revenue",
      render: (vendor) => (
        <span className="font-semibold text-admin-foreground">{vendor.revenue}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (vendor) => (
        <VendorStatusCell
          vendor={vendor}
          isOpen={statusEditorId === vendor.id}
          isUpdating={updatingStatusId === vendor.id}
          onOpen={() => setStatusEditorId(vendor.id)}
          onClose={() => {
            if (updatingStatusId !== vendor.id) {
              setStatusEditorId(null);
            }
          }}
          onSelect={(nextStatus) => handleStatusChange(vendor, nextStatus)}
        />
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

  const handleStatusChange = async (vendor, nextStatus) => {
    if (!vendor?.id) return;
    if (updatingStatusId) return;

    const previousVendors = vendors;
    const shouldKeepInView = filter === "All" || nextStatus === filter;

    setStatusEditorId(vendor.id);
    setUpdatingStatusId(vendor.id);
    setVendors((currentVendors) =>
      currentVendors
        .map((currentVendor) =>
          currentVendor.id === vendor.id
            ? {
                ...currentVendor,
                status: nextStatus,
              }
            : currentVendor,
        )
        .filter((currentVendor) =>
          shouldKeepInView ? true : currentVendor.id !== vendor.id,
        ),
    );

    try {
      await adminVendorsApi.update(vendor.id, { status: nextStatus });

      setStatusEditorId(null);
      pushStatusFeedback("success", `Vendor status updated to ${nextStatus}.`);
    } catch (requestError) {
      setVendors(previousVendors);
      setStatusEditorId(null);
      pushStatusFeedback(
        "error",
        getAdminErrorMessage(
          requestError,
          `Failed to mark vendor as ${nextStatus.toLowerCase()}.`,
        ),
      );
    } finally {
      setUpdatingStatusId(null);
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
      {statusFeedback ? (
        <div
          className={`fixed right-4 top-4 z-[90] rounded-2xl border px-4 py-3 text-sm shadow-[0_20px_60px_rgba(0,0,0,0.45)] sm:right-6 sm:top-6 ${
            statusFeedback.type === "success"
              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-200"
              : "border-red-500/20 bg-red-500/10 text-red-200"
          }`}
        >
          {statusFeedback.message}
        </div>
      ) : null}
      {loading ? (
        <div className="rounded-2xl border border-admin-border bg-admin-input px-4 py-3 text-sm text-admin-foreground">
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
            onApprove={() => handleStatusChange(vendor, "Approved")}
            onReject={() => handleStatusChange(vendor, "Rejected")}
            onSuspend={() => handleStatusChange(vendor, "Suspended")}
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
          <div className="max-h-[calc(100vh-4rem)] rounded-[2rem] border border-admin-border bg-admin-surface p-6 shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-y-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-border-gold-hover/80">
              Delete Vendor
            </p>
            <h3 className="mt-3 text-xl font-black text-admin-foreground">
              Remove this vendor?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-admin-muted">
              This will permanently delete{" "}
              <span className="text-admin-foreground">{deletingVendor.name}</span>.
            </p>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeletingVendor(null)}
                className="rounded-2xl border border-admin-border bg-admin-surface px-4 py-3 text-sm font-semibold text-admin-foreground transition hover:border-border-gold/30 hover:text-white"
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
