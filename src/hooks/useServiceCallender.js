import { useState, useEffect } from "react";
import axios from "axios";

export const useServiceCalendar = (serviceId) => {
  // Initialize calendar view context (e.g., June 2026 baseline context)
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1));
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Fetch unavailable dates from EventOrbit backend
  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        // Build the dynamic URL query parameters dynamically
        const url = serviceId
          ? `http://localhost:5000/api/bookings/booked-dates?serviceId=${serviceId}`
          : `http://localhost:5000/api/bookings/booked-dates`; // Triggers your smart token fallback on backend

        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setBookedDates(response.data.bookedDates);
        }
      } catch (err) {
        console.error("Error pulling database calendar allocations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUnavailableDates();
  }, [serviceId, currentDate]); // Fires when the month or active service shifts

  // Helper date parsing math string builder
  const formatDateString = (day) => {
    if (!day) return "";
    const cleanMonth = String(currentMonth + 1).padStart(2, "0");
    const cleanDay = String(day).padStart(2, "0");
    return `${currentYear}-${cleanMonth}-${cleanDay}`;
  };

  const isDateBooked = (day) => {
    const dateStr = formatDateString(day);
    return bookedDates.includes(dateStr);
  };

  const handleDateClick = (day) => {
    if (!day || isDateBooked(day)) return;
    setSelectedDate(formatDateString(day));
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Build grid matrix slots
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const blankDays = Array(firstDayOfMonth).fill(null);
  const monthDays = Array.from({ length: totalDaysInMonth }, (_, i) => i + 1);
  const calendarGrid = [...blankDays, ...monthDays];

  return {
    currentYear,
    currentMonth,
    selectedDate,
    calendarGrid,
    loading,
    handlePrevMonth,
    handleNextMonth,
    handleDateClick,
    isDateBooked,
    formatDateString,
  };
};
