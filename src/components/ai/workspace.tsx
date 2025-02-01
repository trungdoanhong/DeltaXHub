"use client";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { EyeIcon, BrainIcon, DatabaseIcon, PlayIcon, PauseCircleIcon, Settings2Icon } from "lucide-react";

interface WorkspaceProps {
  projects: {
    name: string;
    type: string;
    status: string;
    progress: number;
    dataset: string;
    lastUpdate: string;
  }[];
}

export function Workspace({ projects }: WorkspaceProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "detection":
        return EyeIcon;
      case "classification":
        return BrainIcon;
      default:
        return DatabaseIcon;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "training":
        return "yellow";
      case "deployed":
        return "green";
      case "data-collection":
        return "blue";
      default:
        return "gray";
    }
  };

  return (
    <div className="space-y-6">
      {projects.map((project, index) => {
        const Icon = getIcon(project.type);
        const statusColor = getStatusColor(project.status);
        return (
          <div
            key={index}
            className="p-4 rounded-xl bg-background/50 hover:bg-muted/50 transition-colors space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-${statusColor}-500/10 flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 text-${statusColor}-500`} />
                </div>
                <div>
                  <h3 className="font-medium">{project.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{project.type}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium bg-${statusColor}-500/10 text-${statusColor}-500`}>
                {project.status}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <Progress value={project.progress} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Dataset:</span>
                <span className="ml-2 font-medium">{project.dataset}</span>
              </div>
              <div className="text-right">
                <span className="text-muted-foreground">Last Update:</span>
                <span className="ml-2 font-medium">{project.lastUpdate}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className={project.status === 'training' ? 'text-yellow-500' : 'text-green-500'}
              >
                {project.status === 'training' ? (
                  <PauseCircleIcon className="w-4 h-4 mr-1" />
                ) : (
                  <PlayIcon className="w-4 h-4 mr-1" />
                )}
                {project.status === 'training' ? 'Pause' : 'Start'}
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