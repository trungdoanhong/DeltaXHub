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
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(37, 99, 235)" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="rgb(37, 99, 235)" stopOpacity={0.2}/>
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip 
            cursor={false}
            contentStyle={{
              background: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "12px",
              boxShadow: "var(--shadow-medium)"
            }}
            formatter={(value: number) => [`$${value}`, "Revenue"]}
          />
          <Bar
            dataKey="revenue"
            fill="url(#colorRevenue)"
            radius={[6, 6, 0, 0]}
            maxBarSize={60}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 