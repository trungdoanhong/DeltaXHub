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
    <div className="h-[200px] flex items-center justify-center text-muted-foreground">
      Recent Activities (Coming Soon)
    </div>
  );
} 