"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MessageSquare,
  Users,
  Mail,
  Phone,
  Video,
  Send,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Search,
  Filter
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const messages = [
  {
    id: "MSG-001",
    sender: "John Smith",
    avatar: "/avatars/john.jpg",
    content: "Team, I've just updated the sales report for Q1. Please review when you have a chance.",
    timestamp: "10:30 AM",
    type: "message",
    status: "read"
  },
  {
    id: "MSG-002",
    sender: "Sarah Johnson",
    avatar: "/avatars/sarah.jpg",
    content: "Great work on closing the Tech Solutions deal!",
    timestamp: "Yesterday",
    type: "message",
    status: "read"
  },
  {
    id: "MSG-003",
    sender: "Mike Wilson",
    avatar: "/avatars/mike.jpg",
    content: "Scheduled a product demo with Manufacturing Plus for next week.",
    timestamp: "Yesterday",
    type: "notification",
    status: "unread"
  }
];

const meetings = [
  {
    id: "MTG-001",
    title: "Sales Team Sync",
    time: "2:00 PM",
    duration: "30 mins",
    type: "video",
    participants: ["John Smith", "Sarah Johnson", "Mike Wilson"],
    status: "upcoming"
  },
  {
    id: "MTG-002",
    title: "Client Call: Tech Solutions",
    time: "3:30 PM",
    duration: "45 mins",
    type: "call",
    participants: ["John Smith", "Tech Solutions Team"],
    status: "scheduled"
  }
];

const channels = [
  {
    name: "General",
    unread: 3,
    members: 12,
    lastActive: "5 mins ago"
  },
  {
    name: "Sales Pipeline",
    unread: 0,
    members: 8,
    lastActive: "2 hours ago"
  },
  {
    name: "Product Updates",
    unread: 5,
    members: 15,
    lastActive: "1 hour ago"
  }
];

export default function CommunicationPage() {
  const { user, isAdmin, getUserRoles } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("General");

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

  const getMessageStatusBadge = (status: string) => {
    switch (status) {
      case 'read':
        return (
          <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Read
          </Badge>
        );
      case 'unread':
        return (
          <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
            <AlertCircle className="w-3 h-3 mr-1" />
            Unread
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
          <h2 className="text-3xl font-bold tracking-tight">Communication</h2>
          <p className="text-muted-foreground">
            Team chat and meetings
          </p>
        </div>
        <div className="flex gap-4">
          <Button>
            <Video className="mr-2 h-4 w-4" />
            Start Meeting
          </Button>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            New Channel
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Channels</CardTitle>
              <Users className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {channels.map((channel, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedChannel(channel.name)}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    selectedChannel === channel.name
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{channel.name}</span>
                    {channel.unread > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {channel.unread}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span>{channel.members} members</span>
                    <span>{channel.lastActive}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Messages</CardTitle>
                <CardDescription>Recent conversations</CardDescription>
              </div>
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="p-4 rounded-xl bg-background/50 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {message.sender.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{message.sender}</p>
                        <p className="text-sm text-muted-foreground">
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                    {getMessageStatusBadge(message.status)}
                  </div>
                  <p className="mt-3 text-sm">{message.content}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-4">
              <Input
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <Button>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Meetings</CardTitle>
                <CardDescription>Today's schedule</CardDescription>
              </div>
              <Video className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {meetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="p-4 rounded-xl bg-background/50 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{meeting.title}</h3>
                    {meeting.type === 'video' ? (
                      <Video className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Phone className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      {meeting.time} ({meeting.duration})
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {meeting.participants.map((participant, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {participant}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button className="w-full" variant="outline">
                      Join Meeting
                    </Button>
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