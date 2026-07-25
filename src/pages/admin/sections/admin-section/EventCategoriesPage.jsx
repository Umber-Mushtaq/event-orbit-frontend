import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import AdminListShell from "../../components/adminComponent/AdminListShell";
import CategoriesTable from "../../components/adminComponent/categories/CategoriesTable";
import CategoryFormModal from "../../components/adminComponent/categories/CategoryFormModal";
import CategoryDetailModal from "../../components/adminComponent/categories/CategoryDetailModal";
import CategoryDeleteModal from "../../components/adminComponent/categories/CategoryDeleteModal";
import {
  categoryIconOptions,
  emptyCategoryForm,
} from "../../data/admin-data/eventCategoriesData";
import {
  adminServicesApi,
  getAdminErrorMessage,
} from "../../../../services/adminApi";
import { mapAdminCategory } from "../../../../utils/adminTransformers";

function EventCategoriesPage() {
  const [services, setServices] = useState([]);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("revenue");
  const [formOpen, setFormOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [viewingService, setViewingService] = useState(null);
  const [deletingService, setDeletingService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadServices = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await adminServicesApi.list({
        search: query,
        sortBy: sortKey,
        limit: 100,
      });
      setServices((response.data?.data?.items || []).map(mapAdminCategory));
    } catch (requestError) {
      setError(getAdminErrorMessage(requestError, "Failed to load services."));
    } finally {
      setLoading(false);
    }
  }, [query, sortKey]);

  useEffect(() => {
    let mounted = true;
    // schedule the load on next microtask to avoid synchronous setState inside effect
    Promise.resolve().then(() => {
      if (mounted) {
        loadServices();
      }
    });
    return () => {
      mounted = false;
    };
  }, [loadServices]);

  const rows = useMemo(() => {
    return services;
  }, [services]);

  const stats = useMemo(() => {
    const totalVendors = services.reduce(
      (sum, item) => sum + Number(item.vendors || 0),
      0,
    );
    const totalBookings = services.reduce(
      (sum, item) => sum + Number(item.bookings || 0),
      0,
    );
    const revenueGenerated = services.reduce(
      (sum, item) =>
        sum + Number(String(item.revenue || 0).replace(/[^0-9.-]/g, "")),
      0,
    );

    return [
      { label: "Services", value: String(services.length), icon: "tags" },
      {
        label: "Total Vendors",
        value: String(totalVendors),
        icon: "briefcase",
      },
      { label: "Total Bookings", value: String(totalBookings), icon: "grid" },
      {
        label: "Revenue Generated",
        value: `$${revenueGenerated.toLocaleString("en-US")}`,
        icon: "sparkles",
      },
    ];
  }, [services]);

  const handleSave = async (payload) => {
    if (!payload.name.trim() || !payload.image || !payload.icon) return;

    try {
      if (editingService) {
        await adminServicesApi.update(editingService.id, payload);
      } else {
        await adminServicesApi.create(payload);
      }

      await loadServices();
      setFormOpen(false);
      setEditingService(null);
    } catch (requestError) {
      setError(getAdminErrorMessage(requestError, "Failed to save service."));
    }
  };

  const handleDelete = async () => {
    if (!deletingService) return;

    try {
      await adminServicesApi.remove(deletingService.id);
      await loadServices();
      setDeletingService(null);
    } catch (requestError) {
      setError(getAdminErrorMessage(requestError, "Failed to delete service."));
    }
  };

  return (
    <AdminListShell
      title="Services"
      description="Organize service offerings and track their performance."
      actionLabel="New Service"
      actionIcon={Plus}
      onAction={() => {
        setEditingService(null);
        setFormOpen(true);
      }}
      stats={stats}
    >
      {error ? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}
      {loading ? (
        <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-stone-300">
          Loading categories...
        </div>
      ) : null}

      <CategoriesTable
        rows={rows}
        query={query}
        onQueryChange={setQuery}
        sortKey={sortKey}
        onSortChange={setSortKey}
        onView={setViewingService}
        onEdit={(service) => {
          setEditingService(service);
          setFormOpen(true);
        }}
        onDelete={setDeletingService}
      />

      <CategoryFormModal
        open={formOpen}
        mode={editingService ? "edit" : "create"}
        initialValue={
          editingService || {
            ...emptyCategoryForm,
            icon: categoryIconOptions[0]?.value || "tags",
          }
        }
        onClose={() => {
          setFormOpen(false);
          setEditingService(null);
        }}
        onSave={handleSave}
        submitError={error}
      />

      <CategoryDetailModal
        open={Boolean(viewingService)}
        category={viewingService}
        onClose={() => setViewingService(null)}
      />

      <CategoryDeleteModal
        open={Boolean(deletingService)}
        category={deletingService}
        onCancel={() => setDeletingService(null)}
        onConfirm={handleDelete}
      />
    </AdminListShell>
  );
}

export default EventCategoriesPage;
