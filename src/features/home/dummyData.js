import {
  Building2,
  UtensilsCrossed,
  Camera,
  Sparkles,
  Flower2,
  Music,
  Star,
  MapPin,
  Heart,
  Search,
  Scale,
  ShieldCheck,
} from "lucide-react";

import VendorImg1 from "../../assets/hall.jpeg";
import VendorImg2 from "../../assets/photography.jpg";
import VendorImg3 from "../../assets/catering.jpg";
import Avatar1 from "../../assets/avarar1.jpg";
import Avatar2 from "../../assets/avatar2.jpg";
import Avatar3 from "../../assets/avatar3.jpg";

export const VENDORS_DATA = [
  {
    id: 1,
    name: "Elite Banquet Hall",
    category: "Marriage Hall",
    image: VendorImg1,
    avatar: Avatar1,
    rating: 5,
    location: "Downtown Plaza",
    price: "520",
  },
  {
    id: 2,
    name: "Gourmet Catering Co.",
    category: "Catering Services",
    image: VendorImg2,
    avatar: Avatar2,
    rating: 5,
    location: "Westside Hub",
    price: "480",
  },
  {
    id: 3,
    name: "Timeless Frame Studio",
    category: "Photography",
    image: VendorImg3,
    avatar: Avatar3,
    rating: 4,
    location: "Metro Avenue",
    price: "560",
  },
];

export const CATEGORIES_DATA = [
  {
    id: 1,
    title: "Marriage Hall",
    desc: "Discover and book premium wedding venues, banquet halls, and outdoor lawns.",
    Icon: Building2,
  },
  {
    id: 2,
    title: "Catering",
    desc: "Savor and choose top-rated wedding culinary experiences, buffets, and menus.",
    Icon: UtensilsCrossed,
  },
  {
    id: 3,
    title: "Photography",
    desc: "Capture every beautiful moment with luxury wedding photographers and videographers.",
    Icon: Camera,
  },
  {
    id: 4,
    title: "Makeup Artist",
    desc: "Find certified bridal makeup specialists and hairstylists tailored for your look.",
    Icon: Sparkles,
  },
  {
    id: 5,
    title: "Decoration",
    desc: "Transform your venue with customized stage themes, lighting, and gorgeous floral setups.",
    Icon: Flower2,
  },
  {
    id: 6,
    title: "DJ",
    desc: "Keep the celebration alive with professional sound setups, live bands, and performers.",
    Icon: Music,
  },
];

export const STEPS_DATA = [
  {
    id: 1,
    stepNumber: "1",
    title: "Browse Services",
    desc: "Explore top-rated venues, catering, photography, and decor options tailored to your vision.",
    Icon: Search,
  },
  {
    id: 2,
    stepNumber: "2",
    title: "Compare Vendors",
    desc: "Review portfolio assets, pricing matrices, and real couple feedback to select the perfect match.",
    Icon: Scale,
  },
  {
    id: 3,
    stepNumber: "3",
    title: "Book with Confidence",
    desc: "Secure your wedding date through our integrated platform with end-to-end payment security.",
    Icon: ShieldCheck,
  },
];

export const STATS_DATA = [
  { id: 1, value: "5000+", label: "Weddings Planned" },
  { id: 2, value: "1000+", label: "Verified Vendors" },
  { id: 3, value: "98%", label: "Customer Satisfaction" },
  { id: 4, value: "50+", label: "Cities Covered" },
];
