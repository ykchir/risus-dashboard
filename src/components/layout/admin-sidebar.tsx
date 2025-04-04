"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LayoutDashboard, Users, FileText, Settings, X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
    },
    {
      label: "Users",
      icon: Users,
      href: "/admin/users",
    },
    {
      label: "Content",
      icon: FileText,
      href: "/admin/content",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/admin/settings",
    },
  ];

  return (
    <div
      className={cn(
        "bg-sidebar fixed inset-y-0 z-50 flex h-full flex-col transition-transform duration-300 ease-in-out md:static md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <span className="text-xl font-bold">Admin</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 md:hidden"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      <ScrollArea className="flex-1 py-2">
        <nav className="grid gap-1 px-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === route.href ? "bg-accent text-accent-foreground" : "transparent"
              )}
            >
              <route.icon className="h-5 w-5" />
              {route.label}
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}
