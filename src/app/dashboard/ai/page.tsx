import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainIcon, DatabaseIcon, Share2Icon, UsersIcon, LayersIcon, PlayCircleIcon } from "lucide-react";
import { Workspace } from "@/components/ai/workspace";
import { Community } from "@/components/ai/community";

const workspaceStats = [
  {
    title: "Active Projects",
    value: "12",
    description: "ML projects in progress",
    icon: LayersIcon,
    trend: "up",
    trendValue: "3",
    color: "blue"
  },
  {
    title: "Datasets",
    value: "45",
    description: "Total datasets",
    icon: DatabaseIcon,
    trend: "up",
    trendValue: "5",
    color: "purple"
  },
  {
    title: "Models",
    value: "28",
    description: "Trained models",
    icon: BrainIcon,
    trend: "up",
    trendValue: "2",
    color: "green"
  },
  {
    title: "Deployments",
    value: "8",
    description: "Active deployments",
    icon: PlayCircleIcon,
    trend: "stable",
    trendValue: "0",
    color: "orange"
  }
];

const projects = [
  {
    name: "Object Detection v2",
    type: "detection",
    status: "training",
    progress: 78,
    dataset: "Industrial Parts",
    lastUpdate: "10 mins ago"
  },
  {
    name: "Quality Inspection",
    type: "classification",
    status: "deployed",
    progress: 100,
    dataset: "Defect Images",
    lastUpdate: "2 hours ago"
  },
  {
    name: "Anomaly Detection",
    type: "detection",
    status: "data-collection",
    progress: 45,
    dataset: "Sensor Data",
    lastUpdate: "Just now"
  }
];

const communityItems = [
  {
    name: "Production QC Model",
    author: "John Smith",
    type: "model",
    downloads: "1.2k",
    rating: 4.8,
    tags: ["quality-control", "vision"]
  },
  {
    name: "Robot Path Planning",
    author: "Sarah Johnson",
    type: "project",
    downloads: "856",
    rating: 4.6,
    tags: ["robotics", "automation"]
  },
  {
    name: "Industrial Dataset",
    author: "Tech Corp",
    type: "dataset",
    downloads: "2.3k",
    rating: 4.9,
    tags: ["manufacturing", "annotated"]
  }
];

export default function AIHubPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Hub</h2>
          <p className="text-muted-foreground">Develop and deploy AI models</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Share2Icon className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium">Connected to Cloud</span>
          </div>
          <div className="flex items-center gap-2">
            <UsersIcon className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">128 Online</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {workspaceStats.map((stat, index) => {
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

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-7">
        <Card className="col-span-1 md:col-span-2 lg:col-span-4 card-neumorphic overflow-hidden">
          <CardHeader>
            <CardTitle>Workspace</CardTitle>
            <CardDescription>Your AI projects and models</CardDescription>
          </CardHeader>
          <CardContent>
            <Workspace projects={projects} />
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-1 lg:col-span-3 card-neumorphic overflow-hidden">
          <CardHeader>
            <CardTitle>Community</CardTitle>
            <CardDescription>Shared models and datasets</CardDescription>
          </CardHeader>
          <CardContent>
            <Community items={communityItems} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 