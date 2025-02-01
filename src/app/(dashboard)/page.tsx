import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  CpuIcon,
  BotIcon,
  BrainIcon,
  UsersIcon,
  ActivityIcon,
  LayersIcon,
} from 'lucide-react';

const stats = [
  {
    title: 'Connected Devices',
    value: '24',
    description: 'Active IoT devices',
    icon: CpuIcon,
  },
  {
    title: 'Automation Tasks',
    value: '12',
    description: 'Running workflows',
    icon: BotIcon,
  },
  {
    title: 'AI Models',
    value: '8',
    description: 'Deployed models',
    icon: BrainIcon,
  },
  {
    title: 'Team Members',
    value: '16',
    description: 'Active users',
    icon: UsersIcon,
  },
  {
    title: 'System Health',
    value: '98%',
    description: 'Overall performance',
    icon: ActivityIcon,
  },
  {
    title: 'Total Projects',
    value: '32',
    description: 'Across all modules',
    icon: LayersIcon,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your industrial automation system
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
} 