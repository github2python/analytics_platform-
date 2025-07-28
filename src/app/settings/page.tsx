import { DashboardShell } from "@/components/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RiCheckLine, RiSaveLine } from "react-icons/ri";

export default function SettingsPage() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="general">
          <div className="flex border-b">
            <TabsList className="mx-auto">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="display">Display</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="general" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>
                  Update your company information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <label htmlFor="company-name" className="text-sm font-medium">
                    Company Name
                  </label>
                  <Input id="company-name" defaultValue="ADmyBRAND" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="company-website" className="text-sm font-medium">
                    Website
                  </label>
                  <Input id="company-website" defaultValue="https://www.admybrand.com" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="timezone" className="text-sm font-medium">
                    Default Timezone
                  </label>
                  <Input id="timezone" defaultValue="(UTC-05:00) Eastern Time (US & Canada)" />
                </div>
                <Button className="mt-4">
                  <RiSaveLine className="mr-2 h-4 w-4" /> Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Manage your profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Profile settings will be available soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Notification settings will be available soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="display" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Display Settings</CardTitle>
                <CardDescription>
                  Customize your dashboard experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="mb-2 text-sm font-medium">Theme</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Choose your preferred theme for the dashboard
                  </p>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" className="justify-start">
                      Light
                      <RiCheckLine className="ml-2 h-4 w-4 text-primary" />
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Dark
                    </Button>
                    <Button variant="outline" className="justify-start">
                      System
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
} 