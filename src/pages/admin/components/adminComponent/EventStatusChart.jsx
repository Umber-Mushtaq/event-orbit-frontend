import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import ChartCard from "./ChartCard";

function EventStatusChart({ data = [], className = "" }) {
  return (
    <ChartCard
      title='Event Status Distribution'
      subtitle='A quick view of how the event pipeline is distributed right now.'
      className={`min-w-0 h-full ${className}`.trim()}
    >
      <div className='grid h-[calc(100%-4.5rem)] gap-4 lg:grid-cols-[1.3fr_0.7fr]'>
        <div className='min-w-0 h-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={data}
                dataKey='value'
                nameKey='name'
                innerRadius={78}
                outerRadius={110}
                paddingAngle={4}
              >
                {data.map((entry) => (
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
          {data.map((item) => (
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
