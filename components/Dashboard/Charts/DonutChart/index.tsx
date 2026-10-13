"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import { TitleComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

import { WidgetData } from "@/types/dashboard";

echarts.use([PieChart, TitleComponent, CanvasRenderer]);

const SIDE_BY_SIDE_MIN_WIDTH = 380;

const DonutChart = ({ data }: { data: WidgetData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const [isStacked, setIsStacked] = useState(false);
  const chartData = typeof data === "object" && data !== null ? data : null;

  // Memoize the ECharts option object so it only re-computes when chartData changes
  const chartOption = useMemo(() => {
    if (!chartData) return null;

    return {
      title: {
        text: `{value|${chartData.total}}\n{label|Total}`,
        left: "47%",
        top: "center",
        textAlign: "center",
        textStyle: {
          rich: {
            value: { fontSize: 16, fontWeight: 700, color: "#111", lineHeight: 20, align: "center" },
            label: { fontSize: 12, color: "#111", lineHeight: 16, align: "center" },
          },
        },
      },
      series: [
        {
          type: "pie",
          center: ["50%", "50%"],
          radius: [55, 80],
          startAngle: 90,
          clockwise: false,
          avoidLabelOverlap: false,
          label: { show: false },
          labelLine: { show: false },
          emphasis: { scale: false },
          itemStyle: { borderWidth: 0 },
          data: chartData.segments.map((s) => ({
            name: s.label,
            value: s.value,
            itemStyle: { color: s.color },
          })),
        },
      ],
    };
  }, [chartData]);

  useEffect(() => {
    const container = containerRef.current;
    const el = chartRef.current;
    if (!container || !el || !chartOption) return;

    const chart = echarts.init(el);
    chart.setOption(chartOption, true);

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        setIsStacked(width < SIDE_BY_SIDE_MIN_WIDTH);
      }
      chart.resize();
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
      chart.dispose();
    };
  }, [chartOption]);

  if (!chartData) return null;

  return (
    <div 
      ref={containerRef}
      className={`flex items-center w-full h-full py-2 px-2 gap-4 ${
        isStacked ? "flex-col justify-center" : "flex-row justify-around"
      }`}
    >
      <div 
        ref={chartRef} 
        style={{ 
          width: isStacked ? "100%" : "160px", 
          height: isStacked ? "160px" : "180px" 
        }} 
        className="shrink-0" 
      />

      <ul className={`grid gap-x-4 gap-y-2 text-xs w-full ${
        isStacked ? "grid-cols-2 justify-center max-w-[280px]" : "grid-cols-1 max-w-[185px]"
      }`}>
        {chartData.segments.map((seg, idx) => (
          <li key={idx} className="flex items-center gap-2 text-slate-700">
            <span
              className="w-2.5 h-2.5 rounded-sm shrink-0"
              style={{ backgroundColor: seg.color }}
            />
            <span className="font-medium truncate">{seg.label}</span>
            <span className="text-slate-400">({seg.value})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonutChart;