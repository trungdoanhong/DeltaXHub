"use client";

import { ThemeToggle } from '@/components/theme-toggle';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <div className="flex h-14 items-center justify-end gap-2 px-4">
      <Button variant="ghost" size="icon">
        <Bell className="h-5 w-5" />
      </Button>
      <ThemeToggle />
    </div>
  );
} 