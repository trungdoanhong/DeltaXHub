'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BarChart3,
  Bot,
  Cpu,
  Network,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  Zap
} from "lucide-react";

const stats = [
  {
    title: "Thiết bị hoạt động",
    value: "45/50",
    trend: "up",
    trendValue: "90%",
    description: "Uptime",
    icon: Network,
    color: "blue"
  },
  {
    title: "Mô hình AI",
    value: "12",
    trend: "up",
    trendValue: "+3",
    description: "Tháng này",
    icon: Bot,
    color: "pink"
  },
  {
    title: "Quy trình tự động",
    value: "28",
    trend: "up",
    trendValue: "+5",
    description: "Tháng này",
    icon: Cpu,
    color: "emerald"
  },
  {
    title: "Hiệu suất",
    value: "94.5%",
    trend: "up",
    trendValue: "2.1%",
    description: "So với tháng trước",
    icon: BarChart3,
    color: "violet"
  }
];

const recentActivities = [
  {
    type: "alert",
    message: "Cảnh báo nhiệt độ vượt ngưỡng tại Khu vực A",
    time: "5 phút trước",
    status: "warning",
    icon: AlertCircle
  },
  {
    type: "system",
    message: "Cập nhật firmware thành công cho 3 thiết bị",
    time: "15 phút trước",
    status: "success",
    icon: CheckCircle2
  },
  {
    type: "ai",
    message: "Mô hình phát hiện lỗi được triển khai",
    time: "1 giờ trước",
    status: "success",
    icon: Bot
  },
  {
    type: "automation",
    message: "Quy trình đóng gói tự động được tối ưu",
    time: "2 giờ trước",
    status: "success",
    icon: Zap
  }
];

const systemStatus = [
  {
    name: "CPU Usage",
    value: 65,
    status: "normal"
  },
  {
    name: "Memory Usage",
    value: 82,
    status: "warning"
  },
  {
    name: "Storage",
    value: 45,
    status: "normal"
  },
  {
    name: "Network",
    value: 92,
    status: "critical"
  }
];

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Tổng quan về hệ thống tự động hóa của bạn
          </p>
        </div>
        <Button>
          <Activity className="mr-2 h-4 w-4" />
          Xem báo cáo chi tiết
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="relative overflow-hidden">
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
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span className={`mr-1 px-1.5 py-0.5 rounded-full ${
                    stat.trend === 'up' 
                      ? 'text-green-500 bg-green-500/10' 
                      : 'text-red-500 bg-red-500/10'
                  }`}>
                    {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3 inline" /> : <ArrowDownRight className="w-3 h-3 inline" />}
                    {stat.trendValue}
                  </span>
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Hoạt động gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full mr-4 flex items-center justify-center ${
                      activity.status === 'warning'
                        ? 'bg-yellow-500/10'
                        : activity.status === 'success'
                        ? 'bg-green-500/10'
                        : 'bg-red-500/10'
                    }`}>
                      <Icon className={`w-4 h-4 ${
                        activity.status === 'warning'
                          ? 'text-yellow-500'
                          : activity.status === 'success'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Trạng thái hệ thống</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {systemStatus.map((status, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{status.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      status.status === 'normal'
                        ? 'bg-green-500/10 text-green-500'
                        : status.status === 'warning'
                        ? 'bg-yellow-500/10 text-yellow-500'
                        : 'bg-red-500/10 text-red-500'
                    }`}>
                      {status.value}%
                    </span>
                  </div>
                  <Progress 
                    value={status.value} 
                    className={`h-2 ${
                      status.status === 'normal'
                        ? 'bg-green-500/20'
                        : status.status === 'warning'
                        ? 'bg-yellow-500/20'
                        : 'bg-red-500/20'
                    }`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 