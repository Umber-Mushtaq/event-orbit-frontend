import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { calendarDayLabels } from "../../data/admin-data/calendarManagementData";
import { adminCalendarApi, getAdminErrorMessage } from "../../../../services/adminApi";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const views = ["Day", "Week", "Month"];

function CalendarManagementPage() {
  const [activeView, setActiveView] = useState("Month");
  const [monthOffset, setMonthOffset] = useState(0);
  const [days, setDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { monthLabel, yearLabel, cells } = useMemo(() => {
    const baseDate = new Date();
    const targetDate = new Date(
      baseDate.getFullYear(),
      baseDate.getMonth() + monthOffset,
      1,
    );
    const monthIndex = targetDate.getMonth();
    const year = targetDate.getFullYear();
    return {
      monthLabel: monthNames[monthIndex],
      yearLabel: year,
      cells: days,
    };
  }, [days, monthOffset]);

  useEffect(() => {
    let active = true;

    const loadCalendar = async () => {
      setLoading(true);
      setError("");

      const baseDate = new Date();
      const targetDate = new Date(
        baseDate.getFullYear(),
        baseDate.getMonth() + monthOffset,
        1,
      );
      const month = `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, "0")}`;

      try {
        const response = await adminCalendarApi.get({
          view: activeView.toLowerCase(),
          month,
        });
        if (!active) return;

        const data = response.data?.data || {};
        setDays(data.days || []);
      } catch (requestError) {
        if (!active) return;
        setError(
          getAdminErrorMessage(requestError, "Failed to load calendar."),
        );
      } finally {
        if (active) setLoading(false);
      }
    };

    loadCalendar();

    return () => {
      active = false;
    };
  }, [activeView, monthOffset]);

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white md:text-4xl">
            Calendar & Scheduling
          </h1>
          <p className="mt-2 text-sm text-stone-400">
            Drag, drop, and schedule events across months.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {views.map((view) => (
            <button
              key={view}
              type="button"
              onClick={() => setActiveView(view)}
              className={`rounded-2xl border px-4 py-2.5 text-sm font-semibold transition ${
                activeView === view
                  ? "border-border-gold/35 bg-[linear-gradient(180deg,#f3c85c,#d69d2f)] text-black"
                  : "border-white/8 bg-white/5 text-stone-200 hover:border-border-gold/20 hover:text-white"
              }`}
            >
              {view}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(12,12,12,0.98),rgba(7,7,7,0.98))] p-4 shadow-[0_14px_40px_rgba(0,0,0,0.35)] md:p-5">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black tracking-tight text-white">
            {monthLabel} {yearLabel}
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMonthOffset((value) => value - 1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/8 bg-white/5 text-stone-200 transition hover:border-border-gold/25 hover:text-white"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setMonthOffset((value) => value + 1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/8 bg-white/5 text-stone-200 transition hover:border-border-gold/25 hover:text-white"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500 md:gap-3">
          {calendarDayLabels.map((day) => (
            <div key={day} className="pb-1">
              {day}
            </div>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-7 gap-2 md:gap-3">
          {cells.map((cell, index) => {
            const isSelected = Boolean(cell.selected);

            return (
              <article
                key={index}
                className={`min-h-[92px] rounded-2xl border p-2.5 transition ${
                  isSelected
                    ? "border-border-gold/35 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.14),transparent_44%),rgba(20,20,20,0.92)]"
                    : "border-white/8 bg-[#111111]/80"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold text-stone-400">
                    {cell.label || cell.day || ""}
                  </span>
                </div>
                {Array.isArray(cell.events) && cell.events.length ? (
                  <div className="mt-3 space-y-2">
                    {cell.events.slice(0, 2).map((event) => (
                      <div
                        key={event.id || event.title}
                        className="rounded-full border border-border-gold/25 bg-[linear-gradient(180deg,rgba(243,200,92,0.18),rgba(214,157,47,0.24))] px-3 py-1.5 text-left text-[11px] font-semibold text-border-gold-hover shadow-[0_10px_20px_rgba(212,175,55,0.08)]"
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
        {error ? (
          <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        ) : null}
        {loading ? (
          <p className="mt-4 text-xs text-stone-500">Loading calendar...</p>
        ) : null}
      </section>
    </div>
  );
}

export default CalendarManagementPage;
