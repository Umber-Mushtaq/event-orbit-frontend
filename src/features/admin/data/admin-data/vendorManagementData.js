import { BriefcaseBusiness, CircleCheckBig, Clock3, CircleX } from "lucide-react";

const makeAvatar = (name, color) => {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${color}" />
          <stop offset="100%" stop-color="#111111" />
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="28" fill="url(#g)" />
      <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#111111" font-family="Arial, sans-serif" font-size="34" font-weight="700">${initials}</text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const vendorStats = [
  { label: "Total Vendors", value: "12", icon: "briefcase-business" },
  { label: "Approved", value: "9", growth: "+5.2%", icon: "circle-check-big" },
  { label: "Pending", value: "1", icon: "clock-3" },
  { label: "Suspended", value: "1", icon: "circle-x" },
];

export const vendorFilters = ["All", "Approved", "Pending", "Rejected", "Suspended"];

export const vendorSortOptions = [
  { value: "revenue", label: "Revenue" },
  { value: "bookings", label: "Bookings" },
  { value: "rating", label: "Rating" },
  { value: "name", label: "Name" },
];

export const vendorStatusStyles = {
  Approved: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
  Pending: "border-amber-500/25 bg-amber-500/10 text-amber-300",
  Rejected: "border-red-500/25 bg-red-500/10 text-red-300",
  Suspended: "border-stone-500/25 bg-stone-500/10 text-stone-300",
};

export const vendorIconMap = {
  "briefcase-business": BriefcaseBusiness,
  "circle-check-big": CircleCheckBig,
  "clock-3": Clock3,
  "circle-x": CircleX,
};

export const initialVendors = [
  {
    id: "VND-220",
    name: "Royal Ballroom",
    category: "Marriage Halls",
    location: "Mumbai",
    rating: 4.9,
    bookings: 142,
    revenue: "$184,000",
    status: "Approved",
    avatar: makeAvatar("Royal Ballroom", "#d7a63d"),
  },
  {
    id: "VND-221",
    name: "Spice Route Catering",
    category: "Catering Services",
    location: "Delhi",
    rating: 4.8,
    bookings: 218,
    revenue: "$248,000",
    status: "Approved",
    avatar: makeAvatar("Spice Route", "#f0bf45"),
  },
  {
    id: "VND-222",
    name: "Lumina Decor Studio",
    category: "Decorators",
    location: "Bengaluru",
    rating: 4.7,
    bookings: 96,
    revenue: "$124,000",
    status: "Approved",
    avatar: makeAvatar("Lumina Decor", "#c8952f"),
  },
  {
    id: "VND-223",
    name: "FrameWorks Photography",
    category: "Photographers",
    location: "Pune",
    rating: 4.9,
    bookings: 174,
    revenue: "$162,000",
    status: "Approved",
    avatar: makeAvatar("FrameWorks", "#d6aa43"),
  },
  {
    id: "VND-224",
    name: "Beat Drop DJs",
    category: "DJs & Entertainment",
    location: "Hyderabad",
    rating: 4.6,
    bookings: 88,
    revenue: "$72,000",
    status: "Pending",
    avatar: makeAvatar("Beat Drop", "#f0b53c"),
  },
  {
    id: "VND-225",
    name: "Petal & Stem",
    category: "Florists",
    location: "Jaipur",
    rating: 4.7,
    bookings: 64,
    revenue: "$38,000",
    status: "Approved",
    avatar: makeAvatar("Petal Stem", "#e2b34e"),
  },
  {
    id: "VND-226",
    name: "Skybeam Lighting",
    category: "Lighting Services",
    location: "Chennai",
    rating: 4.5,
    bookings: 52,
    revenue: "$44,000",
    status: "Approved",
    avatar: makeAvatar("Skybeam", "#d8a93a"),
  },
  {
    id: "VND-227",
    name: "Velvet Glam Studio",
    category: "Makeup Artists",
    location: "Mumbai",
    rating: 4.9,
    bookings: 132,
    revenue: "$86,000",
    status: "Approved",
    avatar: makeAvatar("Velvet Glam", "#f2c04b"),
  },
];

export const emptyVendorForm = {
  name: "",
  category: "Marriage Halls",
  location: "",
  rating: 4.5,
  bookings: 0,
  revenue: "$0",
  status: "Pending",
  avatar: "",
};
