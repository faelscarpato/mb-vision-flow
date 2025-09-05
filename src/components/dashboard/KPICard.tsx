import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    type: "up" | "down" | "neutral";
  };
  variant?: "default" | "success" | "warning" | "destructive";
  className?: string;
}

export function KPICard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = "default",
  className,
}: KPICardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "border-success/20 bg-success-light";
      case "warning":
        return "border-warning/20 bg-warning-light";
      case "destructive":
        return "border-destructive/20 bg-destructive-light";
      default:
        return "border-border";
    }
  };

  const getIconStyles = () => {
    switch (variant) {
      case "success":
        return "text-success bg-success/10";
      case "warning":
        return "text-warning bg-warning/10";
      case "destructive":
        return "text-destructive bg-destructive/10";
      default:
        return "text-primary bg-primary/10";
    }
  };

  const getTrendColor = () => {
    switch (trend?.type) {
      case "up":
        return "bg-success text-success-foreground";
      case "down":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Card className={cn("relative overflow-hidden", getVariantStyles(), className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-card-foreground">{value}</p>
              {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
              )}
            </div>
            {trend && (
              <Badge variant="secondary" className={cn("text-xs", getTrendColor())}>
                {trend.type === "up" ? "↗" : trend.type === "down" ? "↘" : "→"} {trend.value}% {trend.label}
              </Badge>
            )}
          </div>
          <div className={cn("rounded-lg p-2", getIconStyles())}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}