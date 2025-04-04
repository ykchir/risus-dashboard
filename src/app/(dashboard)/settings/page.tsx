import { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { BellRing, Lock, User, Building } from "lucide-react";

export const metadata: Metadata = {
  title: "Settings | RISUS",
  description: "Account and application settings",
};

export default function SettingsPage() {
  return (
    <div className="flex flex-col space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-gray-500">Manage your account and application preferences</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid gap-6 md:grid-cols-[1fr_250px]">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and profile details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" defaultValue="Yassine" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" defaultValue="Kchir" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="dr.smith@risus.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Professional title</Label>
                  <Input id="title" defaultValue="Orthodontist" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea
                    id="bio"
                    className="h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Brief professional bio"
                    defaultValue="Board-certified orthodontist with over 10 years of experience in clear aligner therapy. Specializing in complex cases and aesthetic treatments."
                  />
                </div>

                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                  <CardDescription>Upload a profile picture for your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center">
                    <div className="relative h-32 w-32 overflow-hidden rounded-full">
                      <div className="flex h-full w-full items-center justify-center bg-gray-100">
                        <User className="h-12 w-12 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      Change Picture
                    </Button>
                    <Button variant="outline" className="w-full">
                      Remove Picture
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="account">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="mr-2 h-5 w-5" />
                  <span>Password & Security</span>
                </CardTitle>
                <CardDescription>Update your password and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Update Password</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BellRing className="mr-2 h-5 w-5" />
                <span>Notification Preferences</span>
              </CardTitle>
              <CardDescription>Manage how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Email Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-patients">Patient updates</Label>
                      <p className="text-sm text-gray-500">
                        Receive emails when patients are added or updated
                      </p>
                    </div>
                    <Switch id="email-patients" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-treatment">Treatment updates</Label>
                      <p className="text-sm text-gray-500">
                        Receive emails about treatment progress and alerts
                      </p>
                    </div>
                    <Switch id="email-treatment" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-messages">Messages</Label>
                      <p className="text-sm text-gray-500">
                        Receive email notifications for new messages
                      </p>
                    </div>
                    <Switch id="email-messages" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-marketing">Marketing updates</Label>
                      <p className="text-sm text-gray-500">
                        Receive emails about new products and features
                      </p>
                    </div>
                    <Switch id="email-marketing" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">In-App Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="app-messages">Message notifications</Label>
                      <p className="text-sm text-gray-500">Show notifications for new messages</p>
                    </div>
                    <Switch id="app-messages" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="app-patients">Patient updates</Label>
                      <p className="text-sm text-gray-500">
                        Show notifications for patient updates
                      </p>
                    </div>
                    <Switch id="app-patients" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="app-treatment">Treatment alerts</Label>
                      <p className="text-sm text-gray-500">
                        Show notifications for treatment milestones and alerts
                      </p>
                    </div>
                    <Switch id="app-treatment" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                <span>Practice Information</span>
              </CardTitle>
              <CardDescription>Update details about your dental practice</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="practice-name">Practice Name</Label>
                <Input id="practice-name" defaultValue="Smith Orthodontics" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="practice-phone">Phone</Label>
                  <Input id="practice-phone" type="tel" defaultValue="+1 (555) 987-6543" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="practice-email">Email</Label>
                  <Input id="practice-email" type="email" defaultValue="info@smithortho.com" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="practice-address">Street Address</Label>
                <Input id="practice-address" defaultValue="123 Dental Plaza, Suite 100" />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="practice-city">City</Label>
                  <Input id="practice-city" defaultValue="San Francisco" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="practice-state">State/Province</Label>
                  <Input id="practice-state" defaultValue="CA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="practice-zip">Postal Code</Label>
                  <Input id="practice-zip" defaultValue="94103" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="practice-country">Country</Label>
                <Input id="practice-country" defaultValue="United States" />
              </div>

              <div className="flex justify-end">
                <Button>Update Practice Info</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
