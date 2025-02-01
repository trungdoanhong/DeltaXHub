"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Code2,
  Share2,
  Users,
  MessageSquare,
  ThumbsUp,
  FileText,
  Search,
  BookMarked,
  ArrowUpRight
} from "lucide-react";

const guides = [
  {
    title: "Getting Started",
    description: "Learn the basics of DeltaX Hub",
    category: "Beginner",
    readTime: "5 min",
    views: "1.2k"
  },
  {
    title: "Vision System Setup",
    description: "Configure cameras and vision processing",
    category: "Advanced",
    readTime: "15 min",
    views: "856"
  },
  {
    title: "AI Model Training",
    description: "Train custom models for your needs",
    category: "Expert",
    readTime: "25 min",
    views: "2.1k"
  }
];

const sharedPrograms = [
  {
    name: "Pick & Place Template",
    author: "RoboTech",
    type: "Robot Program",
    likes: 245,
    comments: 12,
    lastUpdate: "2 days ago"
  },
  {
    name: "Quality Inspection",
    author: "Vision Pro",
    type: "Vision System",
    likes: 189,
    comments: 8,
    lastUpdate: "1 week ago"
  },
  {
    name: "Palletizing Solution",
    author: "AutomationLab",
    type: "Complete System",
    likes: 367,
    comments: 24,
    lastUpdate: "3 days ago"
  }
];

const resources = [
  {
    title: "API Documentation",
    description: "Complete API reference and examples",
    icon: Code2,
    color: "blue"
  },
  {
    title: "Video Tutorials",
    description: "Step-by-step video guides",
    icon: BookMarked,
    color: "purple"
  },
  {
    title: "Community Forum",
    description: "Discuss and share with others",
    icon: Users,
    color: "green"
  }
];

export default function CommunityPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Community & Resources</h2>
          <p className="text-muted-foreground">
            Learn, share, and collaborate with the DeltaX community
          </p>
        </div>
        <Button>
          <Share2 className="w-4 h-4 mr-2" />
          Share Your Work
        </Button>
      </div>

      {/* Resources Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <Card 
              key={index}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
            >
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-${resource.color}-500/10 flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 text-${resource.color}-500`} />
                  </div>
                  <div>
                    <h3 className="font-medium">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Guides & Documentation */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Guides & Documentation</CardTitle>
                <CardDescription>Learn how to use DeltaX Hub</CardDescription>
              </div>
              <BookOpen className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {guides.map((guide, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-background/50 hover:bg-muted/50 transition-colors space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{guide.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {guide.description}
                      </p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      guide.category === 'Beginner'
                        ? 'bg-green-500/10 text-green-500'
                        : guide.category === 'Advanced'
                        ? 'bg-yellow-500/10 text-yellow-500'
                        : 'bg-red-500/10 text-red-500'
                    }`}>
                      {guide.category}
                    </span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <FileText className="w-4 h-4" />
                      <span>{guide.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Search className="w-4 h-4" />
                      <span>{guide.views} views</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Shared Programs */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Shared Programs</CardTitle>
                <CardDescription>Popular community contributions</CardDescription>
              </div>
              <Code2 className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {sharedPrograms.map((program, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-background/50 hover:bg-muted/50 transition-colors space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{program.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        by {program.author}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500">
                      {program.type}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4 text-muted-foreground" />
                        <span>{program.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4 text-muted-foreground" />
                        <span>{program.comments}</span>
                      </div>
                    </div>
                    <span className="text-muted-foreground">
                      Updated {program.lastUpdate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 