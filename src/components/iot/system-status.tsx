"use client";

import { AlertCircleIcon, CheckCircle2Icon, XCircleIcon } from "lucide-react";

const systemChecks = [
  {
    name: "Network Connectivity",
    status: "healthy",
    message: "All systems operational",
    lastCheck: "2 mins ago"
  },
  {
    name: "Database Status",
    status: "warning",
    message: "High load detected",
    lastCheck: "5 mins ago"
  },
  {
    name: "API Services",
    status: "healthy",
    message: "All endpoints responding",
    lastCheck: "1 min ago"
  },
  {
    name: "Storage System",
    status: "error",
    message: "Disk space critical",
    lastCheck: "Just now"
  }
];

export function SystemStatus() {
  return (
    <div className="space-y-6">
      {systemChecks.map((check, index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-4 rounded-xl bg-background/50 hover:bg-muted/50 transition-colors"
        >
          {check.status === "healthy" ? (
            <CheckCircle2Icon className="w-8 h-8 text-green-500" />
          ) : check.status === "warning" ? (
            <AlertCircleIcon className="w-8 h-8 text-yellow-500" />
          ) : (
            <XCircleIcon className="w-8 h-8 text-red-500" />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium truncate">{check.name}</p>
              <span className="text-xs text-muted-foreground">{check.lastCheck}</span>
            </div>
            <p className="text-xs text-muted-foreground truncate">{check.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
} 