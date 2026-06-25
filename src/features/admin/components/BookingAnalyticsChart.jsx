import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { revenueAnalytics } from "../data/adminMetricsData";
import ChartCard from "./ChartCard";

function BookingAnalyticsChart() {
  return (
    <ChartCard
      title='Booking Analytics'
      subtitle='Monthly bookings and event velocity across the platform.'
    >
      <div className='h-80'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={revenueAnalytics} margin={{ left: 0, right: 8 }}>
            <CartesianGrid stroke='rgba(255,255,255,0.08)' vertical={false} />
            <XAxis
              dataKey='month'
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#a8a29e", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#a8a29e", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                background: "#111111",
                border: "1px solid rgba(212, 175, 55, 0.25)",
                borderRadius: 16,
                color: "#fff",
              }}
            />
            <Bar dataKey='bookings' fill='#D4AF37' radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export default BookingAnalyticsChart;
