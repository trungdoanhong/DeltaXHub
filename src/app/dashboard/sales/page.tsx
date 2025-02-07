"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from 'next/link';
import {
  ShoppingCart,
  Package,
  DollarSign,
  Users,
  TrendingUp,
  BarChart3,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ShoppingBag,
  Truck,
  ArrowUpRight,
  ArrowDownRight,
  ClipboardList,
  Users2,
  Target,
  Calendar,
  MessageSquare,
  FileText
} from "lucide-react";

const salesStats = [
  {
    title: "Total Sales",
    value: "$12,345",
    trend: "up",
    trendValue: "+12%",
    description: "vs. last month",
    icon: DollarSign,
    color: "blue"
  },
  {
    title: "New Orders",
    value: "48",
    trend: "up",
    trendValue: "+8",
    description: "today",
    icon: ShoppingCart,
    color: "green"
  },
  {
    title: "Active Customers",
    value: "156",
    trend: "up",
    trendValue: "+23",
    description: "this week",
    icon: Users,
    color: "purple"
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    trend: "down",
    trendValue: "-0.4%",
    description: "vs. last week",
    icon: TrendingUp,
    color: "orange"
  }
];

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    amount: "$299",
    status: "processing",
    items: 3,
    date: "10 mins ago"
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    amount: "$599",
    status: "completed",
    items: 5,
    date: "2 hours ago"
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    amount: "$149",
    status: "pending",
    items: 2,
    date: "4 hours ago"
  }
];

const orderStatus = [
  {
    name: "Pending",
    value: 12,
    color: "yellow"
  },
  {
    name: "Processing",
    value: 8,
    color: "blue"
  },
  {
    name: "Completed",
    value: 45,
    color: "green"
  },
  {
    name: "Cancelled",
    value: 3,
    color: "red"
  }
];

export default function SalesPage() {
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
      const userDoc = await getUserRoles(user.uid);
      const isSales = userDoc.includes('Sales');

      if (!userIsAdmin && !isSales) {
        router.push('/dashboard');
        return;
      }

      setHasAccess(true);
      setLoading(false);
    };

    checkAccess();
  }, [user, isAdmin, router]);

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
          <h2 className="text-3xl font-bold tracking-tight">Sales Dashboard</h2>
          <p className="text-muted-foreground">
            Manage orders, track sales, and monitor performance
          </p>
        </div>
        <div className="flex gap-4">
          <Button>
            <ShoppingBag className="mr-2 h-4 w-4" />
            New Order
          </Button>
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {salesStats.map((stat, index) => {
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

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer orders</CardDescription>
              </div>
              <Package className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-background/50 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl ${
                      order.status === 'completed'
                        ? 'bg-green-500/10'
                        : order.status === 'processing'
                        ? 'bg-blue-500/10'
                        : 'bg-yellow-500/10'
                    } flex items-center justify-center`}>
                      {order.status === 'completed' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : order.status === 'processing' ? (
                        <Clock className="w-5 h-5 text-blue-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-yellow-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.id} • {order.items} items
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.amount}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Order Status</CardTitle>
                <CardDescription>Distribution of orders by status</CardDescription>
              </div>
              <Truck className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {orderStatus.map((status) => (
                <div key={status.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{status.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs bg-${status.color}-500/10 text-${status.color}-500`}>
                      {status.value}
                    </span>
                  </div>
                  <Progress 
                    value={status.value} 
                    className={`h-2 bg-${status.color}-500/20`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Features Navigation */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Link href="/dashboard/sales/orders">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <ClipboardList className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">Orders</CardTitle>
                  <CardDescription>Manage customer orders</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/dashboard/sales/customers">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Users2 className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">Customers</CardTitle>
                  <CardDescription>Customer management</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/dashboard/sales/products">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Package className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">Products</CardTitle>
                  <CardDescription>Product catalog</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/dashboard/sales/leads">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <Target className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">Leads</CardTitle>
                  <CardDescription>Lead management</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/dashboard/sales/calendar">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">Calendar</CardTitle>
                  <CardDescription>Schedule management</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/dashboard/sales/analytics">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-indigo-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">Analytics</CardTitle>
                  <CardDescription>Sales analytics</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/dashboard/sales/communication">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-pink-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">Communication</CardTitle>
                  <CardDescription>Team communication</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/dashboard/sales/documents">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-teal-500" />
                </div>
                <div>
                  <CardTitle className="text-lg">Documents</CardTitle>
                  <CardDescription>Document management</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
} 