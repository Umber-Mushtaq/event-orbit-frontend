import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { eventStatusDistribution } from "../data/adminMetricsData";
import ChartCard from "./ChartCard";

function EventStatusChart() {
  return (
    <ChartCard
      title='Event Status Distribution'
      subtitle='A quick view of how the event pipeline is distributed right now.'
    >
      <div className='grid gap-4 lg:grid-cols-[1.3fr_0.7fr]'>
        <div className='h-72'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={eventStatusDistribution}
                dataKey='value'
                nameKey='name'
                innerRadius={78}
                outerRadius={110}
                paddingAngle={4}
              >
                {eventStatusDistribution.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#111111",
                  border: "1px solid rgba(212, 175, 55, 0.25)",
                  borderRadius: 16,
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className='flex flex-col justify-center gap-3'>
          {eventStatusDistribution.map((item) => (
            <div
              key={item.name}
              className='flex items-center justify-between rounded-2xl border border-white/8 bg-white/3 px-4 py-3'
            >
              <div className='flex items-center gap-3'>
                <span
                  className='h-3.5 w-3.5 rounded-full'
                  style={{ backgroundColor: item.color }}
                />
                <span className='text-sm font-medium text-stone-200'>
                  {item.name}
                </span>
              </div>
              <span className='text-sm font-semibold text-white'>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}

export default EventStatusChart;
