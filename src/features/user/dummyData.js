import Vendor1 from "../../assets/service1.jpg";
import Vendor2 from "../../assets/service2.jpg";
import Vendor3 from "../../assets/service3.jpg";
import Avatar1 from "../../assets/avarar1.jpg";
import Avatar2 from "../../assets/avatar2.jpg";
import Avatar3 from "../../assets/avatar3.jpg";
import VenueImg from "../../assets/service1.jpg";
import CateringImg from "../../assets/service2.jpg";
import PhotoImg from "../../assets/service3.jpg";

import {
  Building2,
  UtensilsCrossed,
  Camera,
  Flower2,
  Music,
} from "lucide-react";

export const WISHLIST_DATA = [
  {
    id: 1,
    name: "Elite Banquet Hall",
    category: "Marriage Hall",
    image: VenueImg,
    rating: 5,
    location: "Downtown Plaza",
    price: "2,500",
  },
  {
    id: 2,
    name: "Gourmet Catering Co.",
    category: "Catering Services",
    image: CateringImg,
    rating: 5,
    location: "Westside Hub",
    price: "1,800",
  },
  {
    id: 3,
    name: "Timeless Frame Studio",
    category: "Photography Suite",
    image: PhotoImg,
    rating: 4,
    location: "Metro Avenue",
    price: "1,500",
  },
];

export const CATEGORIES = [
  { id: "venue", label: "Venue", Icon: Building2 },
  { id: "catering", label: "Catering", Icon: UtensilsCrossed },
  { id: "photography", label: "Photography", Icon: Camera },
  { id: "decor", label: "Decor", Icon: Flower2 },
  { id: "music", label: "Music", Icon: Music },
];

export const VENDORS_LIST = [
  {
    id: 1,
    name: "Elite Banquet Hall",
    category: "Marriage Hall",
    image: VenueImg,
    avatar: Avatar1,
    rating: 5,
    location: "Downtown Plaza",
    price: "520",
  },
  {
    id: 2,
    name: "Gourmet Catering Co.",
    category: "catering services",
    image: CateringImg,
    avatar: Avatar2,
    rating: 5,
    location: "Westside Hub",
    price: "480",
  },
  {
    id: 3,
    name: "Timeless Frame Studio",
    category: "Photography",
    image: PhotoImg,
    avatar: Avatar3,
    rating: 4,
    location: "Metro Avenue",
    price: "560",
  },
  {
    id: 4,
    name: "Elite Banquet Hall",
    category: "Marriage Hall",
    image: VenueImg,
    avatar: Avatar1,
    rating: 5,
    location: "Downtown Plaza",
    price: "520",
  },
  {
    id: 5,
    name: "Gourmet Catering Co.",
    category: "catering services",
    image: CateringImg,
    avatar: Avatar2,
    rating: 5,
    location: "Westside Hub",
    price: "480",
  },
  {
    id: 6,
    name: "Timeless Frame Studio",
    category: "Photography",
    image: PhotoImg,
    avatar: Avatar3,
    rating: 4,
    location: "Metro Avenue",
    price: "560",
  },
];

export const STATS_DATA = [
  { label: "Total Bookings", value: "234", subLabel: "Total Bookings" },
  { label: "Upcoming Events", value: "12", subLabel: "Upcoming" },
  { label: "Saved Favorites", value: "13", subLabel: "Saved Favorite" },
];

export const BOOKINGS_LIST = [
  {
    id: 1,
    vendorName: "Jane Cooper",
    category: "Photography",
    eventName: "Wedding",
    time: "12:00 - 22:00",
    status: "Pending",
    avatar: Avatar1,
    thumbnail: Vendor1,
  },
  {
    id: 2,
    vendorName: "The Estate",
    category: "Catering",
    eventName: "Mehndi",
    time: "12:00 - 22:00",
    status: "Confirmed",
    avatar: Avatar2,
    thumbnail: Vendor2,
  },
  {
    id: 3,
    vendorName: "The Estate",
    category: "Catering",
    eventName: "Catering",
    time: "12:00 - 22:00",
    status: "Confirmed",
    avatar: Avatar2,
    thumbnail: Vendor3,
  },
  {
    id: 4,
    vendorName: "Jane Cooper",
    category: "Catering",
    eventName: "Wedding",
    time: "12:00 - 22:00",
    status: "View Details",
    avatar: Avatar3,
    thumbnail: Vendor1,
  },
];

export const REVIEWS_LIST = [
  {
    id: 1,
    userName: "User Name",
    profile: "user profile",
    subProfile: "profile name",
    rating: 5,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    avatar: Avatar1,
  },
  {
    id: 2,
    userName: "User Name",
    profile: "user profile",
    subProfile: "profile name",
    rating: 4,
    comment:
      "Lorem ipsum dolor sit amet, sed do easnmomy noomad adipscing elit, optio sont.",
    avatar: Avatar2,
  },
  {
    id: 3,
    userName: "User Name",
    profile: "user profile",
    subProfile: "profile name",
    rating: 5,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed deunmod demenor.",
    avatar: Avatar3,
  },
];

export const MY_BOOKINGS_DATA = [
  {
    id: 1,
    serviceName: "Grand Ballroom",
    date: "Oct. Oct 12",
    amount: "25.00",
    status: "confirmed",
  },
  {
    id: 2,
    serviceName: "Grand Ballroom",
    date: "Oct. Oct 12",
    amount: "25.00",
    status: "pending",
  },
  {
    id: 3,
    serviceName: "Grand Ballroom",
    date: "Oct. Oct 12",
    amount: "25.00",
    status: "completed",
  },
  {
    id: 4,
    serviceName: "Grand Ballroom",
    date: "Oct. Oct 12",
    amount: "25.00",
    status: "completed",
  },
  {
    id: 5,
    serviceName: "Grand Ballroom",
    date: "Oct. Oct 12",
    amount: "25.00",
    status: "completed",
  },
  {
    id: 6,
    serviceName: "Grand Ballroom",
    date: "Oct. Oct 12",
    amount: "25.00",
    status: "completed",
  },
  {
    id: 7,
    serviceName: "Grand Ballroom",
    date: "Oct. Oct 12",
    amount: "25.00",
    status: "completed",
  },
  {
    id: 8,
    serviceName: "Grand Ballroom",
    date: "Oct. Oct 12",
    amount: "25.00",
    status: "completed",
  },
];
