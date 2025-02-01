import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DeviceControl } from "@/components/automation/device-control";
import { VisionSystem } from "@/components/automation/vision-system";
import { Programming } from "@/components/automation/programming";

const devices = [
  {
    name: "Robot Arm #1",
    type: "robot",
    status: "active",
    program: "Pick and Place",
    uptime: "15h 23m",
    performance: "98%"
  },
  {
    name: "Conveyor Belt A",
    type: "conveyor",
    status: "active",
    speed: "0.5 m/s",
    load: "Medium",
    maintenance: "In 5 days"
  },
  {
    name: "Vision Camera #2",
    type: "camera",
    status: "calibrating",
    resolution: "4K",
    fps: "60",
    mode: "Quality Check"
  }
];

const visionTasks = [
  {
    name: "Quality Inspection",
    type: "detection",
    status: "running",
    accuracy: "99.2%",
    processed: "1,234",
    lastUpdate: "2 mins ago"
  },
  {
    name: "Object Tracking",
    type: "tracking",
    status: "running",
    accuracy: "98.7%",
    processed: "5,678",
    lastUpdate: "1 min ago"
  }
];

const programs = [
  {
    name: "Pick and Place",
    type: "g-script",
    status: "running",
    lastModified: "Today, 10:30 AM",
    author: "John Doe"
  },
  {
    name: "Quality Check",
    type: "block",
    status: "stopped",
    lastModified: "Yesterday",
    author: "Jane Smith"
  },
  {
    name: "Tracking System",
    type: "python",
    status: "debugging",
    lastModified: "2 days ago",
    author: "Mike Johnson"
  }
];

export default function AutomationPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Automation Control</h2>
          <p className="text-muted-foreground">Manage and monitor your automation systems</p>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 card-neumorphic overflow-hidden">
          <CardHeader>
            <CardTitle>Device Control</CardTitle>
            <CardDescription>Monitor and control connected devices</CardDescription>
          </CardHeader>
          <CardContent>
            <DeviceControl devices={devices} />
          </CardContent>
        </Card>

        <Card className="col-span-1 card-neumorphic overflow-hidden">
          <CardHeader>
            <CardTitle>Vision System</CardTitle>
            <CardDescription>AI-powered visual inspection system</CardDescription>
          </CardHeader>
          <CardContent>
            <VisionSystem tasks={visionTasks} />
          </CardContent>
        </Card>

        <Card className="col-span-1 card-neumorphic overflow-hidden">
          <CardHeader>
            <CardTitle>Programming</CardTitle>
            <CardDescription>Device programming and scripting</CardDescription>
          </CardHeader>
          <CardContent>
            <Programming programs={programs} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 