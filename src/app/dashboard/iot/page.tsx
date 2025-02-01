import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CameraIcon, CpuIcon, GaugeIcon, SignalIcon, WifiIcon } from "lucide-react";
import { DeviceMonitoring } from "@/components/iot/device-monitoring";
import { SystemStatus } from "@/components/iot/system-status";
import { DeviceStats } from "@/components/iot/device-stats";

const devices = [
  {
    name: "Research Camera #1",
    status: "online",
    type: "camera",
    lastUpdate: "2 mins ago",
    metrics: {
      battery: "98%",
      signal: "Good",
      storage: "45.5GB"
    }
  },
  {
    name: "Production Line A",
    status: "online",
    type: "production",
    lastUpdate: "Just now",
    metrics: {
      performance: "92%",
      temperature: "24°C",
      uptime: "15d 4h"
    }
  },
  {
    name: "Quality Control",
    status: "offline",
    type: "inspection",
    lastUpdate: "5 mins ago",
    metrics: {
      lastCheck: "2h ago",
      issues: "None",
      queue: "0"
    }
  }
];

const stats = [
  {
    title: "Total Devices",
    value: "48",
    description: "Connected devices",
    icon: CpuIcon,
    trend: "up",
    trendValue: "4",
    color: "blue"
  },
  {
    title: "System Load",
    value: "76%",
    description: "Average across all devices",
    icon: GaugeIcon,
    trend: "up",
    trendValue: "12%",
    color: "green"
  },
  {
    title: "Network Status",
    value: "98.2%",
    description: "Uptime this month",
    icon: WifiIcon,
    trend: "down",
    trendValue: "0.5%",
    color: "orange"
  },
  {
    title: "Active Cameras",
    value: "12/15",
    description: "Operational status",
    icon: CameraIcon,
    trend: "stable",
    trendValue: "0%",
    color: "purple"
  }
];

export default function IoTPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">IoT Dashboard</h2>
          <p className="text-muted-foreground">Monitor and control your connected devices</p>
        </div>
        <div className="flex items-center gap-2">
          <SignalIcon className="w-4 h-4 text-green-500" />
          <span className="text-sm font-medium">System Online</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="card-neumorphic overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center`}>
                  <Icon className={`h-5 w-5 text-${stat.color}-500`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span className={`mr-1 px-1.5 py-0.5 rounded-full ${
                    stat.trend === 'up' 
                      ? 'text-green-500 bg-green-500/10'
                      : stat.trend === 'down'
                      ? 'text-red-500 bg-red-500/10'
                      : 'text-orange-500 bg-orange-500/10'
                  }`}>
                    {stat.trend === 'up' ? '↑' : stat.trend === 'down' ? '↓' : '•'} {stat.trendValue}
                  </span>
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-6 lg:grid-cols-8">
        <Card className="col-span-1 md:col-span-4 lg:col-span-5 card-neumorphic overflow-hidden">
          <CardHeader>
            <CardTitle>Device Monitoring</CardTitle>
            <CardDescription>Real-time device status and metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <DeviceMonitoring />
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-2 lg:col-span-3 card-neumorphic overflow-hidden">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Overall system health and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <SystemStatus />
          </CardContent>
        </Card>
      </div>

      <Card className="card-neumorphic overflow-hidden">
        <CardHeader>
          <CardTitle>Device Statistics</CardTitle>
          <CardDescription>Performance metrics and analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <DeviceStats devices={devices} />
        </CardContent>
      </Card>
    </div>
  );
} 