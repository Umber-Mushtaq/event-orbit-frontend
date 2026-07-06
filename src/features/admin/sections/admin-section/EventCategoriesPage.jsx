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
import { adminCategoriesApi, getAdminErrorMessage } from "../../api/adminApi";
import { mapAdminCategory } from "../../utils/adminTransformers";

function EventCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("revenue");
  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [viewingCategory, setViewingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCategories = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await adminCategoriesApi.list({
        search: query,
        sortBy: sortKey,
        limit: 100,
      });
      setCategories((response.data?.data?.items || []).map(mapAdminCategory));
    } catch (requestError) {
      setError(
        getAdminErrorMessage(requestError, "Failed to load categories."),
      );
    } finally {
      setLoading(false);
    }
  }, [query, sortKey]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const rows = useMemo(() => {
    return categories;
  }, [categories]);

  const stats = useMemo(() => {
    const totalVendors = categories.reduce(
      (sum, item) => sum + Number(item.vendors || 0),
      0,
    );
    const totalBookings = categories.reduce(
      (sum, item) => sum + Number(item.bookings || 0),
      0,
    );
    const revenueGenerated = categories.reduce(
      (sum, item) =>
        sum + Number(String(item.revenue || 0).replace(/[^0-9.-]/g, "")),
      0,
    );

    return [
      { label: "Categories", value: String(categories.length), icon: "tags" },
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
  }, [categories]);

  const handleSave = async (payload) => {
    if (!payload.name.trim() || !payload.image || !payload.icon) return;

    try {
      if (editingCategory) {
        await adminCategoriesApi.update(editingCategory.id, payload);
      } else {
        await adminCategoriesApi.create(payload);
      }

      await loadCategories();
      setFormOpen(false);
      setEditingCategory(null);
    } catch (requestError) {
      setError(getAdminErrorMessage(requestError, "Failed to save category."));
    }
  };

  const handleDelete = async () => {
    if (!deletingCategory) return;

    try {
      await adminCategoriesApi.remove(deletingCategory.id);
      await loadCategories();
      setDeletingCategory(null);
    } catch (requestError) {
      setError(
        getAdminErrorMessage(requestError, "Failed to delete category."),
      );
    }
  };

  return (
    <AdminListShell
      title="Service Categories"
      description="Organize vendors into business categories and track their performance."
      actionLabel="New Category"
      actionIcon={Plus}
      onAction={() => {
        setEditingCategory(null);
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
        onView={setViewingCategory}
        onEdit={(category) => {
          setEditingCategory(category);
          setFormOpen(true);
        }}
        onDelete={setDeletingCategory}
      />

      <CategoryFormModal
        open={formOpen}
        mode={editingCategory ? "edit" : "create"}
        initialValue={
          editingCategory || {
            ...emptyCategoryForm,
            icon: categoryIconOptions[0]?.value || "tags",
          }
        }
        onClose={() => {
          setFormOpen(false);
          setEditingCategory(null);
        }}
        onSave={handleSave}
        submitError={error}
      />

      <CategoryDetailModal
        open={Boolean(viewingCategory)}
        category={viewingCategory}
        onClose={() => setViewingCategory(null)}
      />

      <CategoryDeleteModal
        open={Boolean(deletingCategory)}
        category={deletingCategory}
        onCancel={() => setDeletingCategory(null)}
        onConfirm={handleDelete}
      />
    </AdminListShell>
  );
}

export default EventCategoriesPage;
