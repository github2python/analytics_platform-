"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MetricCardSkeleton() {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                    <Skeleton className="h-8 w-28" />
                    <div className="flex items-center">
                        <Skeleton className="h-4 w-16" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
} 