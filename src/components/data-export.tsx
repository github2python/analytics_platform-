"use client";

import { useState } from "react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { RiDownload2Line, RiFileExcel2Line, RiFilePdf2Line } from "react-icons/ri";

interface DataExportProps<T> {
  data: T[];
  columns: {
    header: string;
    accessor: keyof T;
  }[];
  filename: string;
}

export function DataExport<T>({ data, columns, filename }: DataExportProps<T>) {
  const [isExporting, setIsExporting] = useState(false);
  
  // Prepare data for CSV export
  const csvData = [
    columns.map(col => col.header),
    ...data.map(item =>
      columns.map(col => {
        const value = item[col.accessor];
        if (value instanceof Date && !isNaN(value.getTime())) {
          return format(value, "yyyy-MM-dd");
        }
        return value;
      })
    )
  ];
  
  // Handle PDF export
  const exportPDF = () => {
    setIsExporting(true);
    try {
      const doc = new jsPDF();
      
      // Add title
      doc.text(filename, 14, 15);
      
      autoTable(doc, {
        head: [columns.map(col => col.header)],
        body: data.map(item => 
          columns.map(col => item[col.accessor])
        ),
        startY: 20,
        styles: {
          fontSize: 10,
          cellPadding: 3,
        },
        headStyles: {
          fillColor: [93, 79, 255],
        }
      });
      
      doc.save(`${filename}.pdf`);
    } catch (error) {
      console.error("Error exporting PDF:", error);
    } finally {
      setIsExporting(false);
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isExporting} className="gap-1">
          <RiDownload2Line className="h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportPDF} className="gap-2 cursor-pointer">
          <RiFilePdf2Line className="h-4 w-4" />
          Export as PDF
        </DropdownMenuItem>
        <CSVLink
          data={csvData}
          filename={`${filename}.csv`}
          className="w-full"
          onClick={() => setIsExporting(true)}
          onBlur={() => setIsExporting(false)}
        >
          <DropdownMenuItem className="gap-2 cursor-pointer">
            <RiFileExcel2Line className="h-4 w-4" />
            Export as CSV
          </DropdownMenuItem>
        </CSVLink>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 