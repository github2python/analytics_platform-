import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { 
  RiArrowUpSLine, 
  RiArrowDownSLine 
} from "react-icons/ri";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: IconType;
  change?: number;
  changeLabel?: string;
  iconColor?: string;
  className?: string;
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  change,
  changeLabel,
  iconColor = "text-primary",
  className,
}: MetricCardProps) {
  const isPositiveChange = change && change > 0;
  const isNegativeChange = change && change < 0;

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <h3 className="mt-2 text-3xl font-bold">{value}</h3>
            {typeof change !== "undefined" && (
              <div className="mt-2 flex items-center">
                <span
                  className={cn(
                    "flex items-center text-sm font-medium",
                    isPositiveChange 
                      ? "text-emerald-500" 
                      : isNegativeChange 
                        ? "text-red-500" 
                        : "text-muted-foreground"
                  )}
                >
                  {isPositiveChange && <RiArrowUpSLine className="mr-1 h-4 w-4" />}
                  {isNegativeChange && <RiArrowDownSLine className="mr-1 h-4 w-4" />}
                  {Math.abs(change)}%
                </span>
                {changeLabel && (
                  <span className="ml-1 text-sm text-muted-foreground">
                    {changeLabel}
                  </span>
                )}
              </div>
            )}
          </div>
          <div className={cn("rounded-full p-2 bg-primary/10", iconColor)}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 