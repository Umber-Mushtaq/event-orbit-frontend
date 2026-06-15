import {
  Calendar,
  DollarSign,
  CreditCard,
  Star,
  Eye,
  CheckSquare,
} from "lucide-react";

const METRICS_DATA = [
  {
    label: "Total Bookings",
    value: "338",
    trend: "+0.89%",
    isPositive: true,
    Icon: CheckSquare,
  },
  {
    label: "Upcoming Events",
    value: "3",
    trend: "+1.68%",
    isPositive: true,
    Icon: Calendar,
  },
  {
    label: "Total Earnings",
    value: "$143.6K",
    trend: "+2.57%",
    isPositive: true,
    Icon: DollarSign,
  },
  {
    label: "Pending Payments",
    value: "$19",
    trend: "-0.89%",
    isPositive: false,
    Icon: CreditCard,
  },
  {
    label: "Average Rating",
    value: "4.6",
    trend: "+8.37%",
    isPositive: true,
    Icon: Star,
  },
];

export function DashboardMetrics() {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-6xl mx-auto z-10 relative'>
      {METRICS_DATA.map((metric, idx) => {
        const IconComponent = metric.Icon;
        return (
          <div
            key={idx}
            className='bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col transition-all duration-300 hover:border-border-gold/30 hover:-translate-y-1'
          >
            {/* Top Row: Icon Badge */}
            <div className='w-8 h-8 rounded-lg bg-glass-gold border border-border-gold/20 text-border-gold flex items-center justify-center mb-3 shadow-gold-glow'>
              <IconComponent className='w-4 h-4' />
            </div>

            {/* Middle Row: Labels & Value Strings */}
            <span className='font-poppins text-xs tracking-wider uppercase text-stone-400 font-medium'>
              {metric.label}
            </span>
            <span className='font-montserrat font-black text-xl text-white mt-1'>
              {metric.value}
            </span>

            {/* Bottom Row: Trend Direction Status */}
            <span
              className={`font-poppins text-[10px] font-semibold mt-2 ${
                metric.isPositive ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {metric.trend}
            </span>
          </div>
        );
      })}
    </div>
  );
}
