"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { 
  Bot, 
  Cpu, 
  Network, 
  Users, 
  Settings, 
  Key,
  User,
  LogOut,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from 'next-themes';

const routes = [
  {
    label: 'AI Hub',
    icon: Bot,
    href: '/dashboard/ai-hub',
    color: 'text-pink-500'
  },
  {
    label: 'IoT Platform',
    icon: Network,
    href: '/dashboard/iot',
    color: 'text-orange-500'
  },
  {
    label: 'Automation',
    icon: Cpu,
    href: '/dashboard/automation',
    color: 'text-emerald-500'
  },
  {
    label: 'Community',
    icon: Users,
    href: '/dashboard/community',
    color: 'text-green-500'
  },
  {
    label: 'Licensing',
    icon: Key,
    href: '/dashboard/licensing',
    color: 'text-blue-500'
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/dashboard/settings',
    color: 'text-gray-500'
  }
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className="glass-effect h-full flex flex-col rounded-none">
      <div className="p-4 border-b border-border/40">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-lg">D</span>
          </div>
          <span className="font-bold">DeltaX Hub</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-xl transition-all duration-200',
                  pathname === route.href
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'hover:bg-primary/10 text-muted-foreground hover:text-primary'
                )}
              >
                <div className="flex items-center flex-1">
                  <route.icon className={cn(
                    "w-5 h-5 mr-3",
                    pathname === route.href 
                      ? "text-primary-foreground" 
                      : cn("text-muted-foreground group-hover:text-primary", route.color)
                  )} />
                  {route.label}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="px-3 py-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? (
              <>
                <Moon className="h-5 w-5 mr-3" />
                Dark Mode
              </>
            ) : (
              <>
                <Sun className="h-5 w-5 mr-3" />
                Light Mode
              </>
            )}
          </Button>
        </div>

        <div className="p-3 border-t border-border/40 space-y-2">
          <Link href="/dashboard/profile">
            <Button variant="ghost" className="w-full justify-start">
              <User className="h-5 w-5 mr-3" />
              {user?.email}
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-500 hover:text-red-500 hover:bg-red-500/10"
            onClick={logout}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Đăng xuất
          </Button>
        </div>
      </div>
    </div>
  );
} 