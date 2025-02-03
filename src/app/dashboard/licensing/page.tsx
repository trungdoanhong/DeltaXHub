"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CreditCard, Key, Shield, Cpu, Smartphone, Settings2Icon, PlusCircle, RefreshCw } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useEffect, useState } from "react";

const licenses = [
  {
    type: "Software License",
    status: "active",
    expiry: "2024-12-31",
    features: ["AI Module", "Vision System", "Remote Control"],
    lastUsed: "2 hours ago"
  },
  {
    type: "Robot License",
    status: "active",
    expiry: "2025-06-30",
    imei: "352098001761481",
    lastSync: "5 mins ago"
  }
];

const identityInfo = {
  firmwareVersion: "v2.1.0",
  lastUpdate: "2024-03-15",
  configurations: [
    { name: "Vision System", status: "configured" },
    { name: "AI Models", status: "pending" },
    { name: "Remote Access", status: "configured" }
  ]
};

export default function LicensingPage() {
  const { user, getUserCredit } = useAuth();
  const [credits, setCredits] = useState({
    balance: 0,
    used: 0,
    rewards: 0,
    percentage: 0
  });

  useEffect(() => {
    const fetchCredits = async () => {
      if (user) {
        const balance = await getUserCredit(user.uid);
        // For now, we'll set some placeholder values for used and rewards
        const used = 0; // This will be implemented later
        const rewards = 0; // This will be implemented later
        const percentage = used > 0 ? Math.round((used / (used + balance)) * 100) : 0;
        
        setCredits({
          balance,
          used,
          rewards,
          percentage
        });
      }
    };

    fetchCredits();
  }, [user, getUserCredit]);

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Licensing & Credits</h2>
          <p className="text-muted-foreground">
            Manage your licenses, credits and system identity
          </p>
        </div>
      </div>

      {/* Credits Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Credits Balance</CardTitle>
              <CardDescription>Monitor and manage your credits</CardDescription>
            </div>
            <CreditCard className="w-5 h-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">{credits.balance}</p>
                <p className="text-sm text-muted-foreground">Available Credits</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold text-green-500">+{credits.rewards}</p>
                <p className="text-sm text-muted-foreground">Reward Points</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Credits Used</span>
                <span className="font-medium">{credits.used}</span>
              </div>
              <Progress value={credits.percentage} className="h-2" />
            </div>

            <div className="flex gap-3">
              <Button className="flex-1">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Credits
              </Button>
              <Button variant="outline" className="flex-1">
                <RefreshCw className="w-4 h-4 mr-2" />
                Transfer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* License Management */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>License Management</CardTitle>
                <CardDescription>Active licenses and subscriptions</CardDescription>
              </div>
              <Key className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {licenses.map((license, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-background/50 hover:bg-muted/50 transition-colors space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {license.type === "Software License" ? (
                        <Shield className="w-5 h-5 text-blue-500" />
                      ) : (
                        <Cpu className="w-5 h-5 text-purple-500" />
                      )}
                      <div>
                        <h3 className="font-medium">{license.type}</h3>
                        <p className="text-sm text-muted-foreground">
                          Expires: {license.expiry}
                        </p>
                      </div>
                    </div>
                    <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                      {license.status}
                    </div>
                  </div>

                  {license.features && (
                    <div className="flex flex-wrap gap-2">
                      {license.features.map((feature, fIndex) => (
                        <span
                          key={fIndex}
                          className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  {license.imei && (
                    <div className="flex items-center gap-2 text-sm">
                      <Smartphone className="w-4 h-4 text-muted-foreground" />
                      <span className="font-mono">{license.imei}</span>
                    </div>
                  )}

                  <div className="text-sm text-muted-foreground">
                    Last {license.lastUsed ? "Used" : "Sync"}: {license.lastUsed || license.lastSync}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Identity Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>System Identity</CardTitle>
                <CardDescription>Firmware and configurations</CardDescription>
              </div>
              <Settings2Icon className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Firmware Version</p>
                  <p className="text-2xl font-bold">{identityInfo.firmwareVersion}</p>
                </div>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Update
                </Button>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">System Configurations</p>
                {identityInfo.configurations.map((config, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <span className="font-medium">{config.name}</span>
                    <span className={`text-sm ${
                      config.status === 'configured' ? 'text-green-500' : 'text-yellow-500'
                    }`}>
                      {config.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-sm text-muted-foreground">
                Last System Update: {identityInfo.lastUpdate}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 