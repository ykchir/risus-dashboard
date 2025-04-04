import { Metadata } from "next";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Users, Search, Send, Plus } from "lucide-react";
import { mockMessages, mockPatients } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Messages | RISUS",
  description: "Communication between practitioners and administrators",
};

export default function MessagesPage() {
  // Group messages by patient
  const messagesByPatient = mockMessages.reduce(
    (acc, message) => {
      if (!acc[message.patientId]) {
        acc[message.patientId] = [];
      }
      acc[message.patientId].push(message);
      return acc;
    },
    {} as Record<string, typeof mockMessages>
  );

  // Sort conversations by most recent message
  const sortedConversations = Object.entries(messagesByPatient)
    .map(([patientId, messages]) => {
      const latestMessage = messages.reduce((latest, message) =>
        message.createdAt > latest.createdAt ? message : latest
      );
      const patient = mockPatients.find((p) => p.id === patientId);
      const unreadCount = messages.filter((m) => !m.isRead && m.senderId === "admin-1").length;

      return {
        patientId,
        patientName: patient ? `${patient.firstName} ${patient.lastName}` : "Unknown Patient",
        latestMessage,
        messages,
        unreadCount,
      };
    })
    .sort((a, b) => b.latestMessage.createdAt.getTime() - a.latestMessage.createdAt.getTime());

  // For demo, we'll show the first conversation's messages
  const selectedConversation = sortedConversations.length > 0 ? sortedConversations[0] : null;

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-gray-500">Communication with administrators and patients</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Message
        </Button>
      </div>

      <div className="grid h-[calc(100vh-12rem)] grid-cols-1 gap-6 md:grid-cols-[300px_1fr]">
        {/* Conversations List */}
        <Card className="h-full overflow-hidden">
          <CardHeader className="p-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search messages..." className="pl-8" />
            </div>
          </CardHeader>
          <div className="h-[calc(100%-4rem)] overflow-y-auto">
            {sortedConversations.map((conversation, index) => (
              <div
                key={conversation.patientId}
                className={`flex gap-3 border-b p-4 hover:bg-gray-50 ${
                  index === 0 ? "bg-gray-50" : ""
                }`}
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
                  <Users className="h-6 w-6 text-gray-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="truncate font-medium">{conversation.patientName}</h3>
                    <span className="text-xs text-gray-500">
                      {format(conversation.latestMessage.createdAt, "h:mm a")}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <p className="flex-1 truncate text-sm text-gray-600">
                      {conversation.latestMessage.content}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <div className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                        {conversation.unreadCount}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Conversation View */}
        <Card className="flex h-full flex-col overflow-hidden">
          {selectedConversation ? (
            <>
              <CardHeader className="border-b p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                    <Users className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <CardTitle>{selectedConversation.patientName}</CardTitle>
                    <CardDescription>Patient ID: {selectedConversation.patientId}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-0">
                <div className="flex flex-col space-y-4 p-4">
                  {selectedConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === "practitioner-1" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.senderId === "practitioner-1" ? "bg-blue-100" : "bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-medium">
                            {message.senderId === "admin-1" ? "Admin" : "Dr. Smith"}
                          </span>
                          <span className="text-xs text-gray-500">
                            {format(message.createdAt, "MMM d, yyyy 'at' h:mm a")}
                          </span>
                        </div>
                        <p className="mt-1 text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              <div className="border-t p-4">
                <div className="flex items-center space-x-2">
                  <Input className="flex-1" placeholder="Type your message..." />
                  <Button size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center p-4">
              <div className="rounded-full bg-gray-100 p-4">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mt-4 text-lg font-medium">No conversation selected</h3>
              <p className="text-center text-gray-500">
                Select a conversation from the list or start a new one
              </p>
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                New Message
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
