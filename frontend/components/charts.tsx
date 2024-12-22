"use client";

import { useMemo } from "react";
import {
  Area,
  AreaChart as RechartsAreaChart,
  Bar,
  BarChart as RechartsBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const areaChartData = [
  { date: "2023-01", value: 30 },
  { date: "2023-02", value: 45 },
  { date: "2023-03", value: 28 },
  { date: "2023-04", value: 50 },
  { date: "2023-05", value: 35 },
  { date: "2023-06", value: 42 },
];

const barChartData = [
  { month: "Sep", value1: 65, value2: 28 },
  { month: "Oct", value1: 59, value2: 48 },
  { month: "Nov", value1: 80, value2: 40 },
  { month: "Dec", value1: 81, value2: 19 },
  { month: "Jan", value1: 56, value2: 86 },
  { month: "Feb", value1: 55, value2: 27 },
  { month: "Mar", value1: 40, value2: 90 },
];

export function AreaChart() {
  const gradientId = useMemo(() => `gradient-${Math.random()}`, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsAreaChart data={areaChartData}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor="hsl(var(--primary))"
              stopOpacity={0.3}
            />
            <stop
              offset="100%"
              stopColor="hsl(var(--primary))"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke="hsl(var(--primary))"
          fill={`url(#${gradientId})`}
          strokeWidth={2}
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}

export function BarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={barChartData} barGap={0}>
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "hsl(var(--muted))" }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: "hsl(var(--muted))" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "none",
            borderRadius: "8px",
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
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
