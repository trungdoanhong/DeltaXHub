"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Code2, 
  Box, 
  Play, 
  Save,
  Pause,
  RotateCw,
  Layers,
  Plus,
  MonitorPlay,
  Settings2Icon
} from "lucide-react";

const simulationProjects = [
  {
    name: "Robot Assembly Line",
    type: "Assembly",
    status: "running",
    lastModified: "10 mins ago",
    components: ["Robot Arm", "Conveyor", "Vision System"]
  },
  {
    name: "Pick and Place",
    type: "Programming",
    status: "paused",
    lastModified: "1 hour ago",
    language: "Python"
  },
  {
    name: "Quality Inspection",
    type: "Vision",
    status: "stopped",
    lastModified: "2 hours ago",
    components: ["Camera", "AI Model"]
  }
];

const quickActions = [
  {
    name: "New Simulation",
    icon: Plus,
    color: "blue"
  },
  {
    name: "Load Template",
    icon: Layers,
    color: "purple"
  },
  {
    name: "View Tutorial",
    icon: MonitorPlay,
    color: "green"
  }
];

export default function SimulationPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Simulation</h2>
          <p className="text-muted-foreground">
            Test and validate your automation solutions
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Card 
              key={index}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-${action.color}-500/10 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${action.color}-500`} />
                  </div>
                  <div>
                    <h3 className="font-medium">{action.name}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Active Simulations */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Simulations</CardTitle>
              <CardDescription>Your running and recent simulations</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {simulationProjects.map((project, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-background/50 hover:bg-muted/50 transition-colors space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${
                      project.type === 'Assembly' 
                        ? 'bg-blue-500/10' 
                        : project.type === 'Programming'
                        ? 'bg-purple-500/10'
                        : 'bg-green-500/10'
                    } flex items-center justify-center`}>
                      {project.type === 'Assembly' ? (
                        <Box className="w-5 h-5 text-blue-500" />
                      ) : project.type === 'Programming' ? (
                        <Code2 className="w-5 h-5 text-purple-500" />
                      ) : (
                        <MonitorPlay className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">{project.type}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'running'
                      ? 'bg-green-500/10 text-green-500'
                      : project.status === 'paused'
                      ? 'bg-yellow-500/10 text-yellow-500'
                      : 'bg-red-500/10 text-red-500'
                  }`}>
                    {project.status}
                  </div>
                </div>

                {project.components && (
                  <div className="flex flex-wrap gap-2">
                    {project.components.map((component, cIndex) => (
                      <span
                        key={cIndex}
                        className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                      >
                        {component}
                      </span>
                    ))}
                  </div>
                )}

                {project.language && (
                  <div className="flex items-center gap-2 text-sm">
                    <Code2 className="w-4 h-4 text-muted-foreground" />
                    <span>{project.language}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Last modified: {project.lastModified}
                  </span>
                  <div className="flex gap-2">
                    {project.status === 'running' ? (
                      <Button variant="outline" size="sm">
                        <Pause className="w-4 h-4 mr-1" />
                        Pause
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm">
                        <Play className="w-4 h-4 mr-1" />
                        Start
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Settings2Icon className="w-4 h-4 mr-1" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm">
                      <Save className="w-4 h-4 mr-1" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm">
                      <RotateCw className="w-4 h-4 mr-1" />
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 