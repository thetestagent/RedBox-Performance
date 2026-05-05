"use client"

import { cn } from "@/lib/utils"
import { AlertTriangle, AlertCircle, Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Alert } from "@/lib/types/database"

interface AlertsListProps {
  alerts: Alert[]
  onDismiss?: (id: string) => void
}

export function AlertsList({ alerts, onDismiss }: AlertsListProps) {
  const getAlertIcon = (severity: Alert["severity"]) => {
    switch (severity) {
      case "critical":
        return AlertCircle
      case "warning":
        return AlertTriangle
      default:
        return Info
    }
  }

  const getAlertStyles = (severity: Alert["severity"]) => {
    switch (severity) {
      case "critical":
        return "border-red-500/50 bg-red-500/10 text-red-500"
      case "warning":
        return "border-yellow-500/50 bg-yellow-500/10 text-yellow-500"
      default:
        return "border-blue-500/50 bg-blue-500/10 text-blue-500"
    }
  }

  if (alerts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="p-3 rounded-full bg-green-500/10 mb-3">
          <Info className="w-6 h-6 text-green-500" />
        </div>
        <p className="text-sm text-muted-foreground">No active alerts</p>
        <p className="text-xs text-muted-foreground mt-1">Your vehicle is running smoothly</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {alerts.map((alert) => {
        const Icon = getAlertIcon(alert.severity)
        return (
          <div
            key={alert.id}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg border transition-colors",
              getAlertStyles(alert.severity)
            )}
          >
            <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{alert.alert_type}</p>
              <p className="text-xs opacity-80 mt-0.5">{alert.message}</p>
              <p className="text-xs opacity-60 mt-1">
                {new Date(alert.created_at).toLocaleString()}
              </p>
            </div>
            {onDismiss && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 flex-shrink-0 opacity-60 hover:opacity-100"
                onClick={() => onDismiss(alert.id)}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        )
      })}
    </div>
  )
}
