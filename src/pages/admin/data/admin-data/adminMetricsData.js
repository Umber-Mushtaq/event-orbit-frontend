export const adminStats = [
  {
    label: "Total Revenue",
    value: "$284.5K",
    growth: "+18.4%",
    trend: "up",
    icon: "wallet",
  },
  {
    label: "Total Bookings",
    value: "1,240",
    growth: "+12.9%",
    trend: "up",
    icon: "calendar-check",
  },
  {
    label: "Total Vendors",
    value: "318",
    growth: "+8.2%",
    trend: "up",
    icon: "building-2",
  },
  {
    label: "Total Users",
    value: "9,824",
    growth: "+21.1%",
    trend: "up",
    icon: "users",
  },
  {
    label: "Active Events",
    value: "86",
    growth: "+5.4%",
    trend: "up",
    icon: "sparkles",
  },
  {
    label: "Upcoming Events",
    value: "24",
    growth: "+9.7%",
    trend: "up",
    icon: "party-popper",
  },
  {
    label: "Completed Events",
    value: "146",
    growth: "+14.8%",
    trend: "up",
    icon: "check-circle-2",
  },
  {
    label: "Pending Approvals",
    value: "17",
    growth: "-3.6%",
    trend: "down",
    icon: "shield-alert",
  },
];

export const revenueAnalytics = [
  { month: "Jan", revenue: 18000, bookings: 72 },
  { month: "Feb", revenue: 22000, bookings: 88 },
  { month: "Mar", revenue: 26000, bookings: 96 },
  { month: "Apr", revenue: 25000, bookings: 91 },
  { month: "May", revenue: 31000, bookings: 109 },
  { month: "Jun", revenue: 34000, bookings: 118 },
  { month: "Jul", revenue: 35500, bookings: 126 },
  { month: "Aug", revenue: 38000, bookings: 133 },
  { month: "Sep", revenue: 36500, bookings: 127 },
  { month: "Oct", revenue: 39800, bookings: 141 },
  { month: "Nov", revenue: 42000, bookings: 149 },
  { month: "Dec", revenue: 45500, bookings: 158 },
];

export const eventStatusDistribution = [
  { name: "Upcoming", value: 24, color: "hsl(var(--primary))" },
  { name: "Active", value: 18, color: "hsl(var(--primary) / 0.8)" },
  { name: "Completed", value: 46, color: "hsl(var(--muted-foreground))" },
  { name: "Cancelled", value: 7, color: "hsl(var(--destructive))" },
];

export const vendorPerformance = [
  { name: "Royal Bloom", score: 96 },
  { name: "Golden Lights", score: 91 },
  { name: "Velvet Vows", score: 88 },
  { name: "Luxe Caterers", score: 84 },
  { name: "Halo Decor", score: 79 },
];

export const recentEvents = [
  {
    name: "Windsor Grand Gala",
    category: "Luxury Wedding",
    date: "Jun 24, 2026",
    venue: "Pearl Palace",
    organizer: "Aisha Khan",
    status: "Confirmed",
    revenue: "$18,400",
  },
  {
    name: "Moonlight Reception",
    category: "Reception",
    date: "Jun 26, 2026",
    venue: "The Opal Hall",
    organizer: "Sarah Ahmed",
    status: "Pending",
    revenue: "$12,200",
  },
  {
    name: "Citrine Celebration",
    category: "Engagement",
    date: "Jun 29, 2026",
    venue: "Marble Atrium",
    organizer: "Noah Malik",
    status: "In Progress",
    revenue: "$9,500",
  },
  {
    name: "Imperial Union",
    category: "Wedding",
    date: "Jul 02, 2026",
    venue: "The Crown Estate",
    organizer: "Hira Zaman",
    status: "Completed",
    revenue: "$22,600",
  },
  {
    name: "Aurora Soiree",
    category: "Anniversary",
    date: "Jul 05, 2026",
    venue: "Noor Gardens",
    organizer: "Zain Ali",
    status: "Confirmed",
    revenue: "$14,900",
  },
];

export const recentActivities = [
  {
    title: "New booking request received",
    description: "Windsor Grand Gala requested premium catering.",
    time: "3 min ago",
    tone: "gold",
    icon: "calendar-plus",
  },
  {
    title: "Vendor profile updated",
    description: "Royal Bloom refreshed their gallery and pricing.",
    time: "18 min ago",
    tone: "neutral",
    icon: "badge-check",
  },
  {
    title: "New user registered",
    description: "A premium customer account was created successfully.",
    time: "42 min ago",
    tone: "emerald",
    icon: "user-plus",
  },
  {
    title: "Event status changed",
    description: "Moonlight Reception moved to confirmed.",
    time: "1 hr ago",
    tone: "gold",
    icon: "sparkles",
  },
  {
    title: "Payment cleared",
    description: "Invoice #INV-24019 was settled in full.",
    time: "2 hrs ago",
    tone: "emerald",
    icon: "credit-card",
  },
];

export const calendarEvents = [
  {
    label: "Vendor appointment",
    title: "Luxe Caterers onboarding",
    time: "09:00 AM",
  },
  {
    label: "Scheduled meeting",
    title: "Royal Bloom vendor review",
    time: "11:30 AM",
  },
  {
    label: "Upcoming event",
    title: "Aurora Soiree walkthrough",
    time: "02:00 PM",
  },
  {
    label: "Team sync",
    title: "Admin weekly planning",
    time: "04:15 PM",
  },
];

export const quickActions = [
  "Create Event",
  "Add Vendor",
  "Add User",
  "Create Category",
  "Generate Report",
];

export const notifications = [
  {
    title: "Pending vendor approval",
    description: "3 vendors are waiting for review.",
    time: "5 min ago",
  },
  {
    title: "High-value booking",
    description: "A new premium event crossed $20K.",
    time: "22 min ago",
  },
  {
    title: "Payment sync completed",
    description: "Revenue figures updated for today.",
    time: "1 hr ago",
  },
];

export const messages = [
  {
    title: "Nadia from Royal Bloom",
    description: "Can we revise the gallery pricing?",
    time: "7 min ago",
  },
  {
    title: "Operations Team",
    description: "Calendar availability updated for next week.",
    time: "28 min ago",
  },
];
