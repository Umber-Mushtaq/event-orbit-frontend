import { Eye, PencilLine, Search, Trash2 } from "lucide-react";
import Badge from "./Badge";
import { useRecentEventsTable } from "../../../../hooks/admin-hook/useRecentEventsTable";

function RecentEventsTable({ rows = [], searchOverride = "" }) {
  const table = useRecentEventsTable(rows, searchOverride);
  const displayRows = rows.length ? table.pagedRows : [];

  return (
    <section className="rounded-3xl border border-border-gold/15 bg-[#141414]/90 p-5 shadow-[0_14px_40px_rgba(0,0,0,0.35)]">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-border-gold-hover/80">
            Recent Events
          </p>
          <h3 className="mt-2 text-lg font-bold text-white">
            Search, sort, and manage
          </h3>
        </div>
        <div className="relative w-full lg:max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
          <input
            value={table.query}
            onChange={(event) => table.setQuery(event.target.value)}
            placeholder="Search events, venues, organizers..."
            className="w-full rounded-2xl border border-white/10 bg-black/30 py-3 pl-11 pr-4 text-sm text-white outline-none placeholder:text-stone-500 focus:border-border-gold/50"
          />
        </div>
      </div>

      {searchOverride ? (
        <div className="mb-4 inline-flex rounded-full border border-border-gold/20 bg-glass-gold px-3 py-1 text-[11px] font-semibold text-border-gold-hover">
          Global search active: {searchOverride}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-white/8">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white/5 text-[11px] uppercase tracking-[0.24em] text-stone-400">
              <tr>
                {[
                  ["name", "Event Name"],
                  ["category", "Category"],
                  ["date", "Date"],
                  ["venue", "Venue"],
                  ["organizer", "Organizer"],
                  ["status", "Status"],
                  ["revenue", "Revenue"],
                ].map(([key, label]) => (
                  <th
                    key={key}
                    onClick={() => table.setSort(key)}
                    className="cursor-pointer px-4 py-4 font-semibold transition-colors hover:text-border-gold-hover"
                  >
                    {label}
                  </th>
                ))}
                <th className="px-4 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8">
              {displayRows.length ? (
                displayRows.map((row) => (
                  <tr
                    key={row.id || row.name}
                    className="bg-black/10 transition-colors hover:bg-white/3"
                  >
                    <td className="px-4 py-4 font-semibold text-white">
                      {row.name}
                    </td>
                    <td className="px-4 py-4 text-stone-300">{row.category}</td>
                    <td className="px-4 py-4 text-stone-300">{row.date}</td>
                    <td className="px-4 py-4 text-stone-300">{row.venue}</td>
                    <td className="px-4 py-4 text-stone-300">
                      {row.organizer}
                    </td>
                    <td className="px-4 py-4">
                      <Badge tone={row.status}>{row.status}</Badge>
                    </td>
                    <td className="px-4 py-4 font-semibold text-border-gold-hover">
                      {row.revenue}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-stone-400">
                        <button className="rounded-full border border-white/10 p-2 transition hover:border-border-gold/40 hover:text-border-gold-hover">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="rounded-full border border-white/10 p-2 transition hover:border-border-gold/40 hover:text-border-gold-hover">
                          <PencilLine className="h-4 w-4" />
                        </button>
                        <button className="rounded-full border border-white/10 p-2 transition hover:border-red-400/40 hover:text-red-300">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-12 text-center text-stone-400"
                  >
                    No events match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-stone-500">
          Showing {displayRows.length} of {rows.length} records
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.goToPage(table.page - 1)}
            className="rounded-full border border-white/10 px-3 py-2 text-xs font-semibold text-stone-300 transition hover:border-border-gold/40 hover:text-white"
          >
            Prev
          </button>
          <span className="rounded-full border border-border-gold/20 bg-glass-gold px-3 py-2 text-xs font-semibold text-border-gold-hover">
            Page {table.page} / {table.totalPages}
          </span>
          <button
            onClick={() => table.goToPage(table.page + 1)}
            className="rounded-full border border-white/10 px-3 py-2 text-xs font-semibold text-stone-300 transition hover:border-border-gold/40 hover:text-white"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default RecentEventsTable;
