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

function VendorPerformanceChart({ data = [] }) {
  return (
    <ChartCard
      title='Vendor Performance'
      subtitle='Top vendors ranked by engagement, response quality, and service score.'
    >
      <div className='h-80'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            data={data}
            layout='vertical'
            margin={{ left: 0, right: 12 }}
          >
            <CartesianGrid stroke='rgba(255,255,255,0.08)' horizontal={false} />
            <XAxis type='number' axisLine={false} tickLine={false} hide />
            <YAxis
              dataKey='name'
              type='category'
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#d6d3d1", fontSize: 12 }}
              width={110}
            />
            <Tooltip
              contentStyle={{
                background: "#111111",
                border: "1px solid rgba(212, 175, 55, 0.25)",
                borderRadius: 16,
                color: "#fff",
              }}
            />
            <Bar dataKey='score' fill='#D4AF37' radius={[0, 999, 999, 0]} barSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export default VendorPerformanceChart;
