import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartCard from "./ChartCard";

function BookingAnalyticsChart({ data = [] }) {
  return (
    <ChartCard
      title='Booking Analytics'
      subtitle='Monthly bookings and event velocity across the platform.'
    >
      <div className='h-80'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={data} margin={{ left: 0, right: 8 }}>
            <CartesianGrid stroke='hsl(var(--border))' vertical={false} />
            <XAxis
              dataKey='month'
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 16,
                color: "hsl(var(--popover-foreground))",
              }}
            />
            <Bar dataKey='bookings' fill='hsl(var(--primary))' radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export default BookingAnalyticsChart;
