"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Bell,
  Shield,
  Mail,
  Globe,
  Moon,
  Sun,
  Laptop,
  Languages,
  KeyRound,
  LogOut,
  Settings2Icon
} from "lucide-react";

const userProfile = {
  name: "John Smith",
  email: "john.smith@deltax.com",
  role: "Administrator",
  avatar: "/avatars/default-avatar.svg",
  lastLogin: "2024-03-20 09:30 AM"
};

const preferences = [
  {
    name: "Theme",
    description: "Select your preferred theme",
    icon: Moon,
    options: ["Light", "Dark", "System"],
    current: "System"
  },
  {
    name: "Language",
    description: "Choose your language",
    icon: Globe,
    options: ["English", "Vietnamese", "Japanese"],
    current: "English"
  },
  {
    name: "Notifications",
    description: "Manage notification preferences",
    icon: Bell,
    enabled: true
  }
];

const securitySettings = [
  {
    name: "Two-Factor Authentication",
    description: "Add an extra layer of security",
    icon: Shield,
    status: "Enabled"
  },
  {
    name: "Password",
    description: "Last changed 30 days ago",
    icon: KeyRound,
    action: "Change"
  },
  {
    name: "Active Sessions",
    description: "Manage your active sessions",
    icon: Laptop,
    count: 2
  }
];

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your profile information</CardDescription>
            </div>
            <User className="w-5 h-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <img
              src={userProfile.avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full"
            />
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">{userProfile.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{userProfile.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-500">
                  {userProfile.role}
                </span>
                <span className="text-sm text-muted-foreground">
                  Last login: {userProfile.lastLogin}
                </span>
              </div>
              <div className="flex gap-3">
                <Button>
                  Edit Profile
                </Button>
                <Button variant="outline">
                  Change Avatar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Preferences */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </div>
              <Settings2Icon className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {preferences.map((pref, index) => {
                const Icon = pref.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-background/50 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{pref.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {pref.description}
                        </p>
                      </div>
                    </div>
                    {pref.options ? (
                      <select className="px-3 py-1 rounded-lg bg-muted text-sm">
                        {pref.options.map((opt) => (
                          <option key={opt} selected={opt === pref.current}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Button variant="outline" size="sm">
                        {pref.enabled ? "Enabled" : "Disabled"}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Security</CardTitle>
                <CardDescription>Protect your account</CardDescription>
              </div>
              <Shield className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {securitySettings.map((setting, index) => {
                const Icon = setting.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-xl bg-background/50 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{setting.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {setting.description}
                        </p>
                      </div>
                    </div>
                    {setting.status ? (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-500">
                        {setting.status}
                      </span>
                    ) : setting.count ? (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-500">
                        {setting.count} devices
                      </span>
                    ) : (
                      <Button variant="outline" size="sm">
                        {setting.action}
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t">
              <Button variant="destructive" className="w-full">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 