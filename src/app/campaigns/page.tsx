"use client";

import { DashboardShell } from "@/components/dashboard-shell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table/data-table";
import { columns, Campaign } from "@/components/data-table/columns";
import { recentCampaigns, campaignPerformance } from "@/lib/data";
import { RiAddLine, RiUpload2Line, RiFilterLine, RiCalendarLine } from "react-icons/ri";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@/components/charts/bar-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { DateRangePicker } from "@/components/date-range-picker";
import { useState } from "react";
import { format, isWithinInterval, parseISO } from "date-fns";

const statusDistribution = [
    { name: "Active", value: 3 },
    { name: "Scheduled", value: 2 },
    { name: "Paused", value: 1 },
    { name: "Completed", value: 1 },
    { name: "Draft", value: 1 },
];

// Define export columns mapping
const exportColumns = [
    { header: "Campaign Name", accessor: "name" as keyof Campaign },
    { header: "Status", accessor: "status" as keyof Campaign },
    { header: "Budget", accessor: "budget" as keyof Campaign },
    { header: "Spent", accessor: "spent" as keyof Campaign },
    { header: "ROI", accessor: "roi" as keyof Campaign },
    { header: "Start Date", accessor: "startDate" as keyof Campaign },
    { header: "End Date", accessor: "endDate" as keyof Campaign },
];

export default function CampaignsPage() {
    const [activeTab, setActiveTab] = useState("all");
    const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({
        from: null,
        to: null
    });
    const [showDateFilter, setShowDateFilter] = useState(false);

    // Filter campaigns based on status and date range
    const filteredCampaigns = recentCampaigns
        // First filter by status
        .filter(campaign => activeTab === "all" ? true : campaign.status.toLowerCase() === activeTab)
        // Then filter by date range if applicable
        .filter(campaign => {
            if (!dateRange.from && !dateRange.to) return true;
            
            const campaignStart = parseISO(campaign.startDate);
            const campaignEnd = parseISO(campaign.endDate);
            
            // Case 1: Only from date is selected
            if (dateRange.from && !dateRange.to) {
                return campaignStart >= dateRange.from || campaignEnd >= dateRange.from;
            }
            
            // Case 2: Only to date is selected
            if (!dateRange.from && dateRange.to) {
                return campaignStart <= dateRange.to || campaignEnd <= dateRange.to;
            }
            
            // Case 3: Both dates are selected
            if (dateRange.from && dateRange.to) {
                // Check if campaign overlaps with selected date range
                return (
                    // Campaign starts within date range
                    (campaignStart >= dateRange.from && campaignStart <= dateRange.to) ||
                    // Campaign ends within date range
                    (campaignEnd >= dateRange.from && campaignEnd <= dateRange.to) ||
                    // Campaign spans the entire date range
                    (campaignStart <= dateRange.from && campaignEnd >= dateRange.to)
                );
            }
            
            return true;
        });

    return (
        <DashboardShell>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <h1 className="text-2xl font-semibold tracking-tight">Campaigns</h1>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8">
                            <RiUpload2Line className="mr-1 h-4 w-4" /> Import
                        </Button>
                        <Button size="sm" className="h-8">
                            <RiAddLine className="mr-1 h-4 w-4" /> New Campaign
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle>Campaign Performance</CardTitle>
                            <CardDescription>Impressions vs Conversions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <BarChart
                                title=""
                                data={campaignPerformance.slice(0, 4)}
                                xKey="name"
                                yKey="conversions"
                                color="#8b5cf6"
                                height={220}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle>Campaign Status</CardTitle>
                            <CardDescription>Distribution by status</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DonutChart
                                title=""
                                data={statusDistribution}
                                nameKey="name"
                                dataKey="value"
                                colors={[
                                    "#10b981", // Active (green)
                                    "#3b82f6", // Scheduled (blue)
                                    "#f59e0b", // Paused (amber)
                                    "#6b7280", // Completed (gray)
                                    "#9ca3af", // Draft (light gray)
                                ]}
                                height={220}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle>Campaign Summary</CardTitle>
                            <CardDescription>Key metrics</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground">Total Campaigns</p>
                                    <p className="text-2xl font-bold">{recentCampaigns.length}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground">Active Campaigns</p>
                                    <p className="text-2xl font-bold">{recentCampaigns.filter(c => c.status === "Active").length}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground">Total Budget</p>
                                    <p className="text-2xl font-bold">${recentCampaigns.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground">Avg. ROI</p>
                                    <p className="text-2xl font-bold">
                                        {(recentCampaigns
                                            .filter(c => c.roi > 0)
                                            .reduce((sum, c) => sum + c.roi, 0) /
                                            recentCampaigns.filter(c => c.roi > 0).length)
                                            .toFixed(1)}x
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-4">
                    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                        <Tabs defaultValue="all" onValueChange={setActiveTab}>
                            <TabsList>
                                <TabsTrigger value="all">All Campaigns</TabsTrigger>
                                <TabsTrigger value="active">Active</TabsTrigger>
                                <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                                <TabsTrigger value="paused">Paused</TabsTrigger>
                                <TabsTrigger value="completed">Completed</TabsTrigger>
                            </TabsList>
                        </Tabs>
                        <div className="flex items-center space-x-2">
                            <DateRangePicker 
                                value={dateRange}
                                onChange={setDateRange}
                                className="w-[260px]"
                            />
                        </div>
                    </div>

                    {dateRange.from && dateRange.to && (
                        <div className="mb-4 bg-muted/50 rounded-lg p-3 flex items-center justify-between">
                            <p className="text-sm">
                                Showing campaigns between <span className="font-medium">{format(dateRange.from, "MMM d, yyyy")}</span> and <span className="font-medium">{format(dateRange.to, "MMM d, yyyy")}</span> 
                                ({filteredCampaigns.length} results)
                            </p>
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setDateRange({ from: null, to: null })}
                            >
                                Clear Filter
                            </Button>
                        </div>
                    )}

                    <DataTable
                        columns={columns}
                        data={filteredCampaigns}
                        searchColumn="name"
                        searchPlaceholder="Search campaigns..."
                        exportOptions={{
                            enabled: true,
                            filename: `ADmyBRAND-${activeTab === 'all' ? '' : activeTab + '-'}Campaigns`,
                            columns: exportColumns,
                        }}
                    />
                </div>
            </div>
        </DashboardShell>
    );
} 