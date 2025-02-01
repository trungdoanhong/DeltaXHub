"use client";

import { RobotIcon, ConveyorIcon, CameraIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { PlayIcon, SquareIcon, Settings2Icon } from "lucide-react";

interface DeviceControlProps {
  devices: {
    name: string;
    type: string;
    status: string;
    program?: string;
    uptime?: string;
    performance?: string;
    speed?: string;
    load?: string;
    maintenance?: string;
    resolution?: string;
    fps?: string;
    mode?: string;
  }[];
}

export function DeviceControl({ devices }: DeviceControlProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "robot":
        return RobotIcon;
      case "conveyor":
        return ConveyorIcon;
      case "camera":
        return CameraIcon;
      default:
        return RobotIcon;
    }
  };

  return (
    <div className="space-y-6">
      {devices.map((device, index) => {
        const Icon = getIcon(device.type);
        return (
          <div
            key={index}
            className="p-4 rounded-xl bg-background/50 hover:bg-muted/50 transition-colors space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${
                  device.type === 'robot'
                    ? 'bg-blue-500/10'
                    : device.type === 'conveyor'
                    ? 'bg-green-500/10'
                    : 'bg-purple-500/10'
                } flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${
                    device.type === 'robot'
                      ? 'text-blue-500'
                      : device.type === 'conveyor'
                      ? 'text-green-500'
                      : 'text-purple-500'
                  }`} />
                </div>
                <div>
                  <h3 className="font-medium">{device.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{device.type}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                device.status === 'active'
                  ? 'bg-green-500/10 text-green-500'
                  : device.status === 'calibrating'
                  ? 'bg-yellow-500/10 text-yellow-500'
                  : 'bg-red-500/10 text-red-500'
              }`}>
                {device.status}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              {Object.entries(device).map(([key, value]) => {
                if (["name", "type", "status"].includes(key)) return null;
                return (
                  <div key={key} className="flex items-center gap-2">
                    <span className="text-muted-foreground capitalize">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className={device.status === 'active' ? 'text-red-500' : 'text-green-500'}
              >
                {device.status === 'active' ? (
                  <SquareIcon className="w-4 h-4 mr-1" />
                ) : (
                  <PlayIcon className="w-4 h-4 mr-1" />
                )}
                {device.status === 'active' ? 'Stop' : 'Start'}
              </Button>
              <Button variant="outline" size="sm">
                <Settings2Icon className="w-4 h-4 mr-1" />
                Configure
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
} 