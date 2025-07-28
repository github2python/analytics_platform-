"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface BarChartProps {
  title: string;
  data: any[];
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
}

export function BarChart({
  title,
  data,
  xKey,
  yKey,
  color = "#8884d8",
  height = 300,
}: BarChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsBarChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <XAxis
              dataKey={xKey}
              tickLine={false}
              axisLine={false}
              stroke="#888888"
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              stroke="#888888"
              fontSize={12}
              tickFormatter={(value) => `${value}`}
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--background)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
              itemStyle={{
                color: "var(--foreground)"
              }}
            />
            <Bar
              dataKey={yKey}
              fill={color}
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
} 