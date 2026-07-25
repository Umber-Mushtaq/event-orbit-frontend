import {
  BriefcaseBusiness,
  Camera,
  Flower2,
  LayoutGrid,
  Music2,
  Paintbrush2,
  Sparkles,
  Tags,
  UtensilsCrossed,
  Video,
} from "lucide-react";

const buildImage = (label, hue) => {
  const safeLabel = label.replaceAll("&", "and");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="240" height="160" viewBox="0 0 240 160">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${hue}" />
          <stop offset="100%" stop-color="#0f0f0f" />
        </linearGradient>
      </defs>
      <rect width="240" height="160" rx="24" fill="url(#g)" />
      <circle cx="196" cy="40" r="24" fill="rgba(255,255,255,0.08)" />
      <text x="24" y="62" fill="#ffffff" font-family="Arial, sans-serif" font-size="24" font-weight="700">${safeLabel}</text>
      <text x="24" y="98" fill="#d9c89b" font-family="Arial, sans-serif" font-size="14">Service offering</text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const categoryIconOptions = [
  { value: "tags", label: "Tags", Icon: Tags },
  { value: "sparkles", label: "Sparkles", Icon: Sparkles },
  { value: "utensils-crossed", label: "Catering", Icon: UtensilsCrossed },
  { value: "camera", label: "Camera", Icon: Camera },
  { value: "video", label: "Video", Icon: Video },
  { value: "music", label: "Music", Icon: Music2 },
  { value: "flower", label: "Flower", Icon: Flower2 },
  { value: "paintbrush", label: "Decor", Icon: Paintbrush2 },
  { value: "briefcase", label: "Planner", Icon: BriefcaseBusiness },
  { value: "grid", label: "Grid", Icon: LayoutGrid },
];

export const initialCategories = [
  {
    id: "cat-1",
    name: "Marriage Halls",
    image: buildImage("Marriage Halls", "#b77f17"),
    icon: "grid",
    status: "Active",
    vendors: 86,
    bookings: 1240,
    revenue: "$320,000",
    listings: 120,
  },
  {
    id: "cat-2",
    name: "Catering Services",
    image: buildImage("Catering", "#8b6b12"),
    icon: "utensils-crossed",
    status: "Active",
    vendors: 124,
    bookings: 1860,
    revenue: "$412,000",
    listings: 114,
  },
  {
    id: "cat-3",
    name: "Decorators",
    image: buildImage("Decorators", "#6d4c12"),
    icon: "paintbrush",
    status: "Active",
    vendors: 68,
    bookings: 980,
    revenue: "$184,000",
    listings: 95,
  },
  {
    id: "cat-4",
    name: "Photographers",
    image: buildImage("Photographers", "#7f5a19"),
    icon: "camera",
    status: "Active",
    vendors: 92,
    bookings: 1320,
    revenue: "$246,000",
    listings: 129,
  },
  {
    id: "cat-5",
    name: "Videographers",
    image: buildImage("Videographers", "#4f3f24"),
    icon: "video",
    status: "Active",
    vendors: 54,
    bookings: 720,
    revenue: "$150,000",
    listings: 76,
  },
  {
    id: "cat-6",
    name: "DJs & Entertainment",
    image: buildImage("DJs", "#aa7f17"),
    icon: "music",
    status: "Active",
    vendors: 41,
    bookings: 530,
    revenue: "$96,000",
    listings: 51,
  },
  {
    id: "cat-7",
    name: "Event Planners",
    image: buildImage("Planners", "#c09020"),
    icon: "briefcase",
    status: "Active",
    vendors: 28,
    bookings: 410,
    revenue: "$142,000",
    listings: 39,
  },
  {
    id: "cat-8",
    name: "Florists",
    image: buildImage("Florists", "#8c6423"),
    icon: "flower",
    status: "Active",
    vendors: 36,
    bookings: 480,
    revenue: "$64,000",
    listings: 50,
  },
];

export const categoryStatusStyles = {
  Active: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
  Draft: "border-white/10 bg-white/5 text-stone-300",
  Inactive: "border-red-500/25 bg-red-500/10 text-red-300",
};

export const categorySortOptions = [
  { value: "revenue", label: "Revenue" },
  { value: "vendors", label: "Vendors" },
  { value: "bookings", label: "Bookings" },
  { value: "listings", label: "Listings" },
  { value: "name", label: "Name" },
];

export const categoryStats = [
  { label: "Categories", value: "14", icon: "tags" },
  { label: "Total Vendors", value: "686", icon: "briefcase" },
  { label: "Total Bookings", value: "9,540", icon: "grid" },
  { label: "Revenue Generated", value: "$1,935,000", icon: "sparkles" },
];

export const emptyCategoryForm = {
  name: "",
  image: "",
  icon: "tags",
  status: "Active",
  vendors: 0,
  bookings: 0,
  revenue: "$0",
  listings: 0,
};
