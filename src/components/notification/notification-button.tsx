"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotificationButton() {
  return (
    <Button variant="ghost" size="icon" aria-label="Notifications">
      <Bell className="h-5 w-5" />
    </Button>
  );
}
