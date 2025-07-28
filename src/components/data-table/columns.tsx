"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { 
  RiArrowDownLine, 
  RiArrowUpLine, 
  RiMoreLine 
} from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define the campaign data type
export interface Campaign {
  id: string;
  name: string;
  status: string;
  budget: number;
  spent: number;
  roi: number;
  startDate: string;
  endDate: string;
}

export const columns: ColumnDef<Campaign>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="pl-0 font-medium"
        >
          Campaign Name
          {column.getIsSorted() === "asc" ? (
            <RiArrowUpLine className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <RiArrowDownLine className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      );
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="pl-0 font-medium"
        >
          Status
          {column.getIsSorted() === "asc" ? (
            <RiArrowUpLine className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <RiArrowDownLine className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      
      return (
        <div className="flex w-full items-center">
          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              status === "Active"
                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                : status === "Scheduled"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                : status === "Paused"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                : status === "Completed"
                ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            {status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "budget",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="pl-0 font-medium"
        >
          Budget
          {column.getIsSorted() === "asc" ? (
            <RiArrowUpLine className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <RiArrowDownLine className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      );
    },
    cell: ({ row }) => {
      const budget = parseFloat(row.getValue("budget"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(budget);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "spent",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="pl-0 font-medium"
        >
          Spent
          {column.getIsSorted() === "asc" ? (
            <RiArrowUpLine className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <RiArrowDownLine className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      );
    },
    cell: ({ row }) => {
      const spent = parseFloat(row.getValue("spent"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(spent);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "roi",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="pl-0 font-medium"
        >
          ROI
          {column.getIsSorted() === "asc" ? (
            <RiArrowUpLine className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <RiArrowDownLine className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      );
    },
    cell: ({ row }) => {
      const roi = parseFloat(row.getValue("roi"));

      return (
        <div className="font-medium">
          {roi === 0 ? "--" : `${roi.toFixed(1)}x`}
        </div>
      );
    },
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const startDate = row.getValue("startDate") as string;
      const formatted = startDate 
        ? format(new Date(startDate), "MMM d, yyyy") 
        : "--";
      
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const endDate = row.getValue("endDate") as string;
      const formatted = endDate 
        ? format(new Date(endDate), "MMM d, yyyy") 
        : "--";
      
      return <div>{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <RiMoreLine className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.id)}>
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>Edit campaign</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]; 