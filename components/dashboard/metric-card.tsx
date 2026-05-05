"use client"

import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface MetricCardProps {
  label: string
  value: string | number
  unit?: string
  icon: LucideIcon
  trend?: "up" | "down" | "stable"
  trendValue?: string
  status?: "normal" | "warning" | "critical"
}

export function MetricCard({
  label,
  value,
  unit,
  icon: Icon,
  trend,
  trendValue,
  status = "normal",
}: MetricCardProps) {
  const getStatusStyles = () => {
    switch (status) {
      case "warning":
        return "border-yellow-500/50 bg-yellow-500/5"
      case "critical":
        return "border-red-500/50 bg-red-500/5"
      default:
        return "border-border bg-card"
    }
  }

  const getValueColor = () => {
    switch (status) {
      case "warning":
        return "text-yellow-500"
      case "critical":
        return "text-red-500"
      default:
        return "text-foreground"
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-500"
      case "down":
        return "text-red-500"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className={cn("rounded-xl border p-4 transition-colors", getStatusStyles())}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
        </div>
        {trend && trendValue && (
          <span className={cn("text-xs font-medium", getTrendColor())}>{trendValue}</span>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className={cn("text-2xl font-bold tabular-nums", getValueColor())}>{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
    </div>
  )
}
