"use client";

import { SidebarItem, SidebarItemType } from "@/components/sidebar/sidebar-item";

interface SidebarNavigationProps {
  items: SidebarItemType[];
  pathname: string;
  openSubmenu: string | null;
  toggleSubmenu: (title: string) => void;
  onNavigate: () => void;
}

export function SidebarNavigation({
  items,
  pathname,
  openSubmenu,
  toggleSubmenu,
  onNavigate,
}: SidebarNavigationProps) {
  return (
    <div className="flex-1 overflow-auto py-2">
      <nav className="grid items-start px-2 text-sm">
        {items.map((item, index) => (
          <SidebarItem
            key={index}
            item={item}
            pathname={pathname}
            openSubmenu={openSubmenu}
            toggleSubmenu={toggleSubmenu}
            onNavigate={onNavigate}
          />
        ))}
      </nav>
    </div>
  );
}
