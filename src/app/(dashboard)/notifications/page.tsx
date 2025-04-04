import { Metadata } from "next";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BellRing, Calendar, Check, FileText, MessageSquare, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Notifications | RISUS",
  description: "View and manage your notifications",
};

// Mock notifications for the demo
const mockNotifications = [
  {
    id: "n1",
    title: "New message from Admin",
    description: "Treatment plan for Sarah Johnson has been approved.",
    type: "message",
    date: new Date("2023-04-01T14:30:00"),
    read: false,
  },
  {
    id: "n2",
    title: "New patient added",
    description: "Emma Rodriguez was added to your patient list.",
    type: "patient",
    date: new Date("2023-03-31T09:15:00"),
    read: false,
  },
  {
    id: "n3",
    title: "Document uploaded",
    description: "New X-ray was uploaded for Michael Chen.",
    type: "document",
    date: new Date("2023-03-30T16:45:00"),
    read: true,
  },
  {
    id: "n4",
    title: "Treatment milestone",
    description: "Thomas Wilson has completed stage 10 of treatment.",
    type: "treatment",
    date: new Date("2023-03-29T11:20:00"),
    read: true,
  },
  {
    id: "n5",
    title: "Appointment reminder",
    description: "You have a follow-up appointment with Olivia Martinez tomorrow at 2:30 PM.",
    type: "appointment",
    date: new Date("2023-03-28T08:00:00"),
    read: true,
  },
];

export default function NotificationsPage() {
  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  // Helper function to get icon by notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case "patient":
        return <User className="h-5 w-5 text-green-500" />;
      case "document":
        return <FileText className="h-5 w-5 text-purple-500" />;
      case "treatment":
      case "appointment":
        return <Calendar className="h-5 w-5 text-orange-500" />;
      default:
        return <BellRing className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-gray-500">
            You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
        <Button variant="outline">
          <Check className="mr-2 h-4 w-4" />
          Mark all as read
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="other">Other</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>All Notifications</CardTitle>
              <CardDescription>View all your notifications in one place</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex gap-4 rounded-lg border p-4 ${
                      notification.read ? "bg-white" : "bg-blue-50"
                    }`}
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className={`font-medium ${notification.read ? "" : "text-blue-600"}`}>
                          {notification.title}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {format(notification.date, "MMM d, h:mm a")}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{notification.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="unread" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Unread Notifications</CardTitle>
              <CardDescription>Notifications you haven&apos;t seen yet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockNotifications
                  .filter((n) => !n.read)
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="flex gap-4 rounded-lg border bg-blue-50 p-4"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium text-blue-600">{notification.title}</h3>
                          <span className="text-xs text-gray-500">
                            {format(notification.date, "MMM d, h:mm a")}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">{notification.description}</p>
                      </div>
                    </div>
                  ))}

                {mockNotifications.filter((n) => !n.read).length === 0 && (
                  <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed">
                    <BellRing className="mb-2 h-8 w-8 text-gray-300" />
                    <p className="text-gray-500">No unread notifications</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Message Notifications</CardTitle>
              <CardDescription>Notifications related to messages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockNotifications
                  .filter((n) => n.type === "message")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex gap-4 rounded-lg border p-4 ${
                        notification.read ? "bg-white" : "bg-blue-50"
                      }`}
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
                        <MessageSquare className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className={`font-medium ${notification.read ? "" : "text-blue-600"}`}>
                            {notification.title}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {format(notification.date, "MMM d, h:mm a")}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">{notification.description}</p>
                      </div>
                    </div>
                  ))}

                {mockNotifications.filter((n) => n.type === "message").length === 0 && (
                  <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed">
                    <MessageSquare className="mb-2 h-8 w-8 text-gray-300" />
                    <p className="text-gray-500">No message notifications</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patients" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient Notifications</CardTitle>
              <CardDescription>Notifications related to patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockNotifications
                  .filter((n) => n.type === "patient")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex gap-4 rounded-lg border p-4 ${
                        notification.read ? "bg-white" : "bg-blue-50"
                      }`}
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
                        <User className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className={`font-medium ${notification.read ? "" : "text-blue-600"}`}>
                            {notification.title}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {format(notification.date, "MMM d, h:mm a")}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">{notification.description}</p>
                      </div>
                    </div>
                  ))}

                {mockNotifications.filter((n) => n.type === "patient").length === 0 && (
                  <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed">
                    <User className="mb-2 h-8 w-8 text-gray-300" />
                    <p className="text-gray-500">No patient notifications</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="other" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Other Notifications</CardTitle>
              <CardDescription>All other system notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockNotifications
                  .filter((n) => !["message", "patient"].includes(n.type))
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex gap-4 rounded-lg border p-4 ${
                        notification.read ? "bg-white" : "bg-blue-50"
                      }`}
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h3 className={`font-medium ${notification.read ? "" : "text-blue-600"}`}>
                            {notification.title}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {format(notification.date, "MMM d, h:mm a")}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-600">{notification.description}</p>
                      </div>
                    </div>
                  ))}

                {mockNotifications.filter((n) => !["message", "patient"].includes(n.type))
                  .length === 0 && (
                  <div className="flex h-32 flex-col items-center justify-center rounded-lg border border-dashed">
                    <BellRing className="mb-2 h-8 w-8 text-gray-300" />
                    <p className="text-gray-500">No other notifications</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
