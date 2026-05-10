"use client"

import { useEffect, useState } from "react"

export function PerformanceIndex() {
  const [value, setValue] = useState(0)
  const targetValue = 92.4

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = targetValue / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= targetValue) {
        setValue(targetValue)
        clearInterval(timer)
      } else {
        setValue(current)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-card/80 backdrop-blur-sm border border-border rounded-lg p-4 w-56">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-muted-foreground tracking-wider">
          PERFORMANCE INDEX
        </span>
      </div>
      <div className="flex items-end gap-3">
        <span className="text-4xl font-bold text-foreground tabular-nums">
          {value.toFixed(1)}
        </span>
        {/* Animated bars */}
        <div className="flex items-end gap-0.5 mb-1">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              className="w-1.5 bg-primary rounded-t-sm origin-bottom"
              style={{
                height: `${12 + i * 2}px`,
                animation: `bar-grow 1.5s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2 tracking-wide">
        MAXIMIZE EVERY DRIVE
      </p>
    </div>
  )
}
