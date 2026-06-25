function CategoryDeleteModal({ open, category, onCancel, onConfirm }) {
  if (!open || !category) return null;

  return (
    <div className='fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm'>
      <div className='w-full max-w-md rounded-[2rem] border border-border-gold/15 bg-[#111111] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.6)]'>
        <p className='text-xs font-semibold uppercase tracking-[0.24em] text-border-gold-hover/80'>
          Delete Category
        </p>
        <h3 className='mt-3 text-xl font-black text-white'>Remove this category?</h3>
        <p className='mt-3 text-sm leading-relaxed text-stone-400'>
          This will permanently delete <span className='text-white'>{category.name}</span>.
        </p>

        <div className='mt-6 flex flex-wrap justify-end gap-3'>
          <button
            type='button'
            onClick={onCancel}
            className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-stone-200 transition hover:border-border-gold/30 hover:text-white'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={onConfirm}
            className='rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200 transition hover:border-red-400/30 hover:text-red-100'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default CategoryDeleteModal;
