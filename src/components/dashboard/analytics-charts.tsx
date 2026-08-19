"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import type { AnalyticsSummary } from "@/lib/analytics";

const chartTheme = {
  grid: "var(--surface-border)",
  text: "var(--muted-foreground)",
  accent: "var(--accent)",
};

export function PageViewsChart({
  data,
}: {
  data: AnalyticsSummary["dailyPageViews"];
}) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="pageViewsFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={chartTheme.accent} stopOpacity={0.4} />
            <stop offset="100%" stopColor={chartTheme.accent} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          stroke={chartTheme.grid}
          strokeDasharray="3 3"
          vertical={false}
        />
        <XAxis
          dataKey="date"
          tick={{ fill: chartTheme.text, fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fill: chartTheme.text, fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          width={30}
        />
        <Tooltip
          contentStyle={{
            background: "var(--surface-strong)",
            border: `1px solid ${chartTheme.grid}`,
            borderRadius: 8,
          }}
          labelStyle={{ color: chartTheme.text }}
        />
        <Area
          type="monotone"
          dataKey="count"
          stroke={chartTheme.accent}
          fill="url(#pageViewsFill)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function TopItemsChart({
  data,
}: {
  data: { name: string; count: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={Math.max(data.length * 36, 80)}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16 }}>
        <XAxis
          type="number"
          allowDecimals={false}
          tick={{ fill: chartTheme.text, fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={140}
          tick={{ fill: chartTheme.text, fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            background: "var(--surface-strong)",
            border: `1px solid ${chartTheme.grid}`,
            borderRadius: 8,
          }}
          labelStyle={{ color: chartTheme.text }}
        />
        <Bar dataKey="count" fill={chartTheme.accent} radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
