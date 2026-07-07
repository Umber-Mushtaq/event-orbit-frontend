import { Eye, MoreHorizontal, PencilLine, Trash2 } from "lucide-react";
import EventsActionMenu from "./EventsActionMenu";
import { statusStyles } from "../../../data/admin-data/eventsManagementData";
import { useRecentEventsTable } from "../../../../../hooks/admin-hook/useRecentEventsTable";

function EventsTable({
  rows = [],
  searchOverride = "",
  viewMode = "List",
  queryOverride = "",
  onViewRow,
  onEditRow,
  onDeleteRow,
}) {
  const table = useRecentEventsTable(rows, searchOverride, 8, queryOverride);
  const displayRows = rows.length ? table.pagedRows : [];

  return (
    <section className='rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(12,12,12,0.98),rgba(7,7,7,0.98))] p-4 shadow-[0_14px_40px_rgba(0,0,0,0.35)] md:p-5'>
      <div className='overflow-hidden rounded-2xl border border-white/8'>
        <div className='overflow-x-auto'>
          <table className='min-w-full text-left text-sm'>
            <thead className='bg-white/5 text-[11px] uppercase tracking-[0.22em] text-stone-400'>
              <tr>
                {[
                  ["name", "Event"],
                  ["category", "Category"],
                  ["date", "Date"],
                  ["venue", "Venue"],
                  ["status", "Status"],
                  ["attendees", "Attendees"],
                  ["revenue", "Revenue"],
                ].map(([key, label]) => (
                  <th
                    key={key}
                    onClick={() => table.setSort(key)}
                    className='cursor-pointer px-4 py-4 font-semibold transition-colors hover:text-border-gold-hover'
                  >
                    {label}
                  </th>
                ))}
                <th className='px-4 py-4 font-semibold'>Actions</th>
              </tr>
            </thead>

            <tbody className='divide-y divide-white/8'>
              {displayRows.length ? (
                displayRows.map((row) => (
                  <tr key={row.id} className='bg-black/10 transition-colors hover:bg-white/3'>
                    <td className='px-4 py-4'>
                      <div className='space-y-1'>
                        <p className='font-semibold text-white'>{row.name}</p>
                        <p className='text-xs text-stone-500'>{row.id}</p>
                      </div>
                    </td>
                    <td className='px-4 py-4 text-stone-300'>{row.category}</td>
                    <td className='px-4 py-4 text-stone-300'>{row.date}</td>
                    <td className='px-4 py-4 text-stone-300'>{row.venue}</td>
                    <td className='px-4 py-4'>
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusStyles[row.status]}`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className='px-4 py-4 text-center font-semibold text-white'>
                      {row.attendees}
                    </td>
                    <td className='px-4 py-4 font-semibold text-white'>{row.revenue}</td>
                    <td className='px-4 py-4'>
                      <EventsActionMenu
                        align='right'
                        triggerClassName='inline-flex rounded-full border border-white/10 p-2 text-stone-400 transition hover:border-border-gold/40 hover:text-border-gold-hover'
                        trigger={<MoreHorizontal className='h-4 w-4' />}
                        items={[
                          {
                            label: "View",
                            icon: Eye,
                            onClick: () => onViewRow?.(row),
                          },
                          {
                            label: "Edit",
                            icon: PencilLine,
                            onClick: () => onEditRow?.(row),
                          },
                          {
                            label: "Delete",
                            icon: Trash2,
                            variant: "danger",
                            onClick: () => onDeleteRow?.(row),
                          },
                        ]}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan='8' className='px-6 py-12 text-center text-stone-400'>
                    No events match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <p className='text-xs text-stone-500'>
          Showing {displayRows.length} of {rows.length} records
          <span className='ml-2 text-stone-600'>- {viewMode} view</span>
        </p>
        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={() => table.goToPage(table.page - 1)}
            className='inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-2 text-xs font-semibold text-stone-300 transition hover:border-border-gold/40 hover:text-white'
          >
            Prev
          </button>
          <span className='rounded-full border border-border-gold/20 bg-glass-gold px-3 py-2 text-xs font-semibold text-border-gold-hover'>
            Page {table.page} / {table.totalPages}
          </span>
          <button
            type='button'
            onClick={() => table.goToPage(table.page + 1)}
            className='inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-2 text-xs font-semibold text-stone-300 transition hover:border-border-gold/40 hover:text-white'
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default EventsTable;
