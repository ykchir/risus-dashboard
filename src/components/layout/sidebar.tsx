"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SidebarContent } from "@/components/sidebar/sidebar-content";
import { sidebarItems } from "@/components/sidebar/sidebar-data";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Composant Sidebar principal qui intègre les différentes parties modulaires
 * Gère l'état des sous-menus et l'affichage selon la taille de l'écran
 */
export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  return (
    <>
      {/* Mobile: Sidebar dans un Sheet */}
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-0">
          <SidebarContent
            items={sidebarItems}
            pathname={pathname}
            openSubmenu={openSubmenu}
            toggleSubmenu={toggleSubmenu}
            onClose={onClose}
          />
        </SheetContent>
      </Sheet>

      {/* Desktop: Sidebar toujours visible */}
      <div className="bg-sidebar hidden h-full w-64 flex-shrink-0 md:block">
        <SidebarContent
          items={sidebarItems}
          pathname={pathname}
          openSubmenu={openSubmenu}
          toggleSubmenu={toggleSubmenu}
          onClose={onClose}
        />
      </div>
    </>
  );
}
