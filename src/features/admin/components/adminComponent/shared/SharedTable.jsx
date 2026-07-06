import { Search } from "lucide-react";

const defaultColumns = [
  { key: "title", label: "Title" },
  { key: "type", label: "Type" },
  { key: "location", label: "Location" },
  { key: "rating", label: "Rating" },
  { key: "count", label: "Count" },
  { key: "value", label: "Value" },
  { key: "status", label: "Status" },
];

function SharedTable({
  rows = [],
  query = "",
  onQueryChange,
  activeFilter = "All",
  onFilterChange,
  sortKey = "",
  onSortChange,
  columns = defaultColumns,
  filters = [],
  sortOptions = [],
  searchPlaceholder = "Search...",
  showSearch = true,
  showFilters = true,
  showSort = true,
  showActions = false,
  renderActions,
  emptyMessage = "No records found.",
}) {
  const normalizedColumns = columns.map((column) =>
    typeof column === "string" ? { key: column.toLowerCase(), label: column } : column,
  );
  const hasSearch = showSearch && typeof onQueryChange === "function";
  const hasFilters = showFilters && filters.length && typeof onFilterChange === "function";
  const hasSort = showSort && sortOptions.length && typeof onSortChange === "function";
  const colSpan = normalizedColumns.length + (showActions && renderActions ? 1 : 0);

  return (
    <section className='rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(12,12,12,0.98),rgba(7,7,7,0.98))] p-4 shadow-[0_14px_40px_rgba(0,0,0,0.35)] md:p-5'>
      <div className='mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
        {hasSearch ? (
          <div className='relative w-full lg:max-w-[62%]'>
            <Search className='pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500' />
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder={searchPlaceholder}
              className='w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-stone-500 focus:border-border-gold/40'
            />
          </div>
        ) : null}

        {hasFilters ? (
          <div className='flex flex-wrap items-center gap-2 rounded-2xl border border-white/8 bg-black/20 p-1.5'>
            {filters.map((filter) => {
              const value = typeof filter === "string" ? filter : filter.value;
              const label = typeof filter === "string" ? filter : filter.label;
              const active = activeFilter === value;

              return (
                <button
                  key={value}
                  type='button'
                  onClick={() => onFilterChange(value)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-[linear-gradient(180deg,#f3c85c,#d69d2f)] text-black"
                      : "text-stone-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        ) : null}

        {hasSort ? (
          <select
            value={sortKey}
            onChange={(event) => onSortChange(event.target.value)}
            className='rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white outline-none focus:border-border-gold/40'
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value} className='bg-[#111111]'>
                Sort: {option.label}
              </option>
            ))}
          </select>
        ) : null}
      </div>

      <div className='overflow-hidden rounded-2xl border border-white/8'>
        <div className='overflow-x-auto'>
          <table className='min-w-full text-left text-sm'>
            <thead className='bg-white/5 text-[11px] uppercase tracking-[0.22em] text-stone-400'>
              <tr>
                {normalizedColumns.map((column) => (
                  <th key={column.key} className='px-4 py-4 font-semibold'>
                    {column.label}
                  </th>
                ))}
                {showActions && renderActions ? (
                  <th className='px-4 py-4 font-semibold'>Actions</th>
                ) : null}
              </tr>
            </thead>

            <tbody className='divide-y divide-white/8'>
              {rows.length ? (
                rows.map((item, index) => (
                  <tr key={item.id || index} className='bg-black/10 transition-colors hover:bg-white/3'>
                    {normalizedColumns.map((column) => (
                      <td key={column.key} className='px-4 py-4'>
                        {column.render ? (
                          column.render(item, index)
                        ) : (
                          <span className='text-stone-300'>{item[column.key] ?? "—"}</span>
                        )}
                      </td>
                    ))}
                    {showActions && renderActions ? <td className='px-4 py-4'>{renderActions(item, index)}</td> : null}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={colSpan} className='px-6 py-12 text-center text-stone-400'>
                    {emptyMessage}
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

export default SharedTable;
