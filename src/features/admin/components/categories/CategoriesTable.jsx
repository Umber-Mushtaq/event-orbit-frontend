import { Search } from "lucide-react";
import CategoryActionMenu from "./CategoryActionMenu";
import {
  categoryIconOptions,
  categorySortOptions,
  categoryStatusStyles,
} from "../../data/eventCategoriesData";

function CategoriesTable({
  rows = [],
  query = "",
  onQueryChange,
  sortKey,
  onSortChange,
  onView,
  onEdit,
  onDelete,
}) {
  const getIcon = (value) =>
    categoryIconOptions.find((option) => option.value === value) || categoryIconOptions[0];

  return (
    <section className='rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(12,12,12,0.98),rgba(7,7,7,0.98))] p-4 shadow-[0_14px_40px_rgba(0,0,0,0.35)] md:p-5'>
      <div className='mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.24em] text-border-gold-hover/80'>
            All Categories
          </p>
          <p className='mt-2 text-sm text-stone-400'>
            Click a row action to view, edit, or delete a category.
          </p>
        </div>

        <div className='flex flex-col gap-3 sm:flex-row'>
          <div className='relative w-full sm:w-64'>
            <Search className='pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500' />
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder='Search categories...'
              className='w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-stone-500 focus:border-border-gold/40'
            />
          </div>
          <select
            value={sortKey}
            onChange={(event) => onSortChange(event.target.value)}
            className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-border-gold/40'
          >
            {categorySortOptions.map((option) => (
              <option key={option.value} value={option.value} className='bg-[#111111]'>
                Sort: {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='overflow-hidden rounded-2xl border border-white/8'>
        <div className='overflow-x-auto'>
          <table className='min-w-full text-left text-sm'>
            <thead className='bg-white/5 text-[11px] uppercase tracking-[0.22em] text-stone-400'>
              <tr>
                {["Category", "Image", "Icon", "Vendors", "Bookings", "Revenue", "Listings", "Status"].map(
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
                rows.map((category) => {
                  const icon = getIcon(category.icon);
                  const Icon = icon.Icon;

                  return (
                    <tr key={category.id} className='bg-black/10 transition-colors hover:bg-white/3'>
                      <td className='px-4 py-4 font-semibold text-white'>{category.name}</td>
                      <td className='px-4 py-4'>
                        <img
                          src={category.image}
                          alt={category.name}
                          className='h-14 w-20 rounded-2xl object-cover ring-1 ring-white/10'
                        />
                      </td>
                      <td className='px-4 py-4'>
                        <span className='inline-flex items-center gap-2 rounded-full border border-border-gold/20 bg-glass-gold px-3 py-1 text-xs font-semibold text-border-gold-hover'>
                          <Icon className='h-3.5 w-3.5' />
                          {icon.label}
                        </span>
                      </td>
                      <td className='px-4 py-4 text-stone-300'>{category.vendors}</td>
                      <td className='px-4 py-4 text-stone-300'>{category.bookings}</td>
                      <td className='px-4 py-4 font-semibold text-white'>{category.revenue}</td>
                      <td className='px-4 py-4 text-stone-300'>{category.listings}</td>
                      <td className='px-4 py-4'>
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                            categoryStatusStyles[category.status] || categoryStatusStyles.Active
                          }`}
                        >
                          {category.status}
                        </span>
                      </td>
                      <td className='px-4 py-4'>
                        <CategoryActionMenu
                          onView={() => onView(category)}
                          onEdit={() => onEdit(category)}
                          onDelete={() => onDelete(category)}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan='9' className='px-6 py-12 text-center text-stone-400'>
                    No categories match your search.
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

export default CategoriesTable;
