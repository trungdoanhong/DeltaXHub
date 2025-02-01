"use client";

import { Button } from "@/components/ui/button";

export function AnnouncementCard() {
  return (
    <div className="relative h-full bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32">
        <div className="absolute w-32 h-32 -right-16 -top-16 rounded-full bg-blue-500/20" />
        <div className="absolute w-24 h-24 -right-12 -top-12 rounded-full bg-blue-500/20" />
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32">
        <div className="absolute w-32 h-32 -left-16 -bottom-16 rounded-full bg-blue-500/20" />
        <div className="absolute w-24 h-24 -left-12 -bottom-12 rounded-full bg-blue-500/20" />
      </div>
      
      <div className="relative space-y-4">
        <div className="inline-flex items-center justify-center h-6 px-3 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium">
          NEW
        </div>
        <h3 className="text-xl font-semibold leading-tight">
          We have added new invoicing templates!
        </h3>
        <p className="text-sm text-white/80">
          New templates focused on helping you improve your business
        </p>
        <Button 
          variant="secondary" 
          className="bg-white hover:bg-white/90 text-blue-600 shadow-lg shadow-blue-700/25"
        >
          Download Now
        </Button>
      </div>
    </div>
  );
} 