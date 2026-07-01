export const formatAdminCurrency = (value, currency = "USD") => {
  const amount = Number(value) || 0;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const toAdminDate = (value) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const toAdminIsoDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

export const mapAdminSummaryCards = (summary = {}) => [
  {
    label: "Total Revenue",
    value: formatAdminCurrency(summary.totalRevenue ?? 0),
    growth: summary.growth?.revenue ? `${summary.growth.revenue > 0 ? "+" : ""}${summary.growth.revenue}%` : null,
    trend: summary.growth?.revenue >= 0 ? "up" : "down",
    icon: "wallet",
  },
  {
    label: "Total Bookings",
    value: String(summary.totalBookings ?? 0),
    growth: summary.growth?.bookings ? `${summary.growth.bookings > 0 ? "+" : ""}${summary.growth.bookings}%` : null,
    trend: summary.growth?.bookings >= 0 ? "up" : "down",
    icon: "calendar-check",
  },
  {
    label: "Total Vendors",
    value: String(summary.totalVendors ?? 0),
    growth: summary.growth?.vendors ? `${summary.growth.vendors > 0 ? "+" : ""}${summary.growth.vendors}%` : null,
    trend: summary.growth?.vendors >= 0 ? "up" : "down",
    icon: "building-2",
  },
  {
    label: "Total Users",
    value: String(summary.totalUsers ?? 0),
    growth: summary.growth?.users ? `${summary.growth.users > 0 ? "+" : ""}${summary.growth.users}%` : null,
    trend: summary.growth?.users >= 0 ? "up" : "down",
    icon: "users",
  },
  {
    label: "Active Events",
    value: String(summary.activeEvents ?? 0),
    icon: "sparkles",
  },
  {
    label: "Upcoming Events",
    value: String(summary.upcomingEvents ?? 0),
    icon: "party-popper",
  },
  {
    label: "Completed Events",
    value: String(summary.completedEvents ?? 0),
    icon: "check-circle-2",
  },
  {
    label: "Pending Approvals",
    value: String(summary.pendingApprovals ?? 0),
    icon: "shield-alert",
  },
];

export const mapAdminEvents = (items = []) =>
  items.map((item) => ({
    ...item,
    revenue: typeof item.revenue === "number" ? formatAdminCurrency(item.revenue) : item.revenue,
    date: toAdminIsoDate(item.date) || item.date,
  }));

export const mapAdminCategory = (item = {}) => ({
  ...item,
  revenue: typeof item.revenue === "number" ? formatAdminCurrency(item.revenue) : item.revenue,
});

export const mapAdminVendor = (item = {}) => ({
  ...item,
  revenue: typeof item.revenue === "number" ? formatAdminCurrency(item.revenue) : item.revenue,
});

export const mapAdminBooking = (item = {}) => ({
  ...item,
  amount: typeof item.amount === "number" ? formatAdminCurrency(item.amount, item.currency || "USD") : item.amount,
});
