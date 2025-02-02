"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>You have no recent activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Activities will be added here */}
        </div>
      </CardContent>
    </Card>
  );
} 