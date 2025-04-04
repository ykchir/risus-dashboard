"use client";

import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface SidebarItemType {
  title: string;
  href: string;
  icon: React.ReactNode;
  submenu?: Array<{
    title: string;
    href: string;
  }>;
}

interface SidebarItemProps {
  item: SidebarItemType;
  pathname: string;
  openSubmenu: string | null;
  toggleSubmenu: (title: string) => void;
  onNavigate: () => void;
}

export function SidebarItem({
  item,
  pathname,
  openSubmenu,
  toggleSubmenu,
  onNavigate,
}: SidebarItemProps) {
  const hasSubmenu = !!item.submenu?.length;

  if (hasSubmenu) {
    return (
      <div className="mb-1">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-between px-3",
            pathname.startsWith(item.href)
              ? "bg-primary/10 font-medium text-primary"
              : "hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
          )}
          onClick={() => toggleSubmenu(item.title)}
        >
          <div className="flex items-center">
            {item.icon}
            <span className="ml-3">{item.title}</span>
          </div>
          {openSubmenu === item.title ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
        {openSubmenu === item.title && item.submenu && (
          <div className="ml-6 mt-1 space-y-1">
            {item.submenu.map((subItem, subIndex) => (
              <Link
                key={subIndex}
                href={subItem.href}
                onClick={onNavigate}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm",
                  pathname === subItem.href
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )}
              >
                {subItem.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "mb-1 flex items-center rounded-md px-3 py-2",
        pathname === item.href
          ? "bg-primary/10 font-medium text-primary"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
      )}
    >
      {item.icon}
      <span className="ml-3">{item.title}</span>
    </Link>
  );
}
