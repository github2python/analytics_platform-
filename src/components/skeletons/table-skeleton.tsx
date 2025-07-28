"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

interface TableSkeletonProps {
    columnCount?: number;
    rowCount?: number;
}

export function TableSkeleton({
    columnCount = 5,
    rowCount = 6
}: TableSkeletonProps) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <Skeleton className="h-9 w-[180px]" />
                <Skeleton className="h-9 w-[120px]" />
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {Array(columnCount).fill(null).map((_, i) => (
                                <TableHead key={i}>
                                    <Skeleton className="h-6 w-[80%]" />
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array(rowCount).fill(null).map((_, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {Array(columnCount).fill(null).map((_, colIndex) => (
                                    <TableCell key={colIndex}>
                                        <Skeleton
                                            className="h-5"
                                            style={{
                                                width: `${colIndex === 0 ? 70 : Math.floor(Math.random() * 40) + 30}%`
                                            }}
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-[180px]" />
                <div className="flex space-x-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                </div>
            </div>
        </div>
    );
} 