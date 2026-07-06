export const eventStats = [
  { label: "Upcoming", value: "318", growth: "+9.4%", trend: "up" },
  { label: "Live Now", value: "142", growth: "+4.2%", trend: "up" },
  { label: "Completed", value: "762", growth: "+11.8%", trend: "up" },
  { label: "Drafts", value: "24", growth: null, trend: "flat" },
];

export const eventRows = [
  {
    id: "EVT-1042",
    name: "Mehta-Kapoor Wedding",
    category: "Marriage Halls",
    date: "2026-06-22",
    venue: "The Royal Ballroom",
    status: "Upcoming",
    attendees: "480",
    revenue: "$28,400",
  },
  {
    id: "EVT-1041",
    name: "Tech Summit 2026",
    category: "Event Planners",
    date: "2026-06-19",
    venue: "Hyatt Convention",
    status: "Live",
    attendees: "1,240",
    revenue: "$96,000",
  },
  {
    id: "EVT-1040",
    name: "Sharma Sangeet Night",
    category: "DJs & Entertainment",
    date: "2026-06-18",
    venue: "Grand Pavilion",
    status: "Live",
    attendees: "320",
    revenue: "$14,800",
  },
  {
    id: "EVT-1039",
    name: "Annual Fashion Gala",
    category: "Decorators",
    date: "2026-06-14",
    venue: "ITC Maurya",
    status: "Completed",
    attendees: "680",
    revenue: "$52,000",
  },
  {
    id: "EVT-1038",
    name: "Patel Reception",
    category: "Catering Services",
    date: "2026-06-12",
    venue: "Sunset Gardens",
    status: "Completed",
    attendees: "410",
    revenue: "$24,600",
  },
  {
    id: "EVT-1037",
    name: "Corporate Awards Night",
    category: "Photographers",
    date: "2026-06-29",
    venue: "Taj Palace",
    status: "Upcoming",
    attendees: "220",
    revenue: "$18,400",
  },
  {
    id: "EVT-1036",
    name: "Khanna Engagement",
    category: "Florists",
    date: "2026-07-02",
    venue: "Lotus Lawns",
    status: "Draft",
    attendees: "0",
    revenue: "--",
  },
  {
    id: "EVT-1035",
    name: "Music Fest Underground",
    category: "Sound Services",
    date: "2026-05-30",
    venue: "Open Air Arena",
    status: "Cancelled",
    attendees: "0",
    revenue: "--",
  },
];

export const filterOptions = ["All", "Draft", "Upcoming", "Live", "Completed", "Cancelled"];

export const viewOptions = ["List", "Grid", "Calendar"];

export const statusStyles = {
  Upcoming: "border-sky-500/25 bg-sky-500/10 text-sky-300",
  Live: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
  Completed: "border-amber-500/25 bg-amber-500/10 text-amber-300",
  Draft: "border-white/10 bg-white/5 text-stone-300",
  Cancelled: "border-red-500/25 bg-red-500/10 text-red-300",
};
