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
            <CartesianGrid stroke='hsl(var(--border))' horizontal={false} />
            <XAxis type='number' axisLine={false} tickLine={false} hide />
            <YAxis
              dataKey='name'
              type='category'
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
              width={110}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 16,
                color: "hsl(var(--popover-foreground))",
              }}
            />
            <Bar dataKey='score' fill='hsl(var(--primary))' radius={[0, 999, 999, 0]} barSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}

export default VendorPerformanceChart;
