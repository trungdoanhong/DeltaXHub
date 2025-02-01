"use client";

import { BrainIcon, DatabaseIcon, Share2Icon, UsersIcon, LayersIcon, PlayCircleIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Workspace } from "@/components/ai/workspace";
import { Community } from "@/components/ai/community";

const workspaceStats = [
  {
    title: "Active Projects",
    value: "12",
    description: "Projects in development",
    icon: LayersIcon,
    trend: "+2 this week",
    color: "blue"
  },
  {
    title: "Datasets",
    value: "45",
    description: "Training datasets",
    icon: DatabaseIcon,
    trend: "+5 this month",
    color: "green"
  },
  {
    title: "Models",
    value: "8",
    description: "Trained models",
    icon: BrainIcon,
    trend: "+1 this week",
    color: "purple"
  },
  {
    title: "Deployments",
    value: "6",
    description: "Models in production",
    icon: PlayCircleIcon,
    trend: "2 pending",
    color: "orange"
  }
];

const projects = [
  {
    name: "Object Detection v2",
    type: "Computer Vision",
    status: "training",
    progress: 65,
    dataset: "Product Images v3",
    lastUpdate: "2 hours ago"
  },
  {
    name: "Sentiment Analysis",
    type: "NLP",
    status: "deployed",
    progress: 100,
    dataset: "Customer Reviews",
    lastUpdate: "1 day ago"
  },
  {
    name: "Anomaly Detection",
    type: "Machine Learning",
    status: "development",
    progress: 30,
    dataset: "Sensor Data 2024",
    lastUpdate: "3 hours ago"
  }
];

const communityItems = [
  {
    name: "Product Classification Model",
    author: "DeltaX Team",
    type: "model",
    downloads: "2.5k",
    rating: 4.8,
    tags: ["computer-vision", "classification", "retail"]
  },
  {
    name: "Manufacturing Dataset",
    author: "Industrial AI Lab",
    type: "dataset",
    downloads: "1.2k",
    rating: 4.5,
    tags: ["manufacturing", "quality-control", "sensors"]
  },
  {
    name: "Defect Detection Model",
    author: "Quality AI",
    type: "model",
    downloads: "3.1k",
    rating: 4.9,
    tags: ["quality-control", "computer-vision", "manufacturing"]
  }
];

export default function AIHubPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Hub</h2>
          <p className="text-muted-foreground">
            Manage your AI projects, models, and explore community resources
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {workspaceStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 text-${stat.color}-500`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                  <span className={`text-xs font-medium text-${stat.color}-500`}>
                    {stat.trend}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Projects</CardTitle>
                <CardDescription>
                  Manage and monitor your AI projects
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Workspace projects={projects} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Community</CardTitle>
                <CardDescription>
                  Explore shared models and datasets
                </CardDescription>
              </div>
              <Share2Icon className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <Community items={communityItems} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 