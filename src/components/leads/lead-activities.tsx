"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  Users,
  FileText,
  Plus,
  Calendar,
  Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { activityTypes } from '@/lib/constants';
import { addActivity, type Lead } from '@/lib/firebase/leads';
import { Timestamp } from 'firebase/firestore';

type ActivityType = typeof activityTypes[number]['value'];

interface LeadActivitiesProps {
  leadId: string;
  activities: Lead['activities'];
  onActivityAdded: () => void;
}

export function LeadActivities({ leadId, activities, onActivityAdded }: LeadActivitiesProps) {
  const [loading, setLoading] = useState(false);
  const [newActivity, setNewActivity] = useState<{
    type: ActivityType;
    description: string;
  }>({
    type: activityTypes[0].value,
    description: '',
  });

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'call':
        return <Phone className="w-4 h-4" />;
      case 'meeting':
        return <Users className="w-4 h-4" />;
      case 'note':
        return <FileText className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const handleAddActivity = async () => {
    try {
      setLoading(true);
      await addActivity(leadId, {
        ...newActivity,
        date: Timestamp.now(),
        createdBy: 'current-user', // Replace with actual user ID
      });
      setNewActivity({
        type: activityTypes[0].value,
        description: '',
      });
      onActivityAdded();
    } catch (error) {
      console.error('Error adding activity:', error);
      // Handle error (show toast, etc.)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activities</CardTitle>
        <CardDescription>Recent activities and interactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex gap-4">
            <Select
              value={newActivity.type}
              onValueChange={(value: ActivityType) => setNewActivity(prev => ({ ...prev, type: value }))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Activity type" />
              </SelectTrigger>
              <SelectContent>
                {activityTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      {getActivityIcon(type.value)}
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex-1">
              <Input
                placeholder="Activity description..."
                value={newActivity.description}
                onChange={(e) => setNewActivity(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <Button
              onClick={handleAddActivity}
              disabled={loading || !newActivity.description.trim()}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>

          <div className="space-y-4">
            {activities?.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl bg-background/50 hover:bg-muted/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {activityTypes.find(t => t.value === activity.type)?.label}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {activity.date.toDate().toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-2 text-sm">{activity.description}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Added by {activity.createdBy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 