"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Target } from "lucide-react";

export function MainNav() {
  const pathname = usePathname();

  const routes = [
    {
      href: "/dashboard",
      label: "Overview",
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/sales/leads",
      label: "Leads",
      active: pathname === "/dashboard/sales/leads",
      icon: Target,
    },
    // Add more routes as needed
  ];

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            route.active
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {route.icon && <route.icon className="mr-2 h-4 w-4" />}
          {route.label}
        </Link>
      ))}
    </nav>
  );
} 