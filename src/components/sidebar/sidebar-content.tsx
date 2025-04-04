"use client";

import { SidebarLogo } from "@/components/sidebar/sidebar-logo";
import { SidebarNavigation } from "@/components/sidebar/sidebar-navigation";
import { SidebarFooter } from "@/components/sidebar/sidebar-footer";
import { SidebarItemType } from "@/components/sidebar/sidebar-item";

interface SidebarContentProps {
  items: SidebarItemType[];
  pathname: string;
  openSubmenu: string | null;
  toggleSubmenu: (title: string) => void;
  onClose: () => void;
}

export function SidebarContent({
  items,
  pathname,
  openSubmenu,
  toggleSubmenu,
  onClose,
}: SidebarContentProps) {
  return (
    <div className="bg-sidebar text-sidebar-foreground flex h-full flex-col">
      <SidebarLogo onNavigate={onClose} />
      <SidebarNavigation
        items={items}
        pathname={pathname}
        openSubmenu={openSubmenu}
        toggleSubmenu={toggleSubmenu}
        onNavigate={onClose}
      />
      <SidebarFooter />
    </div>
  );
}
