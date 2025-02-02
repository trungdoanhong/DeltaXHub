"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { month: "Mar", revenue: 10000 },
  { month: "Apr", revenue: 8000 },
  { month: "May", revenue: 6000 },
  { month: "Jun", revenue: 15000 },
  { month: "Jul", revenue: 12000 },
  { month: "Aug", revenue: 13000 },
  { month: "Sep", revenue: 11000 },
  { month: "Oct", revenue: 14000 },
  { month: "Nov", revenue: 13500 },
];

export function RevenueChart() {
  return (
    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
      Revenue Chart (Coming Soon)
    </div>
  );
} 