const makeLabel = (text) => text;

export const bookingStats = [
  { label: "Total Bookings", value: "5,820", icon: "credit-card" },
  { label: "Confirmed", value: "4,612", growth: "+8.2%", icon: "badge-check" },
  { label: "Pending", value: "842", icon: "clock-3" },
  { label: "Cancelled", value: "366", icon: "circle-x" },
];

export const bookingPaymentStyles = {
  Paid: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
  Pending: "border-amber-500/25 bg-amber-500/10 text-amber-300",
  Cancelled: "border-red-500/25 bg-red-500/10 text-red-300",
};

export const initialBookings = [
  { id: "BK-4820", event: makeLabel("Mehta-Kapoor Wedding"), paymentStatus: "Pending", amount: "$28,400" },
  { id: "BK-4821", event: makeLabel("Tech Summit 2026"), paymentStatus: "Paid", amount: "$96,000" },
  { id: "BK-4822", event: makeLabel("Sharma Sangeet Night"), paymentStatus: "Paid", amount: "$14,800" },
  { id: "BK-4823", event: makeLabel("Annual Fashion Gala"), paymentStatus: "Pending", amount: "$52,000" },
  { id: "BK-4824", event: makeLabel("Patel Reception"), paymentStatus: "Paid", amount: "$24,600" },
  { id: "BK-4825", event: makeLabel("Corporate Awards Night"), paymentStatus: "Paid", amount: "$18,400" },
];

export const emptyBookingForm = {
  id: "",
  event: "",
  paymentStatus: "Pending",
  amount: "",
};
