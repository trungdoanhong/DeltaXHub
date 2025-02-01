"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  HomeIcon,
  CpuIcon,
  BotIcon,
  BrainCircuitIcon,
  KeyIcon,
  MonitorPlayIcon,
  UsersIcon,
  SettingsIcon,
  SearchIcon
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'IoT', href: '/dashboard/iot', icon: CpuIcon },
  { name: 'Automation', href: '/dashboard/automation', icon: BotIcon },
  { name: 'AI Hub', href: '/dashboard/ai', icon: BrainCircuitIcon },
  { name: 'Licensing', href: '/dashboard/licensing', icon: KeyIcon },
  { name: 'Simulation', href: '/dashboard/simulation', icon: MonitorPlayIcon },
  { name: 'Community', href: '/dashboard/community', icon: UsersIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: SettingsIcon },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-full glass-effect border-r border-border/40">
      <div className="h-16 flex items-center px-6 border-b border-border/40">
        <Link href="/dashboard" className="flex items-center gap-2 text-xl font-bold text-primary">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-lg">D</span>
          </div>
          DeltaX Hub
        </Link>
      </div>

      <div className="p-4">
        <div className="relative mb-4">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-10 pl-9 pr-4 rounded-xl bg-background/50 border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
          />
        </div>

        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'hover:bg-primary/10 text-muted-foreground hover:text-primary'
                )}
              >
                <Icon className={cn(
                  "w-5 h-5",
                  isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"
                )} />
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
} 