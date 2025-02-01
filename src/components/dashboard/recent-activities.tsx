"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BellIcon, CheckIcon } from "lucide-react";

const activities = [
  {
    name: "John Smith",
    email: "john.smith@deltax.com",
    image: "/avatars/default-avatar.svg",
    message: "Started a new simulation",
    time: "2 mins ago",
    type: "notification",
    icon: BellIcon,
    status: "warning"
  },
  {
    name: "Sarah Johnson",
    email: "sarah.j@deltax.com",
    image: "/avatars/default-avatar.svg",
    message: "Completed AI model training",
    time: "1 hour ago",
    type: "success",
    icon: CheckIcon,
    status: "success"
  }
];

export function RecentActivities() {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => {
        const Icon = activity.icon;
        return (
          <div key={index} className="flex items-start">
            {activity.image ? (
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.image} alt={activity.name} />
                <AvatarFallback>{activity.name[0]}</AvatarFallback>
              </Avatar>
            ) : (
              <div className={`rounded-full p-2 bg-${activity.status === 'warning' ? 'yellow' : 'green'}-500/10`}>
                <Icon className={`h-4 w-4 text-${activity.status === 'warning' ? 'yellow' : 'green'}-500`} />
              </div>
            )}
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium">{activity.name}</p>
              <p className="text-sm text-muted-foreground">
                {activity.message}
              </p>
              <p className="text-xs text-muted-foreground">
                {activity.time}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
} 