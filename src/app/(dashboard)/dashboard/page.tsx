import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, FileText, MessageSquare, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard | RISUS",
  description: "Dashboard for dental practitioners using RISUS aligners",
};

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-gray-100 p-1.5 text-gray-600">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500">Welcome back, Dr. Yassine kchir</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Total Patients"
              value="24"
              description="2 new this month"
              icon={<Users className="h-5 w-5" />}
            />
            <StatCard
              title="Active Treatments"
              value="18"
              description="3 completed this month"
              icon={<Calendar className="h-5 w-5" />}
            />
            <StatCard
              title="Documents"
              value="87"
              description="12 uploaded this month"
              icon={<FileText className="h-5 w-5" />}
            />
            <StatCard
              title="Messages"
              value="5"
              description="3 unread messages"
              icon={<MessageSquare className="h-5 w-5" />}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Patients</CardTitle>
                <CardDescription>Your most recently added patients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gray-100" />
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-gray-500">Added yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gray-100" />
                    <div>
                      <p className="font-medium">Michael Chen</p>
                      <p className="text-sm text-gray-500">Added 3 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-gray-100" />
                    <div>
                      <p className="font-medium">Emma Rodriguez</p>
                      <p className="text-sm text-gray-500">Added 1 week ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Treatment Progress</CardTitle>
                <CardDescription>Patients nearing completion of treatment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Thomas Wilson</p>
                      <p className="text-sm text-gray-500">95%</p>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100">
                      <div className="h-full w-[95%] rounded-full bg-green-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">Olivia Martinez</p>
                      <p className="text-sm text-gray-500">80%</p>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100">
                      <div className="h-full w-[80%] rounded-full bg-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">James Taylor</p>
                      <p className="text-sm text-gray-500">65%</p>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100">
                      <div className="h-full w-[65%] rounded-full bg-primary" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-2 border-primary pl-4">
                  <p className="font-medium">You added a new patient: Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Yesterday at 2:30 PM</p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <p className="font-medium">Treatment plan updated for Michael Chen</p>
                  <p className="text-sm text-gray-500">2 days ago at 10:15 AM</p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <p className="font-medium">New document uploaded for Emma Rodriguez</p>
                  <p className="text-sm text-gray-500">3 days ago at 4:45 PM</p>
                </div>
                <div className="border-l-2 border-primary pl-4">
                  <p className="font-medium">Message received from Admin</p>
                  <p className="text-sm text-gray-500">1 week ago at 9:20 AM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Your scheduled patient appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Initial Consultation</p>
                  </div>
                  <p className="text-sm font-medium">Tomorrow, 10:00 AM</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Michael Chen</p>
                    <p className="text-sm text-gray-500">Follow-up Appointment</p>
                  </div>
                  <p className="text-sm font-medium">April 5, 2:30 PM</p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Emma Rodriguez</p>
                    <p className="text-sm text-gray-500">Treatment Review</p>
                  </div>
                  <p className="text-sm font-medium">April 12, 11:15 AM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
