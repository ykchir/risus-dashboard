"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileMenuToggleProps {
  onClick: () => void;
}

export function MobileMenuToggle({ onClick }: MobileMenuToggleProps) {
  return (
    <Button variant="ghost" size="icon" onClick={onClick}>
      <Menu className="h-6 w-6" />
      <span className="sr-only">Menu principal</span>
    </Button>
  );
}
