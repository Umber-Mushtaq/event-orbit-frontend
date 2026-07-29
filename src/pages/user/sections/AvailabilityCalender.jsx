import { useState, useMemo } from "react";
import Calendar from "react-calendar";
import { format, isSameDay } from "date-fns";
import "react-calendar/dist/Calendar.css";

export default function AvailabilityCalendar({
  bookedDates = {},
  onDateSelect,
}) {
  const [selectedDate, setSelectedDate] = useState(null);

  const bookedSet = useMemo(
    () => new Set(Object.keys(bookedDates)),
    [bookedDates],
  );

  return (
    <div className='w-full'>
      <style>{`
        .react-calendar-blackgold {
          width: 100%;
          background: #0b1220;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 16px;
          padding: 16px;
          color: white;
          font-family: Inter, sans-serif;
        }

        /* Navigation */

        .react-calendar__navigation {
          display: flex;
          margin-bottom: 16px;
        }

        .react-calendar__navigation button {
          background: transparent;
          color: white;
          border: none;
          font-size: 16px;
          border-radius: 8px;
          transition: .2s;
        }

        .react-calendar__navigation button:hover {
          background: rgba(245,158,11,.15);
          color: #f59e0b;
        }

        /* Weekday headings */

        .react-calendar__month-view__weekdays {
          margin-bottom: 8px;
        }

        .react-calendar__month-view__weekdays__weekday {
          text-align: center;
          color: #94a3b8;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .react-calendar__month-view__weekdays__weekday abbr {
          text-decoration: none;
        }

        /* Tiles */

        .react-calendar__tile {
          position: relative;
          height: 78px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,.05);
          background: rgba(255,255,255,.02);
          color: white;
          transition: .2s;
        }

        .react-calendar__tile:hover {
          background: rgba(245,158,11,.15);
          color: #fbbf24;
        }

        .react-calendar__tile:hover abbr {
          color: #fbbf24;
        }

        .react-calendar__tile abbr {
          font-weight: 700;
        }

        /* Today */

        .rc-today {
          border: 1px solid #f59e0b;
        }

        /* Selected */

        .rc-selected,
        .react-calendar__tile--active {
          background: linear-gradient(
            135deg,
            #b45309,
            #f59e0b
          ) !important;
          color: black !important;
        }

        .rc-selected abbr,
        .react-calendar__tile--active abbr {
          color: black !important;
        }

        .rc-selected:hover,
        .react-calendar__tile--active:hover,
        .rc-selected:hover abbr,
        .react-calendar__tile--active:hover abbr {
          color: black !important;
        }

        /* Booked */

        .rc-booked {
          border-left: 4px solid #f59e0b;
        }

        /* Previous/Next month */

        .react-calendar__month-view__days__day--neighboringMonth {
          opacity: .4;
        }

        /* Badge */

        .rc-badge {
          margin-top: 8px;
          padding: 2px 6px;
          border-radius: 6px;
          background: rgba(245,158,11,.15);
          color: #fbbf24;
          font-size: 10px;
          font-weight: 600;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        /* Disabled */

        .react-calendar__tile:disabled {
          background: rgba(255,255,255,.03);
          color: #777;
          cursor: not-allowed;
        }

        .react-calendar__tile:disabled:hover,
        .react-calendar__tile:disabled:hover abbr {
          color: #777;
        }
      `}</style>

      <Calendar
        className='react-calendar-blackgold'
        value={selectedDate}
        onChange={(date) => {
          const key = format(date, "yyyy-MM-dd");

          if (bookedSet.has(key)) return;

          setSelectedDate(date);
          onDateSelect?.(key);
        }}
        tileDisabled={({ date, view }) =>
          view === "month" && bookedSet.has(format(date, "yyyy-MM-dd"))
        }
        tileClassName={({ date, view }) => {
          if (view !== "month") return "";

          const classes = [];

          const key = format(date, "yyyy-MM-dd");

          if (bookedSet.has(key)) classes.push("rc-booked");

          if (selectedDate && isSameDay(date, selectedDate))
            classes.push("rc-selected");

          if (isSameDay(date, new Date())) classes.push("rc-today");

          return classes.join(" ");
        }}
        tileContent={({ date, view }) => {
          if (view !== "month") return null;

          const key = format(date, "yyyy-MM-dd");

          if (!bookedDates[key]) return null;

          return <div className='rc-badge'>{bookedDates[key]}</div>;
        }}
      />

      {selectedDate && (
        <p className='mt-4 text-sm text-slate-300'>
          Selected Date:&nbsp;
          <span className='font-semibold text-amber-400'>
            {format(selectedDate, "yyyy-MM-dd")}
          </span>
        </p>
      )}
    </div>
  );
}
