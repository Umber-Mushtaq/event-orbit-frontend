import {
  Calendar,
  DollarSign,
  CreditCard,
  Star,
  CheckSquare,
  Loader2,
} from "lucide-react";
import { useVendorDashboard } from "../hooks/useVendorDashboard.js";

export function DashboardMetrics() {
  const { metrics, loading, error } = useVendorDashboard();
  console.log(metrics);

  if (loading) {
    return (
      <div className='w-full flex justify-center py-12'>
        <Loader2 className='w-8 h-8 animate-spin text-border-gold' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-red-400 text-xs text-center py-6 font-poppins'>
        {error}
      </div>
    );
  }

  const metricsData = [
    {
      label: "Total Bookings",
      value: metrics?.totalBookings ?? 0,
      Icon: CheckSquare,
    },
    {
      label: "Upcoming Events",
      value: metrics?.upcomingEvents ?? 0,
      Icon: Calendar,
    },
    {
      label: "Total Earnings",
      value: `$${(metrics?.totalEarnings ?? 0).toLocaleString()}`,
      Icon: DollarSign,
    },
    {
      label: "Pending Payments",
      value: `$${(metrics?.pendingPayments ?? 0).toLocaleString()}`,
      Icon: CreditCard,
    },
    {
      label: "Average Rating",
      value: metrics?.averageRating ?? "0.0",
      Icon: Star,
    },
  ];

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-6xl mx-auto z-10 relative'>
      {metricsData.map((metric, idx) => {
        const IconComponent = metric.Icon;
        return (
          <div
            key={idx}
            className='bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col transition-all duration-300 hover:border-border-gold/30 hover:-translate-y-1'
          >
            <div className='w-8 h-8 rounded-lg bg-glass-gold border border-border-gold/20 text-border-gold flex items-center justify-center mb-3 shadow-gold-glow'>
              <IconComponent className='w-4 h-4' />
            </div>

            <span className='font-poppins text-xs tracking-wider uppercase text-stone-400 font-medium'>
              {metric.label}
            </span>
            <span className='font-montserrat font-black text-xl text-white mt-1'>
              {metric.value}
            </span>

            <span
              className={`font-poppins text-[10px] font-semibold mt-2 ${metric.isPositive ? "text-emerald-400" : "text-rose-400"}`}
            >
              {metric.trend}
            </span>
          </div>
        );
      })}
    </div>
  );
}
