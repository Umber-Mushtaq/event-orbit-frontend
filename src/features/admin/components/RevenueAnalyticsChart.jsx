import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { revenueAnalytics } from "../data/adminMetricsData";
import ChartCard from "./ChartCard";

function RevenueAnalyticsChart() {
  return (
    <ChartCard
      title='Revenue Analytics'
      subtitle='Monthly revenue performance visualized with a premium area chart.'
    >
      <div className='h-80'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart data={revenueAnalytics} margin={{ left: 0, right: 8 }}>
            <defs>
              <linearGradient id='revenueGradient' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#D4AF37' stopOpacity={0.45} />
                <stop offset='95%' stopColor='#D4AF37' stopOpacity={0.03} />
              </linearGradient>
            </defs>
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
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip
              cursor={{ stroke: "#D4AF37", strokeWidth: 1 }}
              contentStyle={{
                background: "#111111",
                border: "1px solid rgba(212, 175, 55, 0.25)",
                borderRadius: 16,
                color: "#fff",
              }}
            />
            <Area
              type='monotone'
              dataKey='revenue'
              stroke='#D4AF37'
              strokeWidth={3}
              fill='url(#revenueGradient)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export default RevenueAnalyticsChart;
