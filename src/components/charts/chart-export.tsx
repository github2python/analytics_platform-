"use client";

import { useState } from "react";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { RiDownload2Line, RiFileExcel2Line, RiFilePdf2Line } from "react-icons/ri";

interface ChartExportProps<T> {
  data: T[];
  filename: string;
  title?: string;
}

export function ChartExport<T>({ data, filename, title }: ChartExportProps<T>) {
  const [isExporting, setIsExporting] = useState(false);
  
  // Prepare headers based on the first data object
  const csvHeaders = data.length > 0 ? Object.keys(data[0] as object).map(key => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    key
  })) : [];
  
  // Export as PDF
  const exportPDF = () => {
    setIsExporting(true);
    try {
      const doc = new jsPDF();
      
      // Add title
      doc.text(title || filename, 14, 15);
      
      // Generate table data
      const headers = csvHeaders.map(h => h.label);
      const rows = data.map(item => 
        Object.keys(item as object).map(key => (item as any)[key])
      );
      
      // Add table
      const tableY = 25;
      const cellWidth = 180 / headers.length;
      
      // Draw header row
      doc.setFillColor(93, 79, 255);
      doc.setTextColor(255, 255, 255);
      doc.rect(14, tableY - 6, 180, 10, "F");
      
      headers.forEach((header, i) => {
        doc.text(header, 14 + (i * cellWidth) + 5, tableY);
      });
      
      // Draw data rows
      doc.setTextColor(0, 0, 0);
      rows.forEach((row, rowIndex) => {
        const y = tableY + 10 + (rowIndex * 10);
        
        // Alternate row background
        if (rowIndex % 2 === 0) {
          doc.setFillColor(245, 245, 245);
          doc.rect(14, y - 6, 180, 10, "F");
        }
        
        row.forEach((cell, cellIndex) => {
          doc.text(String(cell), 14 + (cellIndex * cellWidth) + 5, y);
        });
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
          data={data}
          filename={`${filename}.csv`}
          headers={csvHeaders}
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