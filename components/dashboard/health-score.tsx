"use client"

import { cn } from "@/lib/utils"
import { Activity, TrendingUp, TrendingDown, Minus } from "lucide-react"

interface HealthScoreProps {
  score: number
  previousScore?: number
  status: "excellent" | "good" | "fair" | "poor" | "critical"
}

export function HealthScore({ score, previousScore, status }: HealthScoreProps) {
  const getStatusColor = () => {
    switch (status) {
      case "excellent":
        return "from-green-500 to-emerald-600"
      case "good":
        return "from-green-400 to-green-500"
      case "fair":
        return "from-yellow-400 to-orange-500"
      case "poor":
        return "from-orange-500 to-red-500"
      case "critical":
        return "from-red-500 to-red-700"
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "excellent":
        return "Excellent"
      case "good":
        return "Good"
      case "fair":
        return "Fair"
      case "poor":
        return "Poor"
      case "critical":
        return "Critical"
    }
  }

  const getTrend = () => {
    if (!previousScore) return null
    const diff = score - previousScore
    if (diff > 2) return { icon: TrendingUp, color: "text-green-500", label: `+${diff.toFixed(1)}` }
    if (diff < -2) return { icon: TrendingDown, color: "text-red-500", label: diff.toFixed(1) }
    return { icon: Minus, color: "text-muted-foreground", label: "Stable" }
  }

  const trend = getTrend()

  return (
    <div className="relative overflow-hidden rounded-xl bg-card border border-border p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Engine Health
          </p>
          <div className="flex items-baseline gap-3">
            <span
              className={cn(
                "text-5xl font-bold tabular-nums bg-gradient-to-r bg-clip-text text-transparent",
                getStatusColor()
              )}
            >
              {score}
            </span>
            <span className="text-lg text-muted-foreground">/100</span>
          </div>
        </div>
        {trend && (
          <div className={cn("flex items-center gap-1 text-sm", trend.color)}>
            <trend.icon className="w-4 h-4" />
            <span>{trend.label}</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span
            className={cn(
              "text-sm font-medium px-2 py-0.5 rounded-full bg-gradient-to-r text-white",
              getStatusColor()
            )}
          >
            {getStatusText()}
          </span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className={cn("h-full rounded-full bg-gradient-to-r transition-all duration-500", getStatusColor())}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
    </div>
  )
}
