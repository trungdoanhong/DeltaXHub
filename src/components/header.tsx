"use client";

import { BellIcon } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { UserNav } from './user-nav';

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-border/40">
      <div className="container flex h-16 items-center px-4">
        <div className="flex-1">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Tap to search..."
              className="w-full h-10 pl-4 pr-4 rounded-xl bg-background/50 border border-border/40 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative w-10 h-10 rounded-xl flex items-center justify-center hover:bg-primary/10 transition-colors group">
            <BellIcon className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
          </button>
          <ThemeToggle />
          <div className="h-6 w-px bg-border/40" />
          <UserNav />
        </div>
      </div>
    </header>
  );
} 