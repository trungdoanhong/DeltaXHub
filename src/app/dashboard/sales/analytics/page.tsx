"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart2,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingCart,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  FileDown,
  Filter
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const analyticsStats = [
  {
    title: "Total Revenue",
    value: "$128.5K",
    trend: "up",
    trendValue: "+12.5%",
    description: "vs. last month",
    icon: DollarSign,
    color: "green"
  },
  {
    title: "Sales Growth",
    value: "23.8%",
    trend: "up",
    trendValue: "+4.3%",
    description: "Year over year",
    icon: TrendingUp,
    color: "blue"
  },
  {
    title: "Active Customers",
    value: "1,429",
    trend: "up",
    trendValue: "+8.2%",
    description: "vs. last quarter",
    icon: Users,
    color: "purple"
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    trend: "down",
    trendValue: "-0.4%",
    description: "vs. last week",
    icon: ShoppingCart,
    color: "orange"
  }
];

const topProducts = [
  {
    name: "Industrial Robot Arm",
    sales: 24,
    revenue: "$311,976",
    growth: "+15%"
  },
  {
    name: "Vision System Camera",
    sales: 36,
    revenue: "$89,964",
    growth: "+28%"
  },
  {
    name: "PLC Controller",
    sales: 42,
    revenue: "$79,758",
    growth: "+12%"
  }
];

const salesByRegion = [
  {
    region: "North America",
    value: "$425,890",
    percentage: 45,
    growth: "+18%"
  },
  {
    region: "Europe",
    value: "$285,430",
    percentage: 30,
    growth: "+12%"
  },
  {
    region: "Asia Pacific",
    value: "$142,715",
    percentage: 15,
    growth: "+25%"
  },
  {
    region: "Rest of World",
    value: "$95,143",
    percentage: 10,
    growth: "+8%"
  }
];

export default function AnalyticsPage() {
  const { user, isAdmin, getUserRoles } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [timeRange, setTimeRange] = useState("30d");

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
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Sales performance and insights
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select
            value={timeRange}
            onValueChange={setTimeRange}
          >
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="12m">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {analyticsStats.map((stat, index) => {
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
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Best performing products by revenue</CardDescription>
              </div>
              <Package className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {topProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-background/50 hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span>{product.sales} sales</span>
                      <span>{product.revenue}</span>
                    </div>
                  </div>
                  <div className="text-green-500 bg-green-500/10 px-2 py-1 rounded-full text-xs">
                    {product.growth}
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
                <CardTitle>Sales by Region</CardTitle>
                <CardDescription>Geographic distribution of sales</CardDescription>
              </div>
              <BarChart2 className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {salesByRegion.map((region, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{region.region}</span>
                    <div className="flex items-center gap-2">
                      <span>{region.value}</span>
                      <span className="text-green-500 bg-green-500/10 px-2 py-1 rounded-full text-xs">
                        {region.growth}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${region.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {region.percentage}% of total sales
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 