"use client";

import { useState, useEffect } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { MetricCard } from "@/components/metric-card";
import { AreaChart } from "@/components/charts/area-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/data-table/data-table";
import { columns, Campaign } from "@/components/data-table/columns";
import { LiveUserCounter } from "@/components/live-user-counter";
import { MetricCardSkeleton } from "@/components/skeletons/metric-card-skeleton";
import { ChartSkeleton } from "@/components/skeletons/chart-skeleton";
import {
  keyMetrics,
  revenueData,
  usersData,
  conversionData,
  channelDistribution,
  campaignPerformance,
  recentCampaigns,
} from "@/lib/data";

import {
  getUpdatedMetrics,
  getUpdatedRevenueData,
  getUpdatedUsersData,
  getUpdatedConversionData,
  getUpdatedCampaignMetrics
} from "@/lib/real-time-service";

import {
  RiMoneyDollarCircleLine,
  RiUserLine,
  RiShoppingBag3Line,
  RiLineChartLine,
  RiRefreshLine
} from "react-icons/ri";
import { Button } from "@/components/ui/button";

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

export default function Home() {
  // State for data that will be updated in real-time
  const [metrics, setMetrics] = useState(keyMetrics);
  const [revenue, setRevenue] = useState(revenueData);
  const [users, setUsers] = useState(usersData);
  const [conversion, setConversion] = useState(conversionData);
  const [campaigns, setCampaigns] = useState(recentCampaigns);
  const [isRefreshing, setIsRefreshing] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTimeframe, setActiveTimeframe] = useState("7days");

  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [loadingCharts, setLoadingCharts] = useState(true);
  const [loadingTable, setLoadingTable] = useState(true);

  // Initial loading simulation
  useEffect(() => {
    // Stagger the loading states to simulate a more natural loading sequence
    setTimeout(() => setIsLoading(false), 1000);
    setTimeout(() => setLoadingCharts(false), 1500);
    setTimeout(() => setLoadingTable(false), 2000);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const intervalId = setInterval(() => {
      setMetrics(getUpdatedMetrics());
      setRevenue(getUpdatedRevenueData());
      setUsers(getUpdatedUsersData());
      setConversion(getUpdatedConversionData());
      setCampaigns(getUpdatedCampaignMetrics(campaigns));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(intervalId);
  }, [campaigns]);

  // Manual refresh handler
  const handleRefresh = () => {
    setIsRefreshing(true);
    setLoadingCharts(true);
    setLoadingTable(true);

    // Update all data
    setTimeout(() => {
      setMetrics(getUpdatedMetrics());
      setRevenue(getUpdatedRevenueData());
      setUsers(getUpdatedUsersData());
      setConversion(getUpdatedConversionData());
      setCampaigns(getUpdatedCampaignMetrics(campaigns));

      // Reset loading states
      setLoadingCharts(false);
      setTimeout(() => setLoadingTable(false), 300);

      // Reset refresh state after animation
      setTimeout(() => setIsRefreshing(false), 500);
    }, 800);
  };

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
          <LiveUserCounter />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            className={isRefreshing ? "animate-spin" : ""}
          >
            <RiRefreshLine className="h-4 w-4" />
          </Button>
          <Tabs defaultValue="7days" className="w-fit" onValueChange={setActiveTimeframe}>
            <TabsList className="grid w-fit grid-cols-3">
              <TabsTrigger value="7days">7 days</TabsTrigger>
              <TabsTrigger value="30days">30 days</TabsTrigger>
              <TabsTrigger value="90days">90 days</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <>
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
          </>
        ) : (
          <>
            <MetricCard
              title="Total Revenue"
              value={`$${metrics.totalRevenue.toLocaleString()}`}
              icon={RiMoneyDollarCircleLine}
              change={metrics.revenueGrowth}
              changeLabel="vs last period"
            />
            <MetricCard
              title="Total Users"
              value={metrics.totalUsers.toLocaleString()}
              icon={RiUserLine}
              change={metrics.userGrowth}
              changeLabel="vs last period"
            />
            <MetricCard
              title="Conversions"
              value={metrics.totalConversions.toLocaleString()}
              icon={RiShoppingBag3Line}
              change={metrics.conversionGrowth}
              changeLabel="vs last period"
            />
            <MetricCard
              title="Average Order Value"
              value={`$${metrics.averageOrderValue.toLocaleString()}`}
              icon={RiLineChartLine}
              change={metrics.aovGrowth}
              changeLabel="vs last period"
            />
          </>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-2">
          <Tabs defaultValue="revenue" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="conversion">Conversion Rate</TabsTrigger>
            </TabsList>
            {loadingCharts ? (
              <div className="mt-2">
                <ChartSkeleton height={350} />
              </div>
            ) : (
              <>
                <TabsContent value="revenue">
                  <AreaChart
                    title="Revenue Over Time"
                    data={revenue}
                    xKey="month"
                    yKey="revenue"
                    color="#8b5cf6"
                  />
                </TabsContent>
                <TabsContent value="users">
                  <AreaChart
                    title="Users Over Time"
                    data={users}
                    xKey="month"
                    yKey="users"
                    color="#3b82f6"
                  />
                </TabsContent>
                <TabsContent value="conversion">
                  <AreaChart
                    title="Conversion Rate Over Time"
                    data={conversion}
                    xKey="month"
                    yKey="rate"
                    color="#10b981"
                  />
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
        <div>
          {loadingCharts ? (
            <ChartSkeleton height={350} />
          ) : (
            <DonutChart
              title="Marketing Channels"
              data={channelDistribution}
              nameKey="name"
              dataKey="value"
              colors={["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"]}
            />
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6">
        {loadingCharts ? (
          <ChartSkeleton height={300} />
        ) : (
          <BarChart
            title="Campaign Performance"
            data={campaignPerformance}
            xKey="name"
            yKey="conversions"
            color="#8b5cf6"
          />
        )}
      </div>

      <div className="mt-6">
        <h2 className="mb-4 text-xl font-semibold tracking-tight">Recent Campaigns</h2>
        <DataTable
          columns={columns}
          data={campaigns}
          searchColumn="name"
          searchPlaceholder="Search campaigns..."
          exportOptions={{
            enabled: true,
            filename: "ADmyBRAND-Recent-Campaigns",
            columns: exportColumns,
          }}
          isLoading={loadingTable}
        />
      </div>
    </DashboardShell>
  );
}
