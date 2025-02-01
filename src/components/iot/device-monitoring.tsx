"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { time: "00:00", temperature: 24, humidity: 45, pressure: 1012 },
  { time: "04:00", temperature: 23, humidity: 48, pressure: 1013 },
  { time: "08:00", temperature: 25, humidity: 52, pressure: 1014 },
  { time: "12:00", temperature: 28, humidity: 47, pressure: 1012 },
  { time: "16:00", temperature: 27, humidity: 43, pressure: 1011 },
  { time: "20:00", temperature: 25, humidity: 45, pressure: 1012 },
  { time: "24:00", temperature: 24, humidity: 46, pressure: 1013 },
];

export function DeviceMonitoring() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="time"
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
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "12px",
              boxShadow: "var(--shadow-medium)"
            }}
          />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#2563eb"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#16a34a"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="pressure"
            stroke="#ea580c"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 