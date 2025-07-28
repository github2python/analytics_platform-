"use client";

import * as React from "react";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { Calendar, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateRangePickerProps {
  className?: string;
  onChange: (range: { from: Date | null; to: Date | null }) => void;
  value: { from: Date | null; to: Date | null };
  align?: "start" | "center" | "end";
  disabled?: boolean;
}

export function DateRangePicker({
  className,
  onChange,
  value,
  align = "start",
  disabled = false,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState<Date | null>(value.from);
  const [endDate, setEndDate] = React.useState<Date | null>(value.to);

  // Update internal state when external value changes
  React.useEffect(() => {
    setStartDate(value.from);
    setEndDate(value.to);
  }, [value.from, value.to]);

  // Handle date change
  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    
    if (start && end) {
      onChange({ from: start, to: end });
      setIsOpen(false);
    } else {
      onChange({ from: start, to: null });
    }
  };

  // Clear the date range
  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    onChange({ from: null, to: null });
    setIsOpen(false);
  };

  // Format date range for display
  const formatDateRange = () => {
    if (startDate && endDate) {
      return `${format(startDate, "MMM d, yyyy")} - ${format(endDate, "MMM d, yyyy")}`;
    } else if (startDate) {
      return `From ${format(startDate, "MMM d, yyyy")}`;
    } else if (endDate) {
      return `Until ${format(endDate, "MMM d, yyyy")}`;
    } else {
      return "Select date range";
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          id="date-range"
          variant={"outline"}
          size={"sm"}
          className={cn(
            "justify-start text-left font-normal",
            !value.from && !value.to && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <Calendar className="mr-2 h-4 w-4" />
          {formatDateRange()}
          {(startDate || endDate) && (
            <X
              className="ml-2 h-4 w-4 hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align={align}>
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={handleChange}
          monthsShown={2}
          inline
          calendarClassName="border-none shadow-none"
        />
        <div className="flex items-center justify-between p-3 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Select a date range
          </p>
          <Button size={"sm"} onClick={handleClear}>
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
} 