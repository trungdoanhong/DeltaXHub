"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';
import {
  LayoutDashboard,
  Settings,
  Bot,
  Network,
  Cpu,
  Users,
  Key,
  User,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
    color: 'text-sky-500',
  },
  {
    label: 'AI Hub',
    icon: Bot,
    href: '/dashboard/ai-hub',
    color: 'text-pink-700',
  },
  {
    label: 'IoT',
    icon: Network,
    href: '/dashboard/iot',
    color: 'text-orange-700',
  },
  {
    label: 'Automation',
    icon: Cpu,
    href: '/dashboard/automation',
    color: 'text-emerald-500',
  },
  {
    label: 'Community',
    icon: Users,
    href: '/dashboard/community',
    color: 'text-green-700',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/dashboard/settings',
    color: 'text-violet-500',
  },
  {
    label: 'Licensing',
    icon: Key,
    href: '/dashboard/licensing',
    color: 'text-blue-700',
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="glass-effect h-full flex flex-col rounded-none">
      <div className="p-4 border-b border-border/40">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-lg">D</span>
          </div>
          <span className="text-xl font-bold">DeltaX Hub</span>
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
      </div>

      <div className="p-3 border-t border-border/40 space-y-2">
        <Link href="/dashboard/profile">
          <Button variant="ghost" className="w-full justify-start px-3 py-2 hover:bg-primary/10">
            <div className="flex items-center">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  className="h-6 w-6 rounded-full mr-3"
                />
              ) : (
                <User className="h-5 w-5 mr-3 text-muted-foreground" />
              )}
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium text-foreground">{user?.displayName || 'User'}</span>
                <span className="text-xs text-muted-foreground">{user?.email}</span>
              </div>
            </div>
          </Button>
        </Link>
        <Button 
          variant="ghost" 
          className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </Button>
      </div>
    </div>
  );
} 