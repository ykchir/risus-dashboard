import { LayoutDashboard, Users, FileText, MessageSquare, Bell, Settings } from "lucide-react";
import { SidebarItemType } from "@/components/sidebar/sidebar-item";

export const sidebarItems: SidebarItemType[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Patients",
    href: "/patients",
    icon: <Users className="h-5 w-5" />,
    submenu: [
      { title: "All Patients", href: "/patients" },
      { title: "Add Patient", href: "/patients/new" },
    ],
  },
  {
    title: "Documents",
    href: "/documents",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Messages",
    href: "/messages",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: <Bell className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];
