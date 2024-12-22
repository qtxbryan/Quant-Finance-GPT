"use client";

import { useMemo } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", assets: 4000, profits: 2400, deposits: 2400 },
  { month: "Feb", assets: 3000, profits: 1398, deposits: 2210 },
  { month: "Mar", assets: 2000, profits: 9800, deposits: 2290 },
  { month: "Apr", assets: 2780, profits: 3908, deposits: 2000 },
  { month: "May", assets: 1890, profits: 4800, deposits: 2181 },
  { month: "Jun", assets: 2390, profits: 3800, deposits: 2500 },
  { month: "Jul", assets: 3490, profits: 4300, deposits: 2100 },
];

interface PortfolioChartProps {
  selectedTab: string;
}

export function PortfolioChart({ selectedTab }: PortfolioChartProps) {
  const chartData = useMemo(() => {
    return data.map((item) => ({
      month: item.month,
      value1: item[selectedTab.toLowerCase()],
      value2: item[selectedTab.toLowerCase()] * 0.7,
      value3: item[selectedTab.toLowerCase()] * 0.3,
    }));
  }, [selectedTab]);

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={chartData} barGap={0} barCategoryGap="20%">
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="chart-tooltip">
                    <p className="text-sm font-medium mb-2">
                      {payload[0].payload.month}
                    </p>
                    <div className="space-y-1">
                      {payload.map((entry, index) => (
                        <p
                          key={index}
                          className="text-sm flex items-center gap-2"
                        >
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                          />
                          <span>{entry.value}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar
            dataKey="value1"
            fill="hsl(var(--primary))"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="value2"
            fill="hsl(var(--secondary))"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="value3"
            fill="hsl(var(--tertiary))"
            radius={[4, 4, 0, 0]}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
