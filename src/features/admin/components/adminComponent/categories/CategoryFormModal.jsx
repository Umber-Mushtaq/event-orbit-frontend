import { useEffect, useMemo, useRef, useState } from "react";
import { ImagePlus, Sparkles, X } from "lucide-react";
import {
  categoryIconOptions,
  emptyCategoryForm,
} from "../../../data/admin-data/eventCategoriesData";
import ModalShell from "../shared/ModalShell";

function CategoryFormModal({ open, mode = "create", initialValue, onClose, onSave, submitError = "" }) {
  const fileInputRef = useRef(null);
  const [form, setForm] = useState(emptyCategoryForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(initialValue || emptyCategoryForm);
      setError("");
    }
  }, [initialValue, open]);

  const selectedIcon = useMemo(
    () => categoryIconOptions.find((item) => item.value === form.icon) || categoryIconOptions[0],
    [form.icon],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.image || !form.icon) {
      setError("Category name, image, and icon are required.");
      return;
    }

    setError("");
    onSave({ ...form });
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm((current) => ({ ...current, image: String(reader.result || "") }));
      setError("");
    };
    reader.readAsDataURL(file);
  };

  if (!open) return null;

  return (
    <ModalShell open={open} innerClassName='max-w-2xl'>
      <div className='rounded-[2rem] border border-border-gold/15 bg-[#111111] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.6)] max-h-[calc(100vh-4rem)] overflow-y-auto'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.24em] text-border-gold-hover/80'>
              {mode === "edit" ? "Edit Category" : "New Category"}
            </p>
            <h3 className='mt-2 text-2xl font-black text-white'>
              {mode === "edit" ? "Update service category" : "Create a service category"}
            </h3>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-stone-200 transition hover:border-border-gold/30 hover:text-white'
            aria-label='Close form'
          >
            <X className='h-4 w-4' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='mt-6 space-y-5'>
          {error || submitError ? (
            <p className='rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200'>
              {error || submitError}
            </p>
          ) : null}

          <label className='block'>
            <span className='mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400'>
              Category Name
            </span>
            <input
              required
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              className='w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-stone-500 focus:border-border-gold/40'
              placeholder='Enter category name'
            />
          </label>

          <div className='grid gap-4 md:grid-cols-2'>
            <label className='block'>
              <span className='mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400'>
                Category Image
              </span>
              <button
                type='button'
                onClick={() => fileInputRef.current?.click()}
                className='flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-border-gold/25 bg-glass-gold px-4 py-3 text-sm font-semibold text-border-gold-hover transition hover:border-border-gold/40 hover:bg-glass-gold-hover'
              >
                <ImagePlus className='h-4 w-4' />
                Upload Image
              </button>
              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                onChange={handleImageChange}
                className='hidden'
              />
            </label>

            <label className='block'>
              <span className='mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-stone-400'>
                Category Icon
              </span>
              <select
                value={form.icon}
                onChange={(event) => setForm((current) => ({ ...current, icon: event.target.value }))}
                className='w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-border-gold/40'
              >
                {categoryIconOptions.map((option) => (
                  <option key={option.value} value={option.value} className='bg-[#111111]'>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className='rounded-3xl border border-white/8 bg-white/5 p-4'>
            <p className='text-xs font-semibold uppercase tracking-[0.22em] text-stone-500'>
              Preview
            </p>
            <div className='mt-4 flex items-center gap-4'>
              <div className='h-20 w-24 overflow-hidden rounded-2xl border border-white/10 bg-black/30'>
                {form.image ? (
                  <img src={form.image} alt='Category preview' className='h-full w-full object-cover' />
                ) : (
                  <div className='flex h-full w-full items-center justify-center text-stone-500'>
                    <Sparkles className='h-6 w-6' />
                  </div>
                )}
              </div>
              <div>
                <p className='text-sm font-semibold text-white'>{form.name || "Category name"}</p>
                <div className='mt-2 inline-flex items-center gap-2 rounded-full border border-border-gold/20 bg-glass-gold px-3 py-1 text-xs font-semibold text-border-gold-hover'>
                  <selectedIcon.Icon className='h-3.5 w-3.5' />
                  {selectedIcon.label}
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-wrap justify-end gap-3'>
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
              {mode === "edit" ? "Update Category" : "Save Category"}
            </button>
          </div>
        </form>
      </div>
    </ModalShell>
  );
}

export default CategoryFormModal;
