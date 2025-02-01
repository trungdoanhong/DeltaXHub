import { BotIcon, CircuitBoardIcon, CpuIcon, HeartIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { RecentActivities } from '@/components/dashboard/recent-activities';
import { AnnouncementCard } from '@/components/dashboard/announcement-card';

const stats = [
  {
    title: 'Total Revenue',
    value: '$216k',
    description: '+$341 this month',
    icon: CircuitBoardIcon,
    trend: 'up',
    trendValue: '2.5%',
    color: 'orange'
  },
  {
    title: 'Active Devices',
    value: '2,221',
    description: '+123 new devices',
    icon: CpuIcon,
    trend: 'up',
    trendValue: '12%',
    color: 'green'
  },
  {
    title: 'Total Users',
    value: '1,423',
    description: '+91 this week',
    icon: BotIcon,
    trend: 'up',
    trendValue: '8.1%',
    color: 'blue'
  },
  {
    title: 'System Health',
    value: '78%',
    description: 'All systems normal',
    icon: HeartIcon,
    trend: 'down',
    trendValue: '1.5%',
    color: 'red'
  }
];

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="card-neumorphic overflow-hidden">
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
                    {stat.trend === 'up' ? '↑' : '↓'} {stat.trendValue}
                  </span>
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-7">
        <Card className="col-span-1 md:col-span-2 lg:col-span-5 card-neumorphic overflow-hidden">
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>Your revenue growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueChart />
          </CardContent>
        </Card>

        <Card className="col-span-1 md:col-span-1 lg:col-span-2 overflow-hidden">
          <CardContent className="p-0">
            <AnnouncementCard />
          </CardContent>
        </Card>
      </div>

      <Card className="card-neumorphic overflow-hidden">
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>Your latest system activities and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentActivities />
        </CardContent>
      </Card>
    </div>
  );
} 