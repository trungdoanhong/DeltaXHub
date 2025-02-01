"use client";

import { BrainIcon, DatabaseIcon, FolderIcon, DownloadIcon, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CommunityProps {
  items: {
    name: string;
    author: string;
    type: string;
    downloads: string;
    rating: number;
    tags: string[];
  }[];
}

export function Community({ items }: CommunityProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "model":
        return BrainIcon;
      case "dataset":
        return DatabaseIcon;
      default:
        return FolderIcon;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "model":
        return "purple";
      case "dataset":
        return "blue";
      default:
        return "green";
    }
  };

  return (
    <div className="space-y-6">
      {items.map((item, index) => {
        const Icon = getIcon(item.type);
        const typeColor = getTypeColor(item.type);
        return (
          <div
            key={index}
            className="p-4 rounded-xl bg-background/50 hover:bg-muted/50 transition-colors space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-${typeColor}-500/10 flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 text-${typeColor}-500`} />
                </div>
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">by {item.author}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium bg-${typeColor}-500/10 text-${typeColor}-500`}>
                {item.type}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <DownloadIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{item.downloads}</span>
                </div>
                <div className="flex items-center gap-1">
                  <StarIcon className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium">{item.rating}</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <DownloadIcon className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
} 