"use client";

import { CameraIcon, HardDriveIcon, BatteryIcon, SignalIcon, GaugeIcon, ThermometerIcon, TimerIcon, CheckCircle2Icon } from "lucide-react";

interface DeviceStatsProps {
  devices: {
    name: string;
    status: string;
    type: string;
    lastUpdate: string;
    metrics: {
      [key: string]: string;
    };
  }[];
}

export function DeviceStats({ devices }: DeviceStatsProps) {
  const getIcon = (metricName: string) => {
    switch (metricName.toLowerCase()) {
      case "battery":
        return BatteryIcon;
      case "signal":
        return SignalIcon;
      case "storage":
        return HardDriveIcon;
      case "performance":
        return GaugeIcon;
      case "temperature":
        return ThermometerIcon;
      case "uptime":
        return TimerIcon;
      default:
        return CheckCircle2Icon;
    }
  };

  return (
    <div className="space-y-8">
      {devices.map((device, index) => (
        <div key={index} className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl ${
                device.type === 'camera' 
                  ? 'bg-blue-500/10' 
                  : device.type === 'production'
                  ? 'bg-green-500/10'
                  : 'bg-orange-500/10'
              } flex items-center justify-center`}>
                <CameraIcon className={`w-5 h-5 ${
                  device.type === 'camera'
                    ? 'text-blue-500'
                    : device.type === 'production'
                    ? 'text-green-500'
                    : 'text-orange-500'
                }`} />
              </div>
              <div>
                <h3 className="font-medium">{device.name}</h3>
                <p className="text-sm text-muted-foreground">Last update: {device.lastUpdate}</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              device.status === 'online'
                ? 'bg-green-500/10 text-green-500'
                : 'bg-red-500/10 text-red-500'
            }`}>
              {device.status}
            </div>
          </div>

          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
            {Object.entries(device.metrics).map(([key, value], metricIndex) => {
              const Icon = getIcon(key);
              return (
                <div
                  key={metricIndex}
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"
                >
                  <Icon className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm capitalize">{key}</p>
                    <p className="text-sm font-medium">{value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
} 