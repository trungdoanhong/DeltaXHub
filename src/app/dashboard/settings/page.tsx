"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Globe,
  Moon,
  Laptop,
  KeyRound,
  Settings2Icon,
  Keyboard,
  Eye,
  Volume2
} from "lucide-react";

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

const systemSettings = [
  {
    name: "Keyboard Shortcuts",
    description: "Customize keyboard shortcuts",
    icon: Keyboard,
    action: "Configure"
  },
  {
    name: "Display",
    description: "Adjust display settings",
    icon: Eye,
    action: "Configure"
  },
  {
    name: "Sound",
    description: "Configure sound settings",
    icon: Volume2,
    action: "Configure"
  }
];

const securitySettings = [
  {
    name: "Two-Factor Authentication",
    description: "Add an extra layer of security",
    icon: KeyRound,
    status: "Enabled"
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
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your application preferences and system settings.
        </p>
      </div>

      <div className="grid gap-6">
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

        {/* System Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>System</CardTitle>
                <CardDescription>Configure system settings</CardDescription>
              </div>
              <Settings2Icon className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {systemSettings.map((setting, index) => {
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
                    <Button variant="outline" size="sm">
                      {setting.action}
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your security settings</CardDescription>
              </div>
              <Settings2Icon className="w-5 h-5 text-muted-foreground" />
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
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                        {setting.status}
                      </span>
                    ) : setting.count ? (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500">
                        {setting.count} sessions
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 