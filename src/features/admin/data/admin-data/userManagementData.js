export const userStats = [
  { label: "Total Users", value: "12,480", icon: "users" },
  { label: "Active", value: "11,204", growth: "+6.8%", icon: "badge-check" },
  { label: "New This Month", value: "842", growth: "+12.4%", icon: "user-plus" },
  { label: "Avg Events / User", value: "3.4", icon: "calendar-range" },
];

export const userStatusStyles = {
  Active: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
  Suspended: "border-red-500/25 bg-red-500/10 text-red-300",
  Pending: "border-amber-500/25 bg-amber-500/10 text-amber-300",
};

export const initialUsers = [
  { id: "USR-001", name: "Riya Mehta", email: "riya@orbit.com", status: "Active", events: 12 },
  { id: "USR-002", name: "Arjun Patel", email: "arjun@orbit.com", status: "Active", events: 8 },
  { id: "USR-003", name: "Neha Sharma", email: "neha@orbit.com", status: "Suspended", events: 2 },
  { id: "USR-004", name: "Karan Singh", email: "karan@orbit.com", status: "Active", events: 24 },
  { id: "USR-005", name: "Priya Kapoor", email: "priya@orbit.com", status: "Pending", events: 0 },
  { id: "USR-006", name: "Vikram Joshi", email: "vikram@orbit.com", status: "Active", events: 17 },
];
