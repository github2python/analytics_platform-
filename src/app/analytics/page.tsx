"use client";

import { DashboardShell } from "@/components/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { DateRangePicker } from "@/components/date-range-picker";
import { AreaChart } from "@/components/charts/area-chart";
import { BarChart } from "@/components/charts/bar-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { ChartExport } from "@/components/charts/chart-export";
import { 
  analyticsOverTime, 
  audienceDemographics,
  channelDistribution 
} from "@/lib/data";
import { 
  RiRefreshLine,
  RiFilterOffLine,
} from "react-icons/ri";
import { format, parseISO, isAfter, isBefore } from "date-fns";

export default function AnalyticsPage() {
  const [metric, setMetric] = useState("users");
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null
  });
  
  // Filter analytics data based on date range
  const filteredAnalyticsData = useMemo(() => {
    if (!dateRange.from && !dateRange.to) return analyticsOverTime;
    
    return analyticsOverTime.filter(item => {
      const date = parseISO(item.date);
      if (dateRange.from && dateRange.to) {
        return isAfter(date, dateRange.from) && isBefore(date, dateRange.to);
      } else if (dateRange.from) {
        return isAfter(date, dateRange.from);
      } else if (dateRange.to) {
        return isBefore(date, dateRange.to);
      }
      return true;
    });
  }, [dateRange]);
  
  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">Analytics</h1>
          <div className="flex items-center gap-2">
            <DateRangePicker
              value={dateRange}
              onChange={setDateRange}
              className="w-[240px]"
            />
            <Button variant="outline" size="icon" onClick={() => setDateRange({ from: null, to: null })}>
              <RiFilterOffLine className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <RiRefreshLine className="h-4 w-4" />
            </Button>
            <ChartExport 
              data={filteredAnalyticsData} 
              filename="ADmyBRAND-Analytics-Overview" 
              title="Analytics Overview"
            />
          </div>
        </div>
        
        {dateRange.from && dateRange.to && (
          <div className="bg-muted/50 rounded-lg p-3 flex items-center justify-between">
            <p className="text-sm">
              Showing data from <span className="font-medium">{format(dateRange.from, "MMM d, yyyy")}</span> to <span className="font-medium">{format(dateRange.to, "MMM d, yyyy")}</span> 
              ({filteredAnalyticsData.length} data points)
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

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Performance Metrics</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Tabs defaultValue="users" className="w-fit" onValueChange={setMetric}>
                  <TabsList>
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="conversions">Conversions</TabsTrigger>
                    <TabsTrigger value="revenue">Revenue</TabsTrigger>
                  </TabsList>
                </Tabs>
                <ChartExport 
                  data={filteredAnalyticsData} 
                  filename={`ADmyBRAND-Analytics-${metric.charAt(0).toUpperCase() + metric.slice(1)}`}
                  title={`${metric.charAt(0).toUpperCase() + metric.slice(1)} Over Time`}
                />
              </div>
            </CardHeader>
            <CardContent>
              <AreaChart 
                title=""
                data={filteredAnalyticsData}
                xKey="date"
                yKey={metric}
                color={
                  metric === "users" 
                    ? "#3b82f6" 
                    : metric === "conversions" 
                      ? "#10b981" 
                      : "#8b5cf6"
                }
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Audience Demographics</CardTitle>
              <ChartExport 
                data={[
                  ...audienceDemographics.ageGroups, 
                  ...audienceDemographics.gender,
                  ...audienceDemographics.devices
                ]} 
                filename="ADmyBRAND-Demographics" 
                title="Audience Demographics"
              />
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="age">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="age">Age</TabsTrigger>
                  <TabsTrigger value="gender">Gender</TabsTrigger>
                  <TabsTrigger value="device">Device</TabsTrigger>
                </TabsList>
                <TabsContent value="age" className="mt-4">
                  <BarChart 
                    title=""
                    data={audienceDemographics.ageGroups}
                    xKey="group"
                    yKey="percentage"
                    color="#3b82f6"
                  />
                </TabsContent>
                <TabsContent value="gender" className="mt-4">
                  <DonutChart 
                    title=""
                    data={audienceDemographics.gender}
                    nameKey="type"
                    dataKey="percentage"
                    colors={["#3b82f6", "#8b5cf6", "#10b981"]}
                  />
                </TabsContent>
                <TabsContent value="device" className="mt-4">
                  <DonutChart 
                    title=""
                    data={audienceDemographics.devices}
                    nameKey="type"
                    dataKey="percentage"
                    colors={["#3b82f6", "#8b5cf6", "#10b981"]}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Traffic Sources</CardTitle>
              <ChartExport 
                data={channelDistribution} 
                filename="ADmyBRAND-Traffic-Sources" 
                title="Traffic Sources"
              />
            </CardHeader>
            <CardContent>
              <DonutChart 
                title=""
                data={channelDistribution}
                nameKey="name"
                dataKey="value"
                colors={["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"]}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
} 