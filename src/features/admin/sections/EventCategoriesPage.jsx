import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import AdminListShell from "../components/AdminListShell";
import CategoriesTable from "../components/categories/CategoriesTable";
import CategoryFormModal from "../components/categories/CategoryFormModal";
import CategoryDetailModal from "../components/categories/CategoryDetailModal";
import CategoryDeleteModal from "../components/categories/CategoryDeleteModal";
import {
  categoryStats,
  emptyCategoryForm,
  initialCategories,
} from "../data/eventCategoriesData";

function EventCategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("revenue");
  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [viewingCategory, setViewingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);

  const rows = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const filtered = categories.filter((category) =>
      `${category.name} ${category.status}`.toLowerCase().includes(normalized),
    );

    return [...filtered].sort((left, right) => {
      if (sortKey === "name") return left.name.localeCompare(right.name);

      const toNumber = (value) => Number(String(value).replace(/[$,]/g, "")) || 0;
      return toNumber(right[sortKey]) - toNumber(left[sortKey]);
    });
  }, [categories, query, sortKey]);

  const handleSave = (payload) => {
    if (!payload.name.trim() || !payload.image || !payload.icon) return;

    if (editingCategory) {
      setCategories((current) =>
        current.map((item) =>
          item.id === editingCategory.id
            ? { ...item, name: payload.name, image: payload.image, icon: payload.icon }
            : item,
        ),
      );
    } else {
      setCategories((current) => [
        {
          id: `cat-${Date.now()}`,
          name: payload.name,
          image: payload.image,
          icon: payload.icon,
          status: "Active",
          vendors: 0,
          bookings: 0,
          revenue: "$0",
          listings: 0,
        },
        ...current,
      ]);
    }

    setFormOpen(false);
    setEditingCategory(null);
  };

  return (
    <AdminListShell
      title='Service Categories'
      description='Organize vendors into business categories and track their performance.'
      actionLabel='New Category'
      actionIcon={Plus}
      onAction={() => {
        setEditingCategory(null);
        setFormOpen(true);
      }}
      stats={categoryStats}
    >
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
        initialValue={editingCategory || emptyCategoryForm}
        onClose={() => {
          setFormOpen(false);
          setEditingCategory(null);
        }}
        onSave={handleSave}
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
        onConfirm={() => {
          setCategories((current) => current.filter((item) => item.id !== deletingCategory.id));
          setDeletingCategory(null);
        }}
      />
    </AdminListShell>
  );
}

export default EventCategoriesPage;
