"use client"

import { cn } from "@/lib/utils"

interface RadialGaugeProps {
  value: number
  max: number
  label: string
  unit: string
  warningThreshold?: number
  criticalThreshold?: number
  size?: "sm" | "md" | "lg"
}

export function RadialGauge({
  value,
  max,
  label,
  unit,
  warningThreshold,
  criticalThreshold,
  size = "md",
}: RadialGaugeProps) {
  const percentage = Math.min((value / max) * 100, 100)
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const getColor = () => {
    if (criticalThreshold && value >= criticalThreshold) {
      return "stroke-[var(--redbox-critical)]"
    }
    if (warningThreshold && value >= warningThreshold) {
      return "stroke-[var(--redbox-warning)]"
    }
    return "stroke-primary"
  }

  const getTextColor = () => {
    if (criticalThreshold && value >= criticalThreshold) {
      return "text-red-500"
    }
    if (warningThreshold && value >= warningThreshold) {
      return "text-yellow-500"
    }
    return "text-foreground"
  }

  const sizes = {
    sm: { container: "w-24 h-24", text: "text-lg", label: "text-[10px]" },
    md: { container: "w-32 h-32", text: "text-2xl", label: "text-xs" },
    lg: { container: "w-40 h-40", text: "text-3xl", label: "text-sm" },
  }

  return (
    <div className={cn("relative flex items-center justify-center", sizes[size].container)}>
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="8"
          className="stroke-secondary"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          className={cn("transition-all duration-500", getColor())}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-bold tabular-nums", sizes[size].text, getTextColor())}>
          {value.toLocaleString()}
        </span>
        <span className={cn("text-muted-foreground uppercase tracking-wider", sizes[size].label)}>
          {unit}
        </span>
      </div>
      <span className={cn("absolute -bottom-5 text-muted-foreground font-medium", sizes[size].label)}>
        {label}
      </span>
    </div>
  )
}
