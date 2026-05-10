"use client"

import { useEffect, useState } from "react"

interface SpeedometerGaugeProps {
  value?: number
  maxValue?: number
}

export function SpeedometerGauge({ value = 284, maxValue = 320 }: SpeedometerGaugeProps) {
  const [currentValue, setCurrentValue] = useState(0)

  useEffect(() => {
    const duration = 2500
    const steps = 80
    const increment = value / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCurrentValue(value)
        clearInterval(timer)
      } else {
        setCurrentValue(Math.round(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  // Calculate rotation angle (from -135 to 135 degrees for 270 degree arc)
  const rotation = -135 + (currentValue / maxValue) * 270

  return (
    <div className="relative w-48 h-32 flex items-center justify-center">
      {/* Gauge background arc */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 120"
        fill="none"
      >
        {/* Background arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        {/* Red progress arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          stroke="url(#gaugeGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${(currentValue / maxValue) * 251} 251`}
        />
        {/* Tick marks */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const angle = -135 + i * 45
          const rad = (angle * Math.PI) / 180
          const x1 = 100 + 65 * Math.cos(rad)
          const y1 = 100 + 65 * Math.sin(rad)
          const x2 = 100 + 75 * Math.cos(rad)
          const y2 = 100 + 75 * Math.sin(rad)
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
            />
          )
        })}
        {/* Number labels */}
        {[1, 2, 3, 4, 5, 6].map((num) => {
          const angle = -135 + num * 45
          const rad = (angle * Math.PI) / 180
          const x = 100 + 55 * Math.cos(rad)
          const y = 100 + 55 * Math.sin(rad)
          return (
            <text
              key={num}
              x={x}
              y={y}
              fill="rgba(255,255,255,0.5)"
              fontSize="10"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {num}
            </text>
          )
        })}
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(220, 38, 38, 0.5)" />
            <stop offset="100%" stopColor="rgb(220, 38, 38)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Needle */}
      <div
        className="absolute w-1 h-16 bg-gradient-to-t from-primary to-primary/50 rounded-full origin-bottom"
        style={{
          bottom: "20px",
          transform: `rotate(${rotation}deg)`,
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Center dot */}
      <div className="absolute bottom-5 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50" />

      {/* Value display */}
      <div className="absolute -bottom-2 text-center">
        <span className="text-3xl font-bold text-foreground tabular-nums">
          {currentValue}
        </span>
        <span className="text-xs text-muted-foreground ml-1">KM/H</span>
      </div>
    </div>
  )
}
