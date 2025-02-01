"use client";

import { CodeIcon, BoxesIcon, PythonIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { PlayIcon, PauseCircleIcon, TerminalIcon } from "lucide-react";

interface ProgrammingProps {
  programs: {
    name: string;
    type: string;
    status: string;
    lastModified: string;
    author: string;
  }[];
}

export function Programming({ programs }: ProgrammingProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "g-script":
        return CodeIcon;
      case "block":
        return BoxesIcon;
      case "python":
        return PythonIcon;
      default:
        return CodeIcon;
    }
  };

  return (
    <div className="space-y-6">
      {programs.map((program, index) => {
        const Icon = getIcon(program.type);
        return (
          <div
            key={index}
            className="p-4 rounded-xl bg-background/50 hover:bg-muted/50 transition-colors space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${
                  program.type === 'g-script'
                    ? 'bg-blue-500/10'
                    : program.type === 'block'
                    ? 'bg-green-500/10'
                    : 'bg-yellow-500/10'
                } flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${
                    program.type === 'g-script'
                      ? 'text-blue-500'
                      : program.type === 'block'
                      ? 'text-green-500'
                      : 'text-yellow-500'
                  }`} />
                </div>
                <div>
                  <h3 className="font-medium">{program.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">{program.type}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                program.status === 'running'
                  ? 'bg-green-500/10 text-green-500'
                  : program.status === 'debugging'
                  ? 'bg-yellow-500/10 text-yellow-500'
                  : 'bg-red-500/10 text-red-500'
              }`}>
                {program.status}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Last Modified:</span>
                <span className="font-medium">{program.lastModified}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Author:</span>
                <span className="font-medium">{program.author}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className={program.status === 'running' ? 'text-yellow-500' : 'text-green-500'}
              >
                {program.status === 'running' ? (
                  <PauseCircleIcon className="w-4 h-4 mr-1" />
                ) : (
                  <PlayIcon className="w-4 h-4 mr-1" />
                )}
                {program.status === 'running' ? 'Pause' : 'Run'}
              </Button>
              <Button variant="outline" size="sm">
                <TerminalIcon className="w-4 h-4 mr-1" />
                Console
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
} 