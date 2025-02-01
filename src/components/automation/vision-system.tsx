"use client";

import { BrainIcon, EyeIcon, BarChart3Icon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface VisionSystemProps {
  tasks: {
    name: string;
    type: string;
    status: string;
    accuracy: string;
    processed: string;
    lastUpdate: string;
  }[];
}

export function VisionSystem({ tasks }: VisionSystemProps) {
  return (
    <div className="space-y-6">
      {tasks.map((task, index) => (
        <div
          key={index}
          className="p-4 rounded-xl bg-background/50 hover:bg-muted/50 transition-colors space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${
                task.type === 'detection'
                  ? 'bg-purple-500/10'
                  : 'bg-blue-500/10'
              } flex items-center justify-center`}>
                {task.type === 'detection' ? (
                  <EyeIcon className="w-5 h-5 text-purple-500" />
                ) : (
                  <BrainIcon className="w-5 h-5 text-blue-500" />
                )}
              </div>
              <div>
                <h3 className="font-medium">{task.name}</h3>
                <p className="text-sm text-muted-foreground capitalize">{task.type}</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              task.status === 'running'
                ? 'bg-green-500/10 text-green-500'
                : 'bg-yellow-500/10 text-yellow-500'
            }`}>
              {task.status}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Accuracy</span>
              <span className="font-medium">{task.accuracy}</span>
            </div>
            <Progress value={parseFloat(task.accuracy)} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <BarChart3Icon className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Processed</p>
                <p className="text-sm font-medium">{task.processed}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Last Update</p>
              <p className="text-sm font-medium">{task.lastUpdate}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 