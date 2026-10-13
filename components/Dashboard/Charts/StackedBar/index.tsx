import { ChartData, WidgetData } from "@/types/dashboard";

const StackedBarChart = ({ data }: { data: WidgetData}) => {
  if (typeof data !== "object" || data === null) return null;

  const chartData: ChartData = data;

  return (
    <div className="flex flex-col gap-3">
      <p className="flex items-baseline gap-2">
        <span className="text-base font-bold">{chartData.total}</span>
        <span className="text-xs">{chartData.totalLabel}</span>
      </p>

      <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-100">
        {chartData.segments.map((d) => (
          <div
            key={d.label}
            title={`${d.label}: ${d.value}`}
            style={{ flex: `${d.value} 1 0`, minWidth: 6, background: d.color }}
          />
        ))}
      </div>

      <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
        {chartData.segments.map((d) => (
          <li key={d.label} className="flex items-center gap-2">
            <span
              className="size-2.5 shrink-0 rounded-sm"
              style={{ background: d.color }}
            />
            {d.label} ({d.value})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StackedBarChart;