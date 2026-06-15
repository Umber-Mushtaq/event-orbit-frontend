import service1 from "../../assets/service1.jpg";
import service2 from "../../assets/service2.jpg";
import service3 from "../../assets/service3.jpg";
import UserAvatar1 from "../../assets/avarar1.jpg";
import UserAvatar2 from "../../assets/avatar2.jpg";
import UserAvatar3 from "../../assets/avatar3.jpg";

export const SERVICES_LIST = [
  {
    id: 1,
    title: "Vendor Catering",
    category: "Catering",
    price: "2500",
    image: service1,
    status: "approved",
  },
  {
    id: 2,
    title: "Catering Photography",
    category: "Photography",
    price: "15.00",
    image: service2,
    status: "pending",
  },
  {
    id: 3,
    title: "Expected Wedding Photography",
    category: "Catering",
    price: "2500",
    image: service3,
    status: "approved",
  },
];

export const BOOKINGS_DATA = [
  {
    id: 1,
    customerName: "Alex Mercer",
    requestedDate: "12/12/2024",
    serviceName: "Catering",
    amount: "18.00",
    status: "pending",
  },
  {
    id: 2,
    customerName: "Sarah Jenkins",
    requestedDate: "05/13/2023",
    serviceName: "Catering Names",
    amount: "18.00",
    status: "confirmed",
  },
  {
    id: 3,
    customerName: "David Vance",
    requestedDate: "12/13/2023",
    serviceName: "Ex Photography",
    amount: "18.00",
    status: "pending",
  },
];

export const REVIEWS_DATA = [
  {
    id: 1,
    serviceName: "Premium Catering Package",
    userName: "Emma Watson",
    avatar: UserAvatar1,
    rating: 5,
    date: "Jul 18, 2026",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
  },
  {
    id: 2,
    serviceName: "Luxury Photography Suite",
    userName: "Sophia Loren",
    avatar: UserAvatar2,
    rating: 4,
    date: "May 24, 2026",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    serviceName: "Grand Marriage Hall Decor",
    userName: "David Beckham",
    avatar: UserAvatar3,
    rating: 4,
    date: "Apr 12, 2026",
    comment:
      "Excellent coordination and stunning execution. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];
