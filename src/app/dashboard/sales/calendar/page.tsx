"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Plus,
  Users,
  Video,
  Phone,
  Coffee,
  Building,
  CheckCircle2,
  AlertCircle,
  XCircle,
  MoreVertical
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const events = [
  {
    id: "EVT-001",
    title: "Client Meeting",
    type: "meeting",
    date: "2024-03-25",
    time: "10:00 AM",
    duration: "1 hour",
    attendees: ["John Smith", "Sarah Johnson"],
    location: "Conference Room A",
    status: "upcoming"
  },
  {
    id: "EVT-002",
    title: "Product Demo",
    type: "demo",
    date: "2024-03-25",
    time: "2:00 PM",
    duration: "45 minutes",
    attendees: ["Mike Wilson", "Tech Solutions Inc"],
    location: "Virtual",
    status: "confirmed"
  },
  {
    id: "EVT-003",
    title: "Sales Team Sync",
    type: "internal",
    date: "2024-03-26",
    time: "9:30 AM",
    duration: "30 minutes",
    attendees: ["Sales Team"],
    location: "Meeting Room B",
    status: "upcoming"
  }
];

const calendarStats = [
  {
    title: "Today's Events",
    value: "5",
    description: "2 meetings, 3 calls",
    icon: Calendar,
    color: "blue"
  },
  {
    title: "Upcoming",
    value: "12",
    description: "Next 7 days",
    icon: Clock,
    color: "green"
  },
  {
    title: "Team Members",
    value: "8",
    description: "Available today",
    icon: Users,
    color: "purple"
  }
];

export default function CalendarPage() {
  const { user, isAdmin, getUserRoles } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        router.push('/auth/login');
        return;
      }

      const userIsAdmin = await isAdmin();
      const userRoles = await getUserRoles(user.uid);
      const isSales = userRoles.includes('Sales');

      if (!userIsAdmin && !isSales) {
        router.push('/dashboard');
        return;
      }

      setHasAccess(true);
      setLoading(false);
    };

    checkAccess();
  }, [user, isAdmin, getUserRoles, router]);

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'meeting':
        return <Users className="w-4 h-4 text-blue-500" />;
      case 'demo':
        return <Video className="w-4 h-4 text-purple-500" />;
      case 'call':
        return <Phone className="w-4 h-4 text-green-500" />;
      case 'internal':
        return <Coffee className="w-4 h-4 text-orange-500" />;
      default:
        return <Building className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Confirmed
          </Badge>
        );
      case 'upcoming':
        return (
          <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
            <Clock className="w-3 h-3 mr-1" />
            Upcoming
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelled
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!hasAccess) {
    return null;
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
          <p className="text-muted-foreground">
            Manage your schedule and events
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Event
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {calendarStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
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
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Your scheduled events and meetings</CardDescription>
              </div>
              <Calendar className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-background/50 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      {getEventTypeIcon(event.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{event.title}</h3>
                        {getStatusBadge(event.status)}
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="w-4 h-4 mr-1" />
                          {event.time} ({event.duration})
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Building className="w-4 h-4 mr-1" />
                          {event.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-2">
                        {event.attendees.map((attendee, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {attendee}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 