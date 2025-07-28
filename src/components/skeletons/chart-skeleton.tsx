"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ChartSkeletonProps {
    title?: boolean;
    height?: number;
}

export function ChartSkeleton({
    title = true,
    height = 300
}: ChartSkeletonProps) {
    return (
        <Card>
            {title && (
                <CardHeader className="pb-2">
                    <Skeleton className="h-6 w-36" />
                </CardHeader>
            )}
            <CardContent>
                <div className="space-y-2">
                    {/* X-axis labels */}
                    <div className="flex justify-between pt-2">
                        <Skeleton className="h-3 w-6" />
                        <Skeleton className="h-3 w-6" />
                        <Skeleton className="h-3 w-6" />
                        <Skeleton className="h-3 w-6" />
                        <Skeleton className="h-3 w-6" />
                    </div>

                    {/* Chart area */}
                    <Skeleton className="w-full" style={{ height: `${height - 40}px` }} />

                    {/* Legend */}
                    <div className="flex items-center justify-center gap-4 pt-2">
                        <div className="flex items-center gap-1">
                            <Skeleton className="h-3 w-3 rounded-full" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                        <div className="flex items-center gap-1">
                            <Skeleton className="h-3 w-3 rounded-full" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 