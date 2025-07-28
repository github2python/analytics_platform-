import { DashboardShell } from "@/components/dashboard-shell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RiUserAddLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";

export default function ClientsPage() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Clients</h1>
        <Button>
          <RiUserAddLine className="mr-2 h-4 w-4" /> Add Client
        </Button>
      </div>

      <div className="mt-6">
        <Card className="flex items-center justify-center p-10">
          <CardContent className="flex flex-col items-center justify-center py-10 text-center">
            <div className="rounded-full bg-muted p-6">
              <RiUserAddLine className="h-10 w-10 text-muted-foreground" />
            </div>
            <CardTitle className="mt-4 text-xl">No clients yet</CardTitle>
            <CardDescription className="mb-6 mt-2">
              Add your first client to start managing their campaigns
            </CardDescription>
            <Button>
              <RiUserAddLine className="mr-2 h-4 w-4" /> Add Client
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
} 