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
  LogOut,
  UserCog,
  ShoppingBag,
  ClipboardList,
  Users2,
  BarChart2,
  MessageSquare,
  FileText,
  Package,
  Target,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface RouteItem {
  label: string;
  icon: any; // Using any for Lucide icons
  href: string;
  color: string;
  children?: RouteItem[];
}

const baseRoutes: RouteItem[] = [
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

const adminRoutes: RouteItem[] = [
  {
    label: 'User Management',
    icon: UserCog,
    href: '/dashboard/users',
    color: 'text-red-700',
  },
];

const salesRoutes: RouteItem[] = [
  {
    label: 'Sales',
    icon: ShoppingBag,
    href: '/dashboard/sales',
    color: 'text-yellow-700',
    children: [
      {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard/sales',
        color: 'text-yellow-700',
      },
      {
        label: 'Orders',
        icon: ClipboardList,
        href: '/dashboard/sales/orders',
        color: 'text-blue-700',
      },
      {
        label: 'Customers',
        icon: Users2,
        href: '/dashboard/sales/customers',
        color: 'text-green-700',
      },
      {
        label: 'Products',
        icon: Package,
        href: '/dashboard/sales/products',
        color: 'text-purple-700',
      },
      {
        label: 'Leads',
        icon: Target,
        href: '/dashboard/sales/leads',
        color: 'text-red-700',
      },
      {
        label: 'Calendar',
        icon: Calendar,
        href: '/dashboard/sales/calendar',
        color: 'text-orange-700',
      },
      {
        label: 'Analytics',
        icon: BarChart2,
        href: '/dashboard/sales/analytics',
        color: 'text-indigo-700',
      },
      {
        label: 'Communication',
        icon: MessageSquare,
        href: '/dashboard/sales/communication',
        color: 'text-pink-700',
      },
      {
        label: 'Documents',
        icon: FileText,
        href: '/dashboard/sales/documents',
        color: 'text-teal-700',
      },
    ]
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout, isAdmin, getUserRoles } = useAuth();
  const [routes, setRoutes] = useState<RouteItem[]>(baseRoutes);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (!user) return;

      const userIsAdmin = await isAdmin();
      const userRoles = await getUserRoles(user.uid);
      const isSales = userRoles.includes('Sales');

      let updatedRoutes = [...baseRoutes];
      
      if (userIsAdmin) {
        updatedRoutes = [...updatedRoutes, ...adminRoutes];
      }
      
      if (userIsAdmin || isSales) {
        updatedRoutes = [...updatedRoutes, ...salesRoutes];
      }

      setRoutes(updatedRoutes);
      setLoading(false);
    };
    checkAccess();
  }, [user, isAdmin, getUserRoles]);

  if (loading) {
    return null;
  }

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
              <div key={route.href}>
                <Link
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
                {route.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {route.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-xl transition-all duration-200',
                          pathname === child.href
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                            : 'hover:bg-primary/10 text-muted-foreground hover:text-primary'
                        )}
                      >
                        <div className="flex items-center flex-1">
                          <child.icon className={cn(
                            "w-4 h-4 mr-3",
                            pathname === child.href 
                              ? "text-primary-foreground" 
                              : cn("text-muted-foreground group-hover:text-primary", child.color)
                          )} />
                          {child.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3 border-t border-border/40 space-y-2">
        <Link href="/dashboard/profile">
          <Button variant="ghost" className="w-full justify-start px-3 py-2 hover:bg-primary/10">
            <div className="flex items-center">
              {user?.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt={user.displayName || 'User'}
                  width={24}
                  height={24}
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