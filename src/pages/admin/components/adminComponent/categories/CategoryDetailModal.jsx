import { X } from "lucide-react";
import {
  categoryIconOptions,
  categoryStatusStyles,
} from "../../../data/admin-data/eventCategoriesData";
import ModalShell from "../shared/ModalShell";

function CategoryDetailModal({ open, category, onClose }) {
  if (!open || !category) return null;

  const icon = categoryIconOptions.find((item) => item.value === category.icon) || categoryIconOptions[0];
  const Icon = icon.Icon;

  return (
    <ModalShell open={open} innerClassName='max-w-2xl'>
      <div className='overflow-hidden rounded-[2rem] border border-border-gold/15 bg-[#111111] shadow-[0_30px_80px_rgba(0,0,0,0.6)] max-h-[calc(100vh-4rem)]'>
        <div className='relative h-56'>
          <img src={category.image} alt={category.name} className='h-full w-full object-cover' />
          <div className='absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent' />
          <div className='absolute right-4 top-4'>
            <button
              type='button'
              onClick={onClose}
              className='inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/30 text-white transition hover:border-border-gold/30'
              aria-label='Close details'
            >
              <X className='h-4 w-4' />
            </button>
          </div>
          <div className='absolute bottom-0 left-0 right-0 p-6'>
            <p className='text-xs font-semibold uppercase tracking-[0.24em] text-border-gold-hover/80'>
              Service Details
            </p>
            <h3 className='mt-2 text-3xl font-black text-white'>{category.name}</h3>
          </div>
        </div>

        <div className='grid gap-4 p-6 md:grid-cols-2'>
          {[
            ["Status", category.status],
            ["Vendors", category.vendors],
            ["Bookings", category.bookings],
            ["Revenue", category.revenue],
            ["Listings", category.listings],
          ].map(([label, value]) => (
            <div key={label} className='rounded-3xl border border-white/8 bg-white/5 p-4'>
              <p className='text-xs uppercase tracking-[0.22em] text-stone-500'>{label}</p>
              <p className='mt-2 text-lg font-bold text-white'>{value}</p>
            </div>
          ))}
          <div className='rounded-3xl border border-white/8 bg-white/5 p-4'>
            <p className='text-xs uppercase tracking-[0.22em] text-stone-500'>Icon</p>
            <div className='mt-3 inline-flex items-center gap-2 rounded-full border border-border-gold/20 bg-glass-gold px-3 py-2 text-sm font-semibold text-border-gold-hover'>
              <Icon className='h-4 w-4' />
              {icon.label}
            </div>
          </div>
          <div className='rounded-3xl border border-white/8 bg-white/5 p-4 md:col-span-2'>
            <p className='text-xs uppercase tracking-[0.22em] text-stone-500'>Status Badge</p>
            <span className={`mt-3 inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${categoryStatusStyles[category.status] || categoryStatusStyles.Active}`}>
              {category.status}
            </span>
          </div>
        </div>
      </div>
    </ModalShell>
  );
}

export default CategoryDetailModal;
