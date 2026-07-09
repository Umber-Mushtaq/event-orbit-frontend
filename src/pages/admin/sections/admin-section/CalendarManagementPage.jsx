import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EventsDetailModal from "../../components/adminComponent/events/EventsDetailModal";
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

const formatMonthDay = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

const formatEventTime = (value) => {
  if (!value) return "";
  if (/^\d{2}:\d{2}$/.test(value)) {
    const [hours, minutes] = value.split(":").map(Number);
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${String(displayHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${ampm}`;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

function CalendarManagementPage() {
  const [activeView, setActiveView] = useState("Month");
  const [monthOffset, setMonthOffset] = useState(0);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    let active = true;

    const loadCalendar = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await adminCalendarApi.events();
        if (!active) return;

        const data = response.data?.data || response.data?.events || [];
        setEvents(
          data.map((event) => ({
            ...event,
            name: event.name || event.title || event.eventName || "Untitled Event",
            title: event.name || event.title || event.eventName || "Untitled Event",
            eventDate: event.eventDate || event.date,
            eventDateLabel: event.eventDateLabel || formatMonthDay(event.eventDate || event.date),
            eventTimeLabel: event.eventTimeLabel || formatEventTime(event.eventTime || ""),
          })),
        );
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

    const handleRefresh = () => loadCalendar();
    window.addEventListener("admin-events-updated", handleRefresh);

    return () => {
      active = false;
      window.removeEventListener("admin-events-updated", handleRefresh);
    };
  }, []);

  const { monthLabel, yearLabel, cells, currentMonthKey } = useMemo(() => {
    const baseDate = new Date();
    const targetDate = new Date(
      baseDate.getFullYear(),
      baseDate.getMonth() + monthOffset,
      1,
    );
    const monthIndex = targetDate.getMonth();
    const year = targetDate.getFullYear();

    const firstDay = new Date(year, monthIndex, 1);
    const firstWeekday = firstDay.getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const totalCells = 42;
    const currentMonthKey = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
    const dayCells = [];

    for (let index = 0; index < totalCells; index += 1) {
      const dayNumber = index - firstWeekday + 1;
      const inMonth = dayNumber > 0 && dayNumber <= daysInMonth;
      const cellDate = new Date(year, monthIndex, dayNumber);
      const key = `${cellDate.getFullYear()}-${String(cellDate.getMonth() + 1).padStart(2, "0")}-${String(cellDate.getDate()).padStart(2, "0")}`;
      dayCells.push({
        date: key,
        label: inMonth ? dayNumber : "",
        events: events.filter((event) => {
          const eventDate = event.eventDate || event.date;
          return eventDate === key;
        }),
        outOfMonth: !inMonth,
      });
    }

    return {
      monthLabel: monthNames[monthIndex],
      yearLabel: year,
      cells: dayCells,
      currentMonthKey,
    };
  }, [events, monthOffset]);

  const monthEvents = useMemo(
    () =>
      events.filter((event) => {
        const eventDate = String(event.eventDate || event.date || "");
        return eventDate.startsWith(currentMonthKey);
      }),
    [currentMonthKey, events],
  );

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
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="pb-1">
              {day}
            </div>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-7 gap-2 md:gap-3">
          {cells.map((cell) => (
            <article
              key={cell.date}
              className={`min-h-[120px] rounded-2xl border p-2.5 transition ${
                cell.outOfMonth
                  ? "border-white/5 bg-black/10 opacity-50"
                  : "border-white/8 bg-[#111111]/80"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-semibold text-stone-400">
                  {cell.label || ""}
                </span>
              </div>
              {Array.isArray(cell.events) && cell.events.length ? (
                <div className="mt-3 space-y-2">
                  {cell.events.slice(0, 3).map((event) => (
                    <button
                      key={event.id || event.title}
                      type="button"
                      onClick={() => setSelectedEvent(event)}
                      className="w-full rounded-2xl border border-border-gold/25 bg-[linear-gradient(180deg,rgba(243,200,92,0.18),rgba(214,157,47,0.24))] px-3 py-2 text-left text-[11px] font-semibold text-border-gold-hover shadow-[0_10px_20px_rgba(212,175,55,0.08)] transition hover:border-border-gold/40 hover:bg-[linear-gradient(180deg,rgba(243,200,92,0.24),rgba(214,157,47,0.3))]"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="line-clamp-2">{event.name || event.title || event.eventName}</span>
                        <span className="rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-[10px] text-stone-200">
                          {event.status || "Event"}
                        </span>
                      </div>
                      <div className="mt-1 text-[10px] text-stone-300">
                        {event.eventTimeLabel || formatEventTime(event.eventTime || "")}
                      </div>
                    </button>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>

        {error ? (
          <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        ) : null}
        {loading ? (
          <p className="mt-4 text-xs text-stone-500">Loading calendar...</p>
        ) : null}
        {!loading && !error && monthEvents.length ? (
          <p className="mt-4 text-xs text-stone-500">
            Showing {monthEvents.length} events for this month.
          </p>
        ) : null}
      </section>

      <EventsDetailModal
        open={Boolean(selectedEvent)}
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}

export default CalendarManagementPage;
