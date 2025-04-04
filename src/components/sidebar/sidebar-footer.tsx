"use client";

export function SidebarFooter() {
  return (
    <div className="border-sidebar-border mt-auto border-t p-4">
      <p className="text-sidebar-foreground/70 text-xs">
        Risus, all rights reserved {new Date().getFullYear()}
      </p>
    </div>
  );
}
