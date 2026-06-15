import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  CheckCircle,
} from "lucide-react";

const BOOKED_DATES = [
  "2026-06-15",
  "2026-06-16",
  "2026-06-24",
  "2026-06-25",
  "2026-07-04",
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
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

function ServiceCalendar() {
  // Initialize calendar view to current month/year (June 2026 baseline context)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1));
  const [selectedDate, setSelectedDate] = useState(null);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // 1. CALCULATE CALENDAR DAYS GRID MATRIX
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const blankDays = Array(firstDayOfMonth).fill(null);
  const monthDays = Array.from({ length: totalDaysInMonth }, (_, i) => i + 1);
  const calendarGrid = [...blankDays, ...monthDays];

  // 2. HELPER TO CYCLE MONTHS Forward/Backward
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // 3. DATE INTERCEPTION COMPLIANCE MATCH CHECKERS
  const formatDateString = (day) => {
    if (!day) return "";
    const cleanMonth = String(currentMonth + 1).padStart(2, "0");
    const cleanDay = String(day).padStart(2, "0");
    return `${currentYear}-${cleanMonth}-${cleanDay}`;
  };

  const isDateBooked = (day) => {
    const dateStr = formatDateString(day);
    return BOOKED_DATES.includes(dateStr);
  };

  const handleDateClick = (day) => {
    if (!day || isDateBooked(day)) return;
    setSelectedDate(formatDateString(day));
  };

  return (
    <div className='w-full max-w-sm bg-neutral-950 text-white border border-white/5 rounded-sm p-6 shadow-2xl flex flex-col relative overflow-hidden group hover:border-border-gold/30 transition-all duration-500'>
      <div className='absolute -top-12 -right-12 w-48 h-48 bg-amber-500/5 blur-3xl rounded-full pointer-events-none group-hover:bg-amber-500/10 transition-colors duration-500' />
      <div className='flex items-center gap-4 mb-6'>
        <div className='w-11 h-11 rounded-full bg-glass-gold border border-border-gold/20 text-border-gold flex items-center justify-center shadow-gold-glow shrink-0'>
          <CalendarIcon className='w-5 h-5' />
        </div>
        <div>
          <p className='font-poppins font-light text-xs text-stone-400 leading-normal'>
            Gold slots are available. Dark slots are already booked.
          </p>
        </div>
      </div>
      <div className='flex items-center justify-between mb-6'>
        <h3 className='font-montserrat font-black text-base tracking-wide text-white uppercase'>
          {MONTHS[currentMonth]} {currentYear}
        </h3>
        <div className='flex items-center gap-2'>
          <button
            onClick={handlePrevMonth}
            className='w-9 h-9 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center text-stone-400 hover:text-border-gold-hover hover:border-border-gold/40 hover:bg-neutral-800 transition-all duration-200 cursor-pointer'
          >
            <ChevronLeft className='w-5 h-5' />
          </button>
          <button
            onClick={handleNextMonth}
            className='w-9 h-9 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center text-stone-400 hover:text-border-gold-hover hover:border-border-gold/40 hover:bg-neutral-800 transition-all duration-200 cursor-pointer'
          >
            <ChevronRight className='w-5 h-5' />
          </button>
        </div>
      </div>
      <div className='grid grid-cols-7 text-center gap-y-2 mb-4'>
        {WEEKDAYS.map((day) => (
          <span
            key={day}
            className='font-poppins font-semibold text-xs text-stone-500 tracking-wider uppercase'
          >
            {day}
          </span>
        ))}
      </div>
      <div className='grid grid-cols-7 text-center gap-2'>
        {calendarGrid.map((day, idx) => {
          if (day === null)
            return <div key={`empty-${idx}`} className='aspect-square' />;

          const booked = isDateBooked(day);
          const currentString = formatDateString(day);
          const isSelected = selectedDate === currentString;

          return (
            <button
              key={`day-${day}`}
              type='button'
              disabled={booked}
              onClick={() => handleDateClick(day)}
              className={`aspect-square rounded-xl font-poppins text-xs font-semibold flex flex-col items-center justify-center transition-all duration-200 relative border ${
                booked
                  ? "bg-neutral-900/30 text-stone-600 border-white/5 line-through opacity-30 cursor-not-allowed"
                  : isSelected
                    ? "bg-glass-gold text-white border-border-gold shadow-gold-glow font-bold scale-105"
                    : "bg-neutral-900/60 text-stone-200 border-white/5 hover:border-border-gold/50 hover:text-border-gold-hover cursor-pointer"
              }`}
            >
              <span>{day}</span>
              {!booked && !isSelected && (
                <span className='w-1 h-1 bg-border-gold/40 rounded-full absolute bottom-1.5' />
              )}
            </button>
          );
        })}
      </div>
      {selectedDate && (
        <div className='mt-6 pt-4 border-t border-white/5 flex items-center gap-2.5 font-poppins text-xs text-stone-300 animate-fade-in'>
          <CheckCircle className='w-4 h-4 text-border-gold-hover shrink-0' />
          <span>
            Selected Date:{" "}
            <strong className='text-border-gold-hover font-bold tracking-wide'>
              {selectedDate}
            </strong>
          </span>
        </div>
      )}
    </div>
  );
}

export default ServiceCalendar;
