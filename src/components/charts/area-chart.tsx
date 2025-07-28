"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Area,
    AreaChart as RechartsAreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

interface ChartDataItem {
    [key: string]: string | number;
}

interface AreaChartProps {
    title: string;
    data: ChartDataItem[];
    xKey: string;
    yKey: string;
    color?: string;
    height?: number;
}

export function AreaChart({
    title,
    data,
    xKey,
    yKey,
    color = "#8884d8",
    height = 300,
}: AreaChartProps) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={height}>
                    <RechartsAreaChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
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
                        <Area
                            type="monotone"
                            dataKey={yKey}
                            stroke={color}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill={`url(#gradient-${title})`}
                            animationDuration={1500}
                        />
                    </RechartsAreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
} 